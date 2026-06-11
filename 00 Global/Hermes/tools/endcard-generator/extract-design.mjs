#!/usr/bin/env node
/**
 * Extract design tokens from reference images into DESIGN.md format.
 *
 * Usage:
 *   node extract-design.mjs <image1.png> [image2.png ...] --brand IM8 --output DESIGN.md
 *   node extract-design.mjs <image.png> --brand IM8 --update IM8/00\ Context/DESIGN.md
 *
 * --update mode reads the existing DESIGN.md palettes section and asks Gemini
 * whether the new image introduces tokens not already captured. If yes, it
 * proposes additions. If no, it confirms the design system covers the image.
 */
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
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

function loadImage(imgPath) {
  const buf = fs.readFileSync(imgPath);
  const mime = /\.jpe?g$/i.test(imgPath) ? "image/jpeg" : "image/png";
  return { inlineData: { mimeType: mime, data: buf.toString("base64") } };
}

const args = process.argv.slice(2);
const imageArgs = [];
let brand = null;
let outputPath = null;
let updatePath = null;

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--brand") { brand = args[++i]; continue; }
  if (args[i] === "--output") { outputPath = args[++i]; continue; }
  if (args[i] === "--update") { updatePath = args[++i]; continue; }
  imageArgs.push(args[i]);
}

if (imageArgs.length === 0) {
  console.error("Usage: node extract-design.mjs <image.png> [image2.png ...] --brand <name> [--output DESIGN.md | --update existing-DESIGN.md]");
  process.exit(1);
}

// --- UPDATE MODE: check image against existing design system ---
if (updatePath) {
  const { tokens, markdown } = parseDesignMd(updatePath);
  const img = loadImage(imageArgs[0]);

  const tokensYAML = JSON.stringify({
    colors: tokens.colors,
    typography: tokens.typography,
    rounded: tokens.rounded,
    spacing: tokens.spacing,
    palettes: Object.fromEntries(
      Object.entries(tokens.palettes || {}).map(([k, v]) => [k, { name: v.name, textured: v.textured, vars: v.vars }])
    ),
  }, null, 2);

  const updatePrompt = `You are a design systems engineer. I have an existing DESIGN.md for the brand "${brand || "unknown"}" with these tokens:

${tokensYAML}

Now look at this new reference image. Compare it against the existing design system tokens.

Return a JSON object:
{
  "covered": true/false,
  "palette_match": "light|dark|blue-molecular|red-organic|terracotta|new",
  "new_colors": [{"name": "token-name", "value": "#hex", "reason": "where it appears"}],
  "new_typography": [{"name": "token-name", "props": {...}, "reason": "where it appears"}],
  "new_spacing": [{"name": "token-name", "value": "Npx", "reason": "what it measures"}],
  "discrepancies": [{"token": "path.to.token", "expected": "value from DESIGN.md", "actual": "value in image", "severity": "minor|major"}],
  "notes": "any observations about the image that the design system should capture"
}

If the existing tokens fully cover this image, set covered=true and leave the new_* arrays empty.
Only flag discrepancies if the difference would be visible (>2px for sizes, >10 hex-digit-distance for colors).

Return ONLY the JSON object.`;

  const resp = await callGemini([img, { text: updatePrompt }]);
  let text = resp.response.text().trim();
  if (text.startsWith("```")) text = text.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");

  try {
    const result = JSON.parse(text);
    if (result.covered) {
      console.log(`Design system covers this image. Palette match: ${result.palette_match}`);
    } else {
      console.log("Design system gaps found:");
    }
    console.log(JSON.stringify(result, null, 2));
  } catch {
    console.error("Parse failed. Raw Gemini output:");
    console.error(text);
  }
  process.exit(0);
}

// --- EXTRACT MODE: build tokens from reference images ---
const images = imageArgs.map(loadImage);

