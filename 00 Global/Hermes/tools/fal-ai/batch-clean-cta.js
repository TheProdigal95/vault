import { fal } from "@fal-ai/client";
import sharp from "sharp";
import { readFileSync, existsSync } from "fs";
import { basename, dirname, resolve, join } from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, ".env") });
fal.config({ credentials: process.env.FAL_KEY });

const baseDir = "/Users/marce/Library/Mobile Documents/iCloud~md~obsidian/Documents/Reach Digital";

const files = [
  "IM8/00 Assets/Statics/T003-endcards-v2/EC-G1/variant-2.png",
  "IM8/00 Assets/Statics/T003-endcards-v2/EC-G2/variant-1.png",
  "IM8/00 Assets/Statics/T003-endcards-v2/EC-G3/variant-1.png",
  "IM8/00 Assets/Statics/T003-endcards-v2/EC-G3/variant-5.png",
  "IM8/00 Assets/Statics/T003-endcards-v2/EC-G3/variant-6.png",
  "IM8/00 Assets/Statics/T003-endcards-v2/EC-G4/variant-1.png",
  "IM8/00 Assets/Statics/T003-endcards-v2/EC-G4/variant-6.png",
  "IM8/00 Assets/Statics/T003-endcards-v2/EC-M3/variant-5.png",
  "IM8/00 Assets/Statics/T003-endcards-v2/EC-M4/variant-2.png",
  "IM8/00 Assets/Statics/T003-endcards-v2/EC-M4/variant-5.png",
  "IM8/00 Assets/Statics/T003-endcards-v2/EC-M4/variant-6.png",
  "IM8/00 Assets/Statics/T003-endcards-v2/EC-M5/variant-1.png",
  "IM8/00 Assets/Statics/T003-endcards-v2/EC-M5/variant-3.png",
  "IM8/00 Assets/Statics/T003-endcards-v2/EC-M5/variant-5.png",
  "IM8/00 Assets/Statics/T003-endcards-v2/EC-M5/variant-6.png",
  "IM8/00 Assets/Statics/T003-endcards-v2/EC-O1/variant-2.png",
  "IM8/00 Assets/Statics/T003-endcards-v2/EC-O1/variant-3.png",
  "IM8/00 Assets/Statics/T003-endcards-v2/EC-O1/variant-4.png",
  "IM8/00 Assets/Statics/T003-endcards-v2/EC-O1/variant-5.png",
  "IM8/00 Assets/Statics/T003-endcards-v2/EC-O2/variant-1.png",
  "IM8/00 Assets/Statics/T003-endcards-v2/EC-O2/variant-4.png",
  "IM8/00 Assets/Statics/T003-endcards-v2/EC-O2/variant-5.png",
  "IM8/00 Assets/Statics/T003-endcards-v2/EC-O3/variant-1.png",
  "IM8/00 Assets/Statics/T003-endcards-v2/EC-O3/variant-2.png",
  "IM8/00 Assets/Statics/T003-endcards-v2/EC-O3/variant-3.png",
  "IM8/00 Assets/Statics/T003-endcards-v2/EC-O3/variant-5.png",
  "IM8/00 Assets/Statics/T003-endcards-v2/EC-O4/variant-5.png",
  "IM8/00 Assets/Statics/T003-endcards-v2/EC-O4/variant-6.png",
  "IM8/00 Assets/Statics/T003-endcards-v2/EC-O4/variant-7.png",
  "IM8/00 Assets/Statics/T003-endcards/layouts/EC-G5/variant-4.png",
];

async function upload(filePath) {
  const buf = readFileSync(filePath);
  const name = basename(filePath);
  const type = name.endsWith(".png") ? "image/png" : "image/jpeg";
  return await fal.storage.upload(new File([buf], name, { type }));
}

async function cleanCTA(relPath) {
  const fullPath = resolve(baseDir, relPath);
  const dir = dirname(fullPath);
  const name = basename(fullPath, ".png");
  const outPath = join(dir, name + "-clean.png");

  if (existsSync(outPath)) {
    console.log(`SKIP ${relPath} (already exists)`);
    return outPath;
  }

  if (!existsSync(fullPath)) {
    console.error(`MISSING ${relPath}`);
    return null;
  }

  const meta = await sharp(fullPath).metadata();
  const imageUrl = await upload(fullPath);

  const result = await fal.subscribe("openai/gpt-image-2/edit", {
    input: {
      prompt: "Remove ONLY the CTA button and any disclaimer/fine-print text and the brand logo/wordmark from the very bottom of this ad card. Replace those removed areas with a smooth continuation of the surrounding background color or texture. Keep EVERYTHING else exactly as-is: the headline text, sub-headline, the hero photograph/image, and all badge/pill elements must remain completely untouched and unchanged.",
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
  console.log(`DONE ${relPath} → ${outPath}`);
  return outPath;
}

const CONCURRENCY = 3;
let completed = 0;
let succeeded = 0;
let failed = 0;
console.log(`Processing ${files.length} files, ${CONCURRENCY} at a time...`);

for (let i = 0; i < files.length; i += CONCURRENCY) {
  const batch = files.slice(i, i + CONCURRENCY);
  const results = await Promise.all(batch.map(f => cleanCTA(f).catch(e => {
    console.error(`FAIL ${f}: ${e.message}`);
    failed++;
    return null;
  })));
  results.forEach(r => { if (r) succeeded++; });
  completed += batch.length;
  console.log(`Progress: ${completed}/${files.length} (${succeeded} ok, ${failed} failed)`);
}

console.log(`\nComplete: ${succeeded} succeeded, ${failed} failed out of ${files.length} total.`);
