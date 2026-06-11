import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const MODELS = ["gemini-2.5-flash", "gemini-2.5-flash-lite"];

async function callWithRetry(content, maxRetries = 3) {
  for (const modelName of MODELS) {
    const model = genAI.getGenerativeModel({ model: modelName });
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await model.generateContent(content);
      } catch (e) {
        if (e.status === 503 && attempt < maxRetries) {
          const delay = attempt * 5000;
          console.error(`${modelName} 503 — retrying in ${delay / 1000}s (attempt ${attempt}/${maxRetries})`);
          await new Promise((r) => setTimeout(r, delay));
          continue;
        }
        if (e.status === 503) {
          console.error(`${modelName} exhausted retries — trying fallback model`);
          break;
        }
        throw e;
      }
    }
  }
  throw new Error("All Gemini models exhausted");
}

const imgPath = process.argv[2];
if (!imgPath) {
  console.error("Usage: node analyze-endcard.mjs <image.png> [--brand <brand>] [--output <path>]");
  process.exit(1);
}

const outputIdx = process.argv.indexOf("--output");
const outputPath = outputIdx !== -1 ? process.argv[outputIdx + 1] : null;
const brandIdx = process.argv.indexOf("--brand");
const brandName = brandIdx !== -1 ? process.argv[brandIdx + 1] : null;

// Brand font maps — maps generic font_class to specific brand typefaces
const BRAND_FONTS = {
  IM8: {
    serif: { family: '"Arizona Flare", serif', name: "Arizona Flare", note: 'Variable font installed locally as "ABC Arizona Flare Variable Unlicensed Trial". @font-face src: local("ABC Arizona Flare Variable Unlicensed Trial").' },
    "sans-serif": { family: '"Manrope", sans-serif', name: "Manrope", note: "Google Fonts, supports 400/600/700/800." },
  },
};

const brandFonts = brandName ? BRAND_FONTS[brandName.toUpperCase()] || BRAND_FONTS[brandName] : null;

const imgBuf = fs.readFileSync(imgPath);
const b64 = imgBuf.toString("base64");
const mimeType = imgPath.endsWith(".jpg") || imgPath.endsWith(".jpeg") ? "image/jpeg" : "image/png";

// --- Pass 1: Full extraction ---

const brandFontContext = brandFonts
  ? `\n\nBRAND FONT CONTEXT — THIS AD IS FOR THE BRAND "${brandName.toUpperCase()}":
- Serif typeface: ${brandFonts.serif.name} — used for headlines, subheads, stat numbers, and editorial text. It has organic curves with visible stroke contrast and ball terminals.
- Sans-serif typeface: ${brandFonts["sans-serif"].name} — used for badges, CTAs, disclaimers, capsule labels, footnotes, and utility text. It has uniform stroke width, geometric letterforms, no serifs.

CRITICAL: For EVERY text element, carefully classify whether it uses the serif or sans-serif typeface based on the actual letterforms you see:
- Serif letters have small decorative strokes (serifs) at the ends of letter strokes. They have thick/thin stroke contrast. Look at letters like "I", "T", "E" — do they have feet/brackets at the baseline and cap line?
- Sans-serif letters have clean, uniform strokes with NO decorative endings. Look at "I" — is it just a vertical bar with no serifs at top and bottom?
Do NOT default to serif for everything. Many elements (especially small utility text, badges, CTAs) will be sans-serif.`
  : "";

