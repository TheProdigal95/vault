#!/usr/bin/env node

/**
 * ============================================================================
 * PERSONA-COUNTER — Dictionary-driven full-corpus persona classification
 * ============================================================================
 *
 * Phase 2c Step 4 of the Brand Research pipeline (proposal v5.2, §7.2).
 *
 * Applies a persona-dictionary.json (case-insensitive regex per persona) to
 * every review in reviews.jsonl. Persists `personas: [...]` on each review
 * (downstream Phase 3a/3b consumers read this field). Writes a machine-
 * readable report with:
 *   - Full frequency table: Persona | Reviews Matched | % of Reviews | Avg Rating
 *   - Multi-Persona Overlap top 20 (ideal-customer signal)
 *   - Untagged residual %
 *   - Borderlines (reviews matching only 1 keyword per persona — seeds Step 5)
 *
 * HALT BEHAVIOR:
 *   If untagged > --halt-threshold (default 0.5), the tool still writes the
 *   tagged JSONL + report but exits non-zero with a HALT message. The
 *   orchestrator is expected to detect the non-zero exit and auto-loop to
 *   Step 3 dictionary revision (§7.2 Step 4). The shared 2-iteration budget
 *   is tracked by the orchestrator, not by this tool.
 *
 * USAGE
 *   node count.js \
 *     --input   path/to/reviews.jsonl \
 *     --dictionary path/to/persona-dictionary.json \
 *     --output-jsonl path/to/reviews.jsonl.tagged \
 *     --output-report path/to/persona-counter-report.json \
 *     --since YYYY-MM-DD
 *
 * FLAGS
 *   --input <path>                Required.
 *   --dictionary <path>           Required.
 *   --output-jsonl <path>         Required. Tagged reviews (do NOT overwrite input
 *                                 in-place unless you pass --overwrite).
 *   --output-report <path>        Required. JSON report.
 *   --overwrite                   Write tagged JSONL over the input path.
 *   --halt-threshold <f>          Default 0.5. Untagged fraction that triggers
 *                                 a non-zero exit + HALT message.
 *   --since <YYYY-MM-DD>          Optional. Adds a report-only filtered frequency
 *                                 table for reviews dated on/after this date.
 *                                 Does not write a filtered JSONL.
 *   --min-recent-n <n>            Default 30. Minimum dated reviews in recent
 *                                 window before trend labels are trusted.
 *   --min-recent-persona-n <n>    Default 20. Minimum recent persona matches
 *                                 before that persona's trend is trusted.
 *
 * DICTIONARY FORMAT (persona-dictionary.json):
 *   {
 *     "The Pill Fatigue Simplifier": "pill|bottle|stack|simplif|replac",
 *     "The Gut Health Seeker": "gut|digest|bloat|bowel|ibs|probiotic"
 *   }
 *   Values are raw regex bodies; the tool compiles each as case-insensitive.
 *   Values may also be objects: {"pattern": "...", "flags": "i"} for custom flags.
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
  const a = {
    input: null,
    dictionary: null,
    outputJsonl: null,
    outputReport: null,
    overwrite: false,
    haltThreshold: 0.5,
    since: null,
    minRecentN: 30,
    minRecentPersonaN: 20,
  };
  for (let i = 0; i < argv.length; i++) {
    const t = argv[i];
    if (t === '--input') a.input = argv[++i];
    else if (t === '--dictionary') a.dictionary = argv[++i];
    else if (t === '--output-jsonl') a.outputJsonl = argv[++i];
    else if (t === '--output-report') a.outputReport = argv[++i];
    else if (t === '--overwrite') a.overwrite = true;
    else if (t === '--halt-threshold') a.haltThreshold = parseFloat(argv[++i]);
    else if (t === '--since') a.since = argv[++i];
    else if (t === '--min-recent-n') a.minRecentN = parseInt(argv[++i], 10);
    else if (t === '--min-recent-persona-n') a.minRecentPersonaN = parseInt(argv[++i], 10);
    else if (t === '--help' || t === '-h') {
      printHelp();
      process.exit(0);
    }
  }
  return a;
}

function printHelp() {
  console.log(`persona-counter

Usage:
  node count.js --input reviews.jsonl --dictionary persona-dictionary.json \\
    --output-jsonl reviews.tagged.jsonl --output-report report.json

See header for full flag reference.
`);
}

// ============================================================================
// DICTIONARY COMPILATION
// ============================================================================

function compileDictionary(dict) {
  const out = [];
  for (const [persona, val] of Object.entries(dict)) {
    let pattern, flags = 'i';
    if (typeof val === 'string') {
      pattern = val;
    } else if (val && typeof val === 'object' && typeof val.pattern === 'string') {
      pattern = val.pattern;
      if (typeof val.flags === 'string') flags = val.flags;
    } else {
      throw new Error(`Dictionary entry for "${persona}" must be a string or {pattern, flags}.`);
    }
    let re;
    try {
      re = new RegExp(pattern, flags);
    } catch (e) {
      throw new Error(`Invalid regex for "${persona}": ${e.message}`);
    }
    // Also compute a global version for match-count (borderline detection).
    const reGlobal = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g');
    out.push({ persona, re, reGlobal, pattern });
  }
  return out;
}

// ============================================================================
// CLASSIFICATION
// ============================================================================

function classifyOne(review, compiled) {
  const haystack = `${review.title || ''}\n${review.body || ''}`;
  const hits = [];
  const borderline = new Set();
  for (const { persona, re, reGlobal } of compiled) {
    if (re.test(haystack)) {
      hits.push(persona);
      // Borderline = matched only one distinct keyword occurrence.
      const matches = haystack.match(reGlobal) || [];
      const distinct = new Set(matches.map((m) => m.toLowerCase())).size;
      if (distinct === 1) borderline.add(persona);
    }
  }
  return { personas: hits, borderline: Array.from(borderline) };
}

function classifyAll(reviews, compiled) {
  const tagged = [];
  for (const r of reviews) {
    const { personas, borderline } = classifyOne(r, compiled);
    const out = { ...r, personas };
    tagged.push({ review: out, borderline });
  }
  return tagged;
}

// ============================================================================
// REPORT CALCULATION
// ============================================================================

function round(x, n = 1) {
  const m = Math.pow(10, n);
  return Math.round(x * m) / m;
}

function calcReport(tagged) {
  const total = tagged.length;
  const personaCounts = new Map();
  const personaRatingSums = new Map();
  const personaRatingCounts = new Map();
  const overlaps = new Map();
  const borderlineByPersona = new Map();
  let untagged = 0;

  for (const { review, borderline } of tagged) {
    const personas = review.personas || [];
    if (personas.length === 0) untagged++;
    for (const p of personas) {
      personaCounts.set(p, (personaCounts.get(p) || 0) + 1);
      const r = Number(review.rating);
      if (!Number.isNaN(r)) {
        personaRatingSums.set(p, (personaRatingSums.get(p) || 0) + r);
        personaRatingCounts.set(p, (personaRatingCounts.get(p) || 0) + 1);
      }
    }
    if (personas.length >= 2) {
      const key = personas.slice().sort().join(' + ');
      overlaps.set(key, (overlaps.get(key) || 0) + 1);
    }
    for (const p of borderline) {
      if (!borderlineByPersona.has(p)) borderlineByPersona.set(p, []);
      borderlineByPersona.get(p).push(review.review_id);
    }
  }

  const frequencyTable = Array.from(personaCounts.entries())
    .map(([persona, count]) => {
      const ratingSum = personaRatingSums.get(persona) || 0;
      const ratingCount = personaRatingCounts.get(persona) || 0;
      const avgRating = ratingCount > 0 ? round(ratingSum / ratingCount, 2) : null;
      return {
        persona,
        reviews_matched: count,
        percent_of_reviews: total > 0 ? round((count / total) * 100, 1) : 0,
        avg_rating: avgRating,
      };
    })
    .sort((a, b) => b.reviews_matched - a.reviews_matched);

  const overlapTop20 = Array.from(overlaps.entries())
    .map(([combo, count]) => ({ combo, count, percent_of_reviews: round((count / total) * 100, 1) }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20);

  const untaggedPct = total > 0 ? round((untagged / total) * 100, 1) : 0;

  return {
    total_reviews: total,
    frequency_table: frequencyTable,
    multi_persona_overlap_top20: overlapTop20,
    untagged: {
      count: untagged,
      percent_of_reviews: untaggedPct,
    },
    borderlines: Object.fromEntries(borderlineByPersona),
  };
}

function parseReviewDate(value) {
  if (value === null || value === undefined || value === '') return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d;
}

function calcRecencyReport(tagged, since, options = {}) {
  const sinceDate = parseReviewDate(since);
  if (!sinceDate) throw new Error(`Invalid --since date "${since}". Expected YYYY-MM-DD.`);

  const minRecentN = Number.isFinite(options.minRecentN) ? options.minRecentN : 30;
  const minRecentPersonaN = Number.isFinite(options.minRecentPersonaN) ? options.minRecentPersonaN : 20;
  const trendThreshold = Number.isFinite(options.trendThreshold) ? options.trendThreshold : 5;

  const recentTagged = [];
  let missingOrInvalidDate = 0;
  for (const item of tagged) {
    const d = parseReviewDate(item.review.date);
    if (!d) {
      missingOrInvalidDate++;
      continue;
    }
    if (d >= sinceDate) recentTagged.push(item);
  }

  const fullReport = calcReport(tagged);
  const recentReport = calcReport(recentTagged);
  const fullByPersona = new Map(fullReport.frequency_table.map((row) => [row.persona, row]));
  const personaNames = new Set([
    ...fullReport.frequency_table.map((row) => row.persona),
    ...recentReport.frequency_table.map((row) => row.persona),
  ]);

  const frequencyTable = Array.from(personaNames).map((persona) => {
    const full = fullByPersona.get(persona) || { reviews_matched: 0, percent_of_reviews: 0, avg_rating: null };
    const recent = recentReport.frequency_table.find((row) => row.persona === persona) || {
      reviews_matched: 0,
      percent_of_reviews: 0,
      avg_rating: null,
    };
    const delta = round(recent.percent_of_reviews - full.percent_of_reviews, 1);
    let trend = 'Stable';
    let trend_basis = `Recent share changed ${delta} percentage points vs full corpus.`;
    if (recentReport.total_reviews < minRecentN || recent.reviews_matched < minRecentPersonaN) {
      trend = 'Insufficient recent sample';
      trend_basis = `Requires at least ${minRecentN} dated recent reviews and ${minRecentPersonaN} recent persona matches.`;
    } else if (delta >= trendThreshold) {
      trend = 'Growing';
    } else if (delta <= -trendThreshold) {
      trend = 'Declining';
    }
    return {
      persona,
      percent_all_reviews: full.percent_of_reviews,
      percent_recent_reviews: recent.percent_of_reviews,
      recent_reviews_matched: recent.reviews_matched,
      recent_avg_rating: recent.avg_rating,
      trend,
      trend_delta_percentage_points: delta,
      trend_basis,
    };
  }).sort((a, b) => b.recent_reviews_matched - a.recent_reviews_matched);

  return {
    since,
    min_recent_n: minRecentN,
    min_recent_persona_n: minRecentPersonaN,
    total_recent_reviews: recentReport.total_reviews,
    missing_or_invalid_date_count: missingOrInvalidDate,
    frequency_table: frequencyTable,
    filtered_frequency_table: recentReport.frequency_table,
    filtered_untagged: recentReport.untagged,
  };
}

// ============================================================================
// JSONL IO
// ============================================================================

async function loadJsonl(filepath) {
  const raw = await fs.readFile(filepath, 'utf8');
  const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
  return lines.map((l, i) => {
    try { return JSON.parse(l); }
    catch (e) {
      console.warn(`[persona-counter] skipping malformed line ${i + 1}: ${e.message}`);
      return null;
    }
  }).filter(Boolean);
}

async function writeJsonl(filepath, items) {
  const lines = items.map((o) => JSON.stringify(o));
  await fs.writeFile(filepath, lines.join('\n') + '\n', 'utf8');
}

// ============================================================================
// MAIN
// ============================================================================

async function run(args) {
  if (!args.input || !args.dictionary || !args.outputJsonl || !args.outputReport) {
    printHelp();
    throw new Error('--input, --dictionary, --output-jsonl, --output-report are all required.');
  }

  const reviews = await loadJsonl(args.input);
  console.log(`[persona-counter] loaded ${reviews.length} reviews from ${args.input}`);

  const dict = await fs.readJson(args.dictionary);
  const compiled = compileDictionary(dict);
  console.log(`[persona-counter] compiled ${compiled.length} personas from ${args.dictionary}`);

  const tagged = classifyAll(reviews, compiled);

  const outputPath = args.overwrite ? args.input : args.outputJsonl;
  await writeJsonl(outputPath, tagged.map((t) => t.review));
  console.log(`[persona-counter] wrote ${tagged.length} tagged reviews → ${outputPath}`);

  const report = calcReport(tagged);
  if (args.since) {
    report.recency = calcRecencyReport(tagged, args.since, {
      minRecentN: args.minRecentN,
      minRecentPersonaN: args.minRecentPersonaN,
    });
  }
  await fs.writeJson(args.outputReport, report, { spaces: 2 });
  console.log(`[persona-counter] wrote report → ${args.outputReport}`);

  // Print frequency table to stdout.
  console.log('\n[persona-counter] Frequency:');
  for (const row of report.frequency_table) {
    console.log(`  ${row.persona.padEnd(50)} ${String(row.reviews_matched).padStart(5)} (${row.percent_of_reviews}%) avg★ ${row.avg_rating ?? '—'}`);
  }
  console.log(`  untagged: ${report.untagged.count} (${report.untagged.percent_of_reviews}%)`);

  if (report.recency) {
    console.log(`\n[persona-counter] Frequency since ${report.recency.since}:`);
    for (const row of report.recency.frequency_table) {
      console.log(`  ${row.persona.padEnd(50)} ${String(row.recent_reviews_matched).padStart(5)} (${row.percent_recent_reviews}%) trend: ${row.trend}`);
    }
    console.log(`  recent window N: ${report.recency.total_recent_reviews}; missing/invalid dates: ${report.recency.missing_or_invalid_date_count}`);
  }

  const untaggedFraction = report.untagged.count / Math.max(1, tagged.length);
  if (untaggedFraction > args.haltThreshold) {
    console.error(`\n[persona-counter] HALT: untagged fraction ${round(untaggedFraction * 100, 1)}% > threshold ${round(args.haltThreshold * 100, 1)}%.`);
    console.error(`  Action: orchestrator should auto-loop to Step 3 (dictionary revision) within the shared 2-iteration budget.`);
    process.exit(2);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = parseArgs(process.argv.slice(2));
  run(args).catch((e) => {
    console.error(`[persona-counter] fatal: ${e.stack || e.message}`);
    process.exit(1);
  });
}

export {
  compileDictionary,
  classifyOne,
  classifyAll,
  calcReport,
  calcRecencyReport,
  parseReviewDate,
  loadJsonl,
  writeJsonl,
};
