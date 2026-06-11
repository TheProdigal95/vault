import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '.env') });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const reviews = fs.readFileSync('/tmp/pain_sample.jsonl', 'utf8')
  .split('\n').filter(Boolean).map(l => JSON.parse(l));

async function batchAnalyze(batch) {
  const reviewText = batch.map(r => 
    `review_id: ${r.review_id}\nrating: ${r.rating}★\nbody: ${r.body}`
  ).join('\n\n---\n\n');
  
  const prompt = `You are analyzing product reviews for orthopedic/comfort footwear (ComfortWear shoes). For each review, extract:
- pain_points: array of specific pains mentioned (short phrases, max 5 per review). Empty array [] if none.
- trigger: what event/realization sent them searching for this product (1 sentence or null)
- desire: what outcome they wanted (1 sentence)
- existing_persona_match: best match from these personas: "The Plantar Fasciitis & Heel Pain Sufferer" | "The Long-Shift Standing Worker" | "The Bunion & Structural Foot Problem Buyer" | "The Chronic Joint & Swelling Condition Buyer" | null if none fit
- distinct_from_existing: any pain/trigger not well-captured by current personas (1 sentence or null)

Return ONLY a JSON array (no markdown, no code block, no explanation), one object per review, in exact input order.

Reviews:
${reviewText}`;

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();
  
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error('No JSON array found: ' + text.slice(0, 100));
    data = JSON.parse(jsonMatch[0]);
  }
  return data;
}

async function main() {
  const batchSize = 30;
  const allResults = [];
  
  for (let i = 0; i < reviews.length; i += batchSize) {
    const batch = reviews.slice(i, i + batchSize);
    const batchNum = Math.floor(i/batchSize)+1;
    const totalBatches = Math.ceil(reviews.length/batchSize);
    process.stdout.write(`Batch ${batchNum}/${totalBatches}... `);
    
    let attempts = 0;
    while (attempts < 3) {
      try {
        const results = await batchAnalyze(batch);
        allResults.push(...results);
        process.stdout.write(`done (${results.length})\n`);
        break;
      } catch(e) {
        attempts++;
        if (attempts === 3) {
          process.stdout.write(`FAILED: ${e.message}\n`);
          for (const r of batch) {
            allResults.push({review_id: r.review_id, pain_points: [], trigger: null, desire: null, existing_persona_match: null, distinct_from_existing: null});
          }
        } else {
          await new Promise(r => setTimeout(r, 2000 * attempts));
        }
      }
    }
    await new Promise(r => setTimeout(r, 400));
  }
  
  fs.writeFileSync('/tmp/pain_analysis.json', JSON.stringify(allResults, null, 2));
  console.log(`\nTotal analyzed: ${allResults.length}`);
}

main().catch(console.error);