const extractPrompt = `You are a design systems engineer building a DESIGN.md (Google design.md format) from reference ad card images. The canvas is 1080x1920 px. Brand: "${brand || "unknown"}".

Analyze ${images.length > 1 ? "these images together" : "this image"} and extract a complete visual design system. Return a JSON object with these sections:

{
  "colors": {
    "token-name": "#hex"
  },
  "typography": {
    "token-name": {
      "fontFamily": "exact font name",
      "fontSize": "Npx",
      "fontWeight": N,
      "lineHeight": N.N,
      "letterSpacing": "Npx or Nem"
    }
  },
  "rounded": {
    "token-name": "Npx"
  },
  "spacing": {
    "token-name": "Npx or N"
  },
  "palettes": {
    "palette-name": {
      "name": "Human Name",
      "textured": false,
      "vars": {
        "--bg": "value",
        "--bg-image": "none or url(bg.png)",
        "--text-primary": "value",
        "--text-secondary": "value",
        "--text-muted": "value",
        "--badge-bg": "value",
        "--badge-border": "value",
        "--badge-text": "value",
        "--badge-shadow": "none or CSS value",
        "--badge-radius": "Npx",
        "--cta-bg": "value",
        "--cta-text": "value",
        "--border-color": "value",
        "--pill-border": "value",
        "--pill-text": "value",
        "--pill-bg": "value",
        "--text-shadow": "none or CSS value",
        "--logo-filter": "none or CSS filter",
        "--photo-border": "CSS border value"
      }
    }
  }
}

RULES:
1. Every color must be a real hex value sampled from the image.
2. Measure font sizes by cap-height × 1.4.
3. Classify fonts as serif or sans-serif by examining actual letterforms — look at "I", "T", "E" terminals.
4. For palette vars, use the exact CSS custom property names shown above. These are consumed by HyperFrames templates.
5. If the image has a textured/photographic background (not a solid color), set textured=true and --bg-image to "url(bg.png)".
6. Group related colors under meaningful token names (e.g., "maroon-primary", "cream-bg", "muted-text").
7. For border-radius, name tokens by their use: "cta", "badge-sm", "window", "disclaimer", "capsule".
8. For spacing, include: canvas dimensions, content padding, gaps between elements, component-specific padding.

Return ONLY the JSON object. No markdown fences, no explanation.`;

const resp = await callGemini([...images, { text: extractPrompt }]);
let text = resp.response.text().trim();
if (text.startsWith("```")) text = text.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");

let extraction;
try {
  extraction = JSON.parse(text);
} catch {
  console.error("Parse failed. Raw output:");
  console.error(text);
  process.exit(1);
}

// Build DESIGN.md content
function toYAMLSection(obj, indent = 2) {
  const lines = [];
  for (const [key, val] of Object.entries(obj)) {
    const pad = " ".repeat(indent);
    if (val && typeof val === "object" && !Array.isArray(val)) {
      lines.push(`${pad}${key}:`);
      lines.push(toYAMLSection(val, indent + 2));
    } else {
      const strVal = typeof val === "string" && (val.includes(" ") || val.includes(",") || val.includes("(")) ? `"${val}"` : String(val);
      lines.push(`${pad}${key}: ${strVal}`);
    }
  }
  return lines.join("\n");
}

const yamlBody = [
  "version: alpha",
  `name: ${brand || "Unknown"} End Cards`,
  `description: "Visual design system extracted from ${imageArgs.length} reference image(s)"`,
  "",
  "colors:",
  toYAMLSection(extraction.colors),
  "",
  "typography:",
  toYAMLSection(extraction.typography),
  "",
  "rounded:",
  toYAMLSection(extraction.rounded),
  "",
  "spacing:",
  toYAMLSection(extraction.spacing),
  "",
  "palettes:",
  toYAMLSection(extraction.palettes),
].join("\n");

const markdownBody = `
## Overview

Design system extracted from ${imageArgs.length} reference image(s) for ${brand || "unknown"} brand end cards. Canvas: 1080x1920.

## Colors

Review and refine the extracted color tokens. Verify hex values against the actual brand guidelines.

## Typography

Verify font family names match locally installed fonts. Check that font sizes and weights match the reference images.

## Do's and Don'ts

- Do verify all extracted values against the original reference images
- Don't use this file without manual review — AI extraction is approximate
`;

const designMd = `---\n${yamlBody}\n---\n${markdownBody}`;

if (outputPath) {
  fs.writeFileSync(outputPath, designMd);
  console.log(`DESIGN.md written to: ${outputPath}`);
  console.log(`Extracted: ${Object.keys(extraction.colors || {}).length} colors, ${Object.keys(extraction.typography || {}).length} typography tokens, ${Object.keys(extraction.palettes || {}).length} palettes`);
} else {
  console.log(designMd);
}
