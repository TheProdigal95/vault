#!/usr/bin/env node

/**
 * Pure-helper tests for scrape-site.js (no browser required).
 * Exercises URL normalization, exclusion rules, same-origin matching,
 * slugging, and sitemap XML parsing.
 *
 * Run:  node scrape-site.test.js
 */

import assert from 'node:assert/strict';
import {
  normalizeUrl,
  sameOrigin,
  shouldExclude,
  hasNonHtmlExt,
  slugForUrl,
  EXCLUDE_PATTERNS,
  extractUrlsFromSitemap,
} from './scrape-site.js';

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (e) {
    console.log(`  ✗ ${name}\n    ${e.message}`);
    failed++;
  }
}

console.log('normalizeUrl');
test('strips fragment', () => {
  assert.equal(normalizeUrl('/a#x', 'https://b.com'), 'https://b.com/a');
});
test('resolves relative against base', () => {
  assert.equal(normalizeUrl('/a', 'https://b.com/x'), 'https://b.com/a');
});
test('strips trailing slash on non-root', () => {
  assert.equal(normalizeUrl('https://b.com/a/', 'https://b.com'), 'https://b.com/a');
});
test('preserves root slash', () => {
  assert.equal(normalizeUrl('/', 'https://b.com'), 'https://b.com/');
});
test('returns null on invalid input', () => {
  assert.equal(normalizeUrl('http://[bad', 'https://b.com'), null);
});

console.log('sameOrigin');
test('matches same host', () => {
  assert.equal(sameOrigin('https://b.com/a', 'https://b.com/b'), true);
});
test('rejects different host', () => {
  assert.equal(sameOrigin('https://b.com', 'https://c.com'), false);
});
test('rejects subdomain', () => {
  assert.equal(sameOrigin('https://b.com', 'https://blog.b.com'), false);
});
test('rejects different protocol', () => {
  assert.equal(sameOrigin('http://b.com', 'https://b.com'), false);
});

console.log('shouldExclude (§5.4 patterns)');
test('excludes /page/\\d+', () => {
  assert.equal(shouldExclude('https://b.com/blog/page/2'), true);
});
test('excludes ?page=', () => {
  assert.equal(shouldExclude('https://b.com/blog?page=2'), true);
});
test('excludes /tag/', () => {
  assert.equal(shouldExclude('https://b.com/tag/wellness'), true);
});
test('excludes /category/', () => {
  assert.equal(shouldExclude('https://b.com/category/wellness'), true);
});
test('excludes /search', () => {
  assert.equal(shouldExclude('https://b.com/search'), true);
});
test('excludes ?s=', () => {
  assert.equal(shouldExclude('https://b.com/?s=x'), true);
});
test('accepts clean product URL', () => {
  assert.equal(shouldExclude('https://b.com/products/daily'), false);
});

console.log('hasNonHtmlExt');
test('rejects .pdf', () => assert.equal(hasNonHtmlExt('https://b.com/x.pdf'), true));
test('rejects .jpg', () => assert.equal(hasNonHtmlExt('https://b.com/x.jpg'), true));
test('rejects .mp4', () => assert.equal(hasNonHtmlExt('https://b.com/x.mp4'), true));
test('accepts .html', () => assert.equal(hasNonHtmlExt('https://b.com/x.html'), false));
test('accepts extensionless', () => assert.equal(hasNonHtmlExt('https://b.com/x'), false));

console.log('slugForUrl');
test('root slugs to something containing "root"', () => {
  assert.ok(slugForUrl('https://b.com/').includes('root'));
});
test('slugs deep path', () => {
  const s = slugForUrl('https://b.com/products/daily/vanilla');
  assert.ok(s.includes('products') && s.includes('vanilla'));
});
test('handles query', () => {
  const s = slugForUrl('https://b.com/a?x=1');
  assert.ok(s.includes('x_1'));
});

console.log('extractUrlsFromSitemap');
test('parses <loc> entries', () => {
  const xml = `<?xml version="1.0"?>
<urlset>
  <url><loc>https://b.com/a</loc></url>
  <url><loc>https://blog.b.com/x</loc></url>
</urlset>`;
  const urls = extractUrlsFromSitemap(xml);
  assert.deepEqual(urls, ['https://b.com/a', 'https://blog.b.com/x']);
});
test('returns [] for empty input', () => {
  assert.deepEqual(extractUrlsFromSitemap(''), []);
  assert.deepEqual(extractUrlsFromSitemap(null), []);
});

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed === 0 ? 0 : 1);
