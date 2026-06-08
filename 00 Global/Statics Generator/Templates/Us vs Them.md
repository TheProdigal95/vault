# Us vs Them

## What this format is

Split comparison that positions the brand against the competitor, old way, or status quo. One side is muted and unappealing, the other is vibrant and confident. This format has the best ROAS in accounts that run it per Creative Image Ad Criteria -- it works because the viewer makes the judgment call themselves instead of being told what to think.

**Models supported:** Both — NB2 and GPT Image 2. Model auto-selected per brief content.

## Styles

### Style A: Side-by-side split

Left/right or top/bottom split. Competitor side desaturated and visually suppressed. Brand side full color with product prominence. The split line is clean and architectural -- not a jagged tear or gimmicky divider. Each side carries its own column of comparison points stacked vertically.

#### Copy template

- **Comparison headline:** 3-10 words. Names the comparison directly ("Still using X?" / "X vs Y" / "Why people are switching from X"). Not vague -- the viewer knows what's being compared before reading the rows.
- **Column header (competitor side):** Brand name or category label ("Generic multivitamins" / "Your old routine" / "Typical telehealth"). 1-4 words.
- **Column header (brand side):** Brand name. 1-2 words.
- **Comparison points:** 3-5 rows. Each side 2-5 words per row. Each row names a specific attribute -- not vague ("cookie-cutter plans" vs "personalized protocol," not "bad" vs "good"). Competitor side states the limitation factually, brand side states the advantage specifically.
- **CTA:** 2-4 words, placed at bottom.

#### Image generation prompt

```
Generate a vertical split comparison ad, 1080x1920 pixels, 9:16 aspect ratio.

COMPOSITION
The frame is divided into two columns by a clean vertical line at x=490.
Left column (x=40 to x=480): the competitor/old way side. {{competitor_column_header}} at top of column. {{comparison_rows_competitor}} stacked vertically with even spacing between y=500 and y=1300. Each row is a text line, left-aligned.
Right column (x=520 to x=960): the brand side. {{brand_column_header}} at top of column. {{comparison_rows_brand}} stacked vertically at matching y-positions to the left column. Each row is a text line, left-aligned.
{{comparison_headline}} centered across the full width between y=290 and y=460, large and bold.
CTA button centered at y=1420 to y=1500, pill-shaped with brand accent color fill and white text reading "{{cta_text}}".
Brand logo at y=1540, centered, per spec sheet placement rules.
Product image on the brand (right) side between y=1100 and y=1380, scaled to ~25% of frame width, positioned to reinforce the brand column's advantage.

TYPOGRAPHY
Reference the uploaded Brand Spec Card for all font families, weights, and colors.
Comparison headline: headline font, bold weight, {{headline_size}}px. White or brand primary depending on background contrast.
Column headers: subheading font, semibold, 36-40px. Competitor header in muted grey (#999999). Brand header in brand primary color.
Comparison row text: body font, regular weight, 28-32px. Competitor rows in muted grey (#888888). Brand rows in white or brand text color.
CTA: CTA font per spec sheet, 32px, white on accent color.

SAFE ZONES
Top 270px clear of critical content (platform UI overlay zone).
Bottom 340px clear (engagement bar, caption preview, navigation).
Left margin 40px.
Right margin 120px from y=600 downward (side engagement buttons).
Primary content zone: x=40 to x=960, y=270 to y=1580.

COLOR AND TREATMENT
Left column background: {{muting_approach}} -- desaturated, low-contrast, visually suppressed. Background tone: dark grey or muted version of brand palette.
Right column background: full brand palette. Vibrant, confident, high-contrast.
The split should feel like two different worlds. The contrast in visual treatment does the persuasion -- the copy just confirms what the eye already decided.
Overall lighting: flat and dull on the left, bright and directional on the right.

BRAND IDENTITY
Logo placement per uploaded Brand Spec Card.
Brand colors from spec card applied ONLY to the right column and CTA. Left column uses desaturated/muted versions.
No improvised colors.

PHOTOGRAPHY DIRECTION
{{photography_direction}} from the brand brief.
Product representation uses the uploaded product photo -- photorealistic, not illustrated.
Product appears only on the brand side.

MOOD
{{energy}} -- confidence and clarity on the brand side, staleness and frustration on the competitor side. The viewer should feel relief looking at the brand column.
```

#### GPT Image 2 Prompt

> Prepend the E+ Safe Zone Block from [[GPT Image 2 Block]] before this prompt.

