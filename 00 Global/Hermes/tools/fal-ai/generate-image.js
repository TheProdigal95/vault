import { fal } from "@fal-ai/client";
import { writeFileSync, readFileSync, mkdirSync } from "fs";
import { join } from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join as joinPath } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: joinPath(__dirname, ".env") });

if (!process.env.FAL_KEY) {
  console.error(
    "FAL_KEY not found. Create .claude/tools/fal-ai/.env with FAL_KEY=your_key"
  );
  process.exit(1);
}

fal.config({ credentials: process.env.FAL_KEY });

const ASPECT_TO_SIZE = {
  "9:16": { width: 1080, height: 1920 },
  "4:5": { width: 1080, height: 1350 },
  "1:1": { width: 1080, height: 1080 },
  "16:9": { width: 1920, height: 1080 },
};

function parseArgs(argv) {
  const args = argv.slice(2);
  const result = {
    prompt: null,
    images: [],
    output: null,
    numImages: 4,
    aspectRatio: "9:16",
    resolution: "1K",
    model: "nb2",
    quality: "high",
    startIndex: 1,
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--prompt":
        result.prompt = args[++i];
        break;
      case "--prompt-file":
        result.prompt = readFileSync(args[++i], "utf-8");
        break;
      case "--images":
        result.images = args[++i].split(",").filter(Boolean);
        break;
      case "--output":
        result.output = args[++i];
        break;
      case "--num-images":
        result.numImages = parseInt(args[++i], 10);
        break;
      case "--aspect-ratio":
        result.aspectRatio = args[++i];
        break;
      case "--resolution":
        result.resolution = args[++i];
        break;
      case "--model":
        result.model = args[++i];
        break;
      case "--quality":
        result.quality = args[++i];
        break;
      case "--start-index":
        result.startIndex = parseInt(args[++i], 10);
        break;
    }
  }
  return result;
}

const opts = parseArgs(process.argv);

if (!opts.prompt || !opts.output) {
  console.error(
    "Usage: node generate-image.js --prompt 'prompt' --output ./dir [--model nb2|gpt] [--images url1,url2] [--num-images 4] [--aspect-ratio 9:16] [--resolution 1K] [--quality high]"
  );
  process.exit(1);
}

mkdirSync(opts.output, { recursive: true });

const isGpt = opts.model === "gpt";
const hasImages = opts.images.length > 0;
const endpoint = isGpt
  ? (hasImages ? "openai/gpt-image-2/edit" : "openai/gpt-image-2")
  : (hasImages ? "fal-ai/nano-banana-2/edit" : "fal-ai/nano-banana-2");

const input = { prompt: opts.prompt, num_images: opts.numImages };

if (isGpt) {
  input.image_size = ASPECT_TO_SIZE[opts.aspectRatio] || ASPECT_TO_SIZE["9:16"];
  input.quality = opts.quality;
} else {
  input.aspect_ratio = opts.aspectRatio;
  input.resolution = opts.resolution;
}

if (opts.images.length > 0) {
  input.image_urls = opts.images;
}

const modelLabel = isGpt
  ? `GPT Image 2 (${opts.quality}, ${opts.aspectRatio})`
  : `NanoBanana 2 (${opts.resolution}, ${opts.aspectRatio})`;
console.error(`Generating ${opts.numImages} images via ${modelLabel}...`);
if (opts.images.length > 0) {
  console.error(`Reference images: ${opts.images.length}`);
}

try {
  const result = await fal.subscribe(endpoint, {
    input,
    logs: true,
    onQueueUpdate: (update) => {
      if (update.status === "IN_QUEUE") {
        console.error(`Queue position: ${update.queue_position ?? "unknown"}`);
      }
    },
  });

  const savedPaths = [];

  for (let i = 0; i < result.data.images.length; i++) {
    const img = result.data.images[i];
    const url = img.url;
    const resp = await fetch(url);
    const buffer = Buffer.from(await resp.arrayBuffer());
    const outPath = join(opts.output, `variant-${i + opts.startIndex}.png`);
    writeFileSync(outPath, buffer);
    savedPaths.push(outPath);
    console.error(`Saved: ${outPath}`);
  }

  console.log(
    JSON.stringify(
      {
        model: isGpt ? "gpt-image-2" : "nano-banana-2",
        images: savedPaths,
        seed: result.data.seed ?? null,
        timings: result.data.timings ?? null,
      },
      null,
      2
    )
  );
} catch (err) {
  console.error(`Generation failed: ${err.message}`);
  if (err.body) console.error(JSON.stringify(err.body, null, 2));
  process.exit(1);
}
