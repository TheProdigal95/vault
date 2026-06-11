#!/usr/bin/env node
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import minimist from "minimist";
import { parseDesignMd, getPalette, paletteToLegacyJSON } from "./design-tokens.js";
import { buildEntrance } from "./animations.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const TEMPLATE_DIR = path.join(__dirname, "templates");
const BASE_CSS_PATH = path.join(__dirname, "base.css");
const PALETTES_PATH = path.join(__dirname, "palettes.json");
const HF_VERSION = "0.5.3";
const COMPOSITION_DURATION = 15;

const TYPES_WITH_BROLL = new Set(["3a", "3f"]);
const VALID_TYPES = ["3a", "3b", "3c", "3d", "3e", "3f", "3g", "3h"];

const TYPE_TEMPLATE_MAP = {
  "3a": "3a-broll-hero.html",
  "3b": "3b-product-bundle.html",
  "3c": "3c-flat-lay.html",
  "3d": "3d-typographic-hero.html",
  "3e": "3e-portrait-composite.html",
  "3f": "3f-textured-window.html",
  "3g": "3g-textured-seal.html",
  "3h": "3h-infographic-grid.html",
};

function parseArgs() {
  const args = minimist(process.argv.slice(2), {
    string: [
      "type", "palette", "headline", "subhead", "badges", "cta",
      "output", "capsule", "disclaimer", "footnote", "stat",
      "grid-cells", "hero-type", "design-md",
    ],
    default: {
      "broll-count": 6,
    },
  });

  if (!args.type || !args.palette || !args.headline || !args.cta || !args.output) {
    console.error("Required: --type, --palette, --headline, --cta, --output");
    console.error("Optional: --subhead, --badges, --capsule, --disclaimer, --footnote, --broll-count, --stat, --grid-cells, --hero-type");
    process.exit(1);
  }

  const type = args.type.toLowerCase();
  if (!VALID_TYPES.includes(type)) {
    console.error(`Invalid type: ${type}. Must be one of: ${VALID_TYPES.join(", ")}`);
    process.exit(1);
  }

  return {
    type,
    palette: args.palette.toLowerCase(),
    headline: args.headline,
    subhead: args.subhead || null,
    badges: args.badges ? args.badges.split("|").map(b => b.trim()) : [],
    cta: args.cta,
    output: args.output,
    capsule: args.capsule || null,
    disclaimer: args.disclaimer || null,
    footnote: args.footnote || null,
    brollCount: parseInt(args["broll-count"], 10) || 6,
    stat: args.stat || null,
    gridCells: args["grid-cells"] ? args["grid-cells"].split("|").map(c => c.trim()) : [],
    heroType: args["hero-type"] || "seal",
    designMd: args["design-md"] || null,
  };
}

function loadPalette(paletteName, designMdPath) {
  if (designMdPath) {
    const { tokens } = parseDesignMd(designMdPath);
    return paletteToLegacyJSON(getPalette(tokens, paletteName));
  }
  const palettes = fs.readJsonSync(PALETTES_PATH);
  const key = paletteName.replace(/\s+/g, "-").toLowerCase();
  if (!palettes[key]) {
    console.error(`Unknown palette: ${key}. Available: ${Object.keys(palettes).join(", ")}`);
    process.exit(1);
  }
  return palettes[key];
}

function loadBaseCSS() {
  return fs.readFileSync(BASE_CSS_PATH, "utf-8");
}

function loadTemplate(type) {
  const filename = TYPE_TEMPLATE_MAP[type];
  if (!filename) {
    console.error(`No template for type: ${type}`);
    process.exit(1);
  }
  const templatePath = path.join(TEMPLATE_DIR, filename);
  if (!fs.existsSync(templatePath)) {
    console.error(`Template not found: ${templatePath}`);
    process.exit(1);
  }
  return fs.readFileSync(templatePath, "utf-8");
}

function buildPaletteCSS(palette) {
  const vars = Object.entries(palette)
    .filter(([k]) => k.startsWith("--"))
    .map(([k, v]) => `        ${k}: ${v};`)
    .join("\n");
  return `:root {\n${vars}\n      }`;
}

function buildBrollVideos(count) {
  const lines = [];
  for (let i = 1; i <= count; i++) {
    const fadeInTime = i === 1 ? 0 : 2.5 + ((COMPOSITION_DURATION - 3) / count) * (i - 1);
    const dataStart = i === 1 ? 0 : Math.max(0, Math.round((fadeInTime - 1) * 10) / 10);
    const dataDuration = Math.round((COMPOSITION_DURATION - dataStart) * 10) / 10;
    const opacity = i === 1 ? ' opacity: 1;' : '';
    lines.push(
      `          <video class="broll" id="broll-${i}" src="broll-${i}.mp4" muted playsinline data-start="${dataStart}" data-duration="${dataDuration}" style="z-index: ${i};${opacity}"></video>`
    );
  }
  return lines.join("\n");
}

