#!/usr/bin/env node
/**
 * export-ae.js — Converts a Hyperframes end card to After Effects ExtendScript (.jsx)
 *
 * Usage:
 *   node export-ae.js --project <dir> --output <file.jsx>
 *
 * Reads index.html, extracts layers/styles/GSAP keyframes, generates a .jsx
 * that rebuilds the composition in After Effects with all layers, positions,
 * rounded-corner masks, text styling, b-roll pre-comp, and entrance animations.
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, basename, join } from "path";

function parseArgs(argv) {
  const args = argv.slice(2);
  const result = { project: null, output: null };
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--project") result.project = args[++i];
    else if (args[i] === "--output") result.output = args[++i];
  }
  return result;
}

const opts = parseArgs(process.argv);
if (!opts.project || !opts.output) {
  console.error(`Usage: node export-ae.js --project <dir> --output <file.jsx>

Converts a Hyperframes end card composition to After Effects ExtendScript.
The generated .jsx rebuilds the composition with layers, keyframes, and easing.

Options:
  --project <dir>    Path to the Hyperframes project directory (must contain index.html)
  --output <file>    Output path for the .jsx file`);
  process.exit(1);
}

const projectDir = resolve(opts.project);
const htmlPath = join(projectDir, "index.html");
if (!existsSync(htmlPath)) {
  console.error(`index.html not found in: ${projectDir}`);
  process.exit(1);
}

const html = readFileSync(htmlPath, "utf-8");
const compName = basename(projectDir);

// ===================== Parsers =====================

function parsePx(s) {
  if (!s) return 0;
  const m = s.match(/([\d.]+)\s*px/);
  return m ? parseFloat(m[1]) : 0;
}

function parseColor(s) {
  if (!s) return [1, 1, 1];
  s = s.trim();
  if (s.startsWith("#")) {
    const h = s.slice(1);
    if (h.length === 3)
      return [
        parseInt(h[0] + h[0], 16) / 255,
        parseInt(h[1] + h[1], 16) / 255,
        parseInt(h[2] + h[2], 16) / 255,
      ];
    return [
      parseInt(h.slice(0, 2), 16) / 255,
      parseInt(h.slice(2, 4), 16) / 255,
      parseInt(h.slice(4, 6), 16) / 255,
    ];
  }
  const m = s.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (m) return [+m[1] / 255, +m[2] / 255, +m[3] / 255];
  return [1, 1, 1];
}

function parseOpacity(s) {
  if (!s) return 1;
  const m = s.match(/rgba?\([^)]*,\s*([\d.]+)\s*\)/);
  return m ? parseFloat(m[1]) : 1;
}

function stripHTML(s) {
  return s
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .trim();
}

function parseCSS(html) {
  const m = html.match(/<style>([\s\S]*?)<\/style>/);
  if (!m) return {};
  const rules = {};
  const re = /([^{}]+?)\s*\{([^}]+)\}/g;
  let match;
  while ((match = re.exec(m[1]))) {
    const selectors = match[1].trim().split(",").map((s) => s.trim());
    const props = {};
    match[2].split(";").forEach((d) => {
      const ci = d.indexOf(":");
      if (ci > 0) {
        const prop = d.slice(0, ci).trim();
        const val = d.slice(ci + 1).trim();
        if (prop && val) props[prop] = val;
      }
    });
    selectors.forEach((s) => {
      rules[s] = { ...(rules[s] || {}), ...props };
    });
  }
  return rules;
}

function extractElements(html) {
  const els = [];
  let m;

  m = html.match(/<img[^>]*id="bg"[^>]*src="([^"]+)"/);
  if (m) els.push({ id: "bg", type: "image", src: m[1] });

  m = html.match(/<div[^>]*id="logo"[\s\S]*?<img[^>]*src="([^"]+)"/);
  if (m) els.push({ id: "logo", type: "image", src: m[1] });

  m = html.match(
    /<div[^>]*(?:id="pill"|class="[^"]*capsule[^"]*")[^>]*>([\s\S]*?)<\/div>/
  );
  if (m) els.push({ id: "pill", type: "pill", text: stripHTML(m[1]) });

  const h1 = html.match(
    /<div[^>]*class="headline-line1"[^>]*>([\s\S]*?)<\/div>/
  );
  const h2 = html.match(
    /<div[^>]*class="headline-line2"[^>]*>([\s\S]*?)<\/div>/
  );
  if (h1)
    els.push({
      id: "headline-line1",
      type: "text",
      text: stripHTML(h1[1]),
      css: ".headline-line1",
      parentAnim: "#headline",
    });
  if (h2)
    els.push({
      id: "headline-line2",
      type: "text",
      text: stripHTML(h2[1]),
      css: ".headline-line2",
      parentAnim: "#headline",
    });
  if (!h1 && !h2) {
    m = html.match(
      /<(?:div|h\d)[^>]*class="headline"[^>]*>([\s\S]*?)<\/(?:div|h\d)>/
    );
    if (m)
      els.push({
        id: "headline",
        type: "text",
        text: stripHTML(m[1]),
        css: ".headline",
      });
  }

  m = html.match(/<div[^>]*id="subhead"[^>]*>([\s\S]*?)<\/div>/);
  if (m) els.push({ id: "subhead", type: "text", text: stripHTML(m[1]), css: ".subhead" });

  m = html.match(/<div[^>]*id="guarantee"[^>]*>([\s\S]*?)<\/div>/);
  if (m)
    els.push({
      id: "guarantee",
      type: "text",
      text: stripHTML(m[1]),
      css: ".guarantee",
    });

  const brolls = [
    ...html.matchAll(
      /<video[^>]*id="(broll-\d+)"[^>]*src="([^"]+)"[^>]*/g
    ),
  ];
  if (brolls.length > 0) {
    els.push({
      id: "hero",
      type: "broll-container",
      count: brolls.length,
      videos: brolls.map((b) => ({ id: b[1], src: b[2] })),
    });
  } else {
    m = html.match(/<div[^>]*id="hero"[\s\S]*?<img[^>]*src="([^"]+)"/);
    if (m)
      els.push({ id: "hero", type: "hero-image", src: m[1], css: ".hero-wrapper" });
  }

  const badges = [
    ...html.matchAll(
      /<div[^>]*id="(badge\d+)"[^>]*>[\s\S]*?<span[^>]*class="badge-title"[^>]*>([\s\S]*?)<\/span>/g
    ),
  ];
  badges.forEach((b) =>
    els.push({ id: b[1], type: "badge", text: stripHTML(b[2]) })
  );

  m = html.match(
    /<span[^>]*class="cta-text"[^>]*>([\s\S]*?)<\/span>/
  );
  if (m) els.push({ id: "cta", type: "cta", text: stripHTML(m[1]) });

  m = html.match(/<div[^>]*id="footnote"[^>]*>([\s\S]*?)<\/div>/);
  if (m)
    els.push({
      id: "footnote",
      type: "text",
      text: stripHTML(m[1]),
      css: ".footnote",
    });

  m = html.match(/<div[^>]*id="disclaimer"[^>]*>([\s\S]*?)<\/div>/);
  if (m)
    els.push({
      id: "disclaimer",
      type: "text",
      text: stripHTML(m[1]),
      css: ".disclaimer",
    });

  return els;
}

