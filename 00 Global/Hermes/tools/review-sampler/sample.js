#!/usr/bin/env node

/**
 * ============================================================================
 * REVIEW-SAMPLER — Stratified + persona-segmented review sampling
 * ============================================================================
 *
 * Phase 2c Step 1 (pre-lock stratified sample → Review Analysis Appendix A)
 * and Phase 4a persona-segmented sampling (post-lock → Appendix B).
 * Proposal v5.2, §7.2 Step 1 and §10.5 Appendices.
 *
 * MODES
 *   stratified         Pre-lock. Pull ~500 reviews across 5 strata with a
 *                      deterministic seed. Outputs Appendix A Markdown.
 *                      Small-corpus fallback: <100 = full corpus (no
 *                      stratification); 100–499 = partition all reviews across
 *                      5 strata; ≥500 = per the §7.2 table.
 *   persona-segmented  Post-lock. Up to ~40 reviews per persona: mix of
 *                      longest / 1–3★ / 4–5★ / multi-tag. Personas in
 *                      descending frequency. Personas with <40 tagged reviews
 *                      are emitted as "Full population — no sampling."
 *                      Outputs Appendix B Markdown.
 *
 * CONTEXT HANDLING (§7.2 Step 2)
 *   If the estimated token count of the stratified sample exceeds
 *   --truncate-threshold (default 150k), each review body is truncated to
 *   --truncate-words (default 600) with a "[truncated]" tag appended. Sample
 *   size is never reduced below 500 just to fit context.
 *
 * USAGE
 *   node sample.js --input reviews.jsonl --mode stratified --output appendix-a.md
 *   node sample.js --input reviews.jsonl --mode persona-segmented --output appendix-b.md
 *
 * FLAGS
 *   --input <path>            Required. reviews.jsonl.
 *   --mode <m>                Required. stratified | persona-segmented.
 *   --output <path>           Required. Markdown destination.
 *   --seed <n>                Default 42. Deterministic seed for RNG.
 *   --sample-size <n>         Default 500 (stratified).
 *   --per-persona <n>         Default 40 (persona-segmented).
 *   --truncate-threshold <n>  Default 150000 tokens.
 *   --truncate-words <n>      Default 600.
 *
 * INPUT SCHEMA (reviews.jsonl — fixed by /review-scraper, §5.1 rule 3):
 *   review_id, author_name, rating, title, body, date, verified_buyer,
 *   product_title, source_url, scraped_at [, personas: string[]  (post-lock)]
 *
 * ============================================================================
 */

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================================================
// ARG PARSING
// ============================================================================

function parseArgs(argv) {
  const args = {
    input: null,
    mode: null,
    output: null,
    seed: 42,
    sampleSize: 500,
    perPersona: 40,
    truncateThreshold: 150000,
    truncateWords: 600,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--input') args.input = argv[++i];
    else if (a === '--mode') args.mode = argv[++i];
    else if (a === '--output') args.output = argv[++i];
    else if (a === '--seed') args.seed = parseInt(argv[++i], 10);
    else if (a === '--sample-size') args.sampleSize = parseInt(argv[++i], 10);
    else if (a === '--per-persona') args.perPersona = parseInt(argv[++i], 10);
    else if (a === '--truncate-threshold') args.truncateThreshold = parseInt(argv[++i], 10);
    else if (a === '--truncate-words') args.truncateWords = parseInt(argv[++i], 10);
    else if (a === '--help' || a === '-h') {
      printHelp();
      process.exit(0);
    }
  }
  return args;
}

function printHelp() {
  console.log(`review-sampler

Usage:
  node sample.js --input <reviews.jsonl> --mode <stratified|persona-segmented> --output <file.md>

See header for full flag reference.
`);
}

// ============================================================================
// DETERMINISTIC RNG (mulberry32) — same seed → same sample.
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
// JSONL LOADING
// ============================================================================

async function loadJsonl(filepath) {
  const raw = await fs.readFile(filepath, 'utf8');
  const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    try {
      out.push(JSON.parse(lines[i]));
    } catch (e) {
      console.warn(`[review-sampler] skipping malformed line ${i + 1}: ${e.message}`);
    }
  }
  return out;
}

// ============================================================================
// STRATIFICATION (§7.2 Step 1 table)
// ============================================================================

