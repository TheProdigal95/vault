# /generate-endcard — End Card Animation Generator

Generates lint-ready Hyperframes end card projects from brief data, manual params, or reference images. Produces a complete project directory with `index.html`, `meta.json`, `hyperframes.json`, and `package.json`. User drops b-roll clips and renders.

**System docs:**
- `[Brand]/00 Context/DESIGN.md` — Brand design system (tokens, palettes, typography, rationale)
- `[Brand]/00 Context/End Card Criteria - [Brand].md` — Composition types, strategic rules, batch planning
- `IM8/00 Assets/Animations/Animation Workflow.md` — Manual workflow being automated

**Tools:**
- `node 00 Global/Hermes/tools/endcard-generator/generate.js` — Template-based composition generator
- `node 00 Global/Hermes/tools/endcard-generator/ref-to-composition.mjs` — Reference image → composition (uses DESIGN.md)
- `node 00 Global/Hermes/tools/endcard-generator/design-tokens.js` — DESIGN.md parser / CSS custom property bridge
- `node 00 Global/Hermes/tools/endcard-generator/extract-design.mjs` — Extract/update design tokens from reference images

---

## Entry Mode 1: From Brief

```
User: /generate-endcard
  brand: IM8
  brief: T003 Working Document.md → EC-M1
  type: 3a
  palette: light
```

**Steps:**

1. Read the brief section from the specified document. Extract:
   - Headline text
   - Sub-headline (if present)
   - Badge text (ingredient/trust/offer badges)
   - CTA text
   - Capsule label (if present)
   - Disclaimer text (if present)
   - Footnote / asterisk conditions (if present)
   - Stat number (for 3D type)
   - Grid items (for 3H type)

2. Read End Card Criteria from the brand's `00 Context/` folder to validate type/palette choice.

3. Determine output path: `[Brand]/00 Assets/Animations/[batch]-[slug]-anim/`
   - Example: `IM8/00 Assets/Animations/T003-fatigue-anim/`
   - Slug derived from the concept name (lowercase, hyphens)

4. Run the generator:
   ```bash
   node 00 Global/Hermes/tools/endcard-generator/generate.js \
     --type [type] \
     --palette [palette] \
     --headline "[headline text]" \
     --subhead "[sub-headline text]" \
     --badges "[badge1|badge2|badge3]" \
     --cta "[CTA text]" \
     --capsule "[capsule label]" \
     --disclaimer "[disclaimer text]" \
     --footnote "[footnote text]" \
     --broll-count [N] \
     --output "[output path]"
   ```

   **Badge separator is `|` (pipe)**, not comma — badge text like "MSM 1,500MG" contains commas.

5. Copy `logo.png` from the brand's `00 Assets/` directory:
   ```bash
   cp "[Brand]/00 Assets/Animations/[existing-project]/logo.png" "[output-path]/logo.png"
   ```

6. If textured palette (blue-molecular, red-organic, terracotta):
   - Check if `bg.png` exists in another project using the same palette
   - If yes, copy it: `cp [source]/bg.png [output-path]/bg.png`
   - If no, note that `bg.png` needs to be created or sourced

7. Run lint:
   ```bash
   cd "[output-path]" && npm run check
   ```

8. Report results:
   - Project path
   - Files created
   - B-roll slots to fill (how many `broll-N.mp4` files needed)
   - Whether bg.png is needed
   - Lint status
   - Remind user: "Drop b-roll files, then render with `npm run render`"

---

## Entry Mode 2: Manual Params

```
User: /generate-endcard
  brand: IM8
  type: 3d
  palette: dark
  headline: "Better Sleep."
  stat: "80%"
  badges: "SAFFRON 30MG|MAGNESIUM|ASHWAGANDHA"
  cta: "Try IM8 Today"
```

Same steps as above but skip brief extraction — use the provided params directly.

---

## Entry Mode 3: From Reference Image + DESIGN.md

```
User: /generate-endcard
  ref: IM8/00 Assets/Statics/T003-endcards/layouts/EC-G1/variant-1.png
  brand: IM8
```

The fastest path from a static reference to an animated composition. Uses DESIGN.md for all design tokens (colors, fonts, spacing) — Gemini only extracts text content and composition type.

**Steps:**

1. Locate the brand's DESIGN.md at `[Brand]/00 Context/DESIGN.md`.
   - If no DESIGN.md exists, offer to generate one from reference images:
     ```bash
     node 00 Global/Hermes/tools/endcard-generator/extract-design.mjs \
       [ref1.png] [ref2.png] [ref3.png] \
       --brand [Brand] --output "[Brand]/00 Context/DESIGN.md"
     ```

2. Run the single-command orchestrator:
   ```bash
   node 00 Global/Hermes/tools/endcard-generator/ref-to-composition.mjs \
     [ref.png] \
     --design-md "[Brand]/00 Context/DESIGN.md" \
     --output "[Brand]/00 Assets/Animations/[batch]-[slug]-anim/" \
     --brand-dir "[Brand]" \
     --broll-count 6
   ```

   This does everything:
   - Sends the reference to Gemini for focused content extraction (type, palette, text)
   - Generates the composition using generate.js with DESIGN.md tokens
   - Copies logo.png from existing brand projects
   - Copies bg.png for textured palettes (if available)
   - Runs visual comparison against the reference

