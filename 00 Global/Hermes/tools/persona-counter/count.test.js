#!/usr/bin/env node

import assert from 'node:assert/strict';
import {
  compileDictionary,
  classifyOne,
  classifyAll,
  calcReport,
  calcRecencyReport,
  parseReviewDate,
} from './count.js';

let passed = 0, failed = 0;
const test = (n, fn) => {
  try { fn(); console.log(`  ✓ ${n}`); passed++; }
  catch (e) { console.log(`  ✗ ${n}\n    ${e.message}`); failed++; }
};

function mk(id, body, rating = 5, date = '2026-01-01') {
  return { review_id: id, body, rating, title: '', date };
}

console.log('compileDictionary');
test('compiles plain string entries', () => {
  const c = compileDictionary({ A: 'gut|digest' });
  assert.equal(c[0].persona, 'A');
  assert.ok(c[0].re.test('GUT pain')); // case-insensitive
});
test('compiles object entries with flags', () => {
  const c = compileDictionary({ A: { pattern: 'gut', flags: 'i' } });
  assert.ok(c[0].re.test('Gut'));
});
test('throws on invalid regex', () => {
  assert.throws(() => compileDictionary({ A: '(unclosed' }));
});

console.log('classifyOne');
test('returns hits for matching keywords', () => {
  const c = compileDictionary({ Gut: 'gut|digest', Energy: 'energy|tired' });
  const r = classifyOne(mk('r1', 'my gut hurts'), c);
  assert.deepEqual(r.personas, ['Gut']);
});
test('returns multiple when overlap', () => {
  const c = compileDictionary({ Gut: 'gut', Energy: 'energy' });
  const r = classifyOne(mk('r1', 'gut and energy issues'), c);
  assert.deepEqual(r.personas.sort(), ['Energy', 'Gut']);
});
test('empty result when no match', () => {
  const c = compileDictionary({ Gut: 'gut' });
  const r = classifyOne(mk('r1', 'weather is nice'), c);
  assert.deepEqual(r.personas, []);
});
test('flags borderline when only 1 distinct keyword match', () => {
  const c = compileDictionary({ Gut: 'gut|digest|bloat' });
  const r = classifyOne(mk('r1', 'my gut'), c);
  assert.ok(r.borderline.includes('Gut'));
});
test('not borderline when multiple distinct keyword matches', () => {
  const c = compileDictionary({ Gut: 'gut|digest|bloat' });
  const r = classifyOne(mk('r1', 'gut and bloat issues'), c);
  assert.ok(!r.borderline.includes('Gut'));
});

console.log('calcReport');
test('frequency + percent + avg rating', () => {
  const c = compileDictionary({ Gut: 'gut', Energy: 'energy' });
  const reviews = [
    mk('r1', 'gut issue', 4),
    mk('r2', 'gut and energy', 5),
    mk('r3', 'energy boost', 3),
    mk('r4', 'nothing matches', 2),
  ];
  const tagged = classifyAll(reviews, c);
  const report = calcReport(tagged);
  assert.equal(report.total_reviews, 4);
  const gut = report.frequency_table.find((x) => x.persona === 'Gut');
  assert.equal(gut.reviews_matched, 2);
  assert.equal(gut.percent_of_reviews, 50);
  assert.equal(gut.avg_rating, 4.5);
});
test('multi-persona overlap top 20', () => {
  const c = compileDictionary({ Gut: 'gut', Energy: 'energy' });
  const reviews = [
    mk('r1', 'gut and energy', 5),
    mk('r2', 'gut and energy', 4),
    mk('r3', 'gut only', 3),
  ];
  const report = calcReport(classifyAll(reviews, c));
  assert.equal(report.multi_persona_overlap_top20[0].combo, 'Energy + Gut');
  assert.equal(report.multi_persona_overlap_top20[0].count, 2);
});
test('untagged percent', () => {
  const c = compileDictionary({ Gut: 'gut' });
  const reviews = [
    mk('r1', 'gut', 5),
    mk('r2', 'nothing', 3),
    mk('r3', 'nope', 2),
  ];
  const report = calcReport(classifyAll(reviews, c));
  assert.equal(report.untagged.count, 2);
  assert.ok(Math.abs(report.untagged.percent_of_reviews - 66.7) < 0.2);
});
test('borderlines surface in report', () => {
  const c = compileDictionary({ Gut: 'gut|digest' });
  const reviews = [mk('r1', 'my gut', 5)];
  const report = calcReport(classifyAll(reviews, c));
  assert.deepEqual(report.borderlines.Gut, ['r1']);
});

console.log('recency');
test('parseReviewDate returns null for invalid dates', () => {
  assert.equal(parseReviewDate('not-a-date'), null);
  assert.ok(parseReviewDate('2026-06-01') instanceof Date);
});
test('calcRecencyReport filters by date without changing full counts', () => {
  const c = compileDictionary({ Gut: 'gut', Energy: 'energy' });
  const reviews = [
    mk('r1', 'gut issue', 4, '2026-05-01'),
    mk('r2', 'gut and energy', 5, '2026-05-02'),
    mk('r3', 'energy boost', 3, '2025-01-01'),
    mk('r4', 'nothing matches', 2, 'bad-date'),
  ];
  const tagged = classifyAll(reviews, c);
  const recency = calcRecencyReport(tagged, '2026-01-01', { minRecentN: 1, minRecentPersonaN: 1 });
  assert.equal(recency.total_recent_reviews, 2);
  assert.equal(recency.missing_or_invalid_date_count, 1);
  const gut = recency.frequency_table.find((x) => x.persona === 'Gut');
  assert.equal(gut.percent_all_reviews, 50);
  assert.equal(gut.percent_recent_reviews, 100);
  assert.equal(gut.recent_reviews_matched, 2);
  assert.equal(gut.trend, 'Growing');
});
test('calcRecencyReport flags insufficient recent persona sample', () => {
  const c = compileDictionary({ Gut: 'gut', Energy: 'energy' });
  const reviews = [
    mk('r1', 'gut issue', 4, '2026-05-01'),
    mk('r2', 'energy boost', 3, '2026-05-02'),
    mk('r3', 'energy again', 3, '2026-05-03'),
  ];
  const recency = calcRecencyReport(classifyAll(reviews, c), '2026-01-01', { minRecentN: 1, minRecentPersonaN: 2 });
  const gut = recency.frequency_table.find((x) => x.persona === 'Gut');
  assert.equal(gut.trend, 'Insufficient recent sample');
});

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed === 0 ? 0 : 1);
