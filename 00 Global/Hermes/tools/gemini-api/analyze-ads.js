import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleAIFileManager } from '@google/generative-ai/server';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error('Error: GEMINI_API_KEY not set');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);
const fileManager = new GoogleAIFileManager(API_KEY);

async function analyzeVideo(videoPath) {
  const filename = path.basename(videoPath);
  console.error(`\nAnalyzing: ${filename}`);

  // Upload file
  const uploadResult = await fileManager.uploadFile(videoPath, {
    mimeType: 'video/mp4',
    displayName: filename,
  });

  // Wait for processing
  let file = uploadResult.file;
  while (file.state === 'PROCESSING') {
    process.stderr.write('.');
    await new Promise(r => setTimeout(r, 2000));
    file = await fileManager.getFile(file.name);
  }

  if (file.state === 'FAILED') {
    throw new Error(`File processing failed: ${filename}`);
  }

  // Analyze using the file reference
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  const result = await model.generateContent([
    {
      fileData: {
        mimeType: file.mimeType,
        fileUri: file.uri,
      },
    },
    {
      text: `Analyze this Comfort Ortho Wear brand advertisement creative with extreme granularity for high-performance ad editing.
      
      REQUIRED FORMAT:
      1. Brief 1-sentence summary.
      2. "Key Elements" list (specific props, people, attire, emotional register).
      3. A markdown table with columns: | Timestamp | Visual Action (Shot Type + Action) | Voiceover | On-Screen Captions |
      
      GRANULARITY RULES:
      - Break the video into 2-4 second beats. NEVER group more than 5 seconds into a single row.
      - Each "Visual Action" entry MUST start with a shot type shorthand: CU (Close Up), MCU (Medium Close Up), MS (Medium Shot), WS (Wide Shot), POV (Point of View), ECU (Extreme Close Up), or SCREEN REC.
      - Describe emotional registers (e.g., "Frustrated expression", "Hopeful smile", "Intense focus").
      - For A-roll: Transcribe the voiceover word-for-word for each segment.
      
      Format the entire output as a single markdown block.`
    },
  ]);

  const analysis = result.response.text();
  console.error('\nAnalysis complete.');

  // Clean up uploaded file
  try {
    await fileManager.deleteFile(file.name);
  } catch (e) {}

  return analysis;
}

async function main() {
  const videoPaths = process.argv.slice(2);
  if (videoPaths.length === 0) {
    console.error('Usage: node analyze-ads.js <video1> <video2> ...');
    process.exit(1);
  }

  for (const videoPath of videoPaths) {
    try {
      const analysis = await analyzeVideo(videoPath);
      console.log(`\n--- ANALYSIS FOR ${path.basename(videoPath)} ---\n`);
      console.log(analysis);
      console.log(`\n--- END ANALYSIS ---\n`);
    } catch (error) {
      console.error(`Error processing ${videoPath}: ${error.message}`);
    }
  }
}

main();
