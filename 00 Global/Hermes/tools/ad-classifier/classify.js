#!/usr/bin/env node

/**
 * ============================================================================
 * AD-CLASSIFIER — Text-only ad classification + angle dedup + precision validation
 * ============================================================================
 *
 * Phase 3c + Phase 4g support (proposal v5.2, §9 and §11).
 *
 * STAGES
 *   classify   Initial per-ad classification. Gemini reads primary_text +
 *              headline + description + on_image_text + caption (TEXT ONLY,
 *              no vision, no transcription). Returns {persona, angle, format}
 *              per ad. Batched 10 ads / call with exponential backoff on
 *              rate-limit errors.
 *
 *   dedup      Angle deduplication pass (§9 "Angle deduplication pass — mandatory
 *              sub-step"). Feeds unique angle strings back to Gemini; gets
 *              clusters `{canonical_angle, members[]}`; rewrites every ad's
 *              angle to its canonical form. Writes a top-level `angle_clusters`
 *              map to the classifications file.
 *
 *   validate   Precision validation. Sample 20 ads per persona, rescore with
 *              a fresh pass, require ≥70% agreement. Sparse-persona fallback
 *              (§9): ≥20 → sample 20; 5–19 → rescore all; <5 → skip + flag.
 *              On <70% after one retry (§9 retry prompt template), emits a
 *              "banner: directional only" flag in the report.
 *
 *   all        Run classify → dedup → validate in sequence.
 *
 * INPUT ADS (ads-raw.json OR ad-library-raw.json)
 *   Flat array: [{ad_id, primary_text, headline, description, on_image_text,
 *                 caption, ad_format, first_seen}, ...]
 *
 * INPUT PERSONAS (personas.json)
 *   Either {PersonaName: regex-string} (persona-dictionary.json) — keys used
 *   as the taxonomy — or {personas: [{name, one_line_pain, top_keywords:[]}]}
 *   for the retry-prompt path (§9). The tool accepts either.
 *
 * OUTPUT
 *   --output (default: ad-classifications.json)
 *     {
 *       ads: [{ad_id, persona, angle, format}, ...],
 *       angle_clusters: {raw_angle: canonical_angle, ...},
 *       validation: {
 *         per_persona: [{persona, n_tagged, n_rescored, agreements, precision, status}],
 *         banner_flags: ["..."]
 *       },
 *       meta: {started_at, stages_run, mock}
 *     }
 *
 * RATE LIMITING
 *   10 ads per Gemini call. On 429 / rate-limit / 5xx, sleep
 *   min(60s, 2 ** attempt) and retry up to --max-retries (default 4).
 *
 * MOCK MODE
 *   --mock deterministically classifies without calling Gemini. Used by unit
 *   tests and for dry runs. The mock routes an ad to a persona when the ad's
 *   text contains any persona name (case-insensitive); angle is set to the
 *   first 6 words of the ad's primary_text.
 *
 * USAGE
 *   node classify.js --stage all --ads ads-raw.json --personas personas.json \\
 *     --output ad-classifications.json
 *
 *   node classify.js --stage classify --ads ... --personas ... --output ... --mock
 *
 * ============================================================================
 */

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Try loading shared Gemini env (matches convention from gemini-api/).
dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config({ path: path.join(__dirname, '..', 'gemini-api', '.env') });

// ============================================================================
// ARGS
// ============================================================================

function parseArgs(argv) {
  const a = {
    stage: 'all',
    ads: null,
    personas: null,
    output: null,
    batchSize: 10,
    maxRetries: 4,
    model: 'gemini-2.5-flash',
    mock: false,
    precisionThreshold: 0.70,
    sampleSize: 20,
    seed: 42,
  };
  for (let i = 0; i < argv.length; i++) {
    const t = argv[i];
    if (t === '--stage') a.stage = argv[++i];
    else if (t === '--ads') a.ads = argv[++i];
    else if (t === '--personas') a.personas = argv[++i];
    else if (t === '--output') a.output = argv[++i];
    else if (t === '--batch-size') a.batchSize = parseInt(argv[++i], 10);
    else if (t === '--max-retries') a.maxRetries = parseInt(argv[++i], 10);
    else if (t === '--model') a.model = argv[++i];
    else if (t === '--mock') a.mock = true;
    else if (t === '--precision-threshold') a.precisionThreshold = parseFloat(argv[++i]);
    else if (t === '--sample-size') a.sampleSize = parseInt(argv[++i], 10);
    else if (t === '--seed') a.seed = parseInt(argv[++i], 10);
    else if (t === '--help' || t === '-h') {
      printHelp();
      process.exit(0);
    }
  }
  return a;
}

