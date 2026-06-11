#!/usr/bin/env node

import assert from 'node:assert/strict';
import {
  flattenOne,
  flattenAll,
  formatFromApify,
  firstSeenFromApify,
  primaryTextFromApify,
  headlineFromApify,
  descriptionFromApify,
} from './flatten-apify.js';

let passed = 0, failed = 0;
const test = (n, fn) => {
  try { fn(); console.log(`  ✓ ${n}`); passed++; }
  catch (e) { console.log(`  ✗ ${n}\n    ${e.message}`); failed++; }
};

console.log('formatFromApify');
test('lowercases display_format', () => {
  assert.equal(formatFromApify({ display_format: 'VIDEO' }), 'video');
});
test('DCO with ≥2 cards becomes carousel', () => {
  assert.equal(formatFromApify({ display_format: 'DCO', cards: [{}, {}] }), 'carousel');
});
test('DCO with 0 or 1 cards stays dco', () => {
  assert.equal(formatFromApify({ display_format: 'DCO', cards: [] }), 'dco');
  assert.equal(formatFromApify({ display_format: 'DCO', cards: [{}] }), 'dco');
});
test('missing display_format returns "unknown"', () => {
  assert.equal(formatFromApify({}), 'unknown');
  assert.equal(formatFromApify({ display_format: '' }), 'unknown');
});

console.log('firstSeenFromApify');
test('uses start_date_formatted first 10 chars', () => {
  assert.equal(firstSeenFromApify({ start_date_formatted: '2025-08-14T12:00:00Z' }), '2025-08-14');
});
test('falls back to start_date epoch', () => {
  // 2024-01-01T00:00:00Z = 1704067200
  assert.equal(firstSeenFromApify({ start_date: 1704067200 }), '2024-01-01');
});
test('returns null when neither field is present', () => {
  assert.equal(firstSeenFromApify({}), null);
});
test('returns null for unusable start_date', () => {
  assert.equal(firstSeenFromApify({ start_date: 0 }), null);
  assert.equal(firstSeenFromApify({ start_date: 'not-a-number' }), null);
});

console.log('primaryTextFromApify');
test('uses snapshot.body.text when present', () => {
  assert.equal(primaryTextFromApify({ body: { text: 'Hello world' } }), 'Hello world');
});
test('joins carousel card bodies with --- separator', () => {
  const out = primaryTextFromApify({
    body: { text: 'Main body' },
    cards: [{ body: 'Card 1 body' }, { body: 'Card 2 body' }],
  });
  assert.equal(out, 'Main body\n\n---\n\nCard 1 body\n\n---\n\nCard 2 body');
});
test('dedupes card body equal to main body', () => {
  const out = primaryTextFromApify({
    body: { text: 'Same' },
    cards: [{ body: 'Same' }, { body: 'Different' }],
  });
  assert.equal(out, 'Same\n\n---\n\nDifferent');
});
test('returns empty string when no body and no cards', () => {
  assert.equal(primaryTextFromApify({}), '');
});
test('trims whitespace-only bodies', () => {
  assert.equal(primaryTextFromApify({ body: { text: '   ' }, cards: [{ body: '   ' }] }), '');
});

console.log('headlineFromApify');
test('uses snapshot.title when present', () => {
  assert.equal(headlineFromApify({ title: 'The Headline' }), 'The Headline');
});
test('falls back to first card with a title', () => {
  const out = headlineFromApify({
    title: '',
    cards: [{ title: '' }, { title: 'Card Two Title' }, { title: 'Card Three Title' }],
  });
  assert.equal(out, 'Card Two Title');
});
test('returns empty string when nothing has a title', () => {
  assert.equal(headlineFromApify({ cards: [{ title: '' }] }), '');
  assert.equal(headlineFromApify({}), '');
});

console.log('descriptionFromApify');
test('uses snapshot.link_description when present', () => {
  assert.equal(descriptionFromApify({ link_description: 'Learn more' }), 'Learn more');
});
test('falls back to first card link_description', () => {
  const out = descriptionFromApify({
    cards: [{ link_description: 'Card desc' }],
  });
  assert.equal(out, 'Card desc');
});
test('returns empty string when no link_description anywhere', () => {
  assert.equal(descriptionFromApify({}), '');
});

console.log('flattenOne');
test('maps ad_archive_id to ad_id', () => {
  const flat = flattenOne({
    ad_archive_id: '12345',
    start_date_formatted: '2026-01-15',
    snapshot: { body: { text: 'hi' }, title: 'T', display_format: 'video' },
  });
  assert.equal(flat.ad_id, '12345');
});
test('prefers ad_archive_id over ad_id', () => {
  const flat = flattenOne({
    ad_archive_id: 'archive-id',
    ad_id: 'old-id',
    snapshot: {},
  });
  assert.equal(flat.ad_id, 'archive-id');
});
test('emits empty on_image_text and caption', () => {
  const flat = flattenOne({ ad_archive_id: 'x', snapshot: { body: { text: 'y' } } });
  assert.equal(flat.on_image_text, '');
  assert.equal(flat.caption, '');
});
test('full ad mapping integration', () => {
  const flat = flattenOne({
    ad_archive_id: 'abc',
    start_date_formatted: '2026-02-20T10:00:00Z',
    snapshot: {
      body: { text: 'Primary text here' },
      title: 'Headline here',
      link_description: 'Description here',
      display_format: 'image',
      cards: [],
    },
  });
  assert.deepEqual(flat, {
    ad_id: 'abc',
    primary_text: 'Primary text here',
    headline: 'Headline here',
    description: 'Description here',
    on_image_text: '',
    caption: '',
    ad_format: 'image',
    first_seen: '2026-02-20',
  });
});

console.log('flattenAll');
test('skips ads with no ad_id', () => {
  const out = flattenAll([
    { ad_archive_id: 'keep', snapshot: {} },
    { snapshot: {} },           // no id → skipped
    { ad_archive_id: '', snapshot: {} }, // empty id → skipped
  ]);
  assert.equal(out.length, 1);
  assert.equal(out[0].ad_id, 'keep');
});
test('dedupes by ad_id', () => {
  const out = flattenAll([
    { ad_archive_id: 'dup', snapshot: { body: { text: 'first' } } },
    { ad_archive_id: 'dup', snapshot: { body: { text: 'second' } } },
    { ad_archive_id: 'other', snapshot: {} },
  ]);
  assert.equal(out.length, 2);
  assert.equal(out[0].primary_text, 'first'); // first wins
});
test('returns empty array for empty input', () => {
  assert.deepEqual(flattenAll([]), []);
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
