#!/usr/bin/env node

/**
 * ============================================================================
 * FLATTEN-APIFY — Apify Meta Ad Library output → flat classifier input
 * ============================================================================
 *
 * Phase 1c bridge for the Brand Research pipeline (proposal v5.2, §5.5 + §9).
 *
 * /ad-library (Apify actor `curious_coder~facebook-ads-library-scraper`) writes
 * a nested ads-raw.json where each ad looks roughly like:
 *
 *   { ad_archive_id, start_date_formatted, snapshot: { body:{text}, title,
 *     link_description, caption, cta_text, display_format, cards[], ... } }
 *
 * ad-classifier/classify.js expects a flat ad object with fields:
 *
 *   { ad_id, primary_text, headline, description, on_image_text, caption,
 *     ad_format, first_seen }
 *
 * This utility reads the Apify JSON and writes the flat schema so the
 * orchestrator can hand the result straight to classify.js.
 *
 * FIELD MAPPING
 *   ad_id         ← ad_archive_id  (top-level `ad_id` is null in Apify output)
 *   primary_text  ← snapshot.body.text  (+ cards[].body joined with \n\n---\n\n)
 *   headline      ← snapshot.title       (falls back to first card title)
 *   description   ← snapshot.link_description (falls back to first card)
 *   on_image_text ← ""  (Apify does not OCR images; --no-media skips media too)
 *   caption       ← ""  (snapshot.caption is the link domain, not a video
 *                        caption — classifier's `caption` is the channel below
 *                        the video, which Apify doesn't expose separately)
 *   ad_format     ← display_format lowercased; "dco" with ≥2 cards → "carousel"
 *   first_seen    ← start_date_formatted[:10]  (fallback: epoch from start_date)
 *
 * USAGE
 *   node flatten-apify.js \
 *     --input  path/to/ads-raw.json \
 *     --output path/to/ad-library-raw.json
 *
 * ============================================================================
 */

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================================================
// ARGS
// ============================================================================

function parseArgs(argv) {
  const a = { input: null, output: null };
  for (let i = 0; i < argv.length; i++) {
    const t = argv[i];
    if (t === '--input') a.input = argv[++i];
    else if (t === '--output') a.output = argv[++i];
    else if (t === '--help' || t === '-h') {
      printHelp();
      process.exit(0);
    }
  }
  return a;
}

function printHelp() {
  console.log(`flatten-apify

Usage:
  node flatten-apify.js --input ads-raw.json --output ad-library-raw.json

Reads Apify Meta Ad Library JSON and emits the flat schema expected by
ad-classifier/classify.js. See header for field mapping.
`);
}

// ============================================================================
// MAPPING
// ============================================================================

function formatFromApify(snapshot) {
  const raw = (snapshot?.display_format || '').toString().toLowerCase();
  const cards = Array.isArray(snapshot?.cards) ? snapshot.cards : [];
  if (raw === 'dco' && cards.length >= 2) return 'carousel';
  return raw || 'unknown';
}

function firstSeenFromApify(ad) {
  const f = ad?.start_date_formatted;
  if (typeof f === 'string' && f.length >= 10) return f.slice(0, 10);
  const epoch = Number(ad?.start_date);
  if (Number.isFinite(epoch) && epoch > 0) {
    const d = new Date(epoch * 1000);
    if (!Number.isNaN(d.getTime())) return d.toISOString().slice(0, 10);
  }
  return null;
}

function primaryTextFromApify(snapshot) {
  const parts = [];
  const body = snapshot?.body?.text;
  if (body && body.trim()) parts.push(body.trim());
  const cards = Array.isArray(snapshot?.cards) ? snapshot.cards : [];
  for (const c of cards) {
    const t = (c?.body || '').trim();
    if (t && !parts.includes(t)) parts.push(t);
  }
  return parts.join('\n\n---\n\n');
}

function headlineFromApify(snapshot) {
  if (snapshot?.title && snapshot.title.trim()) return snapshot.title.trim();
  const cards = Array.isArray(snapshot?.cards) ? snapshot.cards : [];
  for (const c of cards) {
    if (c?.title && String(c.title).trim()) return String(c.title).trim();
  }
  return '';
}

function descriptionFromApify(snapshot) {
  if (snapshot?.link_description && String(snapshot.link_description).trim()) {
    return String(snapshot.link_description).trim();
  }
  const cards = Array.isArray(snapshot?.cards) ? snapshot.cards : [];
  for (const c of cards) {
    if (c?.link_description && String(c.link_description).trim()) {
      return String(c.link_description).trim();
    }
  }
  return '';
}

function flattenOne(ad) {
  const snapshot = ad?.snapshot || {};
  return {
    ad_id: String(ad?.ad_archive_id || ad?.ad_id || ''),
    primary_text: primaryTextFromApify(snapshot),
    headline: headlineFromApify(snapshot),
    description: descriptionFromApify(snapshot),
    on_image_text: '',
    caption: '',
    ad_format: formatFromApify(snapshot),
    first_seen: firstSeenFromApify(ad),
  };
}

function flattenAll(apifyAds) {
  const out = [];
  const seen = new Set();
  for (const ad of apifyAds) {
    const flat = flattenOne(ad);
    if (!flat.ad_id) continue;
    if (seen.has(flat.ad_id)) continue;
    seen.add(flat.ad_id);
    out.push(flat);
  }
  return out;
}

// ============================================================================
// MAIN
// ============================================================================

async function run(args) {
  if (!args.input || !args.output) {
    printHelp();
    throw new Error('--input and --output are required.');
  }

  const apifyAds = await fs.readJson(args.input);
  if (!Array.isArray(apifyAds)) {
    throw new Error(`Input ${args.input} is not a JSON array.`);
  }
  console.log(`[flatten-apify] loaded ${apifyAds.length} Apify ads from ${args.input}`);

  const flat = flattenAll(apifyAds);
  await fs.ensureDir(path.dirname(args.output));
  await fs.writeJson(args.output, flat, { spaces: 2 });
  console.log(`[flatten-apify] wrote ${flat.length} flat ads → ${args.output}`);

  const byFormat = flat.reduce((m, a) => ((m[a.ad_format] = (m[a.ad_format] || 0) + 1), m), {});
  const withBody = flat.filter((a) => a.primary_text).length;
  const withHeadline = flat.filter((a) => a.headline).length;
  console.log(`[flatten-apify] formats: ${JSON.stringify(byFormat)}`);
  console.log(`[flatten-apify] with primary_text: ${withBody}/${flat.length}   with headline: ${withHeadline}/${flat.length}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = parseArgs(process.argv.slice(2));
  run(args).catch((e) => {
    console.error(`[flatten-apify] fatal: ${e.stack || e.message}`);
    process.exit(1);
  });
}

export {
  flattenOne,
  flattenAll,
  formatFromApify,
  firstSeenFromApify,
  primaryTextFromApify,
  headlineFromApify,
  descriptionFromApify,
};