function printHelp() {
  console.log(`ad-classifier

Usage:
  node classify.js --stage <classify|dedup|validate|all> \\
    --ads <ads-raw.json> --personas <personas.json> --output <classifications.json>

See header for full flag reference.
`);
}

// ============================================================================
// DETERMINISTIC RNG (mulberry32) — shared with review-sampler.
// ============================================================================

function makeRng(seed) {
  let state = seed >>> 0;
  return function rng() {
    state = (state + 0x6D2B79F5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle(arr, rng) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function sampleN(arr, n, rng) {
  if (arr.length <= n) return arr.slice();
  return shuffle(arr, rng).slice(0, n);
}

// ============================================================================
// PERSONA TAXONOMY LOADER
// ============================================================================

function loadPersonaTaxonomy(obj) {
  // Accept persona-dictionary.json shape: {Name: regex-string}
  // OR { personas: [{name, one_line_pain, top_keywords}] }
  if (obj && Array.isArray(obj.personas)) {
    return obj.personas.map((p) => ({
      name: p.name,
      one_line_pain: p.one_line_pain || '',
      top_keywords: Array.isArray(p.top_keywords) ? p.top_keywords : [],
    }));
  }
  if (obj && typeof obj === 'object') {
    return Object.keys(obj).map((name) => {
      const raw = obj[name];
      const pattern = typeof raw === 'string' ? raw : (raw && raw.pattern) || '';
      const top_keywords = pattern
        .split('|')
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, 5);
      return { name, one_line_pain: '', top_keywords };
    });
  }
  throw new Error('Unrecognized personas file shape.');
}

// ============================================================================
// AD TEXT ASSEMBLY
// ============================================================================

function adFullText(ad) {
  return [
    ad.primary_text,
    ad.headline,
    ad.description,
    ad.on_image_text,
    ad.caption,
  ].filter(Boolean).join('\n');
}

// ============================================================================
// GEMINI CLIENT (lazy)
// ============================================================================

let _genAI = null;

async function getGeminiClient() {
  if (_genAI) return _genAI;
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY not set. Add to .claude/tools/ad-classifier/.env or .claude/tools/gemini-api/.env');
  }
  const { GoogleGenerativeAI } = await import('@google/generative-ai');
  _genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  return _genAI;
}

async function geminiJSON(prompt, opts = {}) {
  const genAI = await getGeminiClient();
  const model = genAI.getGenerativeModel({ model: opts.model || 'gemini-2.5-flash' });
  const full = `${prompt}\n\nReturn ONLY valid JSON, no markdown formatting or code fences.`;
  const result = await model.generateContent(full);
  const resp = await result.response;
  let text = resp.text().trim();
  if (text.startsWith('```')) {
    text = text.replace(/^```(json)?\s*/i, '').replace(/```\s*$/, '');
  }
  return JSON.parse(text);
}

// ============================================================================
// BATCH + BACKOFF
// ============================================================================

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function isTransientError(e) {
  const m = (e && e.message) || String(e);
  return /429|rate[_\s-]?limit|quota|5\d\d|ECONN|ENOTFOUND|timeout/i.test(m);
}

async function withBackoff(fn, maxRetries = 4) {
  let lastErr;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (e) {
      lastErr = e;
      if (attempt === maxRetries || !isTransientError(e)) throw e;
      const waitMs = Math.min(60000, Math.pow(2, attempt) * 1000);
      console.warn(`[ad-classifier]   ⚠ transient error (attempt ${attempt + 1}/${maxRetries + 1}): ${e.message.slice(0, 160)}. Backing off ${waitMs}ms...`);
      await new Promise((r) => setTimeout(r, waitMs));
    }
  }
  throw lastErr;
}

