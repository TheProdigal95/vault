const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
const path = require('path');

require('dotenv').config({ path: '/Users/marce/Library/Mobile Documents/iCloud~md~obsidian/Documents/Reach Digital/.claude/tools/gemini-api/.env' });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const reviews = fs.readFileSync('/tmp/pain_sample.jsonl', 'utf8')
  .split('\n').filter(Boolean).map(l => JSON.parse(l));

async function batchAnalyze(batch) {
  const reviewText = batch.map(r => 
    `review_id: ${r.review_id}\nrating: ${r.rating}★\nbody: ${r.body}`
  ).join('\n\n---\n\n');
  
  const prompt = `You are analyzing product reviews for orthopedic/comfort footwear. For each review, extract:
- pain_points: array of specific pains mentioned (short phrases, max 5)
- trigger: what event/realization sent them searching for this product (1 sentence or null)
- desire: what outcome they wanted (1 sentence)
- existing_persona_match: best match from: "The Plantar Fasciitis & Heel Pain Sufferer" | "The Long-Shift Standing Worker" | "The Bunion & Structural Foot Problem Buyer" | "The Chronic Joint & Swelling Condition Buyer" | null
- distinct_from_existing: any pain/trigger not well-captured by current personas (1 sentence or null)

Return a JSON array, one object per review, in the exact order given. Each object: {review_id, pain_points, trigger, desire, existing_persona_match, distinct_from_existing}

Reviews:
${reviewText}`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  
  // Extract JSON
  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error('No JSON array found in response');
  return JSON.parse(jsonMatch[0]);
}

async function main() {
  const batchSize = 20;
  const allResults = [];
  
  for (let i = 0; i < reviews.length; i += batchSize) {
    const batch = reviews.slice(i, i + batchSize);
    process.stdout.write(`Processing batch ${Math.floor(i/batchSize)+1}/${Math.ceil(reviews.length/batchSize)}... `);
    
    try {
      const results = await batchAnalyze(batch);
      allResults.push(...results);
      process.stdout.write(`${results.length} done\n`);
      await new Promise(r => setTimeout(r, 500));
    } catch(e) {
      console.error(`Batch ${i}-${i+batchSize} failed: ${e.message}`);
      // Add null results for failed batch
      for (const r of batch) {
        allResults.push({review_id: r.review_id, pain_points: [], trigger: null, desire: null, existing_persona_match: null, distinct_from_existing: null});
      }
    }
  }
  
  fs.writeFileSync('/tmp/pain_analysis.json', JSON.stringify(allResults, null, 2));
  console.log(`\nTotal analyzed: ${allResults.length}`);
}

main().catch(console.error);