const STRATA = [
  { key: 'longest', label: 'Longest reviews', size: 100 },
  { key: 'random_5', label: 'Random 5★', size: 100 },
  { key: 'random_1_2', label: 'Random 1–2★', size: 100 },
  { key: 'random_3_4', label: 'Random 3–4★', size: 100 },
  { key: 'random_all', label: 'Random across all', size: 100 },
];

function bodyLen(r) {
  return (r.body || '').length;
}

function stratumFilter(key) {
  switch (key) {
    case 'longest': return () => true; // sorted by length later
    case 'random_5': return (r) => Number(r.rating) === 5;
    case 'random_1_2': return (r) => Number(r.rating) <= 2;
    case 'random_3_4': return (r) => Number(r.rating) === 3 || Number(r.rating) === 4;
    case 'random_all': return () => true;
    default: return () => true;
  }
}

/**
 * Stratified sample.
 *
 * Corpus <100  → full corpus; no stratification; one "Full corpus" block.
 * Corpus 100–499 → all reviews partitioned across 5 strata; floor 10 per
 *                  stratum unless that rating bucket is empty.
 * Corpus ≥500  → §7.2 table (100 per stratum).
 *
 * `longest` is always deterministic (sort by length desc, then review_id for
 * tie-break). Random strata use the seeded RNG.
 */
function stratifiedSample(reviews, sampleSize, rng) {
  const N = reviews.length;
  const picked = [];
  const pickedIds = new Set();

  const addMany = (items, stratumKey) => {
    for (const r of items) {
      if (!r.review_id || pickedIds.has(r.review_id)) continue;
      pickedIds.add(r.review_id);
      picked.push({ review: r, stratum: stratumKey });
    }
  };

  // Small-corpus paths.
  if (N < 100) {
    addMany(reviews, 'full_corpus');
    return { picked, note: 'Full corpus — no sampling (corpus <100).' };
  }

  if (N < sampleSize) {
    // 100–499: target 20% per stratum. Partition all reviews across 5 strata.
    const perStratum = Math.max(10, Math.ceil((N * 0.20)));
    const strataNotes = [];
    for (const s of STRATA) {
      const pool = reviews.filter(stratumFilter(s.key));
      if (pool.length === 0) {
        strataNotes.push(`- **${s.label}:** 0 reviews (bucket empty — noted as gap).`);
        continue;
      }
      const target = Math.min(perStratum, pool.length);
      const chosen = s.key === 'longest'
        ? pool.slice().sort((a, b) => bodyLen(b) - bodyLen(a) || String(a.review_id).localeCompare(String(b.review_id))).slice(0, target)
        : sampleN(pool, target, rng);
      addMany(chosen, s.key);
    }
    return {
      picked,
      note: `Small corpus (${N} reviews). Partitioned across 5 strata; floor 10 per stratum. Target ≈20% per stratum.`,
      strataNotes,
    };
  }

  // Standard path: 100 per stratum.
  for (const s of STRATA) {
    const pool = reviews.filter(stratumFilter(s.key));
    const target = Math.min(s.size, pool.length);
    const chosen = s.key === 'longest'
      ? pool.slice().sort((a, b) => bodyLen(b) - bodyLen(a) || String(a.review_id).localeCompare(String(b.review_id))).slice(0, target)
      : sampleN(pool, target, rng);
    addMany(chosen, s.key);
  }
  return {
    picked,
    note: `Standard stratified sample (${N} reviews in corpus).`,
  };
}

// ============================================================================
// CONTEXT TRUNCATION (§7.2 Step 2)
// ============================================================================

// Rough tokens ≈ chars / 4 for English.
function estimateTokens(text) {
  return Math.ceil(text.length / 4);
}

function truncateToWords(text, maxWords) {
  const words = text.split(/\s+/);
  if (words.length <= maxWords) return { text, truncated: false };
  return { text: words.slice(0, maxWords).join(' ') + ' [truncated]', truncated: true };
}

function applyContextTruncation(picked, thresholdTokens, maxWords) {
  let total = 0;
  for (const p of picked) total += estimateTokens(p.review.body || '');
  if (total <= thresholdTokens) {
    return { picked, truncated: 0, totalTokens: total };
  }
  let truncCount = 0;
  const out = picked.map((p) => {
    const { text, truncated } = truncateToWords(p.review.body || '', maxWords);
    if (truncated) truncCount++;
    return { ...p, review: { ...p.review, body: text, _truncated: truncated } };
  });
  let newTotal = 0;
  for (const p of out) newTotal += estimateTokens(p.review.body || '');
  return { picked: out, truncated: truncCount, totalTokens: newTotal };
}

