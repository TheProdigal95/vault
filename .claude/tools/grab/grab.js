#!/usr/bin/env node

/**
 * ============================================================================
 * GRAB — Download ad media + metadata from URLs via yt-dlp
 * ============================================================================
 *
 * Downloads video/image media and extracts metadata (ad copy, duration,
 * uploader, etc.) from social platform URLs. Zero API keys required.
 *
 * USAGE:
 *   node grab.js <url> [url2] [url3] ...
 *   node grab.js --urls-from <file>      (one URL per line)
 *
 * OPTIONS:
 *   --output <dir>        Custom output directory (default: ./downloads/session-<date>/)
 *   --cookies-from <browser>  Use cookies from browser (chrome, firefox, safari)
 *   --no-thumbnail        Skip thumbnail download
 *   --metadata-only       Extract metadata without downloading media
 *   --json                Output results as JSON (for piping to other tools)
 *
 * REQUIRES:
 *   brew install yt-dlp ffmpeg   (macOS)
 *   winget install yt-dlp ffmpeg (Windows)
 *
 * ============================================================================
 */

import { execFile, execFileSync } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';

const execFileAsync = promisify(execFile);

// ============================================================================
// CONFIG
// ============================================================================

const TOOLS_DIR = decodeURIComponent(path.dirname(new URL(import.meta.url).pathname));
const DOWNLOADS_DIR = path.join(TOOLS_DIR, 'downloads');

// Find yt-dlp binary
function findYtDlp() {
  const candidates = [
    '/opt/homebrew/bin/yt-dlp',
    '/usr/local/bin/yt-dlp',
    'yt-dlp', // system PATH
  ];
  for (const candidate of candidates) {
    try {
      execFileSync(candidate, ['--version'], { stdio: 'pipe' });
      return candidate;
    } catch {}
  }
  return null;
}

// Find ffmpeg binary
function findFfmpeg() {
  const candidates = [
    '/opt/homebrew/bin/ffmpeg',
    '/usr/local/bin/ffmpeg',
    path.join(process.env.HOME, 'pinokio/bin/miniconda/bin/ffmpeg'),
    'ffmpeg',
  ];
  for (const candidate of candidates) {
    try {
      execFileSync(candidate, ['-version'], { stdio: 'pipe' });
      return candidate;
    } catch {}
  }
  return null;
}

const YT_DLP = findYtDlp();
const FFMPEG = findFfmpeg();

// Find agent-browser binary
function findAgentBrowser() {
  const candidates = [
    '/opt/homebrew/bin/agent-browser',
    '/usr/local/bin/agent-browser',
    'agent-browser',
  ];
  for (const candidate of candidates) {
    try {
      execFileSync(candidate, ['--version'], { stdio: 'pipe' });
      return candidate;
    } catch {}
  }
  return null;
}

const AGENT_BROWSER = findAgentBrowser();

// ============================================================================
// MOTION HANDLER
// ============================================================================

/**
 * Download media from a Motion creative URL using agent-browser.
 * agent-browser navigates the SPA, extracts the video/image URL from the DOM,
 * then we download it directly from Azure Blob Storage (publicly accessible).
 *
 * Session persistence: uses a Chrome profile at ~/.claude/tools/grab/motion-profile/
 * Login once, cookies persist across restarts. If session expires, re-run login.
 *
 * Login command (one-time):
 *   agent-browser --session motion --profile ~/.claude/tools/grab/motion-profile --headed open https://projects.motionapp.com/login
 *   (log in manually in the browser window, then close it)
 */
