import { chromium } from "/opt/homebrew/lib/node_modules/playwright/index.mjs";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const geminiEnv = join(__dirname, "..", "gemini-api", ".env");
dotenv.config({ path: geminiEnv });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const MODELS = ["gemini-2.5-flash", "gemini-2.5-flash-lite"];

async function callWithRetry(content, maxRetries = 3) {
  for (const modelName of MODELS) {
    const model = genAI.getGenerativeModel({ model: modelName });
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await model.generateContent(content);
      } catch (e) {
        if (e.status === 503 && attempt < maxRetries) {
          const delay = attempt * 5000;
          console.error(`${modelName} 503 — retrying in ${delay / 1000}s (attempt ${attempt}/${maxRetries})`);
          await new Promise((r) => setTimeout(r, delay));
          continue;
        }
        if (e.status === 503) {
          console.error(`${modelName} exhausted retries — trying fallback model`);
          break;
        }
        throw e;
      }
    }
  }
  throw new Error("All Gemini models exhausted");
}

// --- Arg parsing ---
function parseArgs() {
  const args = process.argv.slice(2);
  const parsed = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--ref") parsed.ref = args[++i];
    else if (args[i] === "--html") parsed.html = args[++i];
    else if (args[i] === "--project") parsed.project = args[++i];
    else if (args[i] === "--output") parsed.output = args[++i];
  }
  if (parsed.project && !parsed.html) {
    parsed.html = join(parsed.project, "index.html");
  }
  if (!parsed.ref || !parsed.html) {
    console.error("Usage: node compare-visual.mjs --ref <reference.png> --html <index.html> [--output <dir>]");
    console.error("   or: node compare-visual.mjs --ref <reference.png> --project <project-dir> [--output <dir>]");
    process.exit(1);
  }
  parsed.ref = resolve(parsed.ref);
  parsed.html = resolve(parsed.html);
  if (!parsed.output) {
    parsed.output = dirname(parsed.html);
  }
  return parsed;
}

const args = parseArgs();

// --- Step 1: Screenshot the HTML ---
console.log("Screenshotting HTML composition...");
const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1080, height: 1920 });
await page.goto(`file://${args.html}`, { waitUntil: "networkidle" });
await page.waitForTimeout(2000);

// Seek timeline to 100% so all elements are visible
await page.evaluate(() => {
  const tl = window.__timelines?.main;
  if (tl) tl.progress(1);
});
await page.waitForTimeout(300);

// --- Step 2: Measure bounding boxes ---
const measurements = await page.evaluate(() => {
  const result = {};
  const allElements = document.querySelectorAll("[id]");
  for (const el of allElements) {
    const id = el.id;
    if (!id || id === "root") continue;
    const rect = el.getBoundingClientRect();
    const style = window.getComputedStyle(el);
    result[id] = {
      top: Math.round(rect.top),
      bottom: Math.round(rect.bottom),
      height: Math.round(rect.height),
      left: Math.round(rect.left),
      width: Math.round(rect.width),
      centerX: Math.round(rect.left + rect.width / 2),
      fontSize: style.fontSize,
      fontFamily: style.fontFamily,
      fontWeight: style.fontWeight,
      color: style.color,
      backgroundColor: style.backgroundColor,
      borderRadius: style.borderRadius,
      border: style.border,
      padding: style.padding,
      opacity: style.opacity,
    };
  }
  result._canvas = {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  };
  return result;
});

const screenshotPath = join(args.output, "auto-screenshot.png");
await page.screenshot({ path: screenshotPath });

// --- Step 3: Side-by-side image (base64 embedded to avoid file:// issues) ---
const sideBySidePath = join(args.output, "side-by-side.png");
const refBuf = fs.readFileSync(args.ref);
const scrBuf = fs.readFileSync(screenshotPath);
const refB64 = refBuf.toString("base64");
const scrB64 = scrBuf.toString("base64");
const refMime = args.ref.endsWith(".jpg") || args.ref.endsWith(".jpeg") ? "image/jpeg" : "image/png";

const compPage = await browser.newPage();
await compPage.setViewportSize({ width: 2240, height: 1920 });
await compPage.setContent(`
  <style>
    body { margin: 0; display: flex; gap: 40px; background: #222; padding: 20px; }
    img { width: 1080px; height: 1920px; object-fit: contain; }
    .label { position: absolute; top: 30px; color: #fff; font: bold 32px sans-serif; background: rgba(0,0,0,0.8); padding: 10px 20px; border-radius: 8px; }
    .container { position: relative; }
  </style>
  <div class="container">
    <div class="label" style="left:20px">REFERENCE</div>
    <img src="data:${refMime};base64,${refB64}" />
  </div>
  <div class="container">
    <div class="label" style="left:20px">HTML RENDER</div>
    <img src="data:image/png;base64,${scrB64}" />
  </div>
`);
await compPage.waitForTimeout(1000);
await compPage.screenshot({ path: sideBySidePath });
await browser.close();

// --- Step 4: Visual diff via Gemini ---
console.log("Running Gemini visual comparison...");

