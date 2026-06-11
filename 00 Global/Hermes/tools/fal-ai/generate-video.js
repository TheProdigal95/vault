import { fal } from "@fal-ai/client";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, basename } from "path";
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

function parseArgs(argv) {
  const args = argv.slice(2);
  const result = {
    firstFrame: null,
    lastFrame: null,
    prompt: null,
    output: null,
    aspectRatio: "9:16",
    duration: "8s",
    audio: false,
    model: "veo",
    negativePrompt: null,
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--first-frame":
        result.firstFrame = args[++i];
        break;
      case "--last-frame":
        result.lastFrame = args[++i];
        break;
      case "--prompt":
        result.prompt = args[++i];
        break;
      case "--output":
        result.output = args[++i];
        break;
      case "--aspect-ratio":
        result.aspectRatio = args[++i];
        break;
      case "--duration":
        result.duration = args[++i];
        break;
      case "--audio":
        result.audio = true;
        break;
      case "--model":
        result.model = args[++i];
        break;
      case "--negative-prompt":
        result.negativePrompt = args[++i];
        break;
    }
  }
  return result;
}

async function ensureUrl(pathOrUrl) {
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }
  const buffer = readFileSync(pathOrUrl);
  const name = basename(pathOrUrl);
  const ext = name.split(".").pop().toLowerCase();
  const mimeTypes = {
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    webp: "image/webp",
  };
  const type = mimeTypes[ext] || "image/png";
  const file = new File([buffer], name, { type });
  return await fal.storage.upload(file);
}

const opts = parseArgs(process.argv);

if (!opts.firstFrame || !opts.prompt || !opts.output) {
  console.error(
    "Usage: node generate-video.js --first-frame path_or_url --prompt 'text' --output ./dir [--last-frame path] [--model veo|kling] [--duration 5s|8s] [--aspect-ratio 9:16]"
  );
  process.exit(1);
}

mkdirSync(opts.output, { recursive: true });

const firstFrameUrl = await ensureUrl(opts.firstFrame);

const useFirstLast = opts.lastFrame !== null;
let endpoint, input;

if (opts.model === "kling") {
  const durationNum = parseInt(opts.duration);
  if (useFirstLast) {
    const lastFrameUrl = await ensureUrl(opts.lastFrame);
    endpoint = "fal-ai/kling-video/v3/pro/image-to-video";
    input = {
      start_image_url: firstFrameUrl,
      end_image_url: lastFrameUrl,
      prompt: opts.prompt,
      duration: durationNum,
      generate_audio: opts.audio,
      negative_prompt: opts.negativePrompt || "blur, distort, low quality, text morphing",
      cfg_scale: 0.5,
    };
    console.error("Mode: start+end frame (Kling v3 Pro)");
  } else {
    endpoint = "fal-ai/kling-video/v3/pro/image-to-video";
    input = {
      start_image_url: firstFrameUrl,
      prompt: opts.prompt,
      duration: durationNum,
      generate_audio: opts.audio,
      negative_prompt: opts.negativePrompt || "blur, distort, low quality, text morphing",
      cfg_scale: 0.5,
    };
    console.error("Mode: image-to-video (Kling v3 Pro)");
  }
} else {
  if (useFirstLast) {
    const lastFrameUrl = await ensureUrl(opts.lastFrame);
    endpoint = "fal-ai/veo3.1/first-last-frame-to-video";
    input = {
      first_frame_url: firstFrameUrl,
      last_frame_url: lastFrameUrl,
      prompt: opts.prompt,
      aspect_ratio: opts.aspectRatio,
      duration: opts.duration,
      generate_audio: opts.audio,
    };
    console.error("Mode: first-last-frame-to-video (Veo 3.1)");
  } else {
    endpoint = "fal-ai/veo3.1/image-to-video";
    input = {
      image_url: firstFrameUrl,
      prompt: opts.prompt,
      aspect_ratio: opts.aspectRatio,
      duration: opts.duration,
      generate_audio: opts.audio,
    };
    console.error("Mode: image-to-video (Veo 3.1)");
  }
}

console.error(
  `Generating ${opts.duration} video (${opts.aspectRatio})...`
);

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

  const videoUrl = result.data.video?.url || result.data.video_url;

  if (!videoUrl) {
    console.error("No video URL in response");
    console.error(JSON.stringify(result.data, null, 2));
    process.exit(1);
  }

  const resp = await fetch(videoUrl);
  const buffer = Buffer.from(await resp.arrayBuffer());
  const outPath = join(opts.output, "output.mp4");
  writeFileSync(outPath, buffer);
  console.error(`Saved: ${outPath}`);

  console.log(
    JSON.stringify(
      {
        video: outPath,
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
