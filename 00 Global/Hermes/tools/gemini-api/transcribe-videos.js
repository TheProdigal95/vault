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

async function uploadAndTranscribe(videoPath, outputPath) {
  const filename = path.basename(videoPath);
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Uploading: ${filename}`);
  console.log(`${'='.repeat(60)}`);

  // Upload file
  const uploadResult = await fileManager.uploadFile(videoPath, {
    mimeType: 'video/mp4',
    displayName: filename,
  });

  console.log(`Uploaded: ${uploadResult.file.displayName} (${uploadResult.file.name})`);

  // Wait for processing
  let file = uploadResult.file;
  while (file.state === 'PROCESSING') {
    console.log('Processing...');
    await new Promise(r => setTimeout(r, 5000));
    file = await fileManager.getFile(file.name);
  }

  if (file.state === 'FAILED') {
    throw new Error(`File processing failed: ${filename}`);
  }

  console.log('File ready. Transcribing...');

  // Transcribe using the file reference
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });
  const result = await model.generateContent([
    {
      fileData: {
        mimeType: file.mimeType,
        fileUri: file.uri,
      },
    },
    {
      text: `Transcribe this video completely and accurately. Include:
1. Every spoken word, verbatim
2. Any on-screen text, slides, or visual content that contains important information (mark these with [ON SCREEN: ...])
3. Speaker identification if there are multiple speakers

Format the transcription as clean, readable paragraphs. Do not summarize — transcribe everything word for word.`
    },
  ]);

  const transcription = result.response.text();

  // Save to file
  await fs.writeFile(outputPath, transcription, 'utf-8');
  console.log(`Saved transcription: ${outputPath}`);

  // Clean up uploaded file
  try {
    await fileManager.deleteFile(file.name);
    console.log('Cleaned up uploaded file');
  } catch (e) {
    // ignore cleanup errors
  }

  return transcription;
}

async function main() {
  const videoDir = '/Users/marce/Downloads/GTM';
  const outputDir = '/Users/marce/Library/Mobile Documents/iCloud~md~obsidian/Documents/Trabajo/GTM';

  await fs.ensureDir(outputDir);

  const videos = [
    {
      input: path.join(videoDir, 'GTM in 8 Minutes- How to Send a Cold Email They Would Pay to Receive - Jordan\'s PVP Framework.mp4'),
      output: path.join(outputDir, 'Transcript - PVP Framework Cold Email.md'),
    },
    {
      input: path.join(videoDir, 'undefined - 002 - 3 Prompts in 3 Minutes for the Top 5 Data Sources for your GTM Engineer to Pull From.mp4'),
      output: path.join(outputDir, 'Transcript - Top 5 Data Sources for GTM.md'),
    },
    {
      input: path.join(videoDir, 'undefined - 003 - Mega Deep Research Prompt for Background Research to Build AI GTM Agents in Clay (or elsewhere).mp4'),
      output: path.join(outputDir, 'Transcript - Mega Deep Research Prompt for GTM Agents.md'),
    },
  ];

  for (const video of videos) {
    try {
      await uploadAndTranscribe(video.input, video.output);
    } catch (error) {
      console.error(`Error processing ${path.basename(video.input)}: ${error.message}`);
    }
  }

  console.log('\n\nAll transcriptions complete!');
}

main();
