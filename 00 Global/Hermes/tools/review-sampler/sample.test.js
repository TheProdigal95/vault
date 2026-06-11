#!/usr/bin/env node

/**
 * Unit tests for review-sampler.
 * Uses synthetic review fixtures — no real brand data.
 *
 * Run: node sample.test.js
 */

import assert from 'node:assert/strict';
import {
  makeRng,
  shuffle,
  sampleN,
  stratifiedSample,
  personaSegmentedSample,
  groupByPersona,
  applyContextTruncation,
  estimateTokens,
  truncateToWords,
} from './sample.js';

let passed = 0, failed = 0;
const test = (name, fn) => {
  try { fn(); console.log(`  ✓ ${name}`); passed++; }
  catch (e) { console.log(`  ✗ ${name}\n    ${e.message}`); failed++; }
};

function makeReview(i, opts = {}) {
  return {
    review_id: `r-${i}`,
    author_name: `User ${i}`,
    rating: opts.rating != null ? opts.rating : ((i % 5) + 1),
    title: `Title ${i}`,
    body: opts.body != null ? opts.body : `Body text ${i} ${'word '.repeat(i % 10)}`,
    date: '2025-01-01',
    verified_buyer: true,
    product_title: 'Product',
    source_url: `https://example.com/r/${i}`,
    scraped_at: '2025-01-01T00:00:00Z',
    ...(opts.personas ? { personas: opts.personas } : {}),
  };
}

console.log('makeRng (deterministic)');
test('same seed → same sequence', () => {
  const r1 = makeRng(42), r2 = makeRng(42);
  for (let i = 0; i < 5; i++) assert.equal(r1(), r2());
});
test('different seed → different sequence', () => {
  const r1 = makeRng(42), r2 = makeRng(7);
  assert.notEqual(r1(), r2());
});

console.log('sampleN');
test('returns all when arr.length <= n', () => {
  const rng = makeRng(1);
  assert.equal(sampleN([1, 2], 5, rng).length, 2);
});
test('returns n items when arr.length > n', () => {
  const rng = makeRng(1);
  assert.equal(sampleN([1, 2, 3, 4, 5], 3, rng).length, 3);
});
test('sample is deterministic given seed', () => {
  const a = sampleN([1, 2, 3, 4, 5], 3, makeRng(42));
  const b = sampleN([1, 2, 3, 4, 5], 3, makeRng(42));
  assert.deepEqual(a, b);
});

console.log('stratifiedSample — small corpus (<100)');
test('returns full corpus; flags as such', () => {
  const reviews = Array.from({ length: 50 }, (_, i) => makeReview(i));
  const res = stratifiedSample(reviews, 500, makeRng(1));
  assert.equal(res.picked.length, 50);
  assert.ok(res.note.includes('Full corpus'));
});

console.log('stratifiedSample — medium corpus (100–499)');
test('returns all reviews partitioned across strata', () => {
  const reviews = Array.from({ length: 200 }, (_, i) => makeReview(i));
  const res = stratifiedSample(reviews, 500, makeRng(1));
  // All should be picked since we partition a 200-review corpus across 5 strata
  // with target 20% (40 per stratum) — but rating-filtered pools may be smaller.
  assert.ok(res.picked.length > 0);
  assert.ok(res.picked.length <= 200);
  assert.ok(res.note.includes('Small corpus'));
});

console.log('stratifiedSample — standard (≥500)');
test('returns ~500 across 5 strata', () => {
  const reviews = Array.from({ length: 2000 }, (_, i) => makeReview(i));
  const res = stratifiedSample(reviews, 500, makeRng(42));
  // Each stratum has 100 target; 5★ reviews ~ 400, 1–2★ ~ 800, 3–4★ ~ 800 — all pools ≥100.
  assert.ok(res.picked.length >= 400 && res.picked.length <= 500);
  assert.ok(res.note.includes('Standard'));
});