// ============================================================================
// MOCK LLM — deterministic stand-in for unit tests and dry runs.
// ============================================================================

function mockClassifyBatch(ads, taxonomy) {
  return ads.map((ad) => {
    const full = adFullText(ad).toLowerCase();
    const hit = taxonomy.find((p) => full.includes(p.name.toLowerCase()));
    const words = (ad.primary_text || '').split(/\s+/).filter(Boolean).slice(0, 6).join(' ');
    return {
      ad_id: ad.ad_id,
      persona: hit ? hit.name : (taxonomy[0] ? taxonomy[0].name : 'UNKNOWN'),
      angle: words || 'no-primary-text',
      format: ad.ad_format || 'unknown',
    };
  });
}

function mockDedupAngles(uniqueAngles) {
  // Group angles by normalized lowercase first 4 words; that becomes canonical.
  const clusters = new Map();
  for (const raw of uniqueAngles) {
    const key = raw.toLowerCase().split(/\s+/).slice(0, 4).join(' ');
    if (!clusters.has(key)) clusters.set(key, { canonical_angle: raw, members: [] });
    clusters.get(key).members.push(raw);
  }
  return Array.from(clusters.values());
}

function mockRescoreBatch(samples, taxonomy) {
  // Rescore with the same mock logic — agrees with itself 100% by construction.
  // Good enough for unit tests; real runs use Gemini.
  return samples.map((s) => {
    const full = adFullText(s).toLowerCase();
    const hit = taxonomy.find((p) => full.includes(p.name.toLowerCase()));
    return {
      ad_id: s.ad_id,
      persona: hit ? hit.name : (taxonomy[0] ? taxonomy[0].name : 'UNKNOWN'),
    };
  });
}

// ============================================================================
// CLASSIFY STAGE
// ============================================================================

function buildClassifyPrompt(ads, taxonomy) {
  const personaLines = taxonomy
    .map((p) => `- "${p.name}"${p.one_line_pain ? ` — ${p.one_line_pain}` : ''}${p.top_keywords.length ? ` (keywords: ${p.top_keywords.join(', ')})` : ''}`)
    .join('\n');

  const adLines = ads.map((ad, i) => {
    const text = adFullText(ad);
    return `[${i}] ad_id=${ad.ad_id} format=${ad.ad_format || 'unknown'}\n---\n${text}\n---`;
  }).join('\n\n');

  return `You are classifying Facebook/Instagram ads for a brand-research pipeline.
For each ad below, assign:
  - persona: one of the persona names listed (the audience whose pain/language
    the ad copy most closely targets).
  - angle: a one-line creative idea the ad leads with, short and reusable.
    Examples: "Feel sharp by 10am — cognitive-speed demo",
              "One scoop, eight pills saved".
  - format: one of video | static | partnership | carousel (or "unknown").

TEXT ONLY. The ads below include primary_text + headline + description +
on-image-text + caption — no visuals, no audio. Tag the persona whose
implicit language or pain the copy most closely matches.

Personas:
${personaLines}

Ads:
${adLines}

Respond with a JSON array in the same order as the ads:
[{"ad_id": "...", "persona": "...", "angle": "...", "format": "..."}, ...]`;
}

async function classifyBatch(ads, taxonomy, opts) {
  if (opts.mock) return mockClassifyBatch(ads, taxonomy);
  const prompt = buildClassifyPrompt(ads, taxonomy);
  const resp = await withBackoff(() => geminiJSON(prompt, { model: opts.model }), opts.maxRetries);
  if (!Array.isArray(resp)) throw new Error('Classify batch did not return an array.');
  // Keyed alignment in case the model reorders.
  const byId = new Map(resp.map((r) => [r.ad_id, r]));
  return ads.map((ad) => byId.get(ad.ad_id) || {
    ad_id: ad.ad_id,
    persona: taxonomy[0]?.name || 'UNKNOWN',
    angle: 'unclassified',
    format: ad.ad_format || 'unknown',
  });
}

