import { fal } from "@fal-ai/client";
import { readFileSync } from "fs";
import { basename } from "path";

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
  const files = [];

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--file" && args[i + 1]) {
      files.push(args[++i]);
    } else if (args[i] === "--files") {
      while (i + 1 < args.length && !args[i + 1].startsWith("--")) {
        files.push(args[++i]);
      }
    }
  }
  return files;
}

async function uploadFile(filePath) {
  const buffer = readFileSync(filePath);
  const name = basename(filePath);
  const ext = name.split(".").pop().toLowerCase();
  const mimeTypes = {
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    webp: "image/webp",
    gif: "image/gif",
    mp4: "video/mp4",
  };
  const type = mimeTypes[ext] || "application/octet-stream";
  const file = new File([buffer], name, { type });
  const url = await fal.storage.upload(file);
  return url;
}

const files = parseArgs(process.argv);

if (files.length === 0) {
  console.error(
    "Usage:\n  node upload.js --file path/to/image.png\n  node upload.js --files file1.png file2.png file3.png"
  );
  process.exit(1);
}

for (const file of files) {
  try {
    const url = await uploadFile(file);
    console.log(url);
  } catch (err) {
    console.error(`Failed to upload ${file}: ${err.message}`);
    process.exit(1);
  }
}