async function grabMotion(url, outputDir, result) {
  if (!AGENT_BROWSER) {
    result.error = 'agent-browser is not installed. Run: npm install -g agent-browser && agent-browser install';
    return result;
  }

  const HOME = process.env.HOME || process.env.USERPROFILE;
  const MOTION_PROFILE = path.join(HOME, '.claude/tools/grab/motion-profile');
  const isWindows = process.platform === 'win32';
  const envWithPath = { ...process.env, PATH: `/opt/homebrew/bin:/usr/local/bin:${process.env.PATH}` };

  const ab = (args) => execFileAsync(AGENT_BROWSER,
    ['--session', 'motion', '--profile', MOTION_PROFILE, ...args],
    { timeout: 30000, env: envWithPath }
  );

  const LOGIN_CMD = isWindows
    ? `agent-browser --session motion --profile "%USERPROFILE%\\.claude\\tools\\grab\\motion-profile" --headed open https://projects.motionapp.com/login`
    : `pkill -f agent-browser 2>/dev/null; sleep 1; agent-browser --session motion --profile ~/.claude/tools/grab/motion-profile --headed open https://projects.motionapp.com/login`;

  try {
    // Kill any stale daemon so our --profile flag is respected
    if (isWindows) {
      try { execFileSync('taskkill', ['/f', '/im', 'agent-browser.exe'], { stdio: 'pipe' }); } catch {}
    } else {
      try { execFileSync('pkill', ['-f', 'agent-browser'], { stdio: 'pipe' }); } catch {}
    }
    await new Promise(r => setTimeout(r, 1000));

    // Navigate to the creative URL using the persisted profile
    await ab(['open', url]);

    // Wait for page to render
    await new Promise(r => setTimeout(r, 3000));

    // Check if we got redirected to login
    const { stdout: currentUrl } = await ab(['get', 'url']);
    if (currentUrl.trim().includes('/login')) {
      // Close the headless session so headed mode can take over
      try { await ab(['close']); } catch {}

      result.error = `MOTION_LOGIN_REQUIRED: Motion session not found or expired. Run this command to log in (one-time):\n\n  ${LOGIN_CMD}\n\nLog in manually in the browser window. Once you see the Motion dashboard, close the window and retry.`;
      return result;
    }

    // Extract video URL first (check currentSrc — Motion sets source via child <source> element, not src attribute)
    // Fall back to image if no video
    const { stdout: mediaUrl } = await ab(['eval',
      `document.querySelector('video')?.currentSrc || document.querySelector('video source')?.src || Array.from(document.querySelectorAll('img')).map(i => i.src).filter(s => s.includes('creativeasset')).pop() || 'NONE'`
    ]);

    const cleanUrl = mediaUrl.trim().replace(/^"|"$/g, '');

    if (cleanUrl === 'NONE' || !cleanUrl.includes('blob.core.windows.net')) {
      result.error = 'Could not find media URL on Motion page. The creative may not have loaded. Try again.';
      return result;
    }

    // Determine file type from URL
    const isVideo = cleanUrl.includes('video.mp4') || cleanUrl.includes('.mp4');
    const ext = isVideo ? 'mp4' : 'jpeg';

    // Extract creative ID from the Motion URL for naming
    const creativeMatch = url.match(/creative\/([a-f0-9]+)/);
    const creativeId = creativeMatch ? creativeMatch[1] : 'unknown';
    const filename = `motion-${creativeId}.${ext}`;
    const outputPath = path.join(outputDir, filename);

    // Download directly from Azure Blob (publicly accessible, no auth needed)
    await execFileAsync('curl', ['-sL', '-o', outputPath, cleanUrl]);

    result.success = true;
    result.media_files.push(filename);
    result.metadata = {
      platform: 'motion',
      source_url: url,
      media_url: cleanUrl,
      type: isVideo ? 'video' : 'image',
    };

    // Try to extract ad copy from the page
    try {
      const { stdout: adCopy } = await ab(['--session', 'motion', 'eval',
        `document.querySelector('[class*="primary"], [class*="body-text"], [class*="ad-copy"]')?.textContent || ''`
      ]);
      const cleanCopy = adCopy.trim().replace(/^"|"$/g, '');
      if (cleanCopy && cleanCopy.length > 5) {
        result.ad_copy = cleanCopy;
      }
    } catch {}

  } catch (err) {
    result.error = `Motion grab failed: ${err.message}`;
    if (err.message.includes('ENOENT') || err.message.includes('not found')) {
      result.error += '\n\nagent-browser not found. Install with: npm install -g agent-browser && agent-browser install';
    }
  }

  return result;
}

