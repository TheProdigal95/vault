# Brand Spec Card Prompt

The generation prompt for producing a Brand Spec Card PNG. The spec card is an HTML page screenshotted via Playwright, then uploaded as a reference image to NanoBanana 2 so it can *see* the brand's fonts, colors, and identity system. Text prompts with hex codes and font names alone don't work — the model needs visual specimens.

---

## Sources — Read Before Generating

1. **`[Brand]/00 Context/Brand Context - [Brand].md`** — Brand Identity section covers voice, personality, aesthetic direction, and any noted visual elements (colors, typography descriptors, design language).
2. **Brand guidelines PDF** (if the strategist uploaded one to `[Brand]/00 Context/`). Look for any file matching `guidelines`, `brand guide`, `style guide`, `brand book`, or `visual identity` in the name. This is the gold source — it overrides everything else.
3. **Brand website CSS inspection** (fallback when no guidelines PDF exists). Inspect the live site to extract:
   - Font families and weights (check `<link>` tags, `@font-face` rules, Google Fonts / Typekit / Adobe Fonts imports)
   - Color palette (primary buttons, headings, body text, background, accent elements)
   - CTA button styling (background color, border-radius, text color, font weight, padding)
   - Logo usage (check favicon, header, footer — pull the SVG/PNG if available)
4. **`[Brand]/02 Ads Analysis/`** — Top spender breakdowns show what fonts, colors, and CTA styles appear in actual running ads. Cross-reference with the website to confirm which elements are canonical vs. one-off creative choices.

**Priority order:** Brand guidelines PDF > Website CSS > Brand Context descriptors > Ads analysis patterns.

---

## Generation Prompt

Use the following prompt verbatim. Replace `[Brand]` with the brand name and fill each section from the sources above.

---

Generate a clean HTML page I can screenshot as a **Brand Spec Card** for AI image generation.

### Visual Design Language

Before building sections, apply this overall framework to the entire card:

- **Dark branded header bar** across the full width. Background = brand's primary dark color. Left-aligned: brand name in the brand's bold sans-serif, uppercase, light/off-white text. Right-aligned: "Brand Spec Card — Ref 01" in small uppercase, muted color, 12px.
- **Numbered section labels** — each section starts with a label like `01 — Logo & Wordmark` in small (11px) uppercase, wide letter-spacing, muted color (sage/gray). Use em-dash separators.
- **Bordered cards** for grouped content — 1px solid border in the brand's light/beige color. No rounded corners, no background fills, no drop shadows. Clean rectangles.
- **Thin horizontal dividers** between major sections (1px solid, brand's beige/light color).
- **Generous whitespace** — 50–60px content padding, 50px between sections, 24px between cards in a grid.
- **Use the brand's own fonts** for the card itself — render the card's section labels and notes in the brand's sans-serif, specimens in their actual fonts. The card should look like it belongs to the brand.
- **Use real brand copy** for every specimen — pull headlines, body copy, CTA text, and pricing from the brand's website, manifesto, or product pages. Never use lorem ipsum, generic filler, or "Sample Headline Here."

### 1. Logo & Wordmark
- **Top row: 3-column grid.** Column 1: bordered box with the wordmark rendered in brand's primary color on white. Column 2: bordered box with the wordmark in off-white on brand's dark color. Column 3: text notes — font description, letterform details, clear space rule.
- Below the grid, add a **brandmark + lockup row** (if the brand has an icon mark separate from the wordmark): render the brandmark SVG at ~64px, the approved lockup (brandmark + wordmark side by side), and a short note about the mark's meaning and lockup rules. Skip this row if the brand only has a wordmark.
- If you cannot load the actual logo/brandmark files, render the brand name in the primary font as the wordmark stand-in, and draw a simplified SVG approximation of the brandmark from the guidelines description.

### 2. Typography System
- **Primary role cards: 3-column grid.** One bordered card per role:
  - **Headlines & Display** — render a real brand headline in the headline font at display size. Below: font name, weight, and usage note.
  - **Body & Descriptions** — render a real brand body sentence in the body font at body size. Below: font name, weight, and usage note.
  - **Accents & Labels** — render a real CTA label and a price/detail line in the label font, uppercase with letter-spacing. Below: font name, weight, and usage note.
- **Weight specimen grid (below the 3-card row): 2-column grid.** One bordered cell per additional font weight the brand uses (e.g., Regular, Light, Medium, Bold across headline and body font families). Each cell: small uppercase weight label, then a short line of real brand copy rendered in that weight. Show every weight documented in the brand book.
- **Typeset composition block (below the weight grid):** A single panel with the brand's light/off-white background color showing a realistic composition — overline label + headline + body paragraph + CTA button — all in their correct fonts, weights, and sizes, demonstrating how the type system composes in practice. Use real brand copy.

### 3. Color Palette
- **Two rows of 5-column grids** (or adjust columns to fit the brand's palette size).
- Each swatch: **160px tall** rectangle, 4px border-radius. Below: hex code in 14px medium weight, then color name in 10px uppercase muted text.
- Light-colored swatches that would disappear against white get a 1px border.
- **Accessible color pairing boxes (below the swatches):** Show **all** approved text-on-background combinations from the brand book — typically 6-8 pairings in rows of 4. Each box 80px tall, render "Aa" in the headline serif font. Below each: a small label (e.g., "Charcoal on Off-White"). If the brand book documents accessibility pairings, reproduce all of them — don't cherry-pick a subset.

### 4. Wordmark Color Usage (if documented)
- If the brand book shows the wordmark on multiple background colors (many do — this is distinct from the 2-box light/dark in Section 1), render a **tight grid of color cells** showing the wordmark across all approved backgrounds. 4 columns, no gaps or 3px gaps, ~90px cell height.
- Below: a short note on which pairings are primary vs. acceptable-when-used-minimally.
- This section is critical for NB2 — the model needs to see the wordmark in context, not just on white and black.

### 5. Brand-Specific Visual Elements
Every brand has unique visual components beyond the standard logo/type/color system. Scan the brand book and website for these and render each as its own sub-section. Common examples:

- **Iconography system** — If the brand has a documented icon set (product category icons, feature icons, UI icons), render 10-12 representative icons as SVG approximations in a grid + notes on line weight, stroke style, and scaling rules. The AI model needs to see the icon style to maintain consistency.
- **Signature data visualization** — If the brand has a unique visual device (a health score, a progress wheel, a diagnostic chart), **extract the actual image from the brand book PDF or assets folder and embed it via `<img>` tag** — do not attempt to approximate complex gradient-heavy visuals as hand-drawn SVG paths. Save the extracted image to `/tmp/` alongside the HTML. Include notes on how the visualization works and its color palette, but the visual itself must be the real brand asset. Example: Lifeforce's Lifescore uses three overlapping cellular shapes with gradient fills — embedded as an extracted PNG, not an SVG approximation.
- **Infographic style** — If the brand uses data cards, charts, or infographic layouts in ads, show the style: background color, typography, line weight, illustration approach.
- **App UI elements** — If the brand has an app and uses UI screenshots in ads, note the key screens and visual style. Actual UI screenshots should go as separate reference images in `00 Context/`, not on this card — but the card should note the design language (rounded corners vs. sharp, card style, accent colors in UI).

**Not every brand will have all of these.** Only include what's documented in the brand book or consistently visible across the website and top-spending ads. Don't invent an icon system that doesn't exist.

- **Brand compositions** — Collect 4–6 screenshots from the brand's website, ads, and brand book that show how the brand actually composes its visual elements together. These are more valuable than text descriptions — the AI model can directly see the composition patterns (headline placement, photography style, data layout, illustration approach). Embed via `<img>` tags. Arrange in a 2-column top row (larger/photographic compositions) and a 3-column bottom row (lighter/graphic compositions). Use alt text to describe the composition pattern each image demonstrates. The strategist should provide these images from the brand's website or assets folder.

### 6. Design Rules
- **2-column grid.** Left column: Always rules. Right column: Never rules.
- **5 rules minimum per column** (pull from brand guidelines, website patterns, and ads analysis).
- Each rule is a single line with a marker: `→` for Always (muted color), `×` for Never (warm red/rust color).
- Thin bottom-border on each rule as a separator.
- Always rules cover: font usage, clear space, letter spacing, wordmark color contexts, background defaults.
- Never rules cover: wordmark distortion, unauthorized colors, custom lockups, letterform alterations, accent color misuse.

### 7. CTA Button Style
- **Render real brand CTAs** — pull the actual button labels from the brand's website and ads (e.g., "GET STARTED", "SHOP NOW", "TAKE THE QUIZ", "JOIN [BRAND]"). Show 3–4 buttons in a row covering the brand's button style variants (outlined, filled dark, filled accent, etc.).
- **Specs annotation row below the buttons:** A horizontal row of key-value pairs showing Font, Case, Letter Spacing, Border Radius, Padding, and Styles. Small uppercase labels in muted color, values in body text.

**Formatting rules for the HTML:**
- **Font loading priority:** (1) If the font is installed locally on the machine, just reference it by `font-family` name — Playwright's Chromium picks up system fonts, nothing else needed. (2) If font files (`.otf`, `.ttf`, `.woff2`) exist in `[Brand]/00 Context/` or were provided by the client, load via `@font-face` with a local `file://` path. (3) If the font is available on Google Fonts, load via `<link>` tag. (4) **Last resort only:** use the closest Google Fonts match and note the substitution visibly on the card. A substitute undermines the spec card's purpose — flag it to the strategist so they can source the font files.
- Fixed width: 1200px. Do not use responsive/fluid layouts — this is a screenshot target, not a website.
- Every visual element must be rendered, not described. The AI image generator will *see* this card — it cannot read text descriptions of colors or fonts. Show, don't tell.
- No placeholder images. If you cannot load the actual logo, render the brand name in the primary font as the wordmark stand-in.
- **Actual assets over SVG approximations.** For complex brand visuals (gradient-heavy marks, data visualizations, multi-shape compositions), extract the actual image from the brand book PDF or `[Brand]/00 Context/` assets and embed via `<img>` tag. Save extracted images to `/tmp/` alongside the HTML so Playwright can resolve them. Only use hand-drawn SVG for simple geometric shapes (rectangles, circles, basic icons with uniform strokes). If a visual has gradients, overlapping organic shapes, or photographic elements, it must be the real asset.

---

## Playwright Screenshot Command

After the HTML is generated and saved:

```bash
# Save the HTML to a temp file first
# Then screenshot it to the brand's 00 Context folder

npx playwright screenshot \
  --viewport-size="1200,3600" \
  --full-page \
  "/tmp/brand-spec-card-[brand-slug].html" \
  "[Brand]/00 Context/Brand Spec Card.png"
```

Adjust the viewport height (`3600`) if the page is taller — Playwright's `--full-page` flag captures the entire scrollable area, but setting a reasonable initial height avoids blank space at the bottom.

If Playwright is not installed, run `npx playwright install chromium` first (one-time).

---

## Output Location

`[Brand]/00 Context/Brand Spec Card.png`

This PNG is uploaded as a reference image alongside the Visual Style Card and a product photo when generating ads via NanoBanana 2.

---

## When to Regenerate

- Brand guidelines PDF is uploaded or updated by the strategist.
- Brand Context is refreshed via `/research-brand --refresh=brand`.
- The strategist notices font or color drift in generated images (spec card may be stale vs. current site).
- A new product line introduces a sub-brand with different visual identity.

Regeneration is manual — run `generate spec cards for [Brand]` or include it in a `/research-brand` refresh.
