#!/usr/bin/env node

/**
 * ============================================================================
 * SITE-SCRAPER — Recursive same-origin whole-site crawler
 * ============================================================================
 *
 * Phase 1b of the Brand Research pipeline (2026-04-17 proposal v5.2, §5.4).
 *
 * Starts at a base URL, follows every same-origin link it finds, and writes
 * one .txt + one .json per page. On start, fetches /robots.txt and
 * /sitemap.xml to surface off-host subdomains. Writes a crawl manifest
 * summarizing visited, skipped, and unvisited URLs.
 *
 * USAGE:
 *   node scrape-site.js --url https://brand.com --output-dir path/to/raw_pages_tmp
 *
 * FLAGS:
 *   --url <base>            Required. Base URL (e.g., https://im8health.com).
 *   --output-dir <path>     Required. Destination for raw .txt + .json + manifest.
 *   --max-depth <n>         Default 4. Max link-hops from homepage.
 *   --max-pages <n>         Default 200. Hard cap on pages visited.
 *   --headless              Run headless (default: headed, required by some Next.js
 *                           / Cloudflare-protected sites).
 *   --concurrency <n>       Default 1. Page workers. Keep at 1 for most brand sites
 *                           to avoid rate-limiting.
 *
 * OUTPUT:
 *   <output-dir>/<slug>.txt               — document.body.innerText
 *   <output-dir>/<slug>_data.json         — {url, title, og, jsonld, timestamp}
 *   <output-dir>/_crawl_manifest.json     — {pages_visited, pages_skipped,
 *                                             queue_incomplete,
 *                                             subdomains_from_sitemap}
 *
 * REQUIRES:
 *   playwright + chromium browser (npx playwright install chromium)
 *
 * ============================================================================
 */

import { chromium } from 'playwright';
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
    url: null,
    outputDir: null,
    maxDepth: 4,
    maxPages: 200,
    headless: false,
    concurrency: 1,
  };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--url') args.url = argv[++i];
    else if (arg === '--output-dir') args.outputDir = argv[++i];
    else if (arg === '--max-depth') args.maxDepth = parseInt(argv[++i], 10);
    else if (arg === '--max-pages') args.maxPages = parseInt(argv[++i], 10);
    else if (arg === '--headless') args.headless = true;
    else if (arg === '--concurrency') args.concurrency = parseInt(argv[++i], 10);
    else if (arg === '--help' || arg === '-h') {
      printHelp();
      process.exit(0);
    }
  }
  return args;
}

function printHelp() {
  console.log(`site-scraper — recursive same-origin whole-site crawler

Usage:
  node scrape-site.js --url <base> --output-dir <path> [options]

Options:
  --url <base>           Required. Base URL.
  --output-dir <path>    Required. Destination folder.
  --max-depth <n>        Default 4.
  --max-pages <n>        Default 200.
  --headless             Default false (headed).
  --concurrency <n>      Default 1.
`);
}

// ============================================================================
// URL / PATH HELPERS
// ============================================================================

// Regex exclusion patterns per §5.4.
const EXCLUDE_PATTERNS = [
  /\/page\/\d+/,
  /[?&]page=\d+/,
  /\/tag\//,
  /\/tags\//,
  /\/category\//,
  /\/categories\//,
  /\/topic\//,
  /\/search(\b|\/)/,
  /[?&]s=/,
  /[?&]q=/,
];

const NON_HTML_EXT = new Set([
  '.pdf', '.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.zip',
  '.mp4', '.mov', '.m4v', '.mp3', '.wav', '.avi', '.tar', '.gz',
  '.woff', '.woff2', '.ttf', '.otf', '.ico', '.css', '.js', '.xml', '.rss',
]);

function isHttpUrl(u) {
  return /^https?:\/\//i.test(u);
}

function normalizeUrl(raw, base) {
  try {
    const u = new URL(raw, base);
    // Drop hash fragment — fragment-only links are excluded (§5.4).
    u.hash = '';
    // Strip trailing slash except for root.
    if (u.pathname.length > 1 && u.pathname.endsWith('/')) {
      u.pathname = u.pathname.replace(/\/+$/, '');
    }
    return u.toString();
  } catch {
    return null;
  }
}

function sameOrigin(a, b) {
  try {
    const au = new URL(a);
    const bu = new URL(b);
    return au.host === bu.host && au.protocol === bu.protocol;
  } catch {
    return false;
  }
}

function hasNonHtmlExt(urlStr) {
  try {
    const p = new URL(urlStr).pathname.toLowerCase();
    const dot = p.lastIndexOf('.');
    if (dot === -1) return false;
    const ext = p.slice(dot);
    return NON_HTML_EXT.has(ext);
  } catch {
    return false;
  }
}

function shouldExclude(urlStr) {
  return EXCLUDE_PATTERNS.some((re) => re.test(urlStr)) || hasNonHtmlExt(urlStr);
}

