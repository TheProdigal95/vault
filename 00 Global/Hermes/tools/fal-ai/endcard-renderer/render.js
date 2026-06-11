import puppeteer from "puppeteer";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const FONT_DIR = resolve(process.env.HOME, "Library/Fonts");

function parseArgs(argv) {
  const args = argv.slice(2);
  const result = { config: null, output: null, width: 1080, height: 1920 };
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--config": result.config = args[++i]; break;
      case "--output": result.output = args[++i]; break;
      case "--width": result.width = parseInt(args[++i], 10); break;
      case "--height": result.height = parseInt(args[++i], 10); break;
    }
  }
  return result;
}

function fontToDataUrl(filename) {
  const p = resolve(FONT_DIR, filename);
  if (!existsSync(p)) return null;
  const buf = readFileSync(p);
  return `data:font/truetype;base64,${buf.toString("base64")}`;
}

function imgToDataUrl(filePath) {
  const buf = readFileSync(filePath);
  const ext = filePath.split(".").pop().toLowerCase();
  const mime = { png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", webp: "image/webp" }[ext] || "image/png";
  return `data:${mime};base64,${buf.toString("base64")}`;
}

function buildFontFaces() {
  const faces = [];
  const fonts = [
    { family: "Aeonik", file: "Aeonik-Regular.ttf", weight: 400, style: "normal" },
    { family: "Aeonik", file: "Aeonik-RegularItalic.ttf", weight: 400, style: "italic" },
    { family: "Aeonik", file: "Aeonik-Medium.ttf", weight: 500, style: "normal" },
    { family: "Aeonik", file: "Aeonik-MediumItalic.ttf", weight: 500, style: "italic" },
    { family: "Aeonik", file: "Aeonik-Bold.ttf", weight: 700, style: "normal" },
    { family: "Aeonik", file: "Aeonik-BoldItalic.ttf", weight: 700, style: "italic" },
    { family: "Aeonik", file: "Aeonik-Black.ttf", weight: 900, style: "normal" },
    { family: "Aeonik", file: "Aeonik-BlackItalic.ttf", weight: 900, style: "italic" },
    { family: "Aeonik", file: "Aeonik-Light.ttf", weight: 300, style: "normal" },
    { family: "Arizona Flare", file: "fonnts.com-ABCArizonaFlareVariable-Trial.ttf", weight: "100 900", style: "normal" },
    { family: "NB Architekt", file: "NBArchitekPro-Regular.ttf", weight: 400, style: "normal" },
    { family: "NB Architekt", file: "NBArchitekPro-Bold.ttf", weight: 700, style: "normal" },
    { family: "NB Architekt", file: "NBArchitekPro-Light.ttf", weight: 300, style: "normal" },
  ];

  for (const f of fonts) {
    const url = fontToDataUrl(f.file);
    if (url) {
      faces.push(`@font-face {
        font-family: '${f.family}';
        src: url('${url}') format('truetype');
        font-weight: ${f.weight};
        font-style: ${f.style};
        font-display: block;
      }`);
    }
  }
  return faces.join("\n");
}

function buildHTML(config, configDir) {
  const heroPath = resolve(configDir, config.heroImage);
  const heroUrl = imgToDataUrl(heroPath);

  const logoUrl = config.logo
    ? imgToDataUrl(resolve(configDir, config.logo))
    : null;

  const fontMap = {
    serif: "'Arizona Flare', 'Spectral', Georgia, serif",
    sans: "'Aeonik', 'Raleway', 'Helvetica Neue', sans-serif",
  };
  const headlineFont = fontMap[config.fonts?.headline] || fontMap.sans;
  const headlineStyle = config.fonts?.headlineStyle === "italic" ? "italic" : "normal";
  const subFont = fontMap[config.fonts?.subheadline] || fontMap.sans;
  const subStyle = config.fonts?.subheadlineStyle === "italic" ? "italic" : "normal";
  const badgeFont = "'NB Architekt', 'Aeonik', sans-serif";
  const ctaFont = "'Aeonik', 'Raleway', sans-serif";

  const c = config.colors;
  const s = config.spacing || {};

  const topPad = s.topPadding ?? 108;
  const headlineFontSize = s.headlineFontSize ?? 116;
  const headlineLineHeight = s.headlineLineHeight ?? 1.1;
  const headlineLetterSpacing = s.headlineLetterSpacing ?? "-0.01em";
  const headlineWeight = s.headlineWeight ?? 900;
  const gapHeadlineSub = s.gapHeadlineSub ?? 40;
  const subFontSize = s.subFontSize ?? 30;
  const subWeight = s.subWeight ?? 400;
  const gapSubHero = s.gapSubHero ?? 48;
  const heroHeight = s.heroHeight ?? "29.4%";
  const heroBorderRadius = s.heroBorderRadius ?? 20;
  const gapHeroBadges = s.gapHeroBadges ?? 48;
  const badgeHeight = s.badgeHeight ?? 72;
  const badgeFontSize = s.badgeFontSize ?? 22;
  const badgeBorderRadius = s.badgeBorderRadius ?? 44;
  const badgeGap = s.badgeGap ?? 20;
  const badgePadH = s.badgePadH ?? 28;
  const gapBadgesCta = s.gapBadgesCta ?? 48;
  const ctaHeight = s.ctaHeight ?? 110;
  const ctaBorderRadius = s.ctaBorderRadius ?? 24;
  const ctaFontSize = s.ctaFontSize ?? 28;
  const gapCtaDisclaimer = s.gapCtaDisclaimer ?? 48;
  const disclaimerFontSize = s.disclaimerFontSize ?? 18;
  const sidePadding = s.sidePadding ?? 80;
  const headlineAlign = s.headlineAlign ?? "left";
  const subAlign = s.subAlign ?? headlineAlign;
  const ctaFontFamily = config.fonts?.cta === "serif" ? fontMap.serif : ctaFont;
  const ctaStyle = config.fonts?.ctaStyle === "italic" ? "italic" : "normal";
  const topPillFontSize = s.topPillFontSize ?? 18;
  const topPillPadV = s.topPillPadV ?? 12;
  const topPillPadH = s.topPillPadH ?? 32;
  const topPillMarginBottom = s.topPillMarginBottom ?? 28;

  const topPillHTML = config.topPill ? `
    <div class="top-pill" style="
      border: 1.5px solid ${c.topPillBorder || c.headline};
      color: ${c.topPillText || c.headline};
      background: ${c.topPillBg || "transparent"};
    ">${config.topPill}</div>
  ` : "";

  const mediaLogosHTML = config.mediaLogos ? `
    <div class="media-logos">
      <span class="media-label">AS FEATURED IN</span>
      <div class="media-row">
        ${config.mediaLogos.map(l => `<span class="media-name">${l}</span>`).join("")}
      </div>
    </div>
  ` : "";

  const badgesHTML = config.badges.map((b, i) => {
    const isComplex = typeof b === "object";
    const label = isComplex ? b.title : b;
    const iconHTML = isComplex && b.icon ? `<div class="badge-icon">${b.icon}</div>` : "";
    const subHTML = isComplex && b.subtitle ? `<div class="badge-sub">${b.subtitle}</div>` : "";
    return `<div class="badge ${isComplex ? "badge-complex" : ""}" style="
      border-color: ${c.badgeBorder || "#E2E0DE"};
      color: ${c.badgeText || c.headline};
      background: ${c.badgeBackground || "transparent"};
      ${c.badgeShadow ? `box-shadow: ${c.badgeShadow};` : ""}
    ">${iconHTML}<div class="badge-title">${label}</div>${subHTML}</div>`;
  }).join("");

  const logoHTML = logoUrl ? `
    <img class="logo" src="${logoUrl}" />
  ` : "";

  const disclaimerText = Array.isArray(config.disclaimer)
    ? config.disclaimer.join("<br>")
    : (config.disclaimer || "").replace(/\n/g, "<br>");

  const fontFaces = buildFontFaces();

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    ${fontFaces}

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      width: 1080px;
      height: 1920px;
      background: ${c.background};
      overflow: hidden;
      position: relative;
    }

    .container {
      width: 100%;
      height: 100%;
      padding: ${topPad}px ${sidePadding}px 64px;
      display: flex;
      flex-direction: column;
      align-items: stretch;
    }

    .top-pill {
      align-self: center;
      font-family: ${badgeFont};
      font-size: ${topPillFontSize}px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.14em;
      padding: ${topPillPadV}px ${topPillPadH}px;
      border-radius: 30px;
      margin-bottom: ${topPillMarginBottom}px;
    }

    .media-logos {
      text-align: center;
      margin-bottom: 16px;
    }
    .media-label {
      font-family: ${badgeFont};
      font-size: 14px;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: ${c.subheadline || "#807A7B"};
    }
    .media-row {
      display: flex;
      justify-content: center;
      gap: 28px;
      margin-top: 10px;
    }
    .media-name {
      font-family: ${fontMap.serif};
      font-size: 20px;
      font-weight: 700;
      font-style: italic;
      color: ${c.headline};
    }

    .headline {
      font-family: ${headlineFont};
      font-size: ${headlineFontSize}px;
      font-weight: ${headlineWeight};
      font-style: ${headlineStyle};
      line-height: ${headlineLineHeight};
      letter-spacing: ${headlineLetterSpacing};
      text-transform: uppercase;
      color: ${c.headline};
      text-align: ${headlineAlign};
    }

    .subheadline {
      font-family: ${subFont};
      font-size: ${subFontSize}px;
      font-weight: ${subWeight};
      font-style: ${subStyle};
      line-height: 1.4;
      color: ${c.subheadline || "#807A7B"};
      margin-top: ${gapHeadlineSub}px;
      text-align: ${subAlign};
    }

    .hero-wrapper {
      margin-top: ${gapSubHero}px;
      width: 100%;
      min-height: ${typeof heroHeight === "string" ? heroHeight : heroHeight + "px"};
      flex: 1;
      border-radius: ${heroBorderRadius}px;
      overflow: hidden;
      position: relative;
    }

    .hero-wrapper img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .badges-row {
      display: flex;
      justify-content: center;
      gap: ${badgeGap}px;
      margin-top: ${gapHeroBadges}px;
      flex-shrink: 0;
    }

    .badge {
      flex: 1;
      height: ${badgeHeight}px;
      padding: 0 ${badgePadH}px;
      border-radius: ${badgeBorderRadius}px;
      border: 1px solid;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: ${badgeFont};
      font-size: ${badgeFontSize}px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      white-space: nowrap;
    }

    .badge-complex {
      height: auto;
      padding: 20px ${badgePadH}px;
      flex-direction: column;
      gap: 4px;
      text-align: center;
    }
    .badge-icon {
      font-size: 36px;
      margin-bottom: 4px;
    }
    .badge-title {
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .badge-sub {
      font-size: 14px;
      font-weight: 400;
      text-transform: none;
      letter-spacing: 0;
      opacity: 0.7;
    }

    .cta {
      margin-top: ${gapBadgesCta}px;
      width: 100%;
      height: ${ctaHeight}px;
      border-radius: ${ctaBorderRadius}px;
      background: ${c.ctaBackground || c.headline};
      color: ${c.ctaText || c.background};
      font-family: ${ctaFontFamily};
      font-size: ${ctaFontSize}px;
      font-weight: 900;
      font-style: ${ctaStyle};
      text-transform: uppercase;
      letter-spacing: 0.08em;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .disclaimer {
      margin-top: ${gapCtaDisclaimer}px;
      font-family: ${fontMap.sans};
      font-size: ${disclaimerFontSize}px;
      font-weight: 400;
      line-height: 1.4;
      color: ${c.disclaimer || "#877F7C"};
      text-align: center;
    }

    .logo {
      margin-top: 24px;
      align-self: center;
      height: 44px;
      object-fit: contain;
    }
  </style>
</head>
<body>
  <div class="container">
    ${topPillHTML}
    ${mediaLogosHTML}
    <div class="headline">${config.headline.replace(/\n/g, "<br>")}</div>
    <div class="subheadline">${config.subheadline || ""}</div>
    <div class="hero-wrapper">
      <img src="${heroUrl}" />
    </div>
    <div class="badges-row">
      ${badgesHTML}
    </div>
    <div class="cta">${config.cta}</div>
    ${disclaimerText ? `<div class="disclaimer">${disclaimerText}</div>` : ""}
    ${logoHTML}
  </div>
</body>
</html>`;
}

const opts = parseArgs(process.argv);

if (!opts.config || !opts.output) {
  console.error(`Usage: node render.js --config <config.json> --output <output.png>

Options:
  --config <path>   JSON config file for the end card
  --output <path>   Output PNG path
  --width <px>      Viewport width (default: 1080)
  --height <px>     Viewport height (default: 1920)`);
  process.exit(1);
}

const configPath = resolve(opts.config);
if (!existsSync(configPath)) {
  console.error(`Config not found: ${configPath}`);
  process.exit(1);
}

const config = JSON.parse(readFileSync(configPath, "utf8"));
const configDir = dirname(configPath);
const html = buildHTML(config, configDir);

const htmlPath = resolve(opts.output.replace(/\.png$/i, ".html"));
writeFileSync(htmlPath, html);
console.error(`HTML saved: ${htmlPath}`);

console.error("Launching Puppeteer...");
const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: opts.width, height: opts.height, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: "networkidle0", timeout: 30000 });

const outputPath = resolve(opts.output);
await page.screenshot({ path: outputPath, type: "png", fullPage: false });
await browser.close();

console.error(`Rendered: ${outputPath} (${opts.width}x${opts.height})`);
console.log(JSON.stringify({ output: outputPath, htmlFile: htmlPath, width: opts.width, height: opts.height }, null, 2));
