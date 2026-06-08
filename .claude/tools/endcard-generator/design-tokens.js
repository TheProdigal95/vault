#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { parse as parseYAML } from "yaml";
import { fileURLToPath } from "url";
import minimist from "minimist";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function parseDesignMd(filePath) {
  const raw = fs.readFileSync(filePath, "utf-8");
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) {
    throw new Error(`No YAML front matter found in ${filePath}`);
  }
  const tokens = parseYAML(fmMatch[1]);
  const markdown = raw.slice(fmMatch[0].length).trim();
  return { tokens, markdown };
}

function resolveRef(ref, tokens) {
  const match = ref.match(/^\{(.+)\}$/);
  if (!match) return ref;
  const parts = match[1].split(".");
  let val = tokens;
  for (const p of parts) {
    if (val == null) return ref;
    val = val[p];
  }
  return val != null ? String(val) : ref;
}

function resolveAllRefs(obj, tokens) {
  if (typeof obj === "string") return resolveRef(obj, tokens);
  if (Array.isArray(obj)) return obj.map((v) => resolveAllRefs(v, tokens));
  if (obj && typeof obj === "object") {
    const out = {};
    for (const [k, v] of Object.entries(obj)) {
      out[k] = resolveAllRefs(v, tokens);
    }
    return out;
  }
  return obj;
}

function getPalette(tokens, paletteName) {
  const palettes = tokens.palettes;
  if (!palettes) throw new Error("No palettes section in DESIGN.md");
  const key = paletteName.replace(/\s+/g, "-").toLowerCase();
  const palette = palettes[key];
  if (!palette) {
    const available = Object.keys(palettes).join(", ");
    throw new Error(`Unknown palette: ${key}. Available: ${available}`);
  }
  const resolved = resolveAllRefs(palette.vars, tokens);
  return {
    name: palette.name,
    textured: palette.textured,
    ...Object.fromEntries(
      Object.entries(resolved).map(([k, v]) => [k, v])
    ),
  };
}

function paletteToCSSVars(palette) {
  const lines = [];
  for (const [k, v] of Object.entries(palette)) {
    if (k === "name" || k === "textured") continue;
    lines.push(`  ${k}: ${v};`);
  }
  return `:root {\n${lines.join("\n")}\n}`;
}

function paletteToLegacyJSON(palette) {
  const out = { name: palette.name, textured: palette.textured };
  for (const [k, v] of Object.entries(palette)) {
    if (k === "name" || k === "textured") continue;
    out[k] = v;
  }
  return out;
}

function allPalettesToLegacyJSON(tokens) {
  const palettes = tokens.palettes;
  if (!palettes) throw new Error("No palettes section in DESIGN.md");
  const out = {};
  for (const key of Object.keys(palettes)) {
    out[key] = paletteToLegacyJSON(getPalette(tokens, key));
  }
  return out;
}

function typographyToCSS(tokens) {
  const typo = tokens.typography;
  if (!typo) return "";
  const blocks = [];
  for (const [name, def] of Object.entries(typo)) {
    const props = [];
    if (def.fontFamily) props.push(`  font-family: "${def.fontFamily}", ${def.fontFamily.includes("Arizona") ? "serif" : "sans-serif"};`);
    if (def.fontSize) props.push(`  font-size: ${def.fontSize};`);
    if (def.fontWeight) props.push(`  font-weight: ${def.fontWeight};`);
    if (def.lineHeight) props.push(`  line-height: ${def.lineHeight};`);
    if (def.letterSpacing && def.letterSpacing !== "0em") props.push(`  letter-spacing: ${def.letterSpacing};`);
    if (def.fontStyle) props.push(`  font-style: ${def.fontStyle};`);
    blocks.push(`.type-${name} {\n${props.join("\n")}\n}`);
  }
  return blocks.join("\n\n");
}

function summary(tokens) {
  const counts = {
    colors: tokens.colors ? Object.keys(tokens.colors).length : 0,
    typography: tokens.typography ? Object.keys(tokens.typography).length : 0,
    rounded: tokens.rounded ? Object.keys(tokens.rounded).length : 0,
    spacing: tokens.spacing ? Object.keys(tokens.spacing).length : 0,
    palettes: tokens.palettes ? Object.keys(tokens.palettes).length : 0,
    components: tokens.components ? Object.keys(tokens.components).length : 0,
  };
  return counts;
}

export { parseDesignMd, getPalette, paletteToCSSVars, paletteToLegacyJSON, allPalettesToLegacyJSON, typographyToCSS, summary };

const isCLI = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));
if (!isCLI) { /* imported as module — skip CLI */ } else {

// CLI
const args = minimist(process.argv.slice(2), {
  string: ["design-md", "palette", "format"],
  boolean: ["all-palettes", "summary", "typography"],
  default: { format: "css" },
});

const designMdPath = args["design-md"] || args._[0];
if (!designMdPath) {
  console.error("Usage: node design-tokens.js <DESIGN.md> [--palette light] [--format css|json|legacy] [--all-palettes] [--summary] [--typography]");
  process.exit(1);
}

const { tokens } = parseDesignMd(designMdPath);

if (args.summary) {
  console.log(JSON.stringify(summary(tokens), null, 2));
  process.exit(0);
}

if (args.typography) {
  console.log(typographyToCSS(tokens));
  process.exit(0);
}

if (args["all-palettes"]) {
  const legacy = allPalettesToLegacyJSON(tokens);
  console.log(JSON.stringify(legacy, null, 2));
  process.exit(0);
}

if (!args.palette) {
  console.error("Specify --palette <name> or --all-palettes or --summary");
  process.exit(1);
}

const palette = getPalette(tokens, args.palette);

if (args.format === "json") {
  console.log(JSON.stringify(palette, null, 2));
} else if (args.format === "legacy") {
  console.log(JSON.stringify(paletteToLegacyJSON(palette), null, 2));
} else {
  console.log(paletteToCSSVars(palette));
}
}
