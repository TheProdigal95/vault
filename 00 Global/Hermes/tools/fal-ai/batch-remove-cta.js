import { fal } from "@fal-ai/client";
import sharp from "sharp";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { basename, dirname, resolve, join } from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, ".env") });
fal.config({ credentials: process.env.FAL_KEY });

const baseDir = "/Users/marce/Library/Mobile Documents/iCloud~md~obsidian/Documents/Reach Digital";
const canvasPath = resolve(baseDir, "IM8/T003 Images.canvas");

const canvas = JSON.parse(readFileSync(canvasPath, "utf8"));
const group = canvas.nodes.find(n => n.id === "9d3377fe842f694b");
const gx = group.x, gy = group.y, gw = group.width, gh = group.height;

const files = canvas.nodes
  .filter(n =>
    n.type === "file" &&
    n.x >= gx && n.x <= gx + gw &&
    n.y >= gy && n.y <= gy + gh &&
    n.file.endsWith(".png")
  )
  .map(n => n.file);

async function upload(filePath) {
  const buf = readFileSync(filePath);
  const name = basename(filePath);
  const type = name.endsWith(".png") ? "image/png" : "image/jpeg";
  return await fal.storage.upload(new File([buf], name, { type }));
}

async function removeCTA(relPath) {
  const fullPath = resolve(baseDir, relPath);
  const dir = dirname(fullPath);
  const name = basename(fullPath, ".png");
  const outPath = join(dir, name + "-cleared.png");

  if (existsSync(outPath)) {
    console.log(`SKIP ${relPath} (already exists)`);
    return;
  }

  const meta = await sharp(fullPath).metadata();
  const imageUrl = await upload(fullPath);

  const result = await fal.subscribe("openai/gpt-image-2/edit", {
    input: {
      prompt: "This is an ad end card. Remove the CTA button, the disclaimer text, the brand wordmark/logo from the bottom of the card, AND remove the main product display or hero image from the center of the card. Replace all removed areas with a smooth continuation of the existing background color. Keep ONLY the headline text, the sub-headline text, and the proof/trust badge pills. Everything else (product photos, CTA button, disclaimer, logo) should be gone, replaced by clean background.",
      image_urls: [imageUrl],
      image_size: { width: meta.width, height: meta.height },
      quality: "high",
      num_images: 1,
    },
    logs: false,
    onQueueUpdate: () => {},
  });

  const img = result.data.images[0];
  const resp = await fetch(img.url);
  const genBuf = Buffer.from(await resp.arrayBuffer());
  await sharp(genBuf).resize(meta.width, meta.height).png().toFile(outPath);
  console.log(`DONE ${relPath}`);
}

const CONCURRENCY = 5;
let completed = 0;
console.log(`Processing ${files.length} files, ${CONCURRENCY} at a time...`);

for (let i = 0; i < files.length; i += CONCURRENCY) {
  const batch = files.slice(i, i + CONCURRENCY);
  await Promise.all(batch.map(f => removeCTA(f).catch(e => {
    console.error(`FAIL ${f}: ${e.message}`);
  })));
  completed += batch.length;
  console.log(`Progress: ${completed}/${files.length}`);
}

console.log("All done.");