const diffPrompt = `You are comparing two ad card images. Image 1 is the REFERENCE (the original design). Image 2 is the HTML RENDER (an attempt to reproduce it in code).

Both are 1080x1920px ad cards. Compare them and list EVERY visual difference. Be specific and actionable — for each difference, tell me exactly what CSS property to change and to what value.

Return a JSON object:

{
  "fidelity_score": 0-100,
  "pass": true/false,
  "differences": [
    {
      "element": "headline|subhead|badges|cta|photo|disclaimer|logo|capsule|background|footnote|stat|overall",
      "property": "the CSS property that needs changing (font-size, color, background, border, margin, padding, width, height, border-radius, letter-spacing, font-weight, text-transform, box-shadow, etc.)",
      "reference_value": "what it looks like in the reference",
      "current_value": "what it looks like in the HTML render",
      "fix": "exact CSS declaration to apply, e.g. 'font-size: 72px' or 'background: #4b0e15' or 'border-radius: 40px'",
      "severity": "major|minor|trivial"
    }
  ],
  "summary": "1-2 sentence overall assessment"
}

SCORING:
- 95-100: Pixel-perfect or near-perfect. Minor sub-pixel differences only. PASS.
- 85-94: Close but noticeable differences in spacing, sizing, or colors. Needs iteration.
- 70-84: Structural match but significant styling drift. Multiple CSS fixes needed.
- Below 70: Major layout or styling differences. Substantial rework needed.

RULES:
1. Compare LAYOUT first: are elements in the same vertical order? Same proportions? Same spacing?
2. Then TYPOGRAPHY: font size, weight, style (italic vs normal), case (uppercase vs mixed), color, letter-spacing
3. Then COLORS: background, borders, badge fills, CTA color, text colors
4. Then DETAILS: border-radius, shadows, opacity, padding, icon presence
5. Ignore content differences (different text is expected if the composition was generated from different brief data) — focus on STYLING differences
6. Be specific with hex colors — "#4b0e15" not "dark red"
7. The "fix" field must be a valid CSS declaration that can be applied directly
8. Mark a difference as "major" if it's immediately noticeable at arm's length, "minor" if visible on close inspection, "trivial" if only visible in pixel-level comparison
9. Set "pass" to true only if fidelity_score >= 95

Return ONLY the JSON object. No markdown fences.`;

let diffReport;
try {
  const diffResp = await callWithRetry([
    { inlineData: { mimeType: refMime, data: refB64 } },
    { inlineData: { mimeType: "image/png", data: scrB64 } },
    { text: diffPrompt },
  ]);

  let diffText = diffResp.response.text().trim();
  if (diffText.startsWith("```")) {
    diffText = diffText.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }

  try {
    diffReport = JSON.parse(diffText);
  } catch (e) {
    console.error("Gemini diff JSON parse failed. Raw output:");
    console.error(diffText);
    diffReport = { fidelity_score: 0, pass: false, differences: [], summary: "Parse failed — manual review needed" };
  }
} catch (e) {
  console.error(`Gemini visual diff unavailable: ${e.message}`);
  console.error("Falling back to structural-only comparison. Use the side-by-side image for manual visual review.");
  diffReport = { fidelity_score: null, pass: false, differences: [], summary: "Gemini API unavailable — structural comparison only. Review side-by-side.png manually." };
}

// --- Step 5: Structural measurements report ---
const structuralReport = {
  canvas: measurements._canvas,
  elements: {},
};
for (const [id, m] of Object.entries(measurements)) {
  if (id === "_canvas") continue;
  structuralReport.elements[id] = m;
}

// --- Step 6: Combined output ---
const report = {
  reference: args.ref,
  html: args.html,
  timestamp: new Date().toISOString(),
  visual: diffReport,
  structural: structuralReport,
  files: {
    screenshot: screenshotPath,
    side_by_side: sideBySidePath,
    report: join(args.output, "diff-report.json"),
  },
};

fs.writeFileSync(join(args.output, "diff-report.json"), JSON.stringify(report, null, 2));

// --- Console output ---
console.log(`\n${"=".repeat(60)}`);
console.log(`FIDELITY SCORE: ${diffReport.fidelity_score}/100 ${diffReport.pass ? "PASS" : "NEEDS ITERATION"}`);
console.log(`${"=".repeat(60)}`);
console.log(`\n${diffReport.summary}\n`);

if (diffReport.differences && diffReport.differences.length > 0) {
  const majors = diffReport.differences.filter((d) => d.severity === "major");
  const minors = diffReport.differences.filter((d) => d.severity === "minor");
  const trivials = diffReport.differences.filter((d) => d.severity === "trivial");

  if (majors.length > 0) {
    console.log(`MAJOR (${majors.length}):`);
    for (const d of majors) {
      console.log(`  ${d.element} > ${d.property}: ${d.reference_value} -> ${d.current_value}`);
      console.log(`    FIX: ${d.fix}`);
    }
  }
  if (minors.length > 0) {
    console.log(`\nMINOR (${minors.length}):`);
    for (const d of minors) {
      console.log(`  ${d.element} > ${d.property}: ${d.reference_value} -> ${d.current_value}`);
      console.log(`    FIX: ${d.fix}`);
    }
  }
  if (trivials.length > 0) {
    console.log(`\nTRIVIAL (${trivials.length}):`);
    for (const d of trivials) {
      console.log(`  ${d.element} > ${d.property}`);
    }
  }
}

// Element positions
console.log(`\n--- Element Positions ---`);
console.log("Element        | Top    | Height | Width  | Font");
console.log("---------------|--------|--------|--------|------------------");
for (const [id, m] of Object.entries(measurements)) {
  if (id === "_canvas") continue;
  console.log(
    `${id.padEnd(14)} | ${String(m.top).padStart(5)}  | ${String(m.height).padStart(5)}  | ${String(m.width).padStart(5)}  | ${m.fontSize} ${m.fontWeight}`
  );
}

console.log(`\nScreenshot: ${screenshotPath}`);
console.log(`Side-by-side: ${sideBySidePath}`);
console.log(`Diff report: ${join(args.output, "diff-report.json")}`);

// Exit code: 0 = pass, 1 = needs iteration
process.exit(diffReport.pass ? 0 : 1);
