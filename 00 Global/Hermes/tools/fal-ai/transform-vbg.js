import { readFileSync, writeFileSync, mkdirSync, existsSync, symlinkSync, copyFileSync } from 'fs';
import { join, basename, dirname } from 'path';

const ANIM_DIR = process.argv[2]; // e.g. /path/to/Animations
const BG_DIR = process.argv[3];   // e.g. /path/to/anim-tests

const config = {
  'T003-riskfree-anim':       { type: 'A', bg: 'collagen-fibers-kling-v2' },
  'T003-everything-anim':     { type: 'A', bg: 'clear-bubble-kling-v3' },
  'T003-welcomegift-v2-anim': { type: 'A', bg: 'cordyceps-kling-v2' },
  'T003-guarantee90-anim':    { type: 'A', bg: 'mitochondria-kling-v5' },

  'T003-save30-anim':     { type: 'B', bg: 'coral-botanical-kling-v2', overlay: 'rgba(89,27,38,0.55)' },
  'T003-261day-anim':     { type: 'B', bg: 'coral-branch-kling-v2',    overlay: 'rgba(100,17,30,0.55)' },
  'T003-joints-anim':     { type: 'B', bg: 'plant-cells-kling',        overlay: 'rgba(49,27,27,0.64)' },

  'T003-fatigue-anim':    { type: 'B', bg: 'turmeric-cross-kling-v3',  overlay: 'rgba(49,27,27,0.64)' },
  'T003-sleep-anim':      { type: 'B', bg: 'enoki-cluster-kling-v2',   overlay: 'rgba(49,27,27,0.64)' },
  'T003-energy-anim':     { type: 'B', bg: 'leaf-stomata-kling-v2',    overlay: 'rgba(49,27,27,0.64)' },
  'T003-welcomegift-anim':{ type: 'B', bg: 'morel-surface-kling-v2',   overlay: 'rgba(49,27,27,0.64)' },
};

function getDuration(html) {
  const m = html.match(/data-duration="(\d+)"/);
  return m ? m[1] : '15';
}

function transformTypeA(html, dur) {
  html = html.replace(
    /<img class="bg-img" id="bg" src="bg\.png" alt="" \/>/,
    `<video class="bg-video" id="bg" src="bg-video.mp4" muted playsinline data-start="0" data-duration="${dur}"></video>`
  );
  html = html.replace(/\.bg-img\s*\{/g, '.bg-video {');
  return html;
}

function transformTypeB(html, dur, overlay) {
  const bgVideoCSS = `
      .bg-video {
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 100%;
        object-fit: cover;
        z-index: 0;
      }
      .bg-overlay {
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 100%;
        background: ${overlay};
        z-index: 1;
      }`;

  const rootBgMatch = html.match(/#root\s*\{[^}]*background:\s*([^;]+);/);

  html = html.replace(
    /(#root\s*\{[^}]*)(display:\s*flex)/,
    `$1position: relative;\n        $2`
  );

  html = html.replace(
    /(#root\s*\{[^}]*?)(display:\s*flex;[\s\S]*?padding:[^;]+;)/,
    (match, before, flexPart) => {
      return before + flexPart;
    }
  );

  const styleClose = html.lastIndexOf('</style>');
  html = html.slice(0, styleClose) + bgVideoCSS + '\n      .content-wrap {\n        position: relative;\n        z-index: 2;\n        width: 100%;\n        height: 100%;\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n      }\n    ' + html.slice(styleClose);

  html = html.replace(
    /(<div id="root"[^>]*>)\s*/,
    `$1\n      <video class="bg-video" id="bg" src="bg-video.mp4" muted playsinline data-start="0" data-duration="${dur}"></video>\n      <div class="bg-overlay" id="bg-overlay"></div>\n      `
  );

  const scriptTag = html.indexOf('<script>');
  const bodyContent = html.slice(html.indexOf('>', html.indexOf('<div id="root"')) + 1, scriptTag);

  const bgElements = bodyContent.match(/<video class="bg-video"[\s\S]*?<\/div>\s*<!--bg-overlay-->/);

  const gsapInsert = `
      tl.fromTo("#bg", { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" }, 0.05);`;

  html = html.replace(
    /(const tl = gsap\.timeline\(\{ paused: true \}\);)/,
    `$1${gsapInsert}`
  );

  return html;
}

function processComposition(name, cfg) {
  const srcDir = join(ANIM_DIR, name);
  const outDir = join(ANIM_DIR, name + '-vbg');
  const srcHtml = join(srcDir, 'index.html');

  if (!existsSync(srcHtml)) {
    console.error(`SKIP: ${srcHtml} not found`);
    return;
  }

  mkdirSync(outDir, { recursive: true });

  let html = readFileSync(srcHtml, 'utf-8');
  const dur = getDuration(html);

  if (cfg.type === 'A') {
    html = transformTypeA(html, dur);
  } else {
    html = transformTypeB(html, dur, cfg.overlay);
  }

  writeFileSync(join(outDir, 'index.html'), html);

  const bgVideoSrc = join(BG_DIR, cfg.bg, 'output.mp4');
  if (existsSync(bgVideoSrc)) {
    const dest = join(outDir, 'bg-video.mp4');
    if (!existsSync(dest)) {
      symlinkSync(bgVideoSrc, dest);
    }
  }

  const assets = ['logo.png', 'bg.png', 'package.json', 'meta.json', 'hyperframes.json', 'CLAUDE.md'];
  for (let i = 1; i <= 6; i++) assets.push(`broll-${i}.mp4`);

  for (const asset of assets) {
    const src = join(srcDir, asset);
    const dest = join(outDir, asset);
    if (existsSync(src) && !existsSync(dest)) {
      try { symlinkSync(src, dest); } catch(e) {}
    }
  }

  console.log(`OK: ${name}-vbg (type ${cfg.type}, bg: ${cfg.bg})`);
}

for (const [name, cfg] of Object.entries(config)) {
  processComposition(name, cfg);
}
console.log('\nAll compositions created.');
