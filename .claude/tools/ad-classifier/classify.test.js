#!/usr/bin/env node

import assert from 'node:assert/strict';
import {
  loadPersonaTaxonomy,
  adFullText,
  chunk,
  isTransientError,
  mockClassifyBatch,
  mockDedupAngles,
  rewriteAngles,
  runClassify,
  dedupAngles,
  runValidate,
  validatePersona,
  buildClassifyPrompt,
  buildRetryPrompt,
} from './classify.js';

let passed = 0, failed = 0;
const test = (n, fn) => {
  try { fn(); console.log(`  ✓ ${n}`); passed++; }
  catch (e) { console.log(`  ✗ ${n}\n    ${e.message}`); failed++; }
};
const atest = async (n, fn) => {
  try { await fn(); console.log(`  ✓ ${n}`); passed++; }
  catch (e) { console.log(`  ✗ ${n}\n    ${e.message}`); failed++; }
};

const OPTS = { mock: true, batchSize: 10, maxRetries: 0, model: 'mock', precisionThreshold: 0.70, sampleSize: 20, seed: 42 };

console.log('loadPersonaTaxonomy');
test('persona-dictionary shape: {Name: regex-string}', () => {
  const tax = loadPersonaTaxonomy({ Gut: 'gut|bloat|digest|ibs', Energy: 'tired|fatigue|energy' });
  assert.equal(tax.length, 2);
  assert.equal(tax[0].name, 'Gut');
  assert.ok(tax[0].top_keywords.includes('gut'));
});
test('{personas: [{name, one_line_pain, top_keywords}]} shape', () => {
  const tax = loadPersonaTaxonomy({ personas: [{ name: 'A', one_line_pain: 'pain', top_keywords: ['a', 'b'] }] });
  assert.equal(tax[0].one_line_pain, 'pain');
});
test('throws on bad shape', () => {
  assert.throws(() => loadPersonaTaxonomy(null));
});

console.log('adFullText');
test('concatenates text fields, skipping blanks', () => {
  const t = adFullText({ primary_text: 'hi', headline: 'h', description: '', on_image_text: 'o', caption: null });
  assert.equal(t, 'hi\nh\no');
});