function slugForUrl(urlStr) {
  try {
    const u = new URL(urlStr);
    let p = u.pathname;
    if (p === '/' || p === '') p = '/_root';
    const query = u.search ? '_' + u.search.slice(1) : '';
    return (p + query)
      .replace(/[^a-zA-Z0-9_\-\/]/g, '_')
      .replace(/\/+/g, '__')
      .replace(/^_+|_+$/g, '')
      .slice(0, 200) || 'page';
  } catch {
    return 'page_' + Date.now();
  }
}

// ============================================================================
// ROBOTS / SITEMAP PREFETCH (§5.4 — surface off-host subdomains)
// ============================================================================

async function fetchText(url) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ReachDigital-SiteScraper/1.0)' },
      redirect: 'follow',
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

function extractUrlsFromSitemap(xml) {
  if (!xml) return [];
  const out = [];
  const locRegex = /<loc>\s*([^<\s]+)\s*<\/loc>/gi;
  let m;
  while ((m = locRegex.exec(xml))) {
    out.push(m[1].trim());
  }
  return out;
}

function extractSitemapIndexes(xml) {
  // sitemap-index files also use <loc>; caller re-fetches each.
  return extractUrlsFromSitemap(xml);
}

async function discoverOffHostUrls(baseUrl) {
  const subdomains = new Set();
  const visitedSitemaps = new Set();
  const baseHost = new URL(baseUrl).host;

  // robots.txt
  const robots = await fetchText(new URL('/robots.txt', baseUrl).toString());
  const sitemapUrls = [];
  if (robots) {
    const lines = robots.split(/\r?\n/);
    for (const line of lines) {
      const m = /^\s*sitemap:\s*(\S+)/i.exec(line);
      if (m) sitemapUrls.push(m[1].trim());
    }
  }
  // Default /sitemap.xml
  sitemapUrls.push(new URL('/sitemap.xml', baseUrl).toString());

  // Resolve sitemaps (with shallow index-following).
  const queue = [...new Set(sitemapUrls)];
  while (queue.length) {
    const sm = queue.shift();
    if (visitedSitemaps.has(sm)) continue;
    visitedSitemaps.add(sm);
    const xml = await fetchText(sm);
    if (!xml) continue;
    const locs = extractUrlsFromSitemap(xml);
    for (const loc of locs) {
      if (!isHttpUrl(loc)) continue;
      try {
        const host = new URL(loc).host;
        if (host !== baseHost) {
          subdomains.add(host);
        }
        // If this looks like a sitemap index, queue it.
        if (/sitemap.*\.xml$/i.test(loc) && !visitedSitemaps.has(loc) && queue.length < 20) {
          queue.push(loc);
        }
      } catch {}
    }
  }

  return Array.from(subdomains).sort();
}

// ============================================================================
// PAGE EXTRACTION
// ============================================================================

async function extractPage(page, url) {
  // Scroll 33/66/100/0 to trigger hydration / lazy-load per §5.4.
  await page.waitForTimeout(4000);
  const heights = [0.33, 0.66, 1.0, 0];
  for (const h of heights) {
    await page.evaluate((ratio) => {
      window.scrollTo(0, document.body.scrollHeight * ratio);
    }, h);
    await page.waitForTimeout(400);
  }

  const payload = await page.evaluate(() => {
    const text = document.body ? document.body.innerText : '';
    const title = document.title || '';
    const og = {};
    document.querySelectorAll('meta[property^="og:"], meta[name^="og:"]').forEach((el) => {
      const key = el.getAttribute('property') || el.getAttribute('name');
      og[key] = el.getAttribute('content') || '';
    });
    const jsonld = [];
    document.querySelectorAll('script[type="application/ld+json"]').forEach((el) => {
      try {
        jsonld.push(JSON.parse(el.textContent));
      } catch {}
    });
    const links = [];
    document.querySelectorAll('a[href]').forEach((a) => {
      const href = a.getAttribute('href');
      if (href) links.push(href);
    });
    return { text, title, og, jsonld, links };
  });

  return payload;
}

// ============================================================================
// CRAWL LOOP
// ============================================================================