function parseGSAP(html) {
  const sm = html.match(/<script>([\s\S]*?)<\/script>/);
  if (!sm) return { keyframes: [], montage: null };
  const script = sm[1];
  const keyframes = [];

  const fromRe =
    /tl\.from\(\s*"([^"]+)"\s*,\s*\{([^}]+)\}\s*,\s*([\d.]+)\s*\)/g;
  let m;
  while ((m = fromRe.exec(script))) {
    keyframes.push({
      type: "from",
      selector: m[1],
      props: parseGProps(m[2]),
      time: +m[3],
    });
  }

  const fromToRe =
    /tl\.fromTo\(\s*"([^"]+)"\s*,\s*\{([^}]+)\}\s*,\s*\{([^}]+)\}\s*,\s*([\d.]+)\s*\)/g;
  while ((m = fromToRe.exec(script))) {
    keyframes.push({
      type: "fromTo",
      selector: m[1],
      from: parseGProps(m[2]),
      to: parseGProps(m[3]),
      time: +m[4],
    });
  }

  let montage = null;
  const sv = script.match(/scenes\s*=\s*(\d+)/);
  const ms = script.match(/montageStart\s*=\s*([\d.]+)/);
  const me = script.match(/montageEnd\s*=\s*([\d.]+)/);
  const fd = script.match(/fadeDur\s*=\s*([\d.]+)/);
  if (sv && ms && me && fd) {
    montage = {
      scenes: +sv[1],
      start: +ms[1],
      end: +me[1],
      fadeDur: +fd[1],
    };
  }

  return { keyframes, montage };
}

function parseGProps(s) {
  const p = {};
  const re = /(\w+)\s*:\s*(?:"([^"]+)"|'([^']+)'|([\d.+-]+))/g;
  let m;
  while ((m = re.exec(s))) {
    p[m[1]] = m[2] || m[3] || parseFloat(m[4]);
  }
  return p;
}

// ===================== Layout Computer =====================

function computeLayout(elements, css) {
  const W = 1080,
    H = 1920;
  const contentCSS = css[".content"] || {};
  const padding = contentCSS.padding || "104px 52px 52px";
  const pp = padding.split(/\s+/).map(parsePx);
  const padT = pp[0];
  const padR = pp.length >= 2 ? pp[1] : pp[0];
  const padL = pp.length >= 4 ? pp[3] : padR;
  const innerW = W - padL - padR;

  let y = padT;
  const pos = {};

  for (const el of elements) {
    const elCSS =
      css[el.css || `.${el.id}`] || css[`#${el.id}`] || {};

    if (el.id === "bg") {
      pos.bg = { x: W / 2, y: H / 2, w: W, h: H };
      continue;
    }

    if (el.id === "logo") {
      const imgCSS = css[".logo-wrapper img"] || {};
      const wrapCSS = css[".logo-wrapper"] || {};
      const h = parsePx(imgCSS.height) || 67;
      const mb = parsePx(wrapCSS["margin-bottom"]) || 0;
      pos.logo = { x: W / 2, y: y + h / 2, w: 200, h };
      y += h + mb;
      continue;
    }

    if (el.type === "pill") {
      const pillCSS = css[".capsule"] || css[".pill"] || {};
      const h = 40;
      const mb = parsePx(pillCSS["margin-bottom"]) || 0;
      pos.pill = { x: W / 2, y: y + h / 2, w: 300, h };
      y += h + mb;
      continue;
    }

    if (el.type === "text" && el.id !== "footnote" && el.id !== "disclaimer") {
      const fontSize = parsePx(elCSS["font-size"]) || 48;
      const lh = elCSS["line-height"]
        ? parseFloat(elCSS["line-height"])
        : 1.1;
      const h = fontSize * lh;
      const mb = parsePx(elCSS["margin-bottom"]) || 0;
      pos[el.id] = { x: W / 2, y: y + h / 2, w: innerW, h, fontSize };
      y += h + mb;
      continue;
    }

    if (el.type === "broll-container" || el.type === "hero-image") {
      const heroCSS = css[".hero-wrapper"] || {};
      const w = parsePx(heroCSS.width) || innerW;
      const h = parsePx(heroCSS.height) || 742;
      const mb = parsePx(heroCSS["margin-bottom"]) || 0;
      const radius = parsePx(heroCSS["border-radius"]) || 20;
      const border = parsePx(heroCSS.border) || 0;
      pos.hero = { x: W / 2, y: y + h / 2, w, h, radius, border };
      y += h + mb;
      continue;
    }

    if (el.type === "badge" && !pos._badges_done) {
      const badgesCSS = css[".badges"] || {};
      const badgeCSS = css[".badge"] || {};
      const titleCSS = css[".badge-title"] || {};
      const rowW = parsePx(badgesCSS.width) || innerW;
      const gap = parsePx(badgesCSS.gap) || 24;
      const count = elements.filter((e) => e.type === "badge").length;
      const eachW = (rowW - gap * (count - 1)) / count;
      const padV = parsePx(badgeCSS.padding) || 18;
      const fs = parsePx(titleCSS["font-size"]) || 24;
      const h = padV * 2 + fs;
      const radius = parsePx(badgeCSS["border-radius"]) || 33;
      const mb = parsePx(badgesCSS["margin-bottom"]) || 0;

      const rowLeft = W / 2 - rowW / 2;
      let bi = 0;
      for (const be of elements.filter((e) => e.type === "badge")) {
        const cx = rowLeft + eachW / 2 + bi * (eachW + gap);
        pos[be.id] = { x: cx, y: y + h / 2, w: eachW, h, radius, fontSize: fs };
        bi++;
      }
      y += h + mb;
      pos._badges_done = true;
      continue;
    }
    if (el.type === "badge") continue;

    if (el.type === "cta") {
      const ctaCSS = css[".cta"] || {};
      const ctaTextCSS = css[".cta-text"] || {};
      const w = parsePx(ctaCSS.width) || innerW;
      const padV = parsePx(ctaCSS.padding) || 28;
      const fs = parsePx(ctaTextCSS["font-size"]) || 36;
      const h = padV * 2 + fs;
      const radius = parsePx(ctaCSS["border-radius"]) || 45;
      const mb = parsePx(ctaCSS["margin-bottom"]) || 0;
      pos.cta = { x: W / 2, y: y + h / 2, w, h, radius, fontSize: fs };
      y += h + mb;
      continue;
    }

    if (el.id === "footnote" || el.id === "disclaimer") {
      const fs = parsePx(elCSS["font-size"]) || 22;
      const h = fs * 1.3;
      const mb = parsePx(elCSS["margin-bottom"]) || 0;
      pos[el.id] = { x: W / 2, y: y + h / 2, w: innerW, h, fontSize: fs };
      y += h + mb;
      continue;
    }
  }

  delete pos._badges_done;
  return pos;
}

