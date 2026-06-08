import { fal } from "@fal-ai/client";
import sharp from "sharp";
import { writeFileSync, readFileSync, mkdirSync, existsSync } from "fs";
import { join, basename, dirname, resolve } from "path";
import { execSync } from "child_process";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, ".env") });

if (!process.env.FAL_KEY) {
  console.error("FAL_KEY not found. Create .claude/tools/fal-ai/.env with FAL_KEY=your_key");
  process.exit(1);
}

fal.config({ credentials: process.env.FAL_KEY });

function parseArgs(argv) {
  const args = argv.slice(2);
  const result = {
    image: null,
    mask: null,
    maskBottom: null,
    maskTop: null,
    maskRect: null,
    prompt: null,
    output: null,
    quality: "high",
    refs: [],
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--image":
        result.image = args[++i];
        break;
      case "--mask":
        result.mask = args[++i];
        break;
      case "--mask-bottom":
        result.maskBottom = parseInt(args[++i], 10);
        break;
      case "--mask-top":
        result.maskTop = parseInt(args[++i], 10);
        break;
      case "--mask-rect":
        result.maskRect = args[++i];
        break;
      case "--prompt":
        result.prompt = args[++i];
        break;
      case "--output":
        result.output = args[++i];
        break;
      case "--quality":
        result.quality = args[++i];
        break;
      case "--ref":
        result.refs.push(args[++i]);
        break;
    }
  }
  return result;
}