console.log('chunk');
test('batches correctly', () => {
  assert.deepEqual(chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
});

console.log('isTransientError');
test('detects 429', () => assert.equal(isTransientError({ message: '429 Too Many Requests' }), true));
test('detects rate limit', () => assert.equal(isTransientError({ message: 'rate-limit exceeded' }), true));
test('detects 500', () => assert.equal(isTransientError({ message: 'HTTP 500' }), true));
test('ignores 400', () => assert.equal(isTransientError({ message: 'HTTP 400 bad request' }), false));

console.log('mockClassifyBatch');
test('routes by persona name in text', () => {
  const tax = [{ name: 'Gut', one_line_pain: '', top_keywords: [] }, { name: 'Energy', one_line_pain: '', top_keywords: [] }];
  const ads = [
    { ad_id: 'a', primary_text: 'gut help' },
    { ad_id: 'b', primary_text: 'energy boost now' },
  ];
  const out = mockClassifyBatch(ads, tax);
  assert.equal(out[0].persona, 'Gut');
  assert.equal(out[1].persona, 'Energy');
});

console.log('runClassify (mock)');
await atest('classifies all ads in batches', async () => {
  const tax = loadPersonaTaxonomy({ Gut: 'gut', Energy: 'energy' });
  const ads = Array.from({ length: 25 }, (_, i) => ({
    ad_id: `a${i}`,
    primary_text: i % 2 === 0 ? 'gut pain' : 'energy boost',
    ad_format: 'static',
  }));
  const out = await runClassify(ads, tax, OPTS);
  assert.equal(out.length, 25);
  assert.ok(out.every((x) => x.ad_id && x.persona && x.angle && x.format));
});

console.log('mockDedupAngles + rewriteAngles');
test('groups angles with same first 4 words', () => {
  const clusters = mockDedupAngles(['Feel sharp by 10am now', 'Feel sharp by 10am today', 'Stack of benefits works']);
  // 2 clusters: "feel sharp by 10am" and "stack of benefits works"
  assert.equal(clusters.length, 2);
});
test('rewrites classifications to canonical', () => {
  const classifications = [
    { ad_id: 'a', persona: 'P', angle: 'Feel sharp by 10am now', format: 'static' },
    { ad_id: 'b', persona: 'P', angle: 'Feel sharp by 10am later', format: 'static' },
  ];
  const clusters = [{ canonical_angle: 'Feel sharp by 10am now', members: ['Feel sharp by 10am now', 'Feel sharp by 10am later'] }];
  const { classifications: out } = rewriteAngles(classifications, clusters);
  assert.equal(out[0].angle, 'Feel sharp by 10am now');
  assert.equal(out[1].angle, 'Feel sharp by 10am now');
});

console.log('dedupAngles (mock)');
await atest('returns clusters', async () => {
  const clusters = await dedupAngles(['x y z a b', 'x y z a c'], OPTS);
  assert.ok(clusters.length >= 1);
});

console.log('validatePersona (sparse-persona fallback)');
await atest('<5 ads → skipped-insufficient-volume', async () => {
  const tax = loadPersonaTaxonomy({ Gut: 'gut' });
  const classifications = Array.from({ length: 3 }, (_, i) => ({ ad_id: `a${i}`, persona: 'Gut', angle: 'x', format: 'static' }));
  const ads = Array.from({ length: 3 }, (_, i) => ({ ad_id: `a${i}`, primary_text: 'gut help' }));
  const res = await validatePersona('Gut', classifications, ads, tax, OPTS, () => 0.5);
  assert.equal(res.status, 'skipped-insufficient-volume');
  assert.ok(res.banner.includes('insufficient ad volume'));
});

await atest('5-19 ads → rescores all, may flag small-N', async () => {
  const tax = loadPersonaTaxonomy({ Gut: 'gut', Energy: 'energy' });
  const classifications = Array.from({ length: 10 }, (_, i) => ({ ad_id: `a${i}`, persona: 'Gut', angle: 'x', format: 'static' }));
  const ads = Array.from({ length: 10 }, (_, i) => ({ ad_id: `a${i}`, primary_text: 'gut help' }));
  const rng = (() => { let s = 1; return () => { s++; return 0.3; }; })();
  const res = await validatePersona('Gut', classifications, ads, tax, OPTS, rng);
  assert.equal(res.n_rescored, 10);
  // Mock rescore routes by persona name in text → "gut help" contains "gut" → matches Gut.
  assert.equal(res.precision, 1);
  // small-N banner should be set for nTagged<20.
  assert.ok(res.banner && res.banner.includes('small-N'));
});

await atest('≥20 ads → samples 20', async () => {
  const tax = loadPersonaTaxonomy({ Gut: 'gut' });
  const classifications = Array.from({ length: 50 }, (_, i) => ({ ad_id: `a${i}`, persona: 'Gut', angle: 'x', format: 'static' }));
  const ads = Array.from({ length: 50 }, (_, i) => ({ ad_id: `a${i}`, primary_text: 'gut help' }));
  let i = 0; const rng = () => ((i++ * 0.137) % 1);
  const res = await validatePersona('Gut', classifications, ads, tax, OPTS, rng);
  assert.equal(res.n_rescored, 20);
  assert.equal(res.precision, 1);
  assert.equal(res.status, 'pass');
});

console.log('runValidate (mock, end-to-end)');
await atest('handles mix of personas including zero-ad persona', async () => {
  const tax = loadPersonaTaxonomy({ Gut: 'gut', Energy: 'energy', Empty: 'never-matches' });
  const allAds = [
    ...Array.from({ length: 25 }, (_, i) => ({ ad_id: `g${i}`, primary_text: 'gut help', ad_format: 'static' })),
    ...Array.from({ length: 5 }, (_, i) => ({ ad_id: `e${i}`, primary_text: 'energy boost', ad_format: 'static' })),
  ];
  const classifications = allAds.map((a) =>
    a.primary_text.includes('gut')
      ? { ad_id: a.ad_id, persona: 'Gut', angle: 'x', format: 'static' }
      : { ad_id: a.ad_id, persona: 'Energy', angle: 'y', format: 'static' },
  );
  const v = await runValidate(classifications, allAds, tax, OPTS);
  const gut = v.per_persona.find((p) => p.persona === 'Gut');
  const empty = v.per_persona.find((p) => p.persona === 'Empty');
  assert.equal(gut.status, 'pass');
  assert.equal(empty.status, 'skipped-insufficient-volume');
});

console.log('buildClassifyPrompt + buildRetryPrompt (structure)');
test('classify prompt contains persona list and ad blocks', () => {
  const tax = loadPersonaTaxonomy({ Gut: 'gut|bloat' });
  const prompt = buildClassifyPrompt([{ ad_id: 'a', primary_text: 'gut' }], tax);
  assert.ok(prompt.includes('"Gut"'));
  assert.ok(prompt.includes('ad_id=a'));
});
test('retry prompt injects persona pain, keywords, and borderline examples', () => {
  const tax = [{ name: 'Gut', one_line_pain: 'stomach upset', top_keywords: ['gut', 'bloat', 'digest'] }];
  const disagreements = [{ ad_id: 'a', persona: 'Energy' }];
  const ads = [{ ad_id: 'a', primary_text: 'the way it hits is huge' }];
  const orig = [{ ad_id: 'a', persona: 'Gut' }];
  const p = buildRetryPrompt('Gut', disagreements, tax, 30, 20, ads, orig);
  assert.ok(p.includes('stomach upset'));
  assert.ok(p.includes('gut, bloat, digest'));
  assert.ok(p.includes('the way it hits is huge'));
});

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed === 0 ? 0 : 1);