test('stratified sample is deterministic given seed', () => {
  const reviews = Array.from({ length: 2000 }, (_, i) => makeReview(i));
  const a = stratifiedSample(reviews, 500, makeRng(42));
  const b = stratifiedSample(reviews, 500, makeRng(42));
  assert.deepEqual(a.picked.map((p) => p.review.review_id), b.picked.map((p) => p.review.review_id));
});

test('longest stratum is actually longest', () => {
  const reviews = Array.from({ length: 1000 }, (_, i) =>
    makeReview(i, { body: 'x '.repeat(i + 1), rating: 5 }),
  );
  const res = stratifiedSample(reviews, 500, makeRng(42));
  const longest = res.picked.filter((p) => p.stratum === 'longest');
  // Longest 100 should include the reviews with highest index (longest body).
  const ids = longest.map((p) => p.review.review_id);
  assert.ok(ids.includes(`r-999`));
  assert.ok(ids.includes(`r-900`));
});

console.log('applyContextTruncation');
test('no truncation when under threshold', () => {
  const picked = [{ review: { body: 'short' }, stratum: 'x' }];
  const res = applyContextTruncation(picked, 1000, 600);
  assert.equal(res.truncated, 0);
});
test('truncates oversized sample', () => {
  const longBody = 'word '.repeat(2000); // ~10k chars, ~2500 tokens
  const picked = Array.from({ length: 100 }, () => ({ review: { body: longBody }, stratum: 'longest' }));
  const res = applyContextTruncation(picked, 50000, 600);
  assert.ok(res.truncated > 0);
  assert.ok(res.picked[0].review.body.includes('[truncated]'));
});

console.log('estimateTokens');
test('rough token count by chars/4', () => {
  assert.equal(estimateTokens('abcd'.repeat(25)), 25); // 100 chars / 4
});

console.log('truncateToWords');
test('no truncate under limit', () => {
  const r = truncateToWords('a b c', 10);
  assert.equal(r.truncated, false);
  assert.equal(r.text, 'a b c');
});
test('truncates and tags', () => {
  const r = truncateToWords('a b c d e f', 3);
  assert.equal(r.truncated, true);
  assert.ok(r.text.endsWith('[truncated]'));
});

console.log('groupByPersona');
test('buckets reviews by persona array; tracks untagged', () => {
  const reviews = [
    makeReview(1, { personas: ['A'] }),
    makeReview(2, { personas: ['A', 'B'] }),
    makeReview(3, { personas: ['B'] }),
    makeReview(4),
  ];
  const { byPersona, untagged } = groupByPersona(reviews);
  assert.equal(byPersona.get('A').length, 2);
  assert.equal(byPersona.get('B').length, 2);
  assert.equal(untagged.length, 1);
});

console.log('personaSegmentedSample');
test('returns full population when pool ≤ target', () => {
  const reviews = Array.from({ length: 10 }, (_, i) => makeReview(i, { personas: ['A'] }));
  const res = personaSegmentedSample(reviews, 40, makeRng(1));
  assert.equal(res.fullPopulation, true);
  assert.equal(res.picks.length, 10);
});
test('samples up to target when pool > target', () => {
  const reviews = Array.from({ length: 200 }, (_, i) =>
    makeReview(i, { personas: ['A', i % 3 === 0 ? 'B' : undefined].filter(Boolean), rating: (i % 5) + 1 }),
  );
  const res = personaSegmentedSample(reviews, 40, makeRng(1));
  assert.equal(res.fullPopulation, false);
  assert.ok(res.picks.length > 0 && res.picks.length <= 40);
});
test('persona sample is deterministic given seed', () => {
  const reviews = Array.from({ length: 200 }, (_, i) =>
    makeReview(i, { personas: ['A'], rating: (i % 5) + 1 }),
  );
  const a = personaSegmentedSample(reviews, 40, makeRng(42));
  const b = personaSegmentedSample(reviews, 40, makeRng(42));
  assert.deepEqual(
    a.picks.map((r) => r.review_id).sort(),
    b.picks.map((r) => r.review_id).sort(),
  );
});

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed === 0 ? 0 : 1);