async function runClassify(ads, taxonomy, opts) {
  const batches = chunk(ads, opts.batchSize);
  console.log(`[ad-classifier] classify: ${ads.length} ads in ${batches.length} batches of ${opts.batchSize}`);
  const out = [];
  for (let b = 0; b < batches.length; b++) {
    console.log(`[ad-classifier]   batch ${b + 1}/${batches.length} (${batches[b].length} ads)`);
    const res = await classifyBatch(batches[b], taxonomy, opts);
    out.push(...res);
  }
  return out;
}

// ============================================================================
// DEDUP STAGE
// ============================================================================

function buildDedupPrompt(angles) {
  return `You will receive a list of raw angle strings extracted from ads.
Group them into clusters where each cluster represents the same underlying
creative idea, even if worded differently. For each cluster, pick the
clearest member as the canonical_angle.

Input angles:
${angles.map((a, i) => `[${i}] "${a}"`).join('\n')}

Respond as a JSON array:
[{"canonical_angle": "...", "members": ["...", "..."]}, ...]`;
}

async function dedupAngles(uniqueAngles, opts) {
  if (opts.mock) return mockDedupAngles(uniqueAngles);
  const prompt = buildDedupPrompt(uniqueAngles);
  const resp = await withBackoff(() => geminiJSON(prompt, { model: opts.model }), opts.maxRetries);
  if (!Array.isArray(resp)) throw new Error('Dedup stage did not return an array.');
  return resp;
}

function rewriteAngles(classifications, clusters) {
  // Build raw -> canonical map.
  const rawToCanon = new Map();
  for (const c of clusters) {
    for (const m of (c.members || [])) {
      rawToCanon.set(m, c.canonical_angle);
    }
  }
  const out = classifications.map((r) => ({
    ...r,
    angle: rawToCanon.get(r.angle) || r.angle,
  }));
  return { classifications: out, rawToCanon };
}

// ============================================================================
// VALIDATE STAGE
// ============================================================================

function buildValidatePrompt(ads, taxonomy) {
  const personaLines = taxonomy
    .map((p) => `- "${p.name}"${p.one_line_pain ? ` — ${p.one_line_pain}` : ''}${p.top_keywords.length ? ` (keywords: ${p.top_keywords.join(', ')})` : ''}`)
    .join('\n');

  const adLines = ads.map((ad, i) => {
    return `[${i}] ad_id=${ad.ad_id}\n---\n${adFullText(ad)}\n---`;
  }).join('\n\n');

  return `Re-classify these ads against the persona taxonomy below. TEXT ONLY
(no visuals, no audio). For each ad, return only the persona name — we are
validating the primary persona tag.

Personas:
${personaLines}

Ads:
${adLines}

Respond as a JSON array in the same order:
[{"ad_id": "...", "persona": "..."}, ...]`;
}

async function rescoreBatch(ads, taxonomy, opts) {
  if (opts.mock) return mockRescoreBatch(ads, taxonomy);
  const prompt = buildValidatePrompt(ads, taxonomy);
  const resp = await withBackoff(() => geminiJSON(prompt, { model: opts.model }), opts.maxRetries);
  if (!Array.isArray(resp)) throw new Error('Rescore batch did not return an array.');
  return resp;
}

function buildRetryPrompt(persona, disagreements, taxonomy, nTagged, nRescored, allAds, originalClassifications) {
  // §9 retry prompt template — verbatim structure.
  const personaEntry = taxonomy.find((p) => p.name === persona);
  const pain = personaEntry?.one_line_pain || '(pain one-liner unavailable)';
  const keywords = (personaEntry?.top_keywords || []).slice(0, 3).join(', ');
  const disagreementBlocks = disagreements.map((d) => {
    const ad = allAds.find((a) => a.ad_id === d.ad_id);
    const orig = originalClassifications.find((c) => c.ad_id === d.ad_id);
    return `- ad_id=${d.ad_id}
  primary_text: ${ad?.primary_text || ''}
  headline: ${ad?.headline || ''}
  original tag: ${orig?.persona || ''}
  rescore verdict: ${d.persona}`;
  }).join('\n');

  // Borderline pattern snippets: use disagreements' primary_text excerpts.
  const borderlineExamples = disagreements.slice(0, 3).map((d) => {
    const ad = allAds.find((a) => a.ad_id === d.ad_id);
    return `"${(ad?.primary_text || '').slice(0, 200)}"`;
  }).join('\n');

  return `You previously classified ${nTagged} ads against persona "${persona}" — "${pain}".
A fresh audit found ${disagreements.length} disagreements out of ${nRescored} rescored. Here are the ${disagreements.length} disagreements:
${disagreementBlocks}

Re-classify the full set of ads originally tagged to "${persona}", prioritizing:
  (1) the persona's specific pain language — ${keywords}
  (2) these borderline patterns that caused disagreement —
${borderlineExamples}

Return JSON array: [{"ad_id": "...", "persona": "...", "angle": "...", "format": "..."}, ...]`;
}

