#!/usr/bin/env node
/**
 * Reference Image → HyperFrames Composition using DESIGN.md tokens.
 *
 * Replaces the multi-step manual workflow:
 *   analyze-endcard.mjs → hand-code HTML → compare → iterate
 *
 * With a single command:
 *   ref-to-composition.mjs ref.png --design-md DESIGN.md --output path/
 *
 * Gemini only extracts content + layout type (not colors, fonts, spacing —
 * those come from DESIGN.md). generate.js builds the HTML from tokens.
 */
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { parseDesignMd } from "./design-tokens.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "..", "gemini-api", ".env") });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function callGemini(content) {
  const models = ["gemini-2.5-flash", "gemini-2.5-flash-lite"];
  for (const modelName of models) {
    const model = genAI.getGenerativeModel({ model: modelName });
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        return await model.generateContent(content);
      } catch (e) {
        if (e.status === 503 && attempt < 3) {
          await new Promise((r) => setTimeout(r, attempt * 5000));
          continue;
        }
        if (e.status === 503) break;
        throw e;
      }
    }
  }
  throw new Error("All Gemini models exhausted");
}

// --- Parse CLI args ---
const args = process.argv.slice(2);
let refImage = null;
let designMdPath = null;
let outputDir = null;
let brandDir = null;
let brollCount = 6;
let skipCompare = false;

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--design-md") { designMdPath = args[++i]; continue; }
  if (args[i] === "--output") { outputDir = args[++i]; continue; }
  if (args[i] === "--brand-dir") { brandDir = args[++i]; continue; }
  if (args[i] === "--broll-count") { brollCount = parseInt(args[++i], 10); continue; }
  if (args[i] === "--skip-compare") { skipCompare = true; continue; }
  if (!refImage) { refImage = args[i]; continue; }
}

if (!refImage || !designMdPath || !outputDir) {
  console.error(`Usage: node ref-to-composition.mjs <reference.png> \\
  --design-md <DESIGN.md> \\
  --output <project-dir> \\
  [--brand-dir <brand-assets-dir>] \\
  [--broll-count N] \\
  [--skip-compare]`);
  process.exit(1);
}

// --- Load design system ---
const { tokens } = parseDesignMd(designMdPath);
const paletteNames = Object.keys(tokens.palettes || {});
const compositionTypes = ["3a", "3b", "3c", "3d", "3e", "3f", "3g", "3h"];

const compositionDescriptions = `
3a: B-Roll Hero Window — photo/video window (~40% of frame), 18px rounded corners
3b: Product Bundle Display — products on flat surface, no window
3c: Overhead Flat-Lay — top-down surface shot, products + props scattered
3d: Typographic Hero — giant stat number IS the visual (no photos)
3e: Portrait-Over-Texture — person blended into organic texture
3f: Textured Background + Floating Window — video window on texture
3g: Textured Background + Seal/List — circular seal or text list on texture
3h: Infographic Grid — 2x2 or 2x3 card grid as hero
`;

// --- Load reference image ---
const imgBuf = fs.readFileSync(refImage);
const b64 = imgBuf.toString("base64");
const mimeType = /\.jpe?g$/i.test(refImage) ? "image/jpeg" : "image/png";

// --- Focused extraction: content + layout only ---
console.log("Step 1/4: Extracting content and layout from reference...");

const extractionPrompt = `You are analyzing an advertising end card to extract its CONTENT and LAYOUT TYPE. You do NOT need to extract colors, fonts, or spacing — those come from the design system.

Available composition types:
${compositionDescriptions}

Available palettes: ${paletteNames.join(", ")}

Analyze this end card and return a JSON object:

{
  "composition_type": "3a|3b|3c|3d|3e|3f|3g|3h",
  "palette": "${paletteNames.join("|")}",
  "headline": "exact headline text as displayed",
  "subhead": "exact sub-headline text, or null if none",
  "capsule": "capsule/authority label text (e.g. 'CLINICALLY PROVEN'), or null",
  "badges": ["badge 1 text", "badge 2 text", "badge 3 text"],
  "cta": "exact CTA button text",
  "disclaimer": "FDA disclaimer or condition text, or null",
  "footnote": "asterisk footnote text, or null",
  "stat": "stat number for 3D type (e.g. '90', '$2.61', '80%'), or null",
  "grid_cells": ["cell text 1", "cell text 2", ...],
  "hero_type": "seal|list (for 3G only, default seal)",
  "layout_notes": "any notable layout variations from the standard template — e.g. 'badges are vertical instead of horizontal', 'no logo at top', 'photo is grayscale'"
}

RULES:
1. Extract ALL visible text exactly as displayed (preserve case, punctuation, line breaks).
2. For composition type, choose the closest match from the 8 options. If the hero is a video window or could be animated, prefer 3a or 3f.
3. For palette, match the dominant background color to the closest available palette.
4. badge text should be individual badge labels, not the whole row.
5. If there's a large stat number as the main visual (no photo), it's 3d.
6. If there's a textured/photographic background with a floating window, it's 3f.
7. If there's a textured background with a seal or list (no window), it's 3g.
8. layout_notes should ONLY flag things that differ from the standard composition template. If the layout is standard, use null.

Return ONLY the JSON object. No markdown fences.`;

const resp = await callGemini([
  { inlineData: { mimeType, data: b64 } },
  { text: extractionPrompt },
]);

let text = resp.response.text().trim();
if (text.startsWith("```")) text = text.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");

let extraction;
try {
  extraction = JSON.parse(text);
} catch {
  console.error("Extraction parse failed. Raw output:");
  console.error(text);
  process.exit(1);
}