```
SCENE
Overhead photograph on one continuous surface. The surface is split vertically down the center — left half is a worn, dull, desaturated version of the surface (matte concrete, scuffed countertop, faded paper). Right half is a clean, vibrant surface in the brand's palette. One continuous plane, two treatments. Product sits on the brand (right) side, lower third, shot at 85mm f/1.8 with shallow depth of field. Product uses the uploaded reference photo exactly.

TYPOGRAPHY
Reference the uploaded Brand Spec Card for all font families, weights, and colors.
Comparison headline: headline font, bold, centered across both halves, placed between y=400 and y=520. White or brand primary depending on background contrast.
Column headers: subheading font, semibold, 32-36px. Competitor header on the left at x=150, muted grey (#999999). Brand header on the right at x=580, brand primary color. Both between y=540 and y=580.
Comparison rows: body font, regular, 26-30px. 3-5 rows stacked vertically between y=620 and y=1200, evenly spaced. Competitor rows at x=150 to x=500 in muted grey (#888888). Brand rows at x=580 to x=930 in white or brand text color. Rows align horizontally across columns.
CTA: pill button centered at y=1300 to y=1380, brand accent fill, white text, 30px. "{{cta_text}}".
Brand logo centered at y=1420, per spec card.

COPY TO RENDER
{{comparison_headline}}
{{competitor_column_header}} | {{brand_column_header}}
{{comparison_rows_competitor}} vs {{comparison_rows_brand}}
{{cta_text}}

PRODUCT FIDELITY: Match the uploaded product reference exactly. Do not restyle. Do not swap proportions.
NO ANTI-AI SLIPS: film grain visible, no hyper-smooth surfaces.
NO DASHES OR HYPHENS in rendered copy. Periods only.
```

**Model preference:** GPT Image 2 excels here when the brief leans into textured surface photography (marble, linen, concrete splits). NB2 is stronger when the brief calls for clean graphic design with precise column alignment and many comparison rows.

#### Variation vectors

- **Split direction:** left-right | top-bottom
- **Muting approach:** desaturation | sepia | grey overlay
- **Comparison rows:** 3 | 4 | 5
- **Energy:** clinical confidence | bold challenger | calm authority

---

### Style B: Stack comparison

Rows comparing specific attributes, stacked vertically across the full width. Each row has the competitor value on the left and brand value on the right (or competitor crossed out, brand highlighted). Brand wins on every row -- the stacking creates cumulative impact. More informational than the split; works when the comparison points need more room to breathe.

#### Copy template

- **Comparison headline:** 3-10 words. Frames the comparison or names the switching trigger ("What you're actually getting" / "The difference is in the details" / "Compare and decide").
- **Row labels:** 3-5 attribute names (2-4 words each). Specific categories being compared ("Ingredients," "Testing," "Cost per day," "Clinical backing").
- **Competitor values:** 2-5 words per row. Factual limitation for each attribute.
- **Brand values:** 2-5 words per row. Specific advantage for each attribute.
- **CTA:** 2-4 words, placed at bottom.

#### Image generation prompt

```
Generate a vertical stacked comparison ad, 1080x1920 pixels, 9:16 aspect ratio.

COMPOSITION
{{comparison_headline}} centered between y=290 and y=440, large and bold, spanning x=40 to x=960.
Below the headline, {{row_count}} horizontal comparison rows stacked vertically between y=480 and y=1300, evenly spaced.
Each row spans the full content width (x=40 to x=960) and contains:
  - Row label (the attribute name) at far left, x=40, in a neutral/bold treatment.
  - Competitor value at x=40 to x=480, with a subtle visual suppression (muted text, strikethrough, or X mark).
  - Brand value at x=520 to x=960, with brand accent color highlight or checkmark.
  - A thin horizontal divider line between rows, low opacity.
Product image centered between y=1320 and y=1480, scaled to ~30% of frame width.
CTA button centered at y=1420 to y=1500 (or below product if product is smaller), pill-shaped.
Brand logo at y=1540, centered.

TYPOGRAPHY
Reference the uploaded Brand Spec Card for all font families, weights, and colors.
Comparison headline: headline font, bold, {{headline_size}}px.
Row labels: subheading font, semibold, 28-32px, brand primary or white.
Competitor values: body font, regular, 26-30px, muted grey (#999999). Optional strikethrough treatment.
Brand values: body font, semibold, 26-30px, brand accent color or white with accent background highlight.
CTA: CTA font per spec sheet, 32px.

SAFE ZONES
Top 270px clear of critical content.
Bottom 340px clear.
Left margin 40px.
Right margin 120px from y=600 downward.
Primary content zone: x=40 to x=960, y=270 to y=1580.

COLOR AND TREATMENT
Background: solid brand background color or subtle gradient from spec card.
Competitor values: visually suppressed -- {{muting_approach}} applied to text or a muted background strip behind each competitor cell.
Brand values: bright, confident -- accent color text or accent color pill behind the text.
Row dividers in low-opacity white or grey.
The cumulative effect of every row favoring the brand should feel inevitable, not forced.

BRAND IDENTITY
Logo placement per uploaded Brand Spec Card.
All brand colors from spec card. No improvised colors.

PHOTOGRAPHY DIRECTION
{{photography_direction}} from the brand brief.
Product uses uploaded product photo, photorealistic.

MOOD
{{energy}} -- informational clarity, the data speaks for itself. No aggressive "we're better" energy -- just the facts, arranged so the conclusion is obvious.
```