3. If layout_notes in the extraction indicate non-standard layout variations (vertical badges, unusual ordering), apply manual CSS adjustments to index.html.

4. Drop b-roll files, render, add to canvas.

**When to use this vs Mode 1 (From Brief):**
- From Brief: the brief defines the content, you pick the composition type and palette
- From Reference: a static image defines everything — you want to reproduce it as an animation

**Checking DESIGN.md coverage first (optional):**
```bash
node 00 Global/Hermes/tools/endcard-generator/extract-design.mjs \
  [ref.png] --brand [Brand] --update "[Brand]/00 Context/DESIGN.md"
```
Reports whether the design system covers this image or needs new tokens.

---

## Composition Types

| Type | Name | Hero Element | Has B-Roll |
|------|------|-------------|-----------|
| **3a** | B-Roll Hero Window | Photo wrapper with stacked `<video>` | Yes |
| **3b** | Product Bundle Display | Static `<img>` hero | No |
| **3c** | Overhead Flat-Lay | Full-bleed `<img>` background | No |
| **3d** | Typographic Hero | Giant stat number | No |
| **3e** | Portrait-Over-Texture | Composited portrait on texture | No |
| **3f** | Textured Bg + Floating Window | B-roll on texture background | Yes |
| **3g** | Textured Bg + Seal/List | Circular seal or text list | No |
| **3h** | Infographic Grid | 2x2 or 2x3 card grid | No |

## Palettes

| Key | Name | Background |
|-----|------|-----------|
| `light` | Warm Cream | Flat #F5F2F3 |
| `dark` | Deep Maroon | Flat #311B1B |
| `blue-molecular` | Blue Molecular | Texture (needs bg.png) |
| `red-organic` | Red Organic | Texture (needs bg.png) |
| `terracotta` | Terracotta | Texture (needs bg.png) |

## Generator Params Reference

| Param | Required | Notes |
|-------|---------|-------|
| `--type` | Yes | 3a–3h |
| `--palette` | Yes | light, dark, blue-molecular, red-organic, terracotta |
| `--headline` | Yes | Primary headline text |
| `--cta` | Yes | CTA button text |
| `--output` | Yes | Output directory path |
| `--subhead` | No | Sub-headline text |
| `--badges` | No | Pipe-separated badge text: "B12 83X\|COQ10\|AMINO" |
| `--capsule` | No | Authority capsule label |
| `--disclaimer` | No | FDA disclaimer text |
| `--footnote` | No | Asterisk condition text |
| `--broll-count` | No | Number of b-roll slots (default: 6) |
| `--stat` | No | Stat number for 3D type, seal number for 3G |
| `--grid-cells` | No | Pipe-separated grid cell text for 3H, list items for 3G list mode |
| `--hero-type` | No | "seal" (default) or "list" for 3G type |

## Post-Generation

After generating:
1. Lint must pass (`npm run check` — only media 404s expected for missing assets)
2. Copy brand logo
3. Copy or create bg.png if textured palette
4. User drops b-roll as `broll-1.mp4` through `broll-N.mp4`
5. Render: `cd [project] && npm run render`
6. Add rendered MP4 to the batch canvas at `[Brand]/T00N Images.canvas`

## Visual Verification Pipeline (when generating from a reference image)

### With DESIGN.md (preferred)

When the brand has a `DESIGN.md`, use `ref-to-composition.mjs` — it runs the full pipeline in one command (see Entry Mode 3 above). Visual comparison runs automatically at the end.

If the score is below 95, iterate on layout only — colors, fonts, and spacing are already correct from the design system. Common layout fixes: element ordering, badge layout direction, spacing between specific elements.

### Without DESIGN.md (legacy)

```bash
# 1. Extract visual properties (pass --brand for font mapping)
node 00 Global/Hermes/tools/gemini-api/analyze-endcard.mjs [ref.png] --brand [Brand] --output extraction.json

# 2. Generate HTML from extraction data

# 3. Compare against reference
node 00 Global/Hermes/tools/endcard-generator/compare-visual.mjs --ref [ref.png] --html [project/index.html]

# 4. If score < 95: read diff-report.json, apply CSS fixes, re-run compare (max 3 iterations)
```

The `--brand` flag is critical — it maps generic serif/sans-serif classifications to the brand's actual typefaces (e.g., IM8: Arizona Flare serif + Manrope sans-serif). Without it, font classification errors cascade into wrong typefaces.

### Textured Background Handling (bg.png)

When the extraction detects `background_type: "texture"` (blue-molecular, red-organic, terracotta palettes), the composition needs a clean `bg.png` without any text, logos, badges, or product overlays. Use the single-command tool:

```bash
node 00 Global/Hermes/tools/endcard-generator/generate-bg.js \
  --image [ref.png] \
  --output [project]/bg.png \
  --width 1080 --height 1920 \
  --prompt "[texture description], no text, no logos, no products"
```

The tool handles masking, inpainting, artifact cropping, and resizing internally. Customize `--prompt` to match the actual texture (e.g., "Red organic mushroom gill texture, warm reddish tones" or "Blue molecular cell structure, organic blue and teal tones").

If the output has visible artifacts, re-run with a more explicit prompt. Reuse bg.png across compositions with the same palette when possible.

**Always add bg.png to the batch canvas** at `[Brand]/T00N Images.canvas` — the background is an asset the strategist needs to see and may reuse.

### Hero Image Extraction

When the reference contains a product photo, lifestyle shot, or flat-lay in the hero area (types 3B, 3C, 3E), crop it from the reference using extraction coordinates:

```bash
node -e "
  import sharp from 'sharp';
  const meta = await sharp('[ref.png]').metadata();
  await sharp('[ref.png]')
    .extract({ left: L, top: T, width: W, height: H })
    .toFile('[project]/hero.png');
  console.log('done');
"
```

Calculate L, T, W, H from extraction.json percentages × source image dimensions.

For b-roll window compositions (types 3A, 3F): skip hero extraction — the window holds `<video>` elements.

### Logo Transparency

Brand logos often have solid backgrounds. Use the single-command tool to convert to white-on-transparent:

```bash
node 00 Global/Hermes/tools/endcard-generator/process-logo.js \
  --image [source-logo.png] \
  --output [project]/logo.png \
  --threshold 200
```

Pixels brighter than threshold → transparent. Darker → white. Default threshold 200 works for most logos. **Never use CSS `filter: brightness(0) invert(1)`** — it turns the entire image white including the background, creating a visible white rectangle on non-white backgrounds.

### After Effects Export

Convert any Hyperframes end card to a native AE composition:

```bash
node 00 Global/Hermes/tools/endcard-generator/export-ae.js \
  --project [project-dir] \
  --output [project-dir]/[name].jsx
```

The generated `.jsx` script rebuilds the composition in After Effects with:
- All layers (bg, logo, text, badges, CTA, footnote)
- B-roll pre-comp with rounded-corner mask and crossfade montage
- GSAP keyframes mapped to AE keyframes with correct easing
- Drop shadows for text on textured backgrounds
- Overshoot (back.out) converted to 3-keyframe scale animation

To use: `File → Scripts → Run Script File...` in AE, then select the project folder when prompted. Font PostScript names are configurable at the top of the .jsx.

## DESIGN.md Management

### Creating a DESIGN.md for a new brand

Collect 5-10 representative end card reference images, then:

```bash
node 00 Global/Hermes/tools/endcard-generator/extract-design.mjs \
  ref1.png ref2.png ref3.png ref4.png ref5.png \
  --brand [Brand] --output "[Brand]/00 Context/DESIGN.md"
```

Review and refine the output — AI extraction is approximate. Verify hex values, font names, and spacing against actual brand guidelines.

### Checking coverage of a new reference

Before generating from a reference, optionally verify the design system covers it:

```bash
node 00 Global/Hermes/tools/endcard-generator/extract-design.mjs \
  [ref.png] --brand [Brand] --update "[Brand]/00 Context/DESIGN.md"
```

Reports: `covered: true/false`, palette match, new tokens needed, discrepancies.

### Using DESIGN.md tokens in generate.js

```bash
node 00 Global/Hermes/tools/endcard-generator/generate.js \
  --type 3a --palette light --headline "..." --cta "..." \
  --design-md "[Brand]/00 Context/DESIGN.md" \
  --output [path]
```

Without `--design-md`, falls back to `palettes.json` (backward compatible).

### Token bridge CLI

```bash
# Summary of token counts
node 00 Global/Hermes/tools/endcard-generator/design-tokens.js [DESIGN.md] --summary

# CSS custom properties for a palette
node 00 Global/Hermes/tools/endcard-generator/design-tokens.js [DESIGN.md] --palette light

# Export all palettes as palettes.json-compatible JSON
node 00 Global/Hermes/tools/endcard-generator/design-tokens.js [DESIGN.md] --all-palettes

# Typography utility classes
node 00 Global/Hermes/tools/endcard-generator/design-tokens.js [DESIGN.md] --typography
```

## Hard Rules

- **Arizona Flare** is the correct serif font. Never Lora.
- **15 seconds** composition duration. Always.
- **Ascending z-index** on b-roll videos. broll-1 = lowest, broll-N = highest.
- **Fade-in only** for b-roll crossfade. Never fade out a clip.
- **`window.__timelines["main"]`** registration required.
- **GSAP 3.14.2** via CDN.
- Manrope via Google Fonts for sans-serif (badges, CTA, disclaimers).
- **DESIGN.md is the single source of truth for design tokens.** When a brand has a DESIGN.md, always use `--design-md` with generate.js. Don't hardcode hex values in hand-crafted compositions — use CSS custom properties from the design system.