// ============================================================================
// MOTION REPORT HANDLER (batch mode — one report URL, all creatives)
// ============================================================================

/**
 * Download media from a Motion report or snapshot page.
 *
 * Approach (table thumbnail scraping — verified working on Lifeforce 20/20):
 * 1. Navigate to the report/snapshot URL
 * 2. Scroll to load all table rows (authenticated reports use virtualized rendering)
 * 3. Scrape the table: each row has an ad name + a thumbnail img
 * 4. On authenticated reports: thumbnails are creativeassetfacebook URLs (full-size, videos available)
 * 5. On snapshots: thumbnails are snapshotasset/adunit URLs (images only, no videos)
 * 6. For videos: swap cover.jpg → video.mp4 at the same CDN path
 * 7. Download all media via curl
 *
 * NO panel clicking, NO grid card refs, NO snapshot accessibility tree parsing.
 * Just table scraping + direct CDN download.
 */
async function grabMotionReport(reportUrl, outputDir, adNames = null) {
  if (!AGENT_BROWSER) {
    return { success: false, error: 'agent-browser is not installed. Run: npm install -g agent-browser && agent-browser install', results: [] };
  }

  const HOME = process.env.HOME || process.env.USERPROFILE;
  const MOTION_PROFILE = path.join(HOME, '.claude/tools/grab/motion-profile');
  const isWindows = process.platform === 'win32';
  const envWithPath = { ...process.env, PATH: `/opt/homebrew/bin:/usr/local/bin:${process.env.PATH}` };
  const isSnapshot = reportUrl.includes('/snapshot/');

  const ab = (args) => execFileAsync(AGENT_BROWSER,
    ['--session', 'motion', '--profile', MOTION_PROFILE, ...args],
    { timeout: 30000, env: envWithPath }
  );

  const LOGIN_CMD = isWindows
    ? `agent-browser --session motion --profile "%USERPROFILE%\\.claude\\tools\\grab\\motion-profile" --headed open https://projects.motionapp.com/login`
    : `pkill -f agent-browser 2>/dev/null; sleep 1; agent-browser --session motion --profile ~/.claude/tools/grab/motion-profile --headed open https://projects.motionapp.com/login`;

  // Kill stale daemon so --profile is respected
  if (isWindows) {
    try { execFileSync('taskkill', ['/f', '/im', 'agent-browser.exe'], { stdio: 'pipe' }); } catch {}
  } else {
    try { execFileSync('pkill', ['-f', 'agent-browser'], { stdio: 'pipe' }); } catch {}
  }
  await new Promise(r => setTimeout(r, 1000));

  console.error(`\nMotion ${isSnapshot ? 'Snapshot' : 'Report'} Mode`);
  console.error(`URL: ${reportUrl}`);
  if (adNames) console.error(`Filtering to ${adNames.length} ads from CSV`);

  try {
    // Step 1: Navigate to the page
    await ab(['open', reportUrl]);
    await new Promise(r => setTimeout(r, 8000));

    // Check login (snapshots are public, authenticated reports need auth)
    if (!isSnapshot) {
      const { stdout: currentUrl } = await ab(['get', 'url']);
      if (currentUrl.trim().includes('/login')) {
        try { await ab(['close']); } catch {}
        return { success: false, error: `MOTION_LOGIN_REQUIRED: Run:\n  ${LOGIN_CMD}`, results: [] };
      }
    }

    // Step 2: Scroll to load all table rows (for authenticated reports with virtualized rendering)
    if (!isSnapshot) {
      console.error('  Scrolling to load all table rows...');
      for (let s = 0; s < 15; s++) {
        try { await ab(['scroll', 'down', '800']); } catch {}
        await new Promise(r => setTimeout(r, 400));
      }
      try { await ab(['scroll', 'up', '15000']); } catch {}
      await new Promise(r => setTimeout(r, 1000));
    }

    // Step 3: Scrape the table — get ad name + thumbnail URL for each row
    console.error('  Scraping table for ad names + thumbnails...');
    const { stdout: rawData } = await ab(['eval', `
      (function() {
        var cells = document.querySelectorAll('[role=cell], td');
        var results = [];
        cells.forEach(function(c) {
          var text = c.textContent || '';
          if (text.indexOf('1 ad') === -1 && text.indexOf(' ads') === -1) return;
          var img = c.querySelector('img');
          var imgSrc = img ? img.src : null;
          var pEls = c.querySelectorAll('p');
          var name = null;
          for (var i = 0; i < pEls.length; i++) {
            var t = pEls[i].textContent ? pEls[i].textContent.trim() : '';
            if (t.length > 5 && t.indexOf('1 ad') === -1 && t.indexOf(' ads') === -1 && t.indexOf('Ad breakdown') === -1) {
              name = t;
              break;
            }
          }
          if (name && imgSrc && imgSrc.indexOf('blob.core.windows.net') !== -1) {
            var isDup = false;
            for (var j = 0; j < results.length; j++) { if (results[j].name === name) { isDup = true; break; } }
            if (!isDup) results.push({ name: name, thumbnail: imgSrc });
          }
        });
        return JSON.stringify(results);
      })()
    `]);

    // Parse the result (agent-browser wraps in quotes with escaped inner quotes)
    let cleanJson = rawData.trim();
    if (cleanJson.startsWith('"') && cleanJson.endsWith('"')) {
      cleanJson = cleanJson.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    }
    const allCreatives = JSON.parse(cleanJson);
    console.error(`  Found ${allCreatives.length} creatives with thumbnails`);

    if (allCreatives.length === 0) {
      return { success: false, error: 'No creatives found in table. The page may not have loaded fully, or no thumbnails were available.', results: [] };
    }

    // Step 4: Filter to CSV ad names if provided
    let toDownload = allCreatives;
    if (adNames && adNames.length > 0) {
      toDownload = [];
      for (const csvName of adNames) {
        const csvLower = csvName.toLowerCase().trim();
        let best = null;
        let bestScore = 0;
        for (const creative of allCreatives) {
          const motionLower = creative.name.toLowerCase().trim();
          if (motionLower === csvLower) { best = creative; bestScore = 100; break; }
          if (motionLower.includes(csvLower) || csvLower.includes(motionLower)) {
            if (motionLower.length > bestScore) { best = creative; bestScore = motionLower.length; }
          }
          const csvWords = csvLower.split(/[\s\-_]+/).filter(w => w.length > 2);
          const motionWords = motionLower.split(/[\s\-_]+/).filter(w => w.length > 2);
          const overlap = csvWords.filter(w => motionWords.some(mw => mw.includes(w) || w.includes(mw))).length;
          const score = overlap / Math.max(csvWords.length, 1);
          if (score > 0.6 && score > bestScore / 100) { best = creative; bestScore = score * 100; }
        }
        if (best && !toDownload.find(d => d.name === best.name)) {
          toDownload.push({ ...best, csvName });
        } else if (!best) {
          console.error(`  WARNING: No match for CSV ad "${csvName.substring(0, 50)}"`);
        }
      }
      console.error(`  Matched ${toDownload.length}/${adNames.length} ads from CSV`);
    }

    // Step 5: Download each creative
    const results = [];
    for (let i = 0; i < toDownload.length; i++) {
      const creative = toDownload[i];
      const displayName = (creative.csvName || creative.name).substring(0, 60);
      // 120 chars: long enough to distinguish all Motion names (V1 vs V2 differs at ~58),
        // short enough for Windows 260-char path limit (path ~130 + name 120 + ext 5 = 255)
        const safeName = creative.name.replace(/[^a-zA-Z0-9\-_ ]/g, '').substring(0, 120).trim();
      console.error(`  [${i + 1}/${toDownload.length}] ${displayName}`);

      const result = {
        url: reportUrl,
        platform: 'motion-report',
        success: false,
        media_files: [],
        metadata: { name: creative.name, csvName: creative.csvName || null },
        ad_copy: null,
        error: null,
      };

      try {
        const thumbUrl = creative.thumbnail;
        const isCover = thumbUrl.includes('/cover.');

        // Determine download URL
        let downloadUrl = thumbUrl;
        let isVideo = false;

        // If thumbnail is a cover image, try to get the video
        if (isCover) {
          const videoUrl = thumbUrl.replace(/\/cover\.(jpg|jpeg|png)$/i, '/video.mp4');
          try {
            await execFileAsync('curl', ['-sI', '--fail', videoUrl], { timeout: 10000 });
            downloadUrl = videoUrl;
            isVideo = true;
          } catch {
            // No video at this path — download the cover image instead
          }
        }

        const filename = isVideo
          ? `${safeName}.mp4`
          : `${safeName}.${thumbUrl.match(/\.(jpeg|jpg|png)$/i)?.[1] || 'jpeg'}`;
        const outputPath = path.join(outputDir, filename);

        // Download
        await execFileAsync('curl', ['-sL', '-o', outputPath, '--fail', downloadUrl], { timeout: 120000 });

        const stat = fs.statSync(outputPath);
        if (stat.size > 0) {
          result.success = true;
          result.media_files.push(filename);
          result.metadata.type = isVideo ? 'video' : 'image';
          result.metadata.media_url = downloadUrl;
          result.metadata.size = stat.size;
          console.error(`    OK: ${isVideo ? 'video' : 'image'} (${(stat.size / 1024 / 1024).toFixed(1)}MB)`);
        } else {
          result.error = 'Downloaded file is empty';
          try { fs.unlinkSync(outputPath); } catch {}
          console.error(`    FAILED: empty file`);
        }
      } catch (err) {
        result.error = `Download failed: ${err.message}`;
        console.error(`    FAILED: ${err.message.substring(0, 80)}`);
      }

      results.push(result);
    }

    const succeeded = results.filter(r => r.success).length;
    console.error(`\n  Done: ${succeeded}/${results.length} downloaded`);

    return { success: succeeded > 0, results };

  } catch (err) {
    return { success: false, error: `Motion report scrape failed: ${err.message}`, results: [] };
  }
}