function buildBrollMontageGSAP(count) {
  return `// B-roll montage: crossfade — only fade IN each new clip
      const scenes = ${count};
      const montageStart = 2.5;
      const montageEnd = 14.5;
      const sceneDur = (montageEnd - montageStart) / scenes;
      const fadeDur = 0.5;

      for (let i = 2; i <= scenes; i++) {
        const t = montageStart + sceneDur * (i - 1);
        tl.fromTo("#broll-" + i,
          { opacity: 0 },
          { opacity: 1, duration: fadeDur, ease: "power2.inOut" },
          t
        );
      }`;
}

function buildBadgesHTML(badges) {
  if (!badges.length) return "";
  return badges
    .map((b, i) => `          <div class="badge" id="badge${i + 1}"><span class="badge-title">${escapeHTML(b)}</span></div>`)
    .join("\n");
}

function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function processConditionalSections(html, opts) {
  if (opts.textured) {
    html = html.replace(
      "<!-- BG_IMAGE -->",
      '      <img class="bg-img" id="bg" src="bg.png" alt="" style="display: block;" />'
    );
  } else {
    html = html.replace("<!-- BG_IMAGE -->", "");
  }

  if (opts.showLogoTop) {
    html = html.replace(
      "<!-- LOGO_TOP -->",
      '        <div class="logo-wrapper" id="logo-top">\n          <img src="logo.png" alt="" />\n        </div>'
    );
  } else {
    html = html.replace("<!-- LOGO_TOP -->", "");
  }

  if (opts.capsule) {
    html = html.replace(
      "<!-- CAPSULE -->",
      `        <div class="pill" id="pill">\n          <span class="pill-text">${escapeHTML(opts.capsule)}</span>\n        </div>`
    );
  } else {
    html = html.replace("<!-- CAPSULE -->", "");
  }

  if (opts.subhead) {
    html = html.replace(
      "<!-- SUBHEAD -->",
      `        <div class="subhead" id="subhead">${escapeHTML(opts.subhead)}</div>`
    );
  } else {
    html = html.replace("<!-- SUBHEAD -->", "");
  }

  if (opts.disclaimer) {
    html = html.replace(
      "<!-- DISCLAIMER -->",
      `        <div class="disclaimer" id="disclaimer">\n          <p class="disclaimer-text">${escapeHTML(opts.disclaimer)}</p>\n        </div>`
    );
  } else {
    html = html.replace("<!-- DISCLAIMER -->", "");
  }

  if (opts.footnote) {
    html = html.replace(
      "<!-- FOOTNOTE -->",
      `        <div class="footnote" id="footnote">${escapeHTML(opts.footnote)}</div>`
    );
  } else {
    html = html.replace("<!-- FOOTNOTE -->", "");
  }

  if (opts.showLogoBottom) {
    html = html.replace(
      "<!-- LOGO_BOTTOM -->",
      '        <div class="logo-bottom" id="logo-bottom">\n          <img src="logo.png" alt="" />\n        </div>'
    );
  } else {
    html = html.replace("<!-- LOGO_BOTTOM -->", "");
  }

  return html;
}

