#!/usr/bin/env node
/**
 * generate-bg.js — Extracts a clean textured background from a reference image.
 *
 * Usage:
 *   node generate-bg.js --image ref.png --output project/bg.png [--width 1080] [--height 1920] [--prompt "texture description"]
 *
 * Steps:
 *   1. Creates an edge-only mask (10px border = keep, everything else = regenerate)
 *   2. Calls GPT Image 2 inpaint to fill the center with continuous texture
 *   3. Crops the anchor strips (12px each edge) to remove seam artifacts
 *   4. Resizes to target dimensions (default 1080x1920)
 */

import sharp from "sharp";
import { execSync } from "child_process";
import { writeFileSync, existsSync, mkdirSync, unlinkSync } from "fs";
import { resolve, dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function parseArgs(argv) {
  const args = argv.slice(2);
  const result = {
    image: null,
    output: null,
    width: 1080,
    height: 1920,
    prompt: null,
  };
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--image": result.image = args[++i]; break;
      case "--output": result.output = args[++i]; break;
      case "--width": result.width = parseInt(args[++i], 10); break;
      case "--height": result.height = parseInt(args[++i], 10); break;
      case "--prompt": result.prompt = args[++i]; break;
    }
  }
  return result;
}

const opts = parseArgs(process.argv);

if (!opts.image || !opts.output) {
  console.error(`Usage: node generate-bg.js --image <ref.png> --output <bg.png> [options]

Options:
  --width <px>     Target width (default: 1080)
  --height <px>    Target height (default: 1920)
  --prompt <text>  Custom inpaint prompt (auto-detected if omitted)

Extracts a clean textured background from a reference end card image by:
1. Masking all content (keeping only 10px edge strips for texture context)
2. Inpainting via GPT Image 2 to fill with continuous texture
3. Cropping anchor strip artifacts and resizing to target dimensions`);
  process.exit(1);
}

const imagePath = resolve(opts.image);
if (!existsSync(imagePath)) {
  console.error(`Image not found: ${imagePath}`);
  process.exit(1);
}

const outputPath = resolve(opts.output);
mkdirSync(dirname(outputPath), { recursive: true });

// Step 1: Get source dimensions
const meta = await sharp(imagePath).metadata();
const srcW = meta.width;
const srcH = meta.height;
console.error(`Source: ${srcW}x${srcH}`);

// Step 2: Create edge-only mask
const edge = 10;
const mask = Buffer.alloc(srcW * srcH, 255); // all white = regenerate
for (let y = 0; y < srcH; y++) {
  for (let x = 0; x < srcW; x++) {
    if (y < edge || y >= srcH - edge || x < edge || x >= srcW - edge) {
      mask[y * srcW + x] = 0; // black = keep (edge anchors)
    }
  }
}

const maskPath = "/tmp/generate-bg-mask.png";
await sharp(mask, { raw: { width: srcW, height: srcH, channels: 1 } })
  .png()
  .toFile(maskPath);
console.error("Created edge-only mask");

// Step 3: Run inpaint
const prompt = opts.prompt ||
  "Continuous organic texture background filling the entire frame. No text, no logos, no products, no badges, no buttons, no UI elements, no borders, no lines, no rectangles. Just seamless texture.";

const inpaintScript = join(__dirname, "..", "fal-ai", "inpaint.js");
const tmpInpaint = "/tmp/generate-bg-inpainted.png";

console.error("Running GPT Image 2 inpaint...");
try {
  execSync(
    `node "${inpaintScript}" --image "${imagePath}" --mask "${maskPath}" --prompt "${prompt}" --quality high --output "${tmpInpaint}"`,
    { stdio: ["pipe", "pipe", "inherit"], timeout: 300000 }
  );
} catch (err) {
  console.error("Inpaint failed:", err.message);
  process.exit(1);
}
console.error("Inpaint complete");

// Step 4: Crop anchor strip artifacts (12px from each edge) and resize
const cropMargin = 12;
const inpaintMeta = await sharp(tmpInpaint).metadata();
const cropW = inpaintMeta.width - cropMargin * 2;
const cropH = inpaintMeta.height - cropMargin * 2;

await sharp(tmpInpaint)
  .extract({ left: cropMargin, top: cropMargin, width: cropW, height: cropH })
  .resize(opts.width, opts.height, { fit: "fill" })
  .toFile(outputPath);

console.error(`Saved: ${outputPath} (${opts.width}x${opts.height})`);

// Cleanup
try { unlinkSync(maskPath); } catch {}
try { unlinkSync(tmpInpaint); } catch {}

console.log(JSON.stringify({
  source: imagePath,
  output: outputPath,
  dimensions: { width: opts.width, height: opts.height },
}, null, 2));