// ============================================================================
// PERSONA-SEGMENTED SAMPLING (§10.5 Appendix B)
// ============================================================================

function groupByPersona(reviews) {
  const byPersona = new Map();
  const untagged = [];
  for (const r of reviews) {
    const personas = Array.isArray(r.personas) ? r.personas : [];
    if (personas.length === 0) {
      untagged.push(r);
      continue;
    }
    for (const p of personas) {
      if (!byPersona.has(p)) byPersona.set(p, []);
      byPersona.get(p).push(r);
    }
  }
  return { byPersona, untagged };
}

/**
 * For a persona: mix of longest / 1–3★ / 4–5★ / multi-tag.
 * Target ~40. If tagged pool <target, emit all with "Full population" note.
 */
function personaSegmentedSample(reviewsForPersona, target, rng) {
  if (reviewsForPersona.length <= target) {
    return { picks: reviewsForPersona.slice(), fullPopulation: true };
  }
  const pick = new Map(); // review_id -> review
  const add = (arr) => {
    for (const r of arr) {
      if (!r.review_id || pick.has(r.review_id)) continue;
      pick.set(r.review_id, r);
      if (pick.size >= target) return;
    }
  };

  const quota = Math.ceil(target / 4);

  // Longest (deterministic).
  const longest = reviewsForPersona
    .slice()
    .sort((a, b) => bodyLen(b) - bodyLen(a) || String(a.review_id).localeCompare(String(b.review_id)))
    .slice(0, quota);
  add(longest);

  const rtg = (r) => Number(r.rating);
  const lowStar = reviewsForPersona.filter((r) => rtg(r) >= 1 && rtg(r) <= 3);
  const highStar = reviewsForPersona.filter((r) => rtg(r) >= 4 && rtg(r) <= 5);
  const multiTag = reviewsForPersona.filter((r) => Array.isArray(r.personas) && r.personas.length > 1);

  add(sampleN(lowStar, quota, rng));
  add(sampleN(highStar, quota, rng));
  add(sampleN(multiTag, quota, rng));

  // Backfill with remaining random if short of target.
  if (pick.size < target) {
    const remaining = reviewsForPersona.filter((r) => !pick.has(r.review_id));
    add(sampleN(remaining, target - pick.size, rng));
  }

  return { picks: Array.from(pick.values()), fullPopulation: false };
}

// ============================================================================
// MARKDOWN RENDERING
// ============================================================================

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/\r/g, '')
    .replace(/\|/g, '\\|');
}

function renderReviewBlock(review, index) {
  const lines = [];
  lines.push(`**${index}. ${review.title || '(no title)'} — ${review.rating || '?'}★**`);
  const meta = [];
  if (review.author_name) meta.push(`_${review.author_name}_`);
  if (review.date) meta.push(review.date);
  if (review.verified_buyer != null) meta.push(review.verified_buyer ? 'verified' : 'unverified');
  if (review.review_id) meta.push(`\`${review.review_id}\``);
  if (meta.length) lines.push(meta.join(' • '));
  lines.push('');
  lines.push(review.body || '(no body)');
  if (review.source_url) {
    lines.push('');
    lines.push(`[source](${review.source_url})`);
  }
  lines.push('');
  return lines.join('\n');
}

function renderStratifiedAppendix(result, input, config) {
  const strataMap = new Map();
  for (const p of result.picked) {
    if (!strataMap.has(p.stratum)) strataMap.set(p.stratum, []);
    strataMap.get(p.stratum).push(p.review);
  }

  const order = STRATA.map((s) => s.key).concat(['full_corpus']);
  const ordered = order.filter((k) => strataMap.has(k));

  const stratumLabel = (key) => {
    const found = STRATA.find((s) => s.key === key);
    return found ? found.label : 'Full corpus';
  };

  const parts = [];
  parts.push(`# Appendix A — Stratified Sample (pre-lock)\n`);
  parts.push(`> Generated by \`review-sampler\` on ${new Date().toISOString()}.`);
  parts.push(`> Input: \`${input}\``);
  parts.push(`> Seed: ${config.seed}. Deterministic — re-runs with the same seed produce the same sample.`);
  parts.push(`> ${result.note}`);
  if (result.strataNotes && result.strataNotes.length) {
    parts.push('');
    parts.push(result.strataNotes.join('\n'));
  }
  if (result.contextInfo) {
    parts.push(`> Context handling: ${result.contextInfo}`);
  }
  parts.push('');
  parts.push(`**Total reviews sampled:** ${result.picked.length}`);
  parts.push('');

  for (const key of ordered) {
    const items = strataMap.get(key) || [];
    parts.push(`## ${stratumLabel(key)} (${items.length})\n`);
    items.forEach((r, i) => {
      parts.push(renderReviewBlock(r, i + 1));
    });
  }

  return parts.join('\n');
}