function generate(args) {
  const palette = loadPalette(args.palette, args.designMd);
  let html = loadTemplate(args.type);

  // Inject base CSS (inlined, since HyperFrames requires inline styles)
  const baseCSS = loadBaseCSS();
  html = html.replace("/* {{BASE_CSS}} */", baseCSS);

  const paletteCSS = buildPaletteCSS(palette);
  html = html.replace("/* {{PALETTE_VARS}} */", paletteCSS);

  html = html.replace("{{HEADLINE}}", escapeHTML(args.headline));
  html = html.replace("{{CTA}}", escapeHTML(args.cta));

  if (TYPES_WITH_BROLL.has(args.type)) {
    html = html.replace("{{BROLL_VIDEOS}}", buildBrollVideos(args.brollCount));
    html = html.replace("{{BROLL_MONTAGE_GSAP}}", buildBrollMontageGSAP(args.brollCount));
  } else {
    html = html.replace("{{BROLL_VIDEOS}}", "");
    html = html.replace("{{BROLL_MONTAGE_GSAP}}", "");
  }

  html = html.replace("{{BADGES}}", buildBadgesHTML(args.badges));

  // Type-specific content tokens
  if (args.type === "3d" && args.stat) {
    html = html.replace("{{STAT}}", escapeHTML(args.stat));
    const statParts = args.stat.match(/^(\d+%?|\$[\d.]+)(.*)$/);
    if (statParts) {
      html = html.replace("{{STAT_NUMBER}}", escapeHTML(statParts[1]));
      html = html.replace("{{STAT_LABEL}}", escapeHTML(statParts[2].trim()));
    } else {
      html = html.replace("{{STAT_NUMBER}}", escapeHTML(args.stat));
      html = html.replace("{{STAT_LABEL}}", "");
    }
  }

  if (args.type === "3h") {
    const gridHTML = args.gridCells
      .map((cell, i) => `          <div class="grid-cell" id="grid-cell-${i + 1}"><span class="grid-cell-text">${escapeHTML(cell)}</span></div>`)
      .join("\n");
    html = html.replace("{{GRID_CELLS}}", gridHTML);
  }

  if (args.type === "3g") {
    if (args.heroType === "seal") {
      const sealHTML = `        <div class="seal" id="seal">
          <span class="seal-number">${escapeHTML(args.stat || "90")}</span>
          <span class="seal-text">${escapeHTML(args.footnote ? args.footnote.replace(/^\*\s*/, "") : "Day Guarantee")}</span>
        </div>`;
      html = html.replace("{{HERO_SECTION}}", sealHTML);
    } else {
      const listHTML = args.gridCells
        .map((item, i) => `            <div class="list-item" id="list-item-${i + 1}"><span class="list-text">${escapeHTML(item)}</span></div>`)
        .join("\n");
      html = html.replace("{{HERO_SECTION}}", `        <div class="list-hero">\n${listHTML}\n        </div>`);
    }
  }

  // Decide logo placement: textured = logo top, flat = logo bottom
  const showLogoTop = palette.textured;
  const showLogoBottom = !palette.textured;

  html = processConditionalSections(html, {
    textured: palette.textured,
    showLogoTop,
    showLogoBottom,
    capsule: args.capsule,
    subhead: args.subhead,
    disclaimer: args.disclaimer,
    footnote: args.footnote,
  });

  // Build entrance animations via centralized module
  const entranceOpts = {
    hasLogo: showLogoTop,
    hasLogoBottom: showLogoBottom,
    capsule: args.capsule,
    subhead: args.subhead,
    disclaimer: args.disclaimer,
    footnote: args.footnote,
    badgeCount: args.badges.length,
    statLabel: args.type === "3d" && args.stat,
    heroType: args.heroType,
    listItemCount: args.type === "3g" && args.heroType === "list" ? args.gridCells.length : 0,
    gridCellCount: args.type === "3h" ? args.gridCells.length : 0,
  };

  html = html.replace("{{ENTRANCE_GSAP}}", buildEntrance(args.type, entranceOpts));

  // Clean up empty lines from removed conditional sections
  html = html.replace(/\n\s*\n\s*\n/g, "\n\n");

  return html;
}

function writeProject(outputDir, html, projectName) {
  fs.ensureDirSync(outputDir);

  fs.writeFileSync(path.join(outputDir, "index.html"), html);

  fs.writeJsonSync(path.join(outputDir, "meta.json"), {
    id: projectName,
    name: projectName,
    createdAt: new Date().toISOString(),
  }, { spaces: 2 });

  fs.writeJsonSync(path.join(outputDir, "hyperframes.json"), {
    "$schema": "https://hyperframes.heygen.com/schema/hyperframes.json",
    registry: "https://raw.githubusercontent.com/heygen-com/hyperframes/main/registry",
    paths: {
      blocks: "compositions",
      components: "compositions/components",
      assets: "assets",
    },
  }, { spaces: 2 });

  fs.writeJsonSync(path.join(outputDir, "package.json"), {
    name: projectName.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
    private: true,
    type: "module",
    scripts: {
      dev: `npx --yes hyperframes@${HF_VERSION} preview`,
      check: `npx --yes hyperframes@${HF_VERSION} lint && npx --yes hyperframes@${HF_VERSION} validate && npx --yes hyperframes@${HF_VERSION} inspect`,
      render: `npx --yes hyperframes@${HF_VERSION} render`,
      publish: `npx --yes hyperframes@${HF_VERSION} publish`,
    },
  }, { spaces: 2 });
}

function main() {
  const args = parseArgs();
  const html = generate(args);
  const projectName = path.basename(args.output);

  writeProject(args.output, html, projectName);

  const result = {
    project: args.output,
    type: args.type,
    palette: args.palette,
    files: ["index.html", "meta.json", "hyperframes.json", "package.json"],
    brollSlots: TYPES_WITH_BROLL.has(args.type) ? args.brollCount : 0,
    textured: loadPalette(args.palette, args.designMd).textured,
    nextSteps: [],
  };

  if (result.brollSlots > 0) {
    result.nextSteps.push(`Drop ${result.brollSlots} b-roll clips as broll-1.mp4 through broll-${result.brollSlots}.mp4`);
  }
  result.nextSteps.push("Copy logo.png from brand assets");
  if (result.textured) {
    result.nextSteps.push("Place bg.png texture image in project directory");
  }
  result.nextSteps.push("Run: cd " + args.output + " && npm run check");

  console.log(JSON.stringify(result, null, 2));
}

main();