#### GPT Image 2 Prompt

> Prepend the E+ Safe Zone Block from [[GPT Image 2 Block]] before this prompt.

```
SCENE
Overhead photograph on one continuous surface — clean, minimal, slightly textured (linen, light marble, matte white). The entire frame is one surface. Product sits centered in the lower portion, between y=1300 and y=1480, shot at 85mm f/1.8 with shallow depth of field. Product uses the uploaded reference photo exactly. No split treatment on the surface — the comparison is carried entirely by typography and color treatment on the rows.

TYPOGRAPHY
Reference the uploaded Brand Spec Card for all font families, weights, and colors.
Comparison headline: headline font, bold, centered between y=400 and y=520, x=150 to x=930. White or brand primary depending on background contrast.
Row blocks: {{row_count}} horizontal rows stacked vertically between y=560 and y=1200, evenly spaced. Each row spans x=150 to x=930 and contains:
  - Row label (attribute name) at x=150, subheading font, semibold, 26-30px, brand primary or white.
  - Competitor value at x=150 to x=500, body font, regular, 24-28px, muted grey (#999999). Strikethrough or small X mark preceding the text.
  - Brand value at x=540 to x=930, body font, semibold, 24-28px, brand accent color or white on accent pill background.
  - Thin horizontal divider between rows, low opacity.
CTA: pill button centered at y=1300 to y=1380 (or below product), brand accent fill, white text, 30px. "{{cta_text}}".
Brand logo centered at y=1440, per spec card.

COPY TO RENDER
{{comparison_headline}}
{{row_labels}} — {{competitor_values}} vs {{brand_values}}
{{cta_text}}

PRODUCT FIDELITY: Match the uploaded product reference exactly. Do not restyle. Do not swap proportions.
NO ANTI-AI SLIPS: film grain visible, no hyper-smooth surfaces.
NO DASHES OR HYPHENS in rendered copy. Periods only.
```

**Model preference:** GPT Image 2 works well here when the brief uses 3-4 rows with short values — the photographic surface and product integration feel premium. NB2 is better when the brief has 5 rows or dense text per row, where precise grid alignment matters more than photographic realism.

#### Variation vectors

- **Split direction:** left-right within rows | top-bottom within rows
- **Muting approach:** desaturation | sepia | grey overlay
- **Comparison rows:** 3 | 4 | 5
- **Energy:** informational clarity | bold challenge | clinical authority

---

## Global rules for Us vs Them format

- **Competitor side must be factual.** Never misrepresent the competitor. State real limitations -- exaggeration kills credibility and can trigger compliance issues.
- **Brand side must be specific.** "Better" is not a comparison point. "3rd-party tested" vs "no testing disclosed" is.
- **The visual treatment does the persuasion.** The muting/vibrancy split makes the viewer's eye prefer the brand side before they read a single word. Don't over-rely on copy to carry the comparison -- the design contrast is doing the heavy lifting.
- **Minimum 3 comparison rows, maximum 5.** Fewer than 3 doesn't feel like a real comparison. More than 5 clutters the ad and shrinks text below readable size at 9:16.
- **Column headers must be legible at scroll speed.** The viewer needs to identify which side is which in under a second. Brand name on the brand side, category label or competitor name on the other.
- **Product appears on the brand side only.** Never show competitor product -- legal risk and unnecessary. The brand product anchors the "winner" side.
- **Quality tests:** (1) Cover the competitor column -- does the brand column alone still communicate value? It should. (2) Cover the brand column -- does the competitor column alone feel like a real problem? It should. (3) Read just the headlines of both columns -- is the comparison category clear? (4) Squint test at phone size -- can you tell which side wins from the visual treatment alone?

## Compliance

Copy quality rules: [[Creative Image Ad Criteria]] section "Us vs Them (Comparison)" + [[Headline & Text Hook Criteria]] + [[Universal Copy Rules]]. Comparison claims must also pass brand compliance/guardrails. This template handles rendering only.