const extractionPrompt = `You are a design engineer who must produce HTML/CSS that is pixel-perfect to this ad card. The canvas is 1080px wide x 1920px tall.${brandFontContext}

Return ONE JSON object. Be brutally precise — every color, every dimension, every spacing value matters. Measure everything relative to the 1080x1920 canvas.

{
  "canvas": {
    "background_type": "solid|texture|gradient",
    "background_color": "#hex (for solid) or dominant color (for texture/gradient)",
    "background_description": "describe the texture or gradient if not solid — e.g. 'blue molecular pattern with cell-like structures' or 'linear gradient from #hex to #hex'",
    "content_area": {
      "top_padding_px": 0,
      "bottom_padding_px": 0,
      "side_padding_px": 0
    }
  },

  "elements": [
    {
      "id": "logo|capsule|headline|stat_number|stat_label|subhead|photo|badge_row|cta|disclaimer|footnote|seal|grid|list",
      "type": "text|container|image",
      "content": "exact text as displayed",

      "font_class": "serif|sans-serif",
      "font_weight": 400,
      "font_style": "normal|italic",
      "text_transform": "none|uppercase",
      "font_size_px": 0,
      "text_width_pct": 0,
      "letter_spacing_px": 0,
      "line_height": 1.0,
      "color": "#hex",
      "text_align": "center|left|right",
      "text_shadow": "none|CSS text-shadow value e.g. '0 2px 8px rgba(0,0,0,0.4)'",
      "opacity": 1.0,

      "width_pct": 0,
      "height_pct": 0,
      "background": "#hex|transparent|rgba(r,g,b,a)",
      "border": "none|Npx solid #hex",
      "border_radius_px": 0,
      "box_shadow": "none|CSS box-shadow value",
      "overflow": "visible|hidden",

      "top_edge_pct": 0,
      "margin_below_px": 0
    }
  ],

  "badges": {
    "count": 0,
    "layout": "row|column",
    "row_width_pct": 0,
    "gap_between_px": 0,
    "individual_badges": [
      {
        "title": "BADGE TEXT",
        "sub_text": "secondary line if present, e.g. dosage — null if none",
        "has_icon": false,
        "icon_description": "what the icon depicts — shield, molecule, leaf, checkmark, star, dollar sign, etc. null if no icon",
        "icon_position": "left|top|null",
        "icon_container_shape": "circle|square|none",
        "icon_container_size_px": 0,
        "icon_container_border": "Npx solid #hex|none",
        "icon_container_background": "#hex|transparent",
        "width_px": 0,
        "height_px": 0,
        "background": "#hex|transparent|rgba(r,g,b,a)",
        "border": "Npx solid #hex|none",
        "border_radius_px": 0,
        "box_shadow": "none|CSS value",
        "title_font_size_px": 0,
        "title_font_weight": 700,
        "title_color": "#hex",
        "title_text_transform": "uppercase|none",
        "sub_text_font_size_px": 0,
        "sub_text_color": "#hex",
        "padding_vertical_px": 0,
        "padding_horizontal_px": 0
      }
    ]
  },

  "cta_button": {
    "text": "exact CTA text",
    "width_pct": 0,
    "height_px": 0,
    "background": "#hex",
    "border": "none|Npx solid #hex",
    "border_radius_px": 0,
    "box_shadow": "none|CSS value",
    "text_font_size_px": 0,
    "text_font_weight": 800,
    "text_color": "#hex",
    "text_letter_spacing_px": 0,
    "text_transform": "uppercase|none"
  },

  "photo_container": {
    "present": true,
    "type": "window|full-bleed|portrait-composite",
    "width_pct": 0,
    "height_pct": 0,
    "border": "Npx solid #hex|none",
    "border_radius_px": 0,
    "box_shadow": "none|CSS value",
    "overflow": "hidden",
    "image_treatment": "color|grayscale|luminosity-blend|none",
    "image_opacity": 1.0
  },

  "composition_type": "3a-broll-hero|3b-product-bundle|3c-flat-lay|3d-typographic-hero|3e-portrait-composite|3f-textured-window|3g-seal|3g-list|3h-infographic-grid",
  "palette_guess": "light|dark|blue-molecular|red-organic|terracotta"
}

CRITICAL MEASUREMENT RULES:
1. Every "#hex" must be a real 6-digit hex color sampled from the image. No generic colors.
2. Measure font_size_px by finding cap-height (top of 'H' to baseline) and multiplying by 1.4.
3. text_width_pct is mandatory for every text element — left edge of first char to right edge of last char, as % of 1080px.
4. For borders: measure thickness AND color separately. 1px vs 2px vs 3px looks very different.
5. border_radius_px: measure the actual curve. 100px = full pill semicircle. 40px = large round. 20px = medium. 14px = subtle. 0 = sharp.
6. box_shadow: if an element has a visible shadow or glow, describe it as a CSS value. Most flat-design elements have "none".
7. text_shadow: for text over images or textures, there's usually a shadow for legibility. Measure it.
8. opacity: if an element appears translucent or semi-transparent, estimate the opacity (0.0-1.0).
9. Badge backgrounds: often different from canvas background. Check if transparent, semi-transparent (rgba), or solid.
10. If badges have TWO lines of text (title + sub-text like a dosage or description), capture BOTH.
11. If badges have icons (small graphics to the left or above the text), describe what each icon depicts AND measure the icon container size (diameter for circles, side length for squares). This is critical — icon circles that are 72px vs 110px look completely different.
12. For the photo/image area: note whether it's a windowed container with border, full-bleed behind content, or a composited portrait.
13. Measure the gap between EVERY pair of adjacent elements. This is margin_below_px on the upper element.

FONT CLASSIFICATION (MOST IMPORTANT):
14. For EVERY text element, examine the ACTUAL LETTERFORMS carefully:
    - SERIF: letters have small decorative strokes at their terminals. Look at capital "I" — does it have horizontal bars/brackets at top and bottom? Look at "T" — do the ends of the crossbar have tiny flared serifs? The strokes have thick/thin contrast.
    - SANS-SERIF: letters have uniform stroke width with NO decorative endings. Capital "I" is just a straight vertical bar. "T" has a clean crossbar with blunt ends. Geometric, clean, modern.
15. Common patterns in ad cards: headlines and stat numbers are often serif. Badges, CTAs, disclaimers, capsule labels, and small utility text are almost always sans-serif. Pre-headlines/kickers above a main headline are often sans-serif even when the headline itself is serif.
16. Do NOT guess — zoom in on the actual letter shapes. Getting serif vs sans-serif wrong causes the entire reproduction to look off.
17. font_style "italic" means letters visibly SLANT to the right AND have italic letterform variants (curved 'a', 'e', 'g'). Organic serif curves alone do not equal italic.

Return ONLY the JSON object. No markdown fences, no explanation.`;