function renderPersonaSegmentedAppendix(personaBlocks, input, config) {
  const parts = [];
  parts.push(`# Appendix B — Persona-Segmented Sample (post-lock)\n`);
  parts.push(`> Generated by \`review-sampler\` on ${new Date().toISOString()}.`);
  parts.push(`> Input: \`${input}\``);
  parts.push(`> Seed: ${config.seed}. Target per persona: ${config.perPersona}.`);
  parts.push(`> Personas in descending frequency. Personas with ≤${config.perPersona} tagged reviews are full-population.`);
  parts.push('');

  for (const block of personaBlocks) {
    parts.push(`## ${block.persona} (${block.total} tagged reviews)`);
    if (block.fullPopulation) {
      parts.push(`> Full population — no sampling.`);
    } else {
      parts.push(`> Sampled ${block.picks.length} of ${block.total} (mix of longest / 1–3★ / 4–5★ / multi-tag).`);
    }
    parts.push('');
    block.picks.forEach((r, i) => parts.push(renderReviewBlock(r, i + 1)));
  }
  return parts.join('\n');
}

// ============================================================================
// MAIN
// ============================================================================

async function run(args) {
  if (!args.input || !args.mode || !args.output) {
    printHelp();
    throw new Error('--input, --mode, and --output are required.');
  }

  const reviews = await loadJsonl(args.input);
  console.log(`[review-sampler] loaded ${reviews.length} reviews from ${args.input}`);

  const rng = makeRng(args.seed);

  if (args.mode === 'stratified') {
    const sampled = stratifiedSample(reviews, args.sampleSize, rng);

    const truncation = applyContextTruncation(sampled.picked, args.truncateThreshold, args.truncateWords);
    if (truncation.truncated > 0) {
      sampled.contextInfo = `${truncation.truncated} reviews truncated to ${args.truncateWords} words each (sample estimated >${args.truncateThreshold} tokens before truncation).`;
      console.log(`[review-sampler] context-handling: truncated ${truncation.truncated} review bodies to ${args.truncateWords} words.`);
    }
    sampled.picked = truncation.picked;

    const md = renderStratifiedAppendix(sampled, args.input, args);
    await fs.writeFile(args.output, md, 'utf8');
    console.log(`[review-sampler] wrote stratified appendix: ${args.output} (${sampled.picked.length} reviews)`);
    return;
  }

  if (args.mode === 'persona-segmented') {
    const { byPersona } = groupByPersona(reviews);
    // Descending frequency.
    const sortedPersonas = Array.from(byPersona.entries()).sort((a, b) => b[1].length - a[1].length);
    const blocks = [];
    for (const [persona, pool] of sortedPersonas) {
      const { picks, fullPopulation } = personaSegmentedSample(pool, args.perPersona, rng);
      blocks.push({
        persona,
        total: pool.length,
        picks,
        fullPopulation,
      });
    }
    const md = renderPersonaSegmentedAppendix(blocks, args.input, args);
    await fs.writeFile(args.output, md, 'utf8');
    console.log(`[review-sampler] wrote persona-segmented appendix: ${args.output} (${blocks.length} personas)`);
    return;
  }

  throw new Error(`Unknown --mode: ${args.mode}. Use stratified or persona-segmented.`);
}

// CLI entry.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = parseArgs(process.argv.slice(2));
  run(args).catch((e) => {
    console.error(`[review-sampler] fatal: ${e.stack || e.message}`);
    process.exit(1);
  });
}

export {
  makeRng,
  shuffle,
  sampleN,
  stratifiedSample,
  personaSegmentedSample,
  groupByPersona,
  applyContextTruncation,
  estimateTokens,
  truncateToWords,
  loadJsonl,
  STRATA,
  bodyLen,
};
