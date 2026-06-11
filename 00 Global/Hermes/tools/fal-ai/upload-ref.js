import { fal } from "@fal-ai/client";
import { readFileSync } from "fs";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, ".env") });
fal.config({ credentials: process.env.FAL_KEY });

const files = process.argv.slice(2);
if (files.length === 0) {
  console.error("Usage: node upload-ref.js file1.png file2.png ...");
  process.exit(1);
}

for (const filePath of files) {
  const data = readFileSync(filePath);
  const ext = filePath.split(".").pop().toLowerCase();
  const mime = ext === "jpg" || ext === "jpeg" ? "image/jpeg" : "image/png";
  const blob = new Blob([data], { type: mime });
  const url = await fal.storage.upload(blob);
  console.log(url);
}
