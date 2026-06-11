import { fal } from "@fal-ai/client";
import { writeFileSync, readFileSync, mkdirSync } from "fs";
import { join, basename, dirname, resolve } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, ".env") });
fal.config({ credentials: process.env.FAL_KEY });

const concept = process.argv[2];
const prompt = process.argv[3];
const refPath = process.argv[4];
const outputDir = process.argv[5];

if (!concept || !prompt || !refPath || !outputDir) {
  console.error("Usage: node generate-hero-gpt.js <concept> <prompt> <ref-image> <output-dir>");
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });

async function uploadFile(filePath) {
  const buffer = readFileSync(filePath);
  const name = basename(filePath);
  const ext = name.split(".").pop().toLowerCase();
  const mimeTypes = { png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", webp: "image/webp" };
  const type = mimeTypes[ext] || "image/png";
  const file = new File([buffer], name, { type });
  return await fal.storage.upload(file);
}

console.error(`Uploading reference: ${refPath}`);
const refUrl = await uploadFile(resolve(refPath));

console.error(`Generating hero image for ${concept} via GPT Image 2...`);

try {
  const result = await fal.subscribe("openai/gpt-image-2/edit", {
    input: {
      prompt,
      image_urls: [refUrl],
      num_images: 1,
      image_size: { width: 1080, height: 1920 },
      quality: "high",
    },
    logs: true,
    onQueueUpdate: (u) => {
      if (u.status === "IN_QUEUE") console.error(`  Queue: ${u.queue_position ?? "?"}`);
    },
  });

  const img = result.data.images[0];
  const resp = await fetch(img.url);
  const buffer = Buffer.from(await resp.arrayBuffer());
  const outPath = join(outputDir, `${concept}.png`);
  writeFileSync(outPath, buffer);
  console.log(outPath);
  console.error(`Saved: ${outPath}`);
} catch (err) {
  console.error(`Generation failed: ${err.message}`);
  if (err.body) console.error(JSON.stringify(err.body, null, 2));
  process.exit(1);
}