// ===================== JSX Generator =====================

function generateJSX(elements, css, positions, gsapData) {
  const W = 1080, H = 1920;
  const L = [];
  const I = "    ";

  function fontForCSS(cssRule) {
    const ff = cssRule["font-family"] || "";
    const fw = cssRule["font-weight"] || "400";
    const fs = cssRule["font-style"] || "normal";
    const isSans = ff.includes("Manrope") || ff.includes("sans-serif");
    const isSerif = ff.includes("Arizona") || (ff.includes("serif") && !isSans);
    if (isSerif) {
      return fs === "italic" ? "SERIF_ITALIC" : "SERIF";
    }
    if (isSans) {
      const w = parseInt(fw);
      if (w >= 800) return "SANS_XBOLD";
      if (w >= 700) return "SANS_BOLD";
      if (w >= 600) return "SANS_SEMI";
      return "SANS_REG";
    }
    return "SANS_REG";
  }

  function textShadow(cssRule) {
    const ts = cssRule["text-shadow"];
    if (!ts || ts === "none") return null;
    const m = ts.match(/([\d.]+)px\s+([\d.]+)px\s+([\d.]+)px\s+rgba?\([^)]+\)/);
    if (!m) return null;
    const ox = parseFloat(m[1]), oy = parseFloat(m[2]), blur = parseFloat(m[3]);
    const opacity = parseOpacity(ts) * 100;
    const dist = Math.sqrt(ox * ox + oy * oy);
    const angle = (Math.atan2(oy, ox) * 180) / Math.PI + 90;
    return { angle: Math.round(angle), distance: Math.round(dist), softness: Math.round(blur), opacity: Math.round(opacity) };
  }

  // Header
  L.push(`/*`);
  L.push(` * After Effects ExtendScript — End Card Import`);
  L.push(` * Source: ${compName}`);
  L.push(` * Generated: ${new Date().toISOString().slice(0, 10)} by export-ae.js`);
  L.push(` *`);
  L.push(` * How to use:`);
  L.push(` *   1. Open After Effects`);
  L.push(` *   2. File > Scripts > Run Script File...`);
  L.push(` *   3. Select this .jsx file`);
  L.push(` *   4. Browse to the Hyperframes project folder when prompted`);
  L.push(` *`);
  L.push(` * Notes:`);
  L.push(` *   - Font PostScript names in CONFIG may need adjustment for your system`);
  L.push(` *   - Text vertical positions are approximate — nudge in AE as needed`);
  L.push(` *   - B-roll clips are in a pre-comp with rounded-corner mask`);
  L.push(` */`);
  L.push(``);
  L.push(`(function() {`);

  // Config
  L.push(`${I}// ==================== CONFIG ====================`);
  L.push(`${I}var COMP_NAME = ${JSON.stringify(compName)};`);
  L.push(`${I}var COMP_W = ${W};`);
  L.push(`${I}var COMP_H = ${H};`);
  L.push(`${I}var COMP_DUR = 15;`);
  L.push(`${I}var FPS = 30;`);
  L.push(``);
  L.push(`${I}// Fonts — adjust PostScript names for your system`);
  L.push(`${I}// To find PostScript names: in AE, add a text layer, pick the font,`);
  L.push(`${I}// then run app.project.activeItem.layer(1).property("Source Text").value.font`);
  L.push(`${I}var SERIF = "ABCArizonaFlareVariable";`);
  L.push(`${I}var SERIF_ITALIC = "ABCArizonaFlareVariable";`);
  L.push(`${I}var SANS_BOLD = "Manrope-Bold";`);
  L.push(`${I}var SANS_SEMI = "Manrope-SemiBold";`);
  L.push(`${I}var SANS_XBOLD = "Manrope-ExtraBold";`);
  L.push(`${I}var SANS_REG = "Manrope-Regular";`);
  L.push(``);

  // Helpers
  L.push(`${I}// ==================== HELPERS ====================`);
  L.push(``);
  L.push(`${I}function imp(path) {`);
  L.push(`${I}${I}var f = new File(path);`);
  L.push(`${I}${I}if (!f.exists) { $.writeln("SKIP: " + path); return null; }`);
  L.push(`${I}${I}var io = new ImportOptions(f);`);
  L.push(`${I}${I}io.importAs = ImportAsType.FOOTAGE;`);
  L.push(`${I}${I}return app.project.importFile(io);`);
  L.push(`${I}}`);
  L.push(``);
  L.push(`${I}function roundedRect(layer, w, h, r) {`);
  L.push(`${I}${I}var k = r * 0.552;`);
  L.push(`${I}${I}var mask = layer.Masks.addProperty("Mask");`);
  L.push(`${I}${I}mask.maskMode = MaskMode.ADD;`);
  L.push(`${I}${I}var s = new Shape();`);
  L.push(`${I}${I}s.vertices = [[r,0],[w-r,0],[w,r],[w,h-r],[w-r,h],[r,h],[0,h-r],[0,r]];`);
  L.push(`${I}${I}s.inTangents = [[-k,0],[0,0],[0,-k],[0,0],[k,0],[0,0],[0,k],[0,0]];`);
  L.push(`${I}${I}s.outTangents = [[0,0],[k,0],[0,0],[0,k],[0,0],[-k,0],[0,0],[0,-k]];`);
  L.push(`${I}${I}s.closed = true;`);
  L.push(`${I}${I}mask.property("maskShape").setValue(s);`);
  L.push(`${I}${I}return mask;`);
  L.push(`${I}}`);
  L.push(``);
  L.push(`${I}function setEase(prop, ki, type, pos) {`);
  L.push(`${I}${I}try {`);
  L.push(`${I}${I}${I}prop.setInterpolationTypeAtKey(ki, KeyframeInterpolationType.BEZIER);`);
  L.push(`${I}${I}${I}var infl;`);
  L.push(`${I}${I}${I}if (pos === "start") {`);
  L.push(`${I}${I}${I}${I}switch (type) {`);
  L.push(`${I}${I}${I}${I}${I}case "power2.out": infl = 20; break;`);
  L.push(`${I}${I}${I}${I}${I}case "power3.out": infl = 15; break;`);
  L.push(`${I}${I}${I}${I}${I}case "expo.out": infl = 10; break;`);
  L.push(`${I}${I}${I}${I}${I}case "sine.out": infl = 35; break;`);
  L.push(`${I}${I}${I}${I}${I}case "power2.inOut": infl = 50; break;`);
  L.push(`${I}${I}${I}${I}${I}default: infl = 33;`);
  L.push(`${I}${I}${I}${I}}`);
  L.push(`${I}${I}${I}} else {`);
  L.push(`${I}${I}${I}${I}switch (type) {`);
  L.push(`${I}${I}${I}${I}${I}case "power2.out": infl = 80; break;`);
  L.push(`${I}${I}${I}${I}${I}case "power3.out": infl = 84; break;`);
  L.push(`${I}${I}${I}${I}${I}case "expo.out": infl = 90; break;`);
  L.push(`${I}${I}${I}${I}${I}case "sine.out": infl = 55; break;`);
  L.push(`${I}${I}${I}${I}${I}case "power2.inOut": infl = 50; break;`);
  L.push(`${I}${I}${I}${I}${I}default: infl = 33;`);
  L.push(`${I}${I}${I}${I}}`);
  L.push(`${I}${I}${I}}`);
  L.push(`${I}${I}${I}var e1 = new KeyframeEase(0, infl);`);
  L.push(`${I}${I}${I}// Try 1D first, then 2D, then 3D`);
  L.push(`${I}${I}${I}try {`);
  L.push(`${I}${I}${I}${I}prop.setTemporalEaseAtKey(ki, [e1], [new KeyframeEase(0, infl)]);`);
  L.push(`${I}${I}${I}} catch(e) {`);
  L.push(`${I}${I}${I}${I}try {`);
  L.push(`${I}${I}${I}${I}${I}var e2 = new KeyframeEase(0, infl);`);
  L.push(`${I}${I}${I}${I}${I}prop.setTemporalEaseAtKey(ki, [e1, e2], [new KeyframeEase(0, infl), new KeyframeEase(0, infl)]);`);
  L.push(`${I}${I}${I}${I}${I}try { prop.setSpatialTangentsAtKey(ki, [0,0], [0,0]); } catch(e3) {}`);
  L.push(`${I}${I}${I}${I}} catch(e4) {`);
  L.push(`${I}${I}${I}${I}${I}var e5 = new KeyframeEase(0, infl);`);
  L.push(`${I}${I}${I}${I}${I}prop.setTemporalEaseAtKey(ki, [e1, e2, e5], [new KeyframeEase(0, infl), new KeyframeEase(0, infl), new KeyframeEase(0, infl)]);`);
  L.push(`${I}${I}${I}${I}}`);
  L.push(`${I}${I}${I}}`);
  L.push(`${I}${I}} catch(outer) { $.writeln("setEase skip: " + outer.message); }`);
  L.push(`${I}}`);
  L.push(``);
  L.push(`${I}function addDropShadow(layer, angle, dist, soft, opac) {`);
  L.push(`${I}${I}var fx = layer.property("Effects").addProperty("ADBE Drop Shadow");`);
  L.push(`${I}${I}fx.property("Opacity").setValue(opac);`);
  L.push(`${I}${I}fx.property("Direction").setValue(angle);`);
  L.push(`${I}${I}fx.property("Distance").setValue(dist);`);
  L.push(`${I}${I}fx.property("Softness").setValue(soft);`);
  L.push(`${I}}`);
  L.push(``);

  // Main
  L.push(`${I}// ==================== MAIN ====================`);
  L.push(``);
  L.push(`${I}var folder = Folder.selectDialog("Select the Hyperframes project folder containing assets");`);
  L.push(`${I}if (!folder) return;`);
  L.push(`${I}var p = folder.fsName + "/";`);
  L.push(``);
  L.push(`${I}app.beginUndoGroup("Import: " + COMP_NAME);`);
  L.push(``);

  // Collect assets
  const imageAssets = elements.filter(
    (e) => e.type === "image" && e.src
  );
  const brollEl = elements.find((e) => e.type === "broll-container");
  const heroImgEl = elements.find((e) => e.type === "hero-image");

  L.push(`${I}// --- Import Assets ---`);
  for (const img of imageAssets) {
    L.push(`${I}var ${img.id}F = imp(p + ${JSON.stringify(img.src)});`);
  }
  if (heroImgEl) {
    L.push(`${I}var heroF = imp(p + ${JSON.stringify(heroImgEl.src)});`);
  }
  if (brollEl) {
    L.push(`${I}var brollF = [];`);
    L.push(`${I}for (var i = 1; i <= ${brollEl.count}; i++) {`);
    L.push(`${I}${I}brollF.push(imp(p + "broll-" + i + ".mp4"));`);
    L.push(`${I}}`);
  }
  L.push(``);

  // Create comp
  L.push(`${I}// --- Create Composition ---`);
  L.push(`${I}var comp = app.project.items.addComp(COMP_NAME, COMP_W, COMP_H, 1, COMP_DUR, FPS);`);
  L.push(``);

  // === LAYERS ===
  // Track layer variable names for animation section
  const layerVars = {};

  // Background
  if (positions.bg) {
    L.push(`${I}// --- Background ---`);
    L.push(`${I}if (bgF) {`);
    L.push(`${I}${I}var bgL = comp.layers.add(bgF);`);
    L.push(`${I}${I}bgL.name = "Background";`);
    L.push(`${I}${I}bgL.property("Position").setValue([${W / 2}, ${H / 2}]);`);
    L.push(`${I}${I}var sx = (COMP_W / bgF.width) * 100;`);
    L.push(`${I}${I}var sy = (COMP_H / bgF.height) * 100;`);
    L.push(`${I}${I}var sc = Math.max(sx, sy);`);
    L.push(`${I}${I}bgL.property("Scale").setValue([sc, sc]);`);
    L.push(`${I}}`);
    L.push(``);
    layerVars["#bg"] = "bgL";
  }

  // Logo
  if (positions.logo) {
    const lp = positions.logo;
    L.push(`${I}// --- Logo ---`);
    L.push(`${I}if (logoF) {`);
    L.push(`${I}${I}var logoL = comp.layers.add(logoF);`);
    L.push(`${I}${I}logoL.name = "Logo";`);
    L.push(`${I}${I}logoL.property("Position").setValue([${lp.x}, ${Math.round(lp.y)}]);`);
    L.push(`${I}}`);
    L.push(``);
    layerVars["#logo"] = "logoL";
  }

  // Pill/capsule
  const pillEl = elements.find((e) => e.type === "pill");
  if (pillEl && positions.pill) {
    const pp = positions.pill;
    const pillCSS = css[".capsule"] || css[".pill"] || {};
    const bg = parseColor(pillCSS.background || pillCSS["background-color"] || "#333");
    const tc = parseColor(pillCSS.color || "#fff");
    const fs = parsePx(pillCSS["font-size"]) || 18;
    L.push(`${I}// --- Authority Capsule ---`);
    L.push(`${I}var pillBg = comp.layers.addSolid([${bg.map((c) => c.toFixed(3)).join(", ")}], "Capsule BG", ${Math.round(pp.w)}, ${Math.round(pp.h)}, 1);`);
    L.push(`${I}pillBg.property("Position").setValue([${Math.round(pp.x)}, ${Math.round(pp.y)}]);`);
    L.push(`${I}roundedRect(pillBg, ${Math.round(pp.w)}, ${Math.round(pp.h)}, ${Math.round(pp.h / 2)});`);
    L.push(`${I}var pillT = comp.layers.addText(${JSON.stringify(pillEl.text)});`);
    L.push(`${I}var pillDoc = pillT.property("Source Text").value;`);
    L.push(`${I}pillDoc.fontSize = ${Math.round(fs)};`);
    L.push(`${I}pillDoc.fillColor = [${tc.map((c) => c.toFixed(3)).join(", ")}];`);
    L.push(`${I}pillDoc.font = SANS_BOLD;`);
    L.push(`${I}pillDoc.justification = ParagraphJustification.CENTER_JUSTIFY;`);
    L.push(`${I}pillT.property("Source Text").setValue(pillDoc);`);
    L.push(`${I}pillT.property("Position").setValue([${Math.round(pp.x)}, ${Math.round(pp.y + fs * 0.35)}]);`);
    L.push(``);
    layerVars["#pill"] = "pillBg";
  }

  // Text layers (headlines, subhead, guarantee)
  const textEls = elements.filter(
    (e) =>
      e.type === "text" &&
      e.id !== "footnote" &&
      e.id !== "disclaimer"
  );
  for (const tel of textEls) {
    const p = positions[tel.id];
    if (!p) continue;
    const elCSS = css[tel.css || `.${tel.id}`] || {};
    const color = parseColor(elCSS.color || "#FFFFFF");
    const fontSize = p.fontSize || parsePx(elCSS["font-size"]) || 48;
    const fontVar = fontForCSS(elCSS);
    const isUpper = elCSS["text-transform"] === "uppercase";
    const text = isUpper ? tel.text.toUpperCase() : tel.text;
    const tracking = parsePx(elCSS["letter-spacing"]);
    const aeTracking = tracking > 0 ? Math.round((tracking / fontSize) * 1000) : 0;
    const shadow = textShadow(elCSS);

    const varName = tel.id.replace(/-/g, "_") + "L";
    L.push(`${I}// --- ${tel.id} ---`);
    L.push(`${I}var ${varName} = comp.layers.addText(${JSON.stringify(text)});`);
    L.push(`${I}${varName}.name = ${JSON.stringify(tel.id)};`);
    L.push(`${I}var doc = ${varName}.property("Source Text").value;`);
    L.push(`${I}doc.fontSize = ${Math.round(fontSize)};`);
    L.push(`${I}doc.fillColor = [${color.map((c) => c.toFixed(3)).join(", ")}];`);
    L.push(`${I}doc.font = ${fontVar};`);
    L.push(`${I}doc.justification = ParagraphJustification.CENTER_JUSTIFY;`);
    if (aeTracking > 0) {
      L.push(`${I}doc.tracking = ${aeTracking};`);
    }
    L.push(`${I}${varName}.property("Source Text").setValue(doc);`);
    L.push(`${I}${varName}.property("Position").setValue([${Math.round(p.x)}, ${Math.round(p.y + fontSize * 0.35)}]);`);
    if (shadow) {
      L.push(`${I}addDropShadow(${varName}, ${shadow.angle}, ${shadow.distance}, ${shadow.softness}, ${shadow.opacity});`);
    }
    L.push(``);

    if (tel.parentAnim) {
      layerVars[tel.parentAnim] = layerVars[tel.parentAnim] || [];
      if (Array.isArray(layerVars[tel.parentAnim])) {
        layerVars[tel.parentAnim].push(varName);
      }
    } else {
      layerVars[`#${tel.id}`] = varName;
    }
  }

  // B-roll pre-comp or hero image
  if (brollEl && positions.hero) {
    const hp = positions.hero;
    L.push(`${I}// --- B-Roll Pre-comp ---`);
    L.push(`${I}var brollComp = app.project.items.addComp("B-Roll Montage", ${Math.round(hp.w)}, ${Math.round(hp.h)}, 1, COMP_DUR, FPS);`);
    L.push(`${I}var brollLayers = [];`);
    L.push(`${I}for (var i = 0; i < brollF.length; i++) {`);
    L.push(`${I}${I}if (!brollF[i]) continue;`);
    L.push(`${I}${I}var bl = brollComp.layers.add(brollF[i]);`);
    L.push(`${I}${I}bl.name = "broll-" + (i + 1);`);
    L.push(`${I}${I}bl.property("Position").setValue([${Math.round(hp.w / 2)}, ${Math.round(hp.h / 2)}]);`);
    L.push(`${I}${I}// Scale to cover`);
    L.push(`${I}${I}var bsx = (${Math.round(hp.w)} / brollF[i].width) * 100;`);
    L.push(`${I}${I}var bsy = (${Math.round(hp.h)} / brollF[i].height) * 100;`);
    L.push(`${I}${I}var bsc = Math.max(bsx, bsy);`);
    L.push(`${I}${I}bl.property("Scale").setValue([bsc, bsc]);`);
    L.push(`${I}${I}if (i === 0) {`);
    L.push(`${I}${I}${I}bl.property("Opacity").setValue(100);`);
    L.push(`${I}${I}} else {`);
    L.push(`${I}${I}${I}bl.property("Opacity").setValue(0);`);
    L.push(`${I}${I}}`);
    L.push(`${I}${I}brollLayers.push(bl);`);
    L.push(`${I}}`);
    L.push(``);

    // B-roll crossfade keyframes
    if (gsapData.montage) {
      const mg = gsapData.montage;
      const sceneDur = (mg.end - mg.start) / mg.scenes;
      L.push(`${I}// B-roll crossfade montage`);
      L.push(`${I}for (var j = 1; j < brollLayers.length; j++) {`);
      L.push(`${I}${I}var t = ${mg.start} + ${sceneDur.toFixed(4)} * j;`);
      L.push(`${I}${I}var op = brollLayers[j].property("Opacity");`);
      L.push(`${I}${I}op.setValueAtTime(t, 0);`);
      L.push(`${I}${I}op.setValueAtTime(t + ${mg.fadeDur}, 100);`);
      L.push(`${I}${I}op.setInterpolationTypeAtKey(1, KeyframeInterpolationType.BEZIER);`);
      L.push(`${I}${I}op.setInterpolationTypeAtKey(2, KeyframeInterpolationType.BEZIER);`);
      L.push(`${I}${I}setEase(op, 1, "power2.inOut", "start");`);
      L.push(`${I}${I}setEase(op, 2, "power2.inOut", "end");`);
      L.push(`${I}}`);
      L.push(``);
    }

    // Add pre-comp to main comp
    L.push(`${I}// Add B-Roll pre-comp to main comp`);
    L.push(`${I}var heroL = comp.layers.add(brollComp);`);
    L.push(`${I}heroL.name = "B-Roll Window";`);
    L.push(`${I}heroL.property("Position").setValue([${Math.round(hp.x)}, ${Math.round(hp.y)}]);`);
    if (hp.radius > 0) {
      L.push(`${I}roundedRect(heroL, ${Math.round(hp.w)}, ${Math.round(hp.h)}, ${Math.round(hp.radius)});`);
    }
    L.push(``);
    layerVars["#hero"] = "heroL";
  } else if (heroImgEl && positions.hero) {
    const hp = positions.hero;
    L.push(`${I}// --- Hero Image ---`);
    L.push(`${I}if (heroF) {`);
    L.push(`${I}${I}var heroL = comp.layers.add(heroF);`);
    L.push(`${I}${I}heroL.name = "Hero";`);
    L.push(`${I}${I}heroL.property("Position").setValue([${Math.round(hp.x)}, ${Math.round(hp.y)}]);`);
    L.push(`${I}${I}var hsx = (${Math.round(hp.w)} / heroF.width) * 100;`);
    L.push(`${I}${I}var hsy = (${Math.round(hp.h)} / heroF.height) * 100;`);
    L.push(`${I}${I}var hsc = Math.max(hsx, hsy);`);
    L.push(`${I}${I}heroL.property("Scale").setValue([hsc, hsc]);`);
    if (hp.radius > 0) {
      L.push(`${I}${I}roundedRect(heroL, ${Math.round(hp.w)}, ${Math.round(hp.h)}, ${Math.round(hp.radius)});`);
    }
    L.push(`${I}}`);
    L.push(``);
    layerVars["#hero"] = "heroL";
  }

  // Badges
  const badgeEls = elements.filter((e) => e.type === "badge");
  if (badgeEls.length > 0) {
    const badgeCSS = css[".badge"] || {};
    const titleCSS = css[".badge-title"] || {};
    const bgColor = parseColor(badgeCSS.background || badgeCSS["background-color"] || "#F0E4D4");
    const textColor = parseColor(titleCSS.color || "#4B1A1A");

    L.push(`${I}// --- Badges ---`);
    for (const badge of badgeEls) {
      const bp = positions[badge.id];
      if (!bp) continue;
      const vn = badge.id + "Bg";
      const tn = badge.id + "T";

      L.push(`${I}var ${vn} = comp.layers.addSolid([${bgColor.map((c) => c.toFixed(3)).join(", ")}], ${JSON.stringify(badge.id + " bg")}, ${Math.round(bp.w)}, ${Math.round(bp.h)}, 1);`);
      L.push(`${I}${vn}.property("Position").setValue([${Math.round(bp.x)}, ${Math.round(bp.y)}]);`);
      L.push(`${I}roundedRect(${vn}, ${Math.round(bp.w)}, ${Math.round(bp.h)}, ${Math.round(bp.radius)});`);

      L.push(`${I}var ${tn} = comp.layers.addText(${JSON.stringify(badge.text.toUpperCase())});`);
      L.push(`${I}${tn}.name = ${JSON.stringify(badge.id)};`);
      L.push(`${I}var doc = ${tn}.property("Source Text").value;`);
      L.push(`${I}doc.fontSize = ${Math.round(bp.fontSize)};`);
      L.push(`${I}doc.fillColor = [${textColor.map((c) => c.toFixed(3)).join(", ")}];`);
      L.push(`${I}doc.font = SANS_BOLD;`);
      L.push(`${I}doc.justification = ParagraphJustification.CENTER_JUSTIFY;`);
      L.push(`${I}${tn}.property("Source Text").setValue(doc);`);
      L.push(`${I}${tn}.property("Position").setValue([${Math.round(bp.x)}, ${Math.round(bp.y + bp.fontSize * 0.35)}]);`);
      L.push(`${I}${tn}.parent = ${vn};`);
      L.push(`${I}${tn}.property("Position").setValue([${Math.round(bp.w / 2)}, ${Math.round(bp.h / 2 + bp.fontSize * 0.35)}]);`);
      L.push(``);
      layerVars[`#${badge.id}`] = vn;
    }
  }

  // CTA
  const ctaEl = elements.find((e) => e.type === "cta");
  if (ctaEl && positions.cta) {
    const cp = positions.cta;
    const ctaCSS = css[".cta"] || {};
    const ctaTextCSS = css[".cta-text"] || {};
    const bgColor = parseColor(ctaCSS.background || ctaCSS["background-color"] || "#F0E4D4");
    const textColor = parseColor(ctaTextCSS.color || "#4B1A1A");
    const letterSpacing = parsePx(ctaTextCSS["letter-spacing"]);
    const aeTracking = letterSpacing > 0 ? Math.round((letterSpacing / cp.fontSize) * 1000) : 0;

    L.push(`${I}// --- CTA ---`);
    L.push(`${I}var ctaBg = comp.layers.addSolid([${bgColor.map((c) => c.toFixed(3)).join(", ")}], "CTA bg", ${Math.round(cp.w)}, ${Math.round(cp.h)}, 1);`);
    L.push(`${I}ctaBg.property("Position").setValue([${Math.round(cp.x)}, ${Math.round(cp.y)}]);`);
    L.push(`${I}roundedRect(ctaBg, ${Math.round(cp.w)}, ${Math.round(cp.h)}, ${Math.round(cp.radius)});`);

    L.push(`${I}var ctaT = comp.layers.addText(${JSON.stringify(ctaEl.text.toUpperCase())});`);
    L.push(`${I}ctaT.name = "CTA";`);
    L.push(`${I}var doc = ctaT.property("Source Text").value;`);
    L.push(`${I}doc.fontSize = ${Math.round(cp.fontSize)};`);
    L.push(`${I}doc.fillColor = [${textColor.map((c) => c.toFixed(3)).join(", ")}];`);
    L.push(`${I}doc.font = SANS_BOLD;`);
    L.push(`${I}doc.justification = ParagraphJustification.CENTER_JUSTIFY;`);
    if (aeTracking > 0) {
      L.push(`${I}doc.tracking = ${aeTracking};`);
    }
    L.push(`${I}ctaT.property("Source Text").setValue(doc);`);
    L.push(`${I}ctaT.parent = ctaBg;`);
    L.push(`${I}ctaT.property("Position").setValue([${Math.round(cp.w / 2)}, ${Math.round(cp.h / 2 + cp.fontSize * 0.35)}]);`);
    L.push(``);
    layerVars["#cta"] = "ctaBg";
  }

  // Footnote / Disclaimer
  for (const ftId of ["footnote", "disclaimer"]) {
    const ftEl = elements.find((e) => e.id === ftId);
    if (!ftEl || !positions[ftId]) continue;
    const fp = positions[ftId];
    const elCSS = css[`.${ftId}`] || {};
    const color = parseColor(elCSS.color || "#F5EDDF");
    const fontSize = fp.fontSize || 22;
    const fontVar = fontForCSS(elCSS);
    const varName = ftId + "L";

    L.push(`${I}// --- ${ftId} ---`);
    L.push(`${I}var ${varName} = comp.layers.addText(${JSON.stringify(ftEl.text)});`);
    L.push(`${I}${varName}.name = ${JSON.stringify(ftId)};`);
    L.push(`${I}var doc = ${varName}.property("Source Text").value;`);
    L.push(`${I}doc.fontSize = ${Math.round(fontSize)};`);
    L.push(`${I}doc.fillColor = [${color.map((c) => c.toFixed(3)).join(", ")}];`);
    L.push(`${I}doc.font = ${fontVar};`);
    L.push(`${I}doc.justification = ParagraphJustification.CENTER_JUSTIFY;`);
    L.push(`${I}${varName}.property("Source Text").setValue(doc);`);
    L.push(`${I}${varName}.property("Position").setValue([${Math.round(fp.x)}, ${Math.round(fp.y + fontSize * 0.35)}]);`);
    L.push(``);
    layerVars[`#${ftId}`] = varName;
  }

  // ===================== ANIMATIONS =====================
  L.push(`${I}// ==================== ANIMATIONS ====================`);
  L.push(``);

  for (const kf of gsapData.keyframes) {
    const selector = kf.selector;
    const targets = layerVars[selector];
    if (!targets) continue;

    const layerNames = Array.isArray(targets) ? targets : [targets];
    const props = kf.type === "from" ? kf.props : kf.to || {};
    const fromProps = kf.type === "fromTo" ? kf.from : kf.props;
    const duration = props.duration || fromProps.duration || 0.5;
    const ease = (props.ease || fromProps.ease || "power2.out").toString();
    const time = kf.time;
    const endTime = time + duration;
    const isBack = ease.includes("back");

    for (const varName of layerNames) {
      L.push(`${I}// ${selector} — ${kf.type} at ${time}s`);

      // Opacity
      const hasOpacity =
        fromProps.opacity !== undefined ||
        (kf.type === "fromTo" && kf.from.opacity !== undefined);
      if (hasOpacity) {
        const fromOp = kf.type === "from"
          ? (fromProps.opacity ?? 0) * 100
          : (kf.from.opacity ?? 0) * 100;
        const toOp = kf.type === "fromTo"
          ? (props.opacity ?? 1) * 100
          : 100;
        L.push(`${I}var op = ${varName}.property("Opacity");`);
        L.push(`${I}op.setValueAtTime(${time}, ${fromOp});`);
        L.push(`${I}op.setValueAtTime(${endTime.toFixed(4)}, ${toOp});`);
        L.push(`${I}setEase(op, 1, ${JSON.stringify(ease)}, "start");`);
        L.push(`${I}setEase(op, 2, ${JSON.stringify(ease)}, "end");`);
      }

      // Position (y offset)
      const hasY = fromProps.y !== undefined;
      if (hasY) {
        // For parentAnim layers (e.g. headline-line1 animated by #headline),
        // look up the layer's own position, not the parent selector
        const posKey = varName.replace("L", "").replace(/_/g, "-");
        const elPos = positions[posKey] ||
          positions[selector.replace("#", "")] ||
          positions[selector.replace("#", "").replace(/-/g, "_")];
        if (elPos) {
          const baseY = Math.round(elPos.y + (elPos.fontSize || 0) * 0.35);
          const fromY = baseY + (fromProps.y || 0);
          L.push(`${I}var pos = ${varName}.property("Position");`);
          L.push(`${I}pos.setValueAtTime(${time}, [${Math.round(elPos.x)}, ${fromY}]);`);
          L.push(`${I}pos.setValueAtTime(${endTime.toFixed(4)}, [${Math.round(elPos.x)}, ${baseY}]);`);
          L.push(`${I}setEase(pos, 1, ${JSON.stringify(ease)}, "start");`);
          L.push(`${I}setEase(pos, 2, ${JSON.stringify(ease)}, "end");`);
        }
      }

      // Scale
      const hasScale = fromProps.scale !== undefined;
      if (hasScale) {
        const fromScale = (fromProps.scale || 1) * 100;
        if (isBack) {
          // Overshoot: 3 keyframes
          const overshoot = 103;
          const overTime = time + duration * 0.75;
          L.push(`${I}var sc = ${varName}.property("Scale");`);
          L.push(`${I}sc.setValueAtTime(${time}, [${fromScale}, ${fromScale}]);`);
          L.push(`${I}sc.setValueAtTime(${overTime.toFixed(4)}, [${overshoot}, ${overshoot}]);`);
          L.push(`${I}sc.setValueAtTime(${endTime.toFixed(4)}, [100, 100]);`);
          L.push(`${I}setEase(sc, 1, "expo.out", "start");`);
          L.push(`${I}setEase(sc, 2, "power2.inOut", "end");`);
          L.push(`${I}setEase(sc, 3, "power2.out", "end");`);
        } else {
          L.push(`${I}var sc = ${varName}.property("Scale");`);
          L.push(`${I}sc.setValueAtTime(${time}, [${fromScale}, ${fromScale}]);`);
          L.push(`${I}sc.setValueAtTime(${endTime.toFixed(4)}, [100, 100]);`);
          L.push(`${I}setEase(sc, 1, ${JSON.stringify(ease)}, "start");`);
          L.push(`${I}setEase(sc, 2, ${JSON.stringify(ease)}, "end");`);
        }
      }

      L.push(``);
    }
  }

  // Footer
  L.push(`${I}app.endUndoGroup();`);
  L.push(`${I}alert("Done! Created '" + COMP_NAME + "' with " + comp.numLayers + " layers.");`);
  L.push(`})();`);

  return L.join("\n");
}

// ===================== Main =====================

const css = parseCSS(html);
const elements = extractElements(html);
const gsapData = parseGSAP(html);
const positions = computeLayout(elements, css);

const jsx = generateJSX(elements, css, positions, gsapData);

const outputPath = resolve(opts.output);
writeFileSync(outputPath, jsx, "utf-8");

const layerCount = elements.filter(
  (e) => e.type !== "broll-container"
).length;
const brollCount = elements.find((e) => e.type === "broll-container")?.count || 0;

console.error(`Generated: ${outputPath}`);
console.error(`Composition: ${compName} (1080×1920, 15s)`);
console.error(`Layers: ~${layerCount} main + ${brollCount} b-roll in pre-comp`);
console.error(`Animations: ${gsapData.keyframes.length} keyframe groups`);
if (gsapData.montage) {
  console.error(`B-roll montage: ${gsapData.montage.scenes} scenes, ${gsapData.montage.start}s–${gsapData.montage.end}s`);
}

console.log(
  JSON.stringify({
    output: outputPath,
    composition: compName,
    layers: layerCount,
    brollLayers: brollCount,
    keyframeGroups: gsapData.keyframes.length,
    montage: gsapData.montage,
  }, null, 2)
);
