#!/usr/bin/env node
/**
 * process-logo.js — Converts a brand logo to white-on-transparent for use on dark/textured backgrounds.
 *
 * Usage:
 *   node process-logo.js --image logo.png --output logo-white.png [--threshold 200]
 *
 * Detects the background (light pixels), makes it transparent,
 * and converts dark pixels (the logo text/mark) to white.
 */

import sharp from "sharp";
import { existsSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";

function parseArgs(argv) {
  const args = argv.slice(2);
  const result = { image: null, output: null, threshold: 200 };
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--image": result.image = args[++i]; break;
      case "--output": result.output = args[++i]; break;
      case "--threshold": result.threshold = parseInt(args[++i], 10); break;
    }
  }
  return result;
}

const opts = parseArgs(process.argv);

if (!opts.image || !opts.output) {
  console.error(`Usage: node process-logo.js --image <logo.png> --output <logo-white.png> [--threshold 200]

Converts a logo with a solid background to white text on transparent background.
Pixels brighter than threshold → transparent. Darker → white.

Options:
  --threshold <0-255>  Brightness cutoff (default: 200). Higher = more aggressive bg removal.`);
  process.exit(1);
}

const imagePath = resolve(opts.image);
if (!existsSync(imagePath)) {
  console.error(`Image not found: ${imagePath}`);
  process.exit(1);
}

const outputPath = resolve(opts.output);
mkdirSync(dirname(outputPath), { recursive: true });

const img = sharp(imagePath);
const meta = await img.metadata();
const raw = await img.ensureAlpha().raw().toBuffer();

for (let i = 0; i < meta.width * meta.height; i++) {
  const idx = i * 4;
  const r = raw[idx], g = raw[idx + 1], b = raw[idx + 2];
  const brightness = (r + g + b) / 3;

  if (brightness > opts.threshold) {
    raw[idx] = 255; raw[idx + 1] = 255; raw[idx + 2] = 255; raw[idx + 3] = 0;
  } else {
    raw[idx] = 255; raw[idx + 1] = 255; raw[idx + 2] = 255; raw[idx + 3] = 255;
  }
}

await sharp(raw, { raw: { width: meta.width, height: meta.height, channels: 4 } })
  .png()
  .toFile(outputPath);

console.error(`Saved: ${outputPath} (${meta.width}x${meta.height}, white-on-transparent)`);
console.log(JSON.stringify({
  source: imagePath,
  output: outputPath,
  dimensions: { width: meta.width, height: meta.height },
  threshold: opts.threshold,
}, null, 2));