console.log(`  Type: ${extraction.composition_type}`);
console.log(`  Palette: ${extraction.palette}`);
console.log(`  Headline: ${extraction.headline}`);
if (extraction.layout_notes) console.log(`  Layout notes: ${extraction.layout_notes}`);

// --- Generate composition via generate.js ---
console.log("\nStep 2/4: Generating composition from design tokens...");

const absDesignMd = path.resolve(designMdPath);
const absOutput = path.resolve(outputDir);

const generateArgs = [
  "--type", extraction.composition_type,
  "--palette", extraction.palette,
  "--headline", extraction.headline,
  "--cta", extraction.cta || "TRY NOW",
  "--design-md", absDesignMd,
  "--output", absOutput,
];

if (extraction.subhead) generateArgs.push("--subhead", extraction.subhead);
if (extraction.capsule) generateArgs.push("--capsule", extraction.capsule);
if (extraction.disclaimer) generateArgs.push("--disclaimer", extraction.disclaimer);
if (extraction.footnote) generateArgs.push("--footnote", extraction.footnote);
if (extraction.stat) generateArgs.push("--stat", extraction.stat);
if (extraction.badges && extraction.badges.length > 0) {
  generateArgs.push("--badges", extraction.badges.join("|"));
}
if (extraction.grid_cells && extraction.grid_cells.length > 0) {
  generateArgs.push("--grid-cells", extraction.grid_cells.join("|"));
}
if (extraction.hero_type && extraction.hero_type !== "seal") {
  generateArgs.push("--hero-type", extraction.hero_type);
}
generateArgs.push("--broll-count", String(brollCount));

try {
  const result = execFileSync("node", [path.join(__dirname, "generate.js"), ...generateArgs], {
    encoding: "utf-8",
    cwd: __dirname,
  });
  const parsed = JSON.parse(result);
  console.log(`  Project created: ${parsed.project}`);
  console.log(`  Files: ${parsed.files.join(", ")}`);
  if (parsed.brollSlots > 0) console.log(`  B-roll slots: ${parsed.brollSlots}`);
} catch (e) {
  console.error("Generation failed:", e.stderr || e.message);
  process.exit(1);
}

// --- Post-generation: copy assets ---
console.log("\nStep 3/4: Copying assets...");

let logoCopied = false;
let bgCopied = false;

if (brandDir) {
  // Find logo
  const logoCandidates = [
    path.join(brandDir, "logo.png"),
    path.join(brandDir, "00 Assets", "logo.png"),
  ];

  // Also check existing animation projects for logo
  const animDir = path.join(brandDir, "00 Assets", "Animations");
  if (fs.existsSync(animDir)) {
    const projects = fs.readdirSync(animDir).filter(f => {
      const p = path.join(animDir, f, "logo.png");
      return fs.existsSync(p);
    });
    if (projects.length > 0) {
      logoCandidates.unshift(path.join(animDir, projects[0], "logo.png"));
    }
  }

  for (const src of logoCandidates) {
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(outputDir, "logo.png"));
      console.log(`  Logo copied from: ${path.relative(process.cwd(), src)}`);
      logoCopied = true;
      break;
    }
  }

  // For textured palettes, find bg.png
  const palette = tokens.palettes[extraction.palette];
  if (palette && palette.textured) {
    if (fs.existsSync(animDir)) {
      const bgProjects = fs.readdirSync(animDir).filter(f => {
        const p = path.join(animDir, f, "bg.png");
        return fs.existsSync(p);
      });
      if (bgProjects.length > 0) {
        const src = path.join(animDir, bgProjects[0], "bg.png");
        fs.copyFileSync(src, path.join(outputDir, "bg.png"));
        console.log(`  bg.png copied from: ${path.relative(process.cwd(), src)}`);
        bgCopied = true;
      }
    }
  }
}

if (!logoCopied) console.log("  Logo: needs manual copy (use --brand-dir or copy logo.png manually)");
if (tokens.palettes[extraction.palette]?.textured && !bgCopied) {
  console.log("  bg.png: needs creation (textured palette). Use generate-bg.js.");
}

// --- Compare against reference ---
if (!skipCompare) {
  console.log("\nStep 4/4: Comparing against reference...");
  const compareTool = path.join(__dirname, "compare-visual.mjs");
  const htmlPath = path.join(outputDir, "index.html");

  if (fs.existsSync(compareTool)) {
    try {
      const compareResult = execFileSync("node", [compareTool, "--ref", refImage, "--html", htmlPath], {
        encoding: "utf-8",
        timeout: 60000,
      });
      console.log(compareResult);
    } catch (e) {
      console.log("  Compare skipped (tool error or timeout). Run manually:");
      console.log(`  node "${compareTool}" --ref "${refImage}" --html "${htmlPath}"`);
    }
  } else {
    console.log("  compare-visual.mjs not found. Skipping visual comparison.");
  }
} else {
  console.log("\nStep 4/4: Skipped (--skip-compare)");
}

// --- Summary ---
console.log("\n--- Result ---");
console.log(JSON.stringify({
  project: outputDir,
  reference: refImage,
  designMd: designMdPath,
  compositionType: extraction.composition_type,
  palette: extraction.palette,
  headline: extraction.headline,
  layoutNotes: extraction.layout_notes || null,
  extraction,
  assets: {
    logo: logoCopied,
    bg: bgCopied,
    brollSlots: ["3a", "3f"].includes(extraction.composition_type) ? brollCount : 0,
  },
}, null, 2));