async function crawl(args) {
  const start = normalizeUrl(args.url, args.url);
  if (!start) {
    throw new Error(`Invalid --url: ${args.url}`);
  }
  await fs.ensureDir(args.outputDir);

  console.log(`[site-scraper] start=${start}`);
  console.log(`[site-scraper] output-dir=${args.outputDir}`);
  console.log(`[site-scraper] max-depth=${args.maxDepth} max-pages=${args.maxPages} headless=${args.headless}`);

  // Prefetch robots/sitemap for off-host discovery (non-blocking of crawl).
  console.log(`[site-scraper] discovering off-host subdomains via robots/sitemap...`);
  const subdomains = await discoverOffHostUrls(start);
  if (subdomains.length) {
    console.log(`[site-scraper] off-host subdomains found: ${subdomains.join(', ')}`);
  } else {
    console.log(`[site-scraper] no off-host subdomains found`);
  }

  const browser = await chromium.launch({
    headless: args.headless,
    args: [
      '--disable-blink-features=AutomationControlled',
      '--no-sandbox',
    ],
  });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    viewport: { width: 1440, height: 900 },
  });
  // Stealth: remove webdriver flag.
  await context.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => false });
  });

  const visited = new Set();
  const visitedList = [];
  const skipped = []; // {url, reason}
  const queue = [{ url: start, depth: 0 }];
  const queued = new Set([start]);

  const page = await context.newPage();

  try {
    while (queue.length && visited.size < args.maxPages) {
      const { url, depth } = queue.shift();
      if (visited.has(url)) continue;

      console.log(`[site-scraper] (${visited.size + 1}/${args.maxPages}) d=${depth} ${url}`);

      try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
      } catch (e) {
        console.warn(`[site-scraper]   ⚠ navigation failed: ${e.message}`);
        skipped.push({ url, reason: `navigation-failed: ${e.message.slice(0, 140)}` });
        continue;
      }

      let payload;
      try {
        payload = await extractPage(page, url);
      } catch (e) {
        console.warn(`[site-scraper]   ⚠ extraction failed: ${e.message}`);
        skipped.push({ url, reason: `extraction-failed: ${e.message.slice(0, 140)}` });
        continue;
      }

      visited.add(url);
      visitedList.push(url);

      const slug = slugForUrl(url);
      const txtPath = path.join(args.outputDir, `${slug}.txt`);
      const jsonPath = path.join(args.outputDir, `${slug}_data.json`);

      await fs.writeFile(txtPath, payload.text || '', 'utf8');
      await fs.writeJson(
        jsonPath,
        {
          url,
          title: payload.title,
          og: payload.og,
          jsonld: payload.jsonld,
          scraped_at: new Date().toISOString(),
          depth,
        },
        { spaces: 2 },
      );

      if (depth < args.maxDepth) {
        for (const href of payload.links) {
          const abs = normalizeUrl(href, url);
          if (!abs || !isHttpUrl(abs)) continue;
          if (!sameOrigin(abs, start)) {
            skipped.push({ url: abs, reason: 'off-origin' });
            continue;
          }
          if (shouldExclude(abs)) {
            skipped.push({ url: abs, reason: 'excluded-pattern' });
            continue;
          }
          if (visited.has(abs) || queued.has(abs)) continue;
          queued.add(abs);
          queue.push({ url: abs, depth: depth + 1 });
        }
      }
    }
  } finally {
    await page.close().catch(() => {});
    await context.close().catch(() => {});
    await browser.close().catch(() => {});
  }

  const queueIncomplete = queue.map((q) => q.url);

  // Dedup skipped (same URL may be re-skipped from multiple parents).
  const skippedDedup = [];
  const seenSkip = new Set();
  for (const s of skipped) {
    const key = s.url + '|' + s.reason;
    if (seenSkip.has(key)) continue;
    seenSkip.add(key);
    skippedDedup.push(s);
  }

  const manifest = {
    start,
    scraped_at: new Date().toISOString(),
    pages_visited: {
      count: visitedList.length,
      urls: visitedList,
    },
    pages_skipped: {
      count: skippedDedup.length,
      entries: skippedDedup,
    },
    queue_incomplete: {
      count: queueIncomplete.length,
      urls: queueIncomplete,
    },
    subdomains_from_sitemap: subdomains,
    config: {
      max_depth: args.maxDepth,
      max_pages: args.maxPages,
      headless: args.headless,
    },
  };

  const manifestPath = path.join(args.outputDir, '_crawl_manifest.json');
  await fs.writeJson(manifestPath, manifest, { spaces: 2 });

  console.log(`[site-scraper] done. visited=${visitedList.length} skipped=${skippedDedup.length} queue_incomplete=${queueIncomplete.length}`);
  console.log(`[site-scraper] manifest: ${manifestPath}`);

  return manifest;
}

// ============================================================================
// CLI ENTRY
// ============================================================================

// Only run if invoked directly (not imported).
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = parseArgs(process.argv.slice(2));
  if (!args.url || !args.outputDir) {
    console.error('Error: --url and --output-dir are required.\n');
    printHelp();
    process.exit(1);
  }
  crawl(args).catch((err) => {
    console.error(`[site-scraper] fatal: ${err.stack || err.message}`);
    process.exit(1);
  });
}

export {
  crawl,
  normalizeUrl,
  sameOrigin,
  shouldExclude,
  hasNonHtmlExt,
  slugForUrl,
  EXCLUDE_PATTERNS,
  NON_HTML_EXT,
  extractUrlsFromSitemap,
};