async function validatePersona(persona, personaClassifications, allAds, taxonomy, opts, rng) {
  const nTagged = personaClassifications.length;

  // Sparse-persona fallback (§9).
  if (nTagged < 5) {
    return {
      persona,
      n_tagged: nTagged,
      n_rescored: 0,
      agreements: null,
      precision: null,
      status: 'skipped-insufficient-volume',
      banner: `precision not measured — insufficient ad volume (<5 ads) for persona "${persona}"`,
    };
  }

  const sampleSize = nTagged >= 20 ? opts.sampleSize : nTagged;
  const idsSample = sampleN(personaClassifications.map((c) => c.ad_id), sampleSize, rng);
  const adsSample = allAds.filter((a) => idsSample.includes(a.ad_id));

  let rescores = await rescoreBatch(adsSample, taxonomy, opts);
  let agreements = rescores.filter((r) => r.persona === persona).length;
  let precision = agreements / rescores.length;

  let retried = false;
  let banner = null;

  if (precision < opts.precisionThreshold) {
    // Retry once per §9.
    retried = true;
    const disagreements = rescores.filter((r) => r.persona !== persona);
    const retryPrompt = buildRetryPrompt(persona, disagreements, taxonomy, nTagged, rescores.length, allAds, personaClassifications);
    if (!opts.mock) {
      const retryResp = await withBackoff(() => geminiJSON(retryPrompt, { model: opts.model }), opts.maxRetries);
      if (Array.isArray(retryResp)) {
        // Use retry as the new "rescore"; recompute agreement among sampled ids.
        const retryById = new Map(retryResp.map((r) => [r.ad_id, r]));
        const merged = adsSample.map((a) => retryById.get(a.ad_id) || {
          ad_id: a.ad_id, persona: rescores.find((r) => r.ad_id === a.ad_id)?.persona || 'UNKNOWN',
        });
        rescores = merged;
        agreements = rescores.filter((r) => r.persona === persona).length;
        precision = agreements / rescores.length;
      }
    }
    // In mock mode the retry is a no-op; precision is what it was.
    if (precision < opts.precisionThreshold) {
      banner = `ad classification precision below ${Math.round(opts.precisionThreshold * 100)}% on "${persona}" after retry (${Math.round(precision * 100)}%). Pillars for this persona are directional only.`;
    }
  }

  if (nTagged < 20 && precision >= opts.precisionThreshold) {
    banner = `precision measured on small-N sample (n=${nTagged}) for persona "${persona}" — noise-flagged.`;
  }

  return {
    persona,
    n_tagged: nTagged,
    n_rescored: rescores.length,
    agreements,
    precision: Math.round(precision * 1000) / 1000,
    status: retried
      ? (precision >= opts.precisionThreshold ? 'pass-after-retry' : 'fail')
      : (precision >= opts.precisionThreshold ? 'pass' : 'fail'),
    banner,
  };
}