async function uploadFile(filePath) {
  const buffer = readFileSync(filePath);
  const name = basename(filePath);
  const ext = name.split(".").pop().toLowerCase();
  const mimeTypes = { png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", webp: "image/webp" };
  const type = mimeTypes[ext] || "image/png";
  const file = new File([buffer], name, { type });
  return await fal.storage.upload(file);
}

function getImageDimensions(filePath) {
  const out = execSync(
    `sips -g pixelWidth -g pixelHeight "${filePath}" 2>/dev/null`
  ).toString();
  const w = parseInt(out.match(/pixelWidth:\s*(\d+)/)?.[1]);
  const h = parseInt(out.match(/pixelHeight:\s*(\d+)/)?.[1]);
  return { width: w, height: h };
}

function createMask(width, height, opts) {
  const { maskBottom, maskTop, maskRect } = opts;

  const bmpHeaderSize = 54;
  const rowSize = Math.ceil((width * 3) / 4) * 4;
  const dataSize = rowSize * height;
  const fileSize = bmpHeaderSize + dataSize;
  const buf = Buffer.alloc(fileSize);

  // BMP header
  buf.write("BM", 0);
  buf.writeUInt32LE(fileSize, 2);
  buf.writeUInt32LE(bmpHeaderSize, 10);
  // DIB header
  buf.writeUInt32LE(40, 14);
  buf.writeInt32LE(width, 18);
  buf.writeInt32LE(height, 22);
  buf.writeUInt16LE(1, 26);
  buf.writeUInt16LE(24, 28);
  buf.writeUInt32LE(dataSize, 34);

  // Fill black (preserve everything)
  // BMP rows are bottom-to-top

  if (maskBottom) {
    const whiteRows = Math.round(height * (maskBottom / 100));
    for (let row = 0; row < whiteRows; row++) {
      const offset = bmpHeaderSize + row * rowSize;
      for (let x = 0; x < width; x++) {
        buf[offset + x * 3] = 255;
        buf[offset + x * 3 + 1] = 255;
        buf[offset + x * 3 + 2] = 255;
      }
    }
  }

  if (maskTop) {
    const whiteRows = Math.round(height * (maskTop / 100));
    for (let row = height - whiteRows; row < height; row++) {
      const offset = bmpHeaderSize + row * rowSize;
      for (let x = 0; x < width; x++) {
        buf[offset + x * 3] = 255;
        buf[offset + x * 3 + 1] = 255;
        buf[offset + x * 3 + 2] = 255;
      }
    }
  }

  if (maskRect) {
    const [x1p, y1p, x2p, y2p] = maskRect.split(",").map(Number);
    const x1 = Math.round(width * (x1p / 100));
    const y1 = Math.round(height * (y1p / 100));
    const x2 = Math.round(width * (x2p / 100));
    const y2 = Math.round(height * (y2p / 100));
    // BMP is bottom-to-top, so flip y
    for (let row = height - y2; row < height - y1; row++) {
      const offset = bmpHeaderSize + row * rowSize;
      for (let px = x1; px < x2; px++) {
        buf[offset + px * 3] = 255;
        buf[offset + px * 3 + 1] = 255;
        buf[offset + px * 3 + 2] = 255;
      }
    }
  }

  // Convert BMP to PNG via sips for compatibility
  const tmpBmp = "/tmp/inpaint-mask.bmp";
  const tmpPng = "/tmp/inpaint-mask.png";
  writeFileSync(tmpBmp, buf);
  execSync(`sips -s format png "${tmpBmp}" --out "${tmpPng}" 2>/dev/null`);
  return tmpPng;
}

const opts = parseArgs(process.argv);

if (!opts.image || !opts.prompt || !opts.output) {
  console.error(`Usage: node inpaint.js --image <path> --prompt <text> --output <path> [mask options]

Mask options (pick one):
  --mask <path>          Pre-made mask image (white = edit, black = keep)
  --mask-bottom <pct>    White the bottom N% of the image
  --mask-top <pct>       White the top N% of the image
  --mask-rect <x1,y1,x2,y2>  White a rectangle (values as % of dimensions)

Other:
  --quality <low|medium|high>  GPT Image 2 quality (default: high)

Examples:
  # Remove bottom 15% (CTA + disclaimer)
  node inpaint.js --image card.png --mask-bottom 15 --prompt "continue the background" --output out.png

  # Replace headline area
  node inpaint.js --image card.png --mask-rect 5,5,95,30 --prompt "headline: NEW TEXT HERE" --output out.png

  # Custom mask
  node inpaint.js --image card.png --mask mask.png --prompt "remove text" --output out.png`);
  process.exit(1);
}

const imagePath = resolve(opts.image);
if (!existsSync(imagePath)) {
  console.error(`Image not found: ${imagePath}`);
  process.exit(1);
}

// Get dimensions and create mask if needed
const { width, height } = getImageDimensions(imagePath);
console.error(`Source: ${width}x${height}`);

let maskPath;
if (opts.mask) {
  maskPath = resolve(opts.mask);
  if (!existsSync(maskPath)) {
    console.error(`Mask not found: ${maskPath}`);
    process.exit(1);
  }
  console.error(`Mask: ${maskPath}`);
} else if (opts.maskBottom || opts.maskTop || opts.maskRect) {
  maskPath = createMask(width, height, opts);
  console.error(`Generated mask: bottom=${opts.maskBottom || 0}% top=${opts.maskTop || 0}% rect=${opts.maskRect || "none"}`);
} else {
  console.error("No mask specified. Use --mask, --mask-bottom, --mask-top, or --mask-rect");
  process.exit(1);
}

// Upload source image, mask, and any reference images
console.error("Uploading source image...");
const imageUrl = await uploadFile(imagePath);
console.error("Uploading mask...");
const maskUrl = await uploadFile(maskPath);

const imageUrls = [imageUrl];
for (const ref of opts.refs) {
  const refPath = resolve(ref);
  if (!existsSync(refPath)) {
    console.error(`Reference not found: ${refPath}`);
    process.exit(1);
  }
  console.error(`Uploading reference: ${refPath}`);
  imageUrls.push(await uploadFile(refPath));
}

console.error(`Inpainting via GPT Image 2...`);

try {
  const result = await fal.subscribe("openai/gpt-image-2/edit", {
    input: {
      prompt: opts.prompt,
      image_urls: imageUrls,
      mask_image_url: maskUrl,
      image_size: { width, height },
      quality: opts.quality,
      num_images: 1,
    },
    logs: true,
    onQueueUpdate: (update) => {
      if (update.status === "IN_QUEUE") {
        console.error(`Queue position: ${update.queue_position ?? "unknown"}`);
      }
    },
  });

  const img = result.data.images[0];
  const resp = await fetch(img.url);
  const generatedBuffer = Buffer.from(await resp.arrayBuffer());

  // Composite: original pixels where mask is black, generated pixels where mask is white
  // This guarantees pixel-perfect preservation outside the masked area
  console.error("Compositing original pixels back outside mask...");
  const original = sharp(imagePath);
  const generated = sharp(generatedBuffer);
  const maskImg = sharp(maskPath);

  const origMeta = await original.metadata();
  const origRaw = await original.ensureAlpha().raw().toBuffer();
  let genRaw = await generated.resize(origMeta.width, origMeta.height).ensureAlpha().raw().toBuffer();
  const maskRaw = await maskImg.resize(origMeta.width, origMeta.height).grayscale().raw().toBuffer();

  const composited = Buffer.alloc(origRaw.length);
  for (let i = 0; i < origMeta.width * origMeta.height; i++) {
    const maskVal = maskRaw[i];
    const srcIdx = i * 4;
    if (maskVal > 128) {
      // White mask = use generated pixel
      composited[srcIdx] = genRaw[srcIdx];
      composited[srcIdx + 1] = genRaw[srcIdx + 1];
      composited[srcIdx + 2] = genRaw[srcIdx + 2];
      composited[srcIdx + 3] = genRaw[srcIdx + 3];
    } else {
      // Black mask = use original pixel (pixel-perfect)
      composited[srcIdx] = origRaw[srcIdx];
      composited[srcIdx + 1] = origRaw[srcIdx + 1];
      composited[srcIdx + 2] = origRaw[srcIdx + 2];
      composited[srcIdx + 3] = origRaw[srcIdx + 3];
    }
  }

  const outputPath = resolve(opts.output);
  mkdirSync(dirname(outputPath), { recursive: true });
  await sharp(composited, { raw: { width: origMeta.width, height: origMeta.height, channels: 4 } })
    .png()
    .toFile(outputPath);
  console.error(`Saved: ${outputPath}`);

  console.log(JSON.stringify({
    model: "gpt-image-2",
    mode: "inpaint",
    source: imagePath,
    mask: maskPath,
    output: outputPath,
    dimensions: { width, height },
  }, null, 2));
} catch (err) {
  console.error(`Inpainting failed: ${err.message}`);
  if (err.body) console.error(JSON.stringify(err.body, null, 2));
  process.exit(1);
}