// ============================================================================
// URL DETECTION
// ============================================================================

/**
 * Extract all URLs from a text string
 */
function extractUrls(text) {
  const urlPattern = /https?:\/\/[^\s<>"')\]]+/g;
  return [...new Set(text.match(urlPattern) || [])];
}

/**
 * Detect which platform a URL belongs to
 */
function detectPlatform(url) {
  const u = url.toLowerCase();
  if (u.includes('tiktok.com')) return 'tiktok';
  if (u.includes('twitter.com') || u.includes('x.com')) return 'twitter';
  if (u.includes('instagram.com')) return 'instagram';
  if (u.includes('youtube.com') || u.includes('youtu.be')) return 'youtube';
  if (u.includes('facebook.com/ads/library')) return 'meta-ad-library';
  if (u.includes('facebook.com') || u.includes('fb.watch')) return 'facebook';
  // Motion report/snapshot pages
  if ((u.includes('motionapp.com') || u.includes('motion.')) && (u.includes('/top/') || u.includes('/snapshot/'))) return 'motion-report';
  if (u.includes('motion.') || u.includes('motionapp.')) return 'motion';
  if (/\.(mp4|mov|webm|avi|mkv)(\?|$)/i.test(url)) return 'direct-video';
  if (/\.(jpg|jpeg|png|webp|gif)(\?|$)/i.test(url)) return 'direct-image';
  return 'unknown';
}

// ============================================================================
// DOWNLOAD
// ============================================================================

/**
 * Download media + metadata for a single URL using yt-dlp
 */
async function grabUrl(url, outputDir, options = {}) {
  const platform = detectPlatform(url);
  const result = {
    url,
    platform,
    success: false,
    media_files: [],
    metadata: null,
    ad_copy: null,
    error: null,
  };

  // Direct file downloads — just use curl
  if (platform === 'direct-video' || platform === 'direct-image') {
    try {
      const filename = path.basename(new URL(url).pathname);
      const outputPath = path.join(outputDir, filename);
      await execFileAsync('curl', ['-sL', '-o', outputPath, url]);
      result.success = true;
      result.media_files.push(filename);
      return result;
    } catch (err) {
      result.error = `Direct download failed: ${err.message}`;
      return result;
    }
  }

  // Meta Ad Library — not supported by yt-dlp
  if (platform === 'meta-ad-library') {
    result.error = 'Meta Ad Library URLs are not supported by yt-dlp. Use the /ad-library command for bulk Ad Library pulls, or find the direct video URL from the ad library page (DevTools > Network > filter .mp4).';
    return result;
  }

  // Motion — use agent-browser to extract media URL from the SPA
  if (platform === 'motion') {
    return grabMotion(url, outputDir, result);
  }

  // Everything else — yt-dlp
  if (!YT_DLP) {
    result.error = 'yt-dlp is not installed. Run: brew install yt-dlp ffmpeg';
    return result;
  }

  const outputTemplate = path.join(outputDir, '%(uploader)s - %(id)s.%(ext)s');

  // Step 1: Get metadata first (fast, no download)
  try {
    const metaArgs = ['--dump-json', '--no-download'];
    if (options.cookiesFrom) {
      metaArgs.push('--cookies-from-browser', options.cookiesFrom);
    }
    metaArgs.push(url);

    const { stdout } = await execFileAsync(YT_DLP, metaArgs, {
      maxBuffer: 10 * 1024 * 1024,
      timeout: 60000,
    });

    const meta = JSON.parse(stdout);
    result.metadata = {
      title: meta.title || null,
      description: meta.description || null,
      uploader: meta.uploader || meta.channel || null,
      duration: meta.duration || null,
      upload_date: meta.upload_date || null,
      view_count: meta.view_count || null,
      like_count: meta.like_count || null,
      webpage_url: meta.webpage_url || url,
      ext: meta.ext || 'mp4',
      id: meta.id || null,
    };

    // Ad copy is in the description field
    result.ad_copy = meta.description || null;

  } catch (err) {
    // Metadata extraction failed — might still be able to download
    console.error(`  Warning: metadata extraction failed for ${url}: ${err.message}`);
  }

  // Step 2: Download media (unless metadata-only mode)
  if (!options.metadataOnly) {
    try {
      const dlArgs = [
        '-o', outputTemplate,
        '--write-info-json',
        '--no-playlist',
      ];

      if (!options.noThumbnail) {
        dlArgs.push('--write-thumbnail', '--convert-thumbnails', 'jpg');
      }

      if (FFMPEG) {
        dlArgs.push('--ffmpeg-location', FFMPEG);
      }

      if (options.cookiesFrom) {
        dlArgs.push('--cookies-from-browser', options.cookiesFrom);
      }

      dlArgs.push(url);

      const { stdout, stderr } = await execFileAsync(YT_DLP, dlArgs, {
        maxBuffer: 50 * 1024 * 1024,
        timeout: 300000, // 5 min max per download
      });

      // Find downloaded files
      const files = fs.readdirSync(outputDir);
      const id = result.metadata?.id || '';
      const newFiles = files.filter(f => !f.endsWith('.part'));

      result.media_files = newFiles.filter(f =>
        /\.(mp4|mov|webm|mkv|avi|jpg|jpeg|png|webp)$/i.test(f)
      );
      result.success = true;

    } catch (err) {
      result.error = `Download failed: ${err.message}`;

      // Common errors with helpful messages
      if (err.message.includes('login') || err.message.includes('cookie') || err.message.includes('403')) {
        result.error += `\n\nThis platform may require cookies. Try: node grab.js --cookies-from chrome "${url}"`;
      }
    }
  } else {
    result.success = result.metadata !== null;
  }

  return result;
}

/**
 * Grab multiple URLs
 */
async function grabAll(urls, outputDir, options = {}) {
  const results = [];

  for (const url of urls) {
    const platform = detectPlatform(url);
    console.error(`\nGrabbing: ${url}`);
    console.error(`  Platform: ${platform}`);

    const result = await grabUrl(url, outputDir, options);

    if (result.success) {
      const fileCount = result.media_files.length;
      const duration = result.metadata?.duration
        ? `${Math.floor(result.metadata.duration / 60)}:${String(Math.floor(result.metadata.duration % 60)).padStart(2, '0')}`
        : '';
      console.error(`  OK: ${fileCount} file(s)${duration ? ` (${duration})` : ''}`);
      if (result.ad_copy) {
        const preview = result.ad_copy.substring(0, 80).replace(/\n/g, ' ');
        console.error(`  Ad copy: "${preview}${result.ad_copy.length > 80 ? '...' : ''}"`);
      }
    } else {
      console.error(`  FAILED: ${result.error}`);
    }

    results.push(result);
  }

  return results;
}

// ============================================================================
// FORMAT RESULTS
// ============================================================================

function formatResults(results, outputDir) {
  const lines = [];
  const succeeded = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  lines.push(`\n=== Grab Results ===`);
  lines.push(`Downloaded: ${succeeded.length}/${results.length}`);
  lines.push(`Location: ${outputDir}\n`);

  for (const r of results) {
    const status = r.success ? 'OK' : 'FAIL';
    const duration = r.metadata?.duration
      ? ` (${Math.floor(r.metadata.duration / 60)}:${String(Math.floor(r.metadata.duration % 60)).padStart(2, '0')})`
      : '';

    lines.push(`[${status}] ${r.platform}: ${r.url}${duration}`);

    if (r.success && r.media_files.length > 0) {
      for (const f of r.media_files) {
        lines.push(`  File: ${path.join(outputDir, f)}`);
      }
    }

    if (r.metadata?.media_url) {
      lines.push(`  Preview: ${r.metadata.media_url}`);
    }

    if (r.ad_copy) {
      lines.push(`  Ad copy: ${r.ad_copy.substring(0, 120).replace(/\n/g, ' ')}${r.ad_copy.length > 120 ? '...' : ''}`);
    }

    if (r.error) {
      lines.push(`  Error: ${r.error}`);
    }

    lines.push('');
  }

  return lines.join('\n');
}

// ============================================================================
// CLI
// ============================================================================

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log(`
Grab — Download ad media + metadata from URLs

Usage:
  node grab.js <url> [url2] [url3] ...
  node grab.js --urls-from <file>
  node grab.js <motion-report-url> --ad-names "Ad Name 1" "Ad Name 2" ...

Options:
  --output <dir>             Output directory (default: downloads/session-<date>/)
  --cookies-from <browser>   Use cookies from browser (chrome, firefox, safari)
  --no-thumbnail             Skip thumbnail download
  --metadata-only            Extract metadata without downloading media
  --json                     Output results as JSON
  --ad-names <name> [name2]  Filter Motion report to specific ad names (from CSV)

Motion Report Mode:
  Pass a Motion "Top Creatives" report URL (contains /top/ in path).
  Scrapes the table on the report page and downloads all creatives.
  Use --ad-names to filter to specific ads from your CSV export.

Supported platforms:
  YouTube, TikTok, Twitter/X, Instagram*, Facebook*, Motion, Motion reports,
  direct video/image URLs
  (* = may need --cookies-from chrome for reliable access)

Setup:
  macOS:   brew install yt-dlp ffmpeg
  Windows: winget install yt-dlp ffmpeg
`);
    process.exit(0);
  }

  // Parse arguments
  let urls = [];
  let outputDir = null;
  let cookiesFrom = null;
  let noThumbnail = false;
  let metadataOnly = false;
  let jsonOutput = false;
  let adNames = [];
  let parsingAdNames = false;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--output' && args[i + 1]) {
      outputDir = args[++i];
      parsingAdNames = false;
    } else if (args[i] === '--cookies-from' && args[i + 1]) {
      cookiesFrom = args[++i];
      parsingAdNames = false;
    } else if (args[i] === '--urls-from' && args[i + 1]) {
      const filePath = args[++i];
      const content = fs.readFileSync(filePath, 'utf-8');
      urls.push(...extractUrls(content));
      parsingAdNames = false;
    } else if (args[i] === '--no-thumbnail') {
      noThumbnail = true;
      parsingAdNames = false;
    } else if (args[i] === '--metadata-only') {
      metadataOnly = true;
      parsingAdNames = false;
    } else if (args[i] === '--json') {
      jsonOutput = true;
      parsingAdNames = false;
    } else if (args[i] === '--ad-names') {
      parsingAdNames = true;
    } else if (parsingAdNames && !args[i].startsWith('--')) {
      adNames.push(args[i]);
    } else if (!args[i].startsWith('--')) {
      parsingAdNames = false;
      // Could be a URL or text containing URLs
      const extracted = extractUrls(args[i]);
      if (extracted.length > 0) {
        urls.push(...extracted);
      } else if (args[i].startsWith('http')) {
        urls.push(args[i]);
      }
    }
  }

  if (urls.length === 0) {
    console.error('Error: No URLs provided');
    process.exit(1);
  }

  // Create session output directory
  if (!outputDir) {
    const sessionId = new Date().toISOString().replace(/[:.]/g, '-').substring(0, 19);
    outputDir = path.join(DOWNLOADS_DIR, `session-${sessionId}`);
  }
  fs.mkdirSync(outputDir, { recursive: true });

  // Check if any URL is a Motion report
  const motionReportUrl = urls.find(u => detectPlatform(u) === 'motion-report');
  const otherUrls = urls.filter(u => detectPlatform(u) !== 'motion-report');

  let allResults = [];

  // Handle Motion report URL (batch mode)
  if (motionReportUrl) {
    console.error(`\nMotion Report Mode`);
    console.error(`Output: ${outputDir}`);
    const reportResult = await grabMotionReport(motionReportUrl, outputDir, adNames.length > 0 ? adNames : null);
    if (!reportResult.success && reportResult.error) {
      console.error(`\nError: ${reportResult.error}`);
    }
    allResults.push(...reportResult.results);
  }

  // Handle remaining URLs normally
  if (otherUrls.length > 0) {
    console.error(`\nGrabbing ${otherUrls.length} URL(s)...`);
    console.error(`Output: ${outputDir}`);
    const results = await grabAll(otherUrls, outputDir, {
      cookiesFrom,
      noThumbnail,
      metadataOnly,
    });
    allResults.push(...results);
  }

  if (jsonOutput) {
    console.log(JSON.stringify({ outputDir, results: allResults }, null, 2));
  } else {
    console.log(formatResults(allResults, outputDir));
  }

  // Summary
  const succeeded = allResults.filter(r => r.success).length;
  if (allResults.length > 0 && succeeded < allResults.length) {
    process.exit(1);
  }
}

main().catch(err => {
  console.error(`Fatal error: ${err.message}`);
  process.exit(1);
});
