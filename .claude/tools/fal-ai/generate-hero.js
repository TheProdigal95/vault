import { fal } from "@fal-ai/client";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, ".env") });
fal.config({ credentials: process.env.FAL_KEY });

const concept = process.argv[2];
const prompt = process.argv[3];
const outputDir = process.argv[4];

if (!concept || !prompt || !outputDir) {
  console.error("Usage: node generate-hero.js <concept> <prompt> <output-dir>");
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });

console.error(`Generating hero image for ${concept}...`);

const result = await fal.subscribe("fal-ai/flux-pro/v1.1-ultra", {
  input: {
    prompt,
    num_images: 1,
    aspect_ratio: "9:16",
    output_format: "png",
    safety_tolerance: 5,
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
