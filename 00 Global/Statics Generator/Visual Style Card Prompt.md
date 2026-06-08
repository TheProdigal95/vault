# Visual Style Card Prompt

The generation prompt for producing a Visual Style Card PNG. Like the Brand Spec Card, this is an HTML page screenshotted via Playwright and uploaded as a reference image to NanoBanana 2. While the Brand Spec Card covers identity mechanics (fonts, colors, logo rules), the Visual Style Card covers *aesthetic direction* — how the brand looks and feels in photography, product styling, and emotional register.

---

## Sources — Read Before Generating

1. **`[Brand]/00 Context/Brand Context - [Brand].md`** — Brand Voice & Personality section, Brand Identity, and any noted aesthetic descriptors (e.g., "cinematic aesthetic: dark burgundy, gold accents, glassmorphic design").
2. **`[Brand]/02 Ads Analysis/`** — Top spender breakdowns reveal the photography styles, product staging, model casting, background treatments, and visual energy levels that are actually spending. This is the primary source for Photography Direction and Product Styling Notes — use what's running, not what the brand aspires to.
3. **`[Brand]/00 Context/Product Context - [Brand].md`** — Hero product details, packaging, form factor. Needed for Product Styling Notes.
4. **`[Brand]/00 Context/Persona Context - [Brand].md`** — Persona demographics and psychographics inform model casting direction and lifestyle shot context.
5. **Brand guidelines PDF** (if available in `[Brand]/00 Context/`). Photography guidelines, if present, override inferred patterns from ads.
6. **Brand website** — Homepage hero imagery, product pages, and about pages show the brand's intended photographic direction. Cross-reference with what's actually in ads.