async function runValidate(classifications, allAds, taxonomy, opts) {
  const rng = makeRng(opts.seed);
  const personasPresent = new Map();
  for (const c of classifications) {
    if (!personasPresent.has(c.persona)) personasPresent.set(c.persona, []);
    personasPresent.get(c.persona).push(c);
  }
  // Also include personas from the taxonomy that had zero ads — emit ad_count=0 records later.
  const taxonomyNames = new Set(taxonomy.map((p) => p.name));
  for (const name of taxonomyNames) {
    if (!personasPresent.has(name)) personasPresent.set(name, []);
  }

  const per_persona = [];
  for (const [persona, personaClasses] of personasPresent) {
    console.log(`[ad-classifier] validate: persona="${persona}" n_tagged=${personaClasses.length}`);
    const res = await validatePersona(persona, personaClasses, allAds, taxonomy, opts, rng);
    per_persona.push(res);
  }
  const banner_flags = per_persona.map((r) => r.banner).filter(Boolean);
  return { per_persona, banner_flags };
}

// ============================================================================
// MAIN
// ============================================================================

async function run(args) {
  if (!args.ads || !args.personas || !args.output) {
    printHelp();
    throw new Error('--ads, --personas, --output are required.');
  }

  const adsObj = await fs.readJson(args.ads);
  const ads = Array.isArray(adsObj) ? adsObj : (adsObj.ads || []);
  if (!ads.length) throw new Error(`No ads found in ${args.ads}.`);
  console.log(`[ad-classifier] loaded ${ads.length} ads from ${args.ads}`);

  const personasObj = await fs.readJson(args.personas);
  const taxonomy = loadPersonaTaxonomy(personasObj);
  console.log(`[ad-classifier] taxonomy: ${taxonomy.length} personas`);

  const meta = {
    started_at: new Date().toISOString(),
    stages_run: [],
    mock: args.mock,
    model: args.mock ? 'mock' : args.model,
  };

  // Allow an existing output file as a resume point for --stage dedup | validate.
  let state = { ads: [], angle_clusters: {}, validation: null, meta };
  if (args.stage !== 'classify' && args.stage !== 'all' && await fs.pathExists(args.output)) {
    try {
      const prev = await fs.readJson(args.output);
      state = {
        ads: prev.ads || [],
        angle_clusters: prev.angle_clusters || {},
        validation: prev.validation || null,
        meta,
      };
      console.log(`[ad-classifier] resumed from ${args.output} (${state.ads.length} prior classifications)`);
    } catch { /* fall through */ }
  }

  if (args.stage === 'classify' || args.stage === 'all') {
    const classifications = await runClassify(ads, taxonomy, args);
    state.ads = classifications;
    meta.stages_run.push('classify');
  }

  if (args.stage === 'dedup' || args.stage === 'all') {
    const uniqueAngles = Array.from(new Set(state.ads.map((a) => a.angle).filter(Boolean)));
    console.log(`[ad-classifier] dedup: ${uniqueAngles.length} unique angle strings`);
    const clusters = await dedupAngles(uniqueAngles, args);
    const { classifications: rewritten, rawToCanon } = rewriteAngles(state.ads, clusters);
    state.ads = rewritten;
    state.angle_clusters = Object.fromEntries(rawToCanon);
    meta.stages_run.push('dedup');
  }

  if (args.stage === 'validate' || args.stage === 'all') {
    const v = await runValidate(state.ads, ads, taxonomy, args);
    state.validation = v;
    meta.stages_run.push('validate');
  }

  state.meta = meta;

  await fs.writeJson(args.output, state, { spaces: 2 });
  console.log(`[ad-classifier] wrote ${args.output}`);

  if (state.validation && state.validation.banner_flags.length) {
    console.log('\n[ad-classifier] banner flags:');
    for (const b of state.validation.banner_flags) console.log(`  - ${b}`);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = parseArgs(process.argv.slice(2));
  run(args).catch((e) => {
    console.error(`[ad-classifier] fatal: ${e.stack || e.message}`);
    process.exit(1);
  });
}

export {
  loadPersonaTaxonomy,
  adFullText,
  chunk,
  isTransientError,
  withBackoff,
  mockClassifyBatch,
  mockDedupAngles,
  mockRescoreBatch,
  rewriteAngles,
  runClassify,
  dedupAngles,
  runValidate,
  validatePersona,
  makeRng,
  sampleN,
  buildClassifyPrompt,
  buildDedupPrompt,
  buildValidatePrompt,
  buildRetryPrompt,
};