const pass1Resp = await callWithRetry([
  { inlineData: { mimeType, data: b64 } },
  { text: extractionPrompt }
]);

let extractionText = pass1Resp.response.text().trim();
// Strip markdown fences if present
if (extractionText.startsWith("```")) {
  extractionText = extractionText.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
}

let extraction;
try {
  extraction = JSON.parse(extractionText);
} catch (e) {
  console.error("Pass 1 JSON parse failed. Raw output:");
  console.error(extractionText);
  process.exit(1);
}

// --- Pass 2: Validation ---

const validationPrompt = `Look at this ad card image again. I extracted these measurements from it:

${JSON.stringify(extraction, null, 2)}

Check every value against the actual image. Pay SPECIAL ATTENTION to:
1. font_class for EACH text element — is it truly serif or sans-serif? Look at the actual letterforms. Getting this wrong makes the entire reproduction look off.
2. font_size_px — are the proportions right? A headline at 200px fills most of the width. At 80px it's much smaller.
3. font_style — is it actually italic (slanting right) or normal?
4. Badge icon sizes — if there are circular icon containers, is the diameter right?
5. text_transform — is the text ALL CAPS (uppercase) or Mixed Case (none)?

List ONLY the corrections needed. For each:
- The JSON path (e.g. "elements[0].font_class" or "elements[2].font_size_px")
- The wrong value
- The correct value
- Why it's wrong (what you see in the image)

If the extraction is accurate, respond with: {"corrections": []}

Otherwise respond with:
{"corrections": [{"path": "...", "wrong": ..., "correct": ..., "reason": "..."}]}

Return ONLY JSON. No markdown fences.`;

const pass2Resp = await callWithRetry([
  { inlineData: { mimeType, data: b64 } },
  { text: validationPrompt }
]);

let validationText = pass2Resp.response.text().trim();
if (validationText.startsWith("```")) {
  validationText = validationText.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
}

let corrections = [];
try {
  const validation = JSON.parse(validationText);
  corrections = validation.corrections || [];
} catch (e) {
  // Validation parse failed — proceed with uncorrected extraction
  console.error("Pass 2 validation parse failed — using uncorrected extraction");
}

// Apply corrections
for (const c of corrections) {
  try {
    const parts = c.path.replace(/\]/g, "").split(/[\[.]/);
    let obj = extraction;
    for (let i = 0; i < parts.length - 1; i++) {
      const key = isNaN(parts[i]) ? parts[i] : parseInt(parts[i]);
      obj = obj[key];
    }
    const lastKey = isNaN(parts[parts.length - 1]) ? parts[parts.length - 1] : parseInt(parts[parts.length - 1]);
    obj[lastKey] = c.correct;
  } catch (e) {
    // Skip corrections that can't be applied
  }
}

// --- Post-processing: brand font mapping ---
if (brandFonts) {
  function mapFonts(el) {
    if (el && el.font_class) {
      const mapping = brandFonts[el.font_class];
      if (mapping) {
        el.font_family_css = mapping.family;
        el.font_name = mapping.name;
      }
    }
  }
  if (extraction.elements) {
    for (const el of extraction.elements) mapFonts(el);
  }
  extraction._brand_fonts = {
    brand: brandName,
    serif: brandFonts.serif.family,
    serif_name: brandFonts.serif.name,
    serif_note: brandFonts.serif.note,
    sans_serif: brandFonts["sans-serif"].family,
    sans_serif_name: brandFonts["sans-serif"].name,
    sans_serif_note: brandFonts["sans-serif"].note,
  };
}

// Output
const output = JSON.stringify(extraction, null, 2);

if (outputPath) {
  fs.writeFileSync(outputPath, output);
  console.log(`Extraction saved to: ${outputPath}`);
  if (corrections.length > 0) {
    console.log(`Applied ${corrections.length} correction(s) from validation pass`);
  }
} else {
  console.log(output);
}

if (corrections.length > 0) {
  console.error(`\nValidation corrections applied (${corrections.length}):`);
  for (const c of corrections) {
    console.error(`  ${c.path}: ${JSON.stringify(c.wrong)} → ${JSON.stringify(c.correct)} (${c.reason})`);
  }
}