**Priority order for photography direction:** Ads analysis (what's spending) > Brand guidelines PDF > Website imagery > Brand Context descriptors.

---

## Generation Prompt

Use the following prompt verbatim. Replace `[Brand]` with the brand name and fill each section from the sources above.

---

Generate a clean HTML page I can screenshot as a **Visual Style Card** for AI image generation.

### Visual Design Language

Apply the same overall framework as the Brand Spec Card:

- **Dark branded header bar** across the full width. Background = brand's primary dark color. Left-aligned: brand name uppercase in the brand's bold sans-serif, light/off-white text. Right-aligned: "Visual Style Card — Ref 02" in small uppercase, muted color.
- **Numbered section labels** — `01 — Brand Essence`, `02 — Photography Direction`, etc. Small (11px) uppercase, wide letter-spacing, muted color.
- **Bordered cards** for grouped content — 1px solid border, brand's light/beige color. No rounded corners, no background fills. Clean rectangles.
- **Thin horizontal dividers** between major sections.
- **Generous whitespace** — 50–60px content padding, 50px between sections, 24px gap between grid cards.
- **Use the brand's own fonts** throughout — headline font for the quote, sans-serif for section labels and body text.

### 1. Brand Essence
- **3-column grid of bordered cards.**
- Each card: the adjective in **bold uppercase** (22px, wide letter-spacing) centered at the top, then a one-sentence description below in 14px body text.
- These are three words that define the brand's visual and verbal voice. Not dictionary definitions — creative direction notes.
- Example: **"EDITORIAL"** — Magazine-quality compositions. Every shot is intentional — layered diptychs, golden-hour warmth, life caught mid-moment. Not advertising, not stock.

### 2. Founder Quote
- One defining quote from the founder, CEO, or brand manifesto.
- Render in the brand's **serif/headline font, italic, ~28px**, on a clean white background. No background box, no left-border blockquote treatment.
- Attribution below in small (11px) uppercase muted text with wide letter-spacing.
- If no founder quote exists, use the brand's mission statement or tagline.

### 3. Photography Direction
- **2×2 grid of bordered cards**, each with:
  1. **Bold uppercase heading** (15px, letter-spacing) at top
  2. **Direction note paragraph** (13px body text, 1.6 line-height) — the substantive guidance
  3. **Pill row at bottom** — 3–6 keyword tags as small outlined pills (1px border, no fill, 10px uppercase text, 2px border-radius)

The four cards:
- **Product Photography** — How the hero product should be shot. Lighting, angle, surface/backdrop, shadow treatment. Pull from top-spending ads and product pages.
- **Model Photography** — Casting direction (age, energy, styling), framing, expression, wardrobe. Pull from top-spending ads featuring people.
- **Lifestyle & Context** — Environments where the product appears in use. Locations, time of day, activities, prop styling.
- **Background & Surface** — Default backdrop treatments for static ads. Colors with hex codes, textures, gradients. Whether the brand trends minimal or layered.

**Critical:** Text direction note comes first, pills at the bottom. Not pill-first. The direction note is the substantive content; pills are scannable tags.

### 4. Always / Never Rules
- **Two bordered box cards side by side** (2-column grid, 24px gap).
- Left card heading: `→ Always` in bold uppercase. Right card heading: `× Never` in bold uppercase, warm red/rust color.
- **6 rules per card.** Each rule is a bulleted list item with a small dot marker (●) and thin bottom-border separator.
- Always rules: visual production rules about how this brand portrays people, products, and environments. Not brand identity rules (those live in the Brand Spec Card).
- Never rules: visual anti-patterns to avoid. Reference specific environments, expressions, lighting, or staging that would feel wrong for this brand.

### 5. Product Styling Notes
- **Lead with 3 conceptual sub-cards** in a 3-column grid. Name each card after the product element it covers, using "THE [NOUN]" format:
  - **The [Container]** — e.g., THE BOTTLE, THE BOX, THE SACHET. Packaging details, label typography (which fonts appear on the label), angle, orientation, "never flat-lay" if applicable, lighting on materials.
  - **The [Unit]** — e.g., THE CAPSULES, THE POWDER, THE SERUM. How the product itself (not packaging) should appear. Quantity, arrangement, pour/scoop/application moment.
  - **The Context** — Setting, companion props, product-to-frame ratio, what the surrounding says about the brand (wellness vs. medicine, premium vs. accessible).
- **Below the sub-cards: 2-column product specs table grid.** Two bordered cards, each containing a key-value table (small uppercase labels on left, body text values on right). Cover: container, label, form factor, hero SKU + pricing, angle, lighting, surface materials + exclusions, secondary shots, avoid list, secondary products that share the same styling rules.

### 6. Mood Spectrum
- **5 horizontal rows,** each showing where the brand sits on a conceptual spectrum.
- **Render as text-weight emphasis, NOT as slider bars or gradient tracks.**
- Each row: 5 words arranged horizontally, centered, with spacing between them. The brand's active position gets **bold, 22px, dark brand color**. Adjacent positions get **regular weight, 16px, muted color**. Far positions get **light weight, 14px, very faded color** (near-invisible).
- This reads better at scale than slider bars — the AI model sees the emphasis hierarchy directly.
- Suggested dimensions (adjust to fit the brand):
  - Loud → Bold → Confident → **Quiet Confidence** → Invisible
  - Youthful → Ageless → **Timeless** → Mature → Vintage
  - Clinical → Clean → **Warm** → Cozy → Rustic
  - Minimal → Restrained → **Editorial** → Layered → Dense
  - Aspirational → **Attainable** → Relatable → Casual → Unpolished
- Position the active word based on what the top-spending ads actually project, not what the brand says about itself.
- Thin bottom-border under each row as a separator.

**Formatting rules for the HTML:**
- Fixed width: 1200px — screenshot target, not a responsive page.
- Every visual element must be rendered, not described. The AI image generator will *see* this card.
- Generous whitespace between sections.
- Photography pills are **outlined** (1px border, no fill, 2px border-radius) — not rounded-pill with gray/colored fill.
- Mood spectrum uses **text weight and size** for emphasis — not slider bars, not gradient fills, not markers on a track.
- Founder quote is **clean serif italic on white** — no colored background box, no left-border blockquote treatment.

---

## Playwright Screenshot Command

After the HTML is generated and saved:

```bash
# Save the HTML to a temp file first
# Then screenshot it to the brand's 00 Context folder

npx playwright screenshot \
  --viewport-size="1200,3600" \
  --full-page \
  "/tmp/visual-style-card-[brand-slug].html" \
  "[Brand]/00 Context/Visual Style Card.png"
```

Adjust the viewport height as needed. `--full-page` captures the entire scrollable area.

If Playwright is not installed, run `npx playwright install chromium` first (one-time).

---

## Output Location

`[Brand]/00 Context/Visual Style Card.png`

Uploaded as a reference image alongside the Brand Spec Card and a product photo when generating ads via NanoBanana 2.

---

## When to Regenerate

- New ads analysis reveals a shift in the brand's top-spending visual direction.
- Brand Context or Product Context is refreshed via `/research-brand --refresh=brand` or `--refresh=product`.
- The strategist uploads updated brand guidelines with new photography direction.
- A new hero product launches with different packaging or staging requirements.
- Generated images consistently miss the brand's visual tone (style card may be stale).

Regeneration is manual — run `generate spec cards for [Brand]` or include it in a `/research-brand` refresh.
