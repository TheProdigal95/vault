# Features & Benefits

**Models supported:** Both — NB2 and GPT Image 2. Model auto-selected per brief content.

## What this format is

Feature callout format with a product hero. Pills and badges highlight individual features or benefits, arranged around or alongside the product. Wins when the brand has concrete, scannable proof points -- ingredients, guarantees, review counts, certifications -- that stack into a compelling case. The product is the visual anchor; the pills are the scannable value layer.

## Styles

### Style A: Product center with radiating callouts

Product dominates the center of the frame. Feature pills radiate outward from the product, with optional leader lines connecting each pill to a relevant area of the product. The composition feels like an exploded diagram -- every feature traces back to the physical product.

#### Copy template

- **Headline:** 3-10 words. Names an experience or benefit, not a feature list. The headline stops the scroll; the pills deliver the proof.
- **Subheading:** Brand name + period + mechanism or differentiator. Under 10 words. "[Brand]. [What makes it different]."
- **Feature pills:** 3-6 pills, 2-5 words each. Each pill starts with the brand name per criteria when applicable. Benefit-forward: what the viewer gets, not what the product has. Specific: "50+ biomarkers" not "comprehensive testing."
- **CTA:** 2-4 words, placed at bottom.

#### Image generation prompt

```
Generate a vertical feature callout ad with centered product, 1080x1920 pixels, 9:16 aspect ratio.

COMPOSITION
Product image centered in the frame, occupying roughly 50-60% of the horizontal space, positioned between y=550 and y=1100. Product is the dominant visual element -- hero scale, photorealistic.
{{headline}} centered between y=290 and y=420, large and bold, spanning x=40 to x=960.
{{subheading}} centered between y=430 and y=480, smaller, brand primary color.
{{pill_count}} feature pills arranged around the product:
  - Pills positioned at varying y-levels between y=600 and y=1200, alternating left side (x=40 to x=350) and right side (x=650 to x=960).
  - Each pill is a {{pill_shape}} with brand accent color fill or outline, containing the pill text in white or brand text color.
  - {{callout_line_style}} connecting each pill to the relevant area of the product (if leader lines selected).
CTA button centered at y=1420 to y=1500, pill-shaped with brand accent color fill and white text reading "{{cta_text}}".
Brand logo at y=1540, centered, per spec sheet placement rules.

TYPOGRAPHY
Reference the uploaded Brand Spec Card for all font families, weights, and colors.
Headline: headline font, bold weight, {{headline_size}}px.
Subheading: subheading font, semibold, 30-34px, brand primary color.
Feature pill text: body font, semibold, 24-28px, white on accent or brand text on light pill.
CTA: CTA font per spec sheet, 32px.

SAFE ZONES
Top 270px clear of critical content (platform UI overlay zone).
Bottom 340px clear (engagement bar, caption preview, navigation).
Left margin 40px.
Right margin 120px from y=600 downward (side engagement buttons).
Primary content zone: x=40 to x=960, y=270 to y=1580.

COLOR AND TREATMENT
Background: clean, uncluttered. Solid brand background color, subtle gradient, or brand-appropriate texture from spec card. Background must not compete with the product or pills for attention.
Product lighting: bright, directional, studio-quality. Product pops against the background.
Feature pills: {{pill_shape}} shapes with brand accent color. Consistent shape and size across all pills. High contrast between pill background and text.

BRAND IDENTITY
Logo placement per uploaded Brand Spec Card.
Brand colors from spec card. No improvised colors.
Feature pills use brand accent color only -- no off-palette highlights.

PHOTOGRAPHY DIRECTION
{{photography_direction}} from the brand brief.
Product representation uses the uploaded product photo -- photorealistic, not illustrated, not flat-lay unless the brand brief specifies.
Product angle and scale: front-facing or 3/4 angle, hero prominence. The product must be immediately recognizable.

MOOD
{{energy}} -- confident product showcase. The pills add information without cluttering the composition. Clean, organized, trustworthy.
```

#### GPT Image 2 Prompt

**Model preference:** Both

Prepend the E+ Safe Zone Block from [[GPT Image 2 Block]] before this prompt.

```
SCENE:
One continuous overhead photograph on a single surface, 1080x1920, 9:16 vertical.
Product centered in frame, hero scale, occupying ~50-60% horizontal width, positioned
between y=550 and y=1100. Shot on 85mm f/1.8 — shallow depth of field, product tack
sharp, background surface softly blurred. Studio lighting, directional, product pops.
{{pill_count}} feature pills arranged around the product between y=550 and y=1200,
alternating left (x=150 to x=350) and right (x=700 to x=930). Each pill is a
{{pill_shape}} with brand accent color fill, containing pill text in white or brand
text color. {{callout_line_style}} connecting pills to product (if leader lines selected).
CTA button centered at y=1420, pill-shaped, brand accent fill, white text.
Brand logo at y=1500, centered, small, per spec card.

TYPOGRAPHY:
Reference uploaded Brand Spec Card for all fonts, weights, colors.
Headline: headline font, bold, large, centered between y=400 and y=520, spanning
x=150 to x=930.
Subheading: subheading font, semibold, 30-34px, brand primary color, centered below
headline.
Feature pill text: body font, semibold, 24-28px.
CTA: CTA font per spec card, 32px.

COPY TO RENDER:
Headline: "{{headline}}"
Subheading: "{{subheading}}"
Pills: {{pill_texts}}
CTA: "{{cta_text}}"

PRODUCT FIDELITY: Match the uploaded product reference exactly. Do not restyle. Do not swap proportions.
NO ANTI-AI SLIPS: film grain visible, no hyper-smooth surfaces.
NO DASHES OR HYPHENS in rendered copy. Periods only.
```

#### Variation vectors

- **Pill shape:** rounded rectangle | circle | tag
- **Callout lines:** leader lines | none | arrows
- **Product prominence:** hero 50%+ of frame | secondary 30%
- **Layout:** centered radial | offset left with pills right | offset right with pills left
- **Energy:** clinical precision | bold confidence | warm approachability

---

### Style B: Horizontal feature strip

Product on one side (left or right), stacked feature pills on the other. The composition has a clear reading direction -- eye goes to the product first, then scans down the pill stack. Works well when pills need more text room or when the product isn't visually complex enough to anchor a radial layout.

#### Copy template

- **Headline:** 3-10 words. Names an experience or benefit.
- **Subheading:** Brand name + period + mechanism or differentiator. Under 10 words.
- **Feature pills:** 3-6 pills, 2-5 words each. Benefit-forward. Stacked vertically with consistent spacing.
- **CTA:** 2-4 words, placed at bottom.

#### Image generation prompt

```
Generate a vertical feature strip ad, 1080x1920 pixels, 9:16 aspect ratio.

COMPOSITION
{{headline}} centered between y=290 and y=420, large and bold, spanning x=40 to x=960.
{{subheading}} centered between y=430 and y=480.
The frame below the headline splits into two zones:
  - Product zone ({{product_side}}, ~45% of width): Product image from y=550 to y=1200, photorealistic, hero scale.
  - Pill zone (opposite side, ~45% of width): {{pill_count}} feature pills stacked vertically from y=550 to y=1200, evenly spaced. Each pill is a {{pill_shape}} with consistent sizing.
CTA button centered at y=1420 to y=1500, pill-shaped.
Brand logo at y=1540, centered.

TYPOGRAPHY
Reference the uploaded Brand Spec Card for all font families, weights, and colors.
Headline: headline font, bold weight, {{headline_size}}px.
Subheading: subheading font, semibold, 30-34px.
Feature pill text: body font, semibold, 24-28px.
CTA: CTA font per spec sheet, 32px.

SAFE ZONES
Top 270px clear of critical content.
Bottom 340px clear.
Left margin 40px.
Right margin 120px from y=600 downward.
Primary content zone: x=40 to x=960, y=270 to y=1580.

COLOR AND TREATMENT
Background: solid brand color or subtle gradient. Clean, minimal.
Product lighting: studio-quality, directional.
Pills: brand accent color fill or outlined, high contrast text. All pills share the same visual treatment.
Clear visual separation between product zone and pill zone -- whitespace or a subtle divider, not a hard border.

BRAND IDENTITY
Logo placement per uploaded Brand Spec Card.
Brand colors from spec card only.

PHOTOGRAPHY DIRECTION
{{photography_direction}} from the brand brief.
Product uses uploaded product photo, photorealistic.

MOOD
{{energy}} -- organized, scannable, informative. The layout feels intentional and clean, not cluttered.
```

#### GPT Image 2 Prompt

**Model preference:** Both

Prepend the E+ Safe Zone Block from [[GPT Image 2 Block]] before this prompt.

```
SCENE:
One continuous overhead photograph on a single surface, 1080x1920, 9:16 vertical.
Frame splits into two zones below the headline. Product zone ({{product_side}}, ~45%
width): product from y=550 to y=1200, hero scale, shot on 85mm f/1.8 — tack sharp
product, creamy bokeh on surface. Pill zone (opposite side, ~45% width): {{pill_count}}
feature pills stacked vertically from y=550 to y=1200, evenly spaced. Each pill is a
{{pill_shape}} with brand accent color fill or outline, consistent sizing. Clear
whitespace separation between zones. CTA button centered at y=1420, pill-shaped.
Brand logo at y=1500, centered, small, per spec card.

TYPOGRAPHY:
Reference uploaded Brand Spec Card for all fonts, weights, colors.
Headline: headline font, bold, large, centered between y=400 and y=520, spanning
x=150 to x=930.
Subheading: subheading font, semibold, 30-34px, centered below headline.
Feature pill text: body font, semibold, 24-28px.
CTA: CTA font per spec card, 32px.

COPY TO RENDER:
Headline: "{{headline}}"
Subheading: "{{subheading}}"
Pills: {{pill_texts}}
CTA: "{{cta_text}}"

PRODUCT FIDELITY: Match the uploaded product reference exactly. Do not restyle. Do not swap proportions.
NO ANTI-AI SLIPS: film grain visible, no hyper-smooth surfaces.
NO DASHES OR HYPHENS in rendered copy. Periods only.
```

#### Variation vectors

- **Pill shape:** rounded rectangle | circle | tag
- **Callout lines:** none (strip layout doesn't use leader lines)
- **Product prominence:** hero 50%+ | secondary 30%
- **Layout:** product left / pills right | product right / pills left
- **Energy:** clinical precision | bold confidence | warm approachability

---

### Style C: Grid layout

Product at the top of the frame, feature pills arranged in a clean grid below. Works when there are 4-6 features and the viewer needs to scan them quickly without visual clutter. The grid gives equal weight to each feature.

#### Copy template

- **Headline:** 3-10 words. Names an experience or benefit.
- **Subheading:** Brand name + period + mechanism or differentiator. Under 10 words.
- **Feature pills:** 4-6 pills, 2-5 words each. Benefit-forward. Arranged in a 2-column or 3-column grid.
- **CTA:** 2-4 words, placed at bottom.

#### Image generation prompt

```
Generate a vertical grid feature ad, 1080x1920 pixels, 9:16 aspect ratio.

COMPOSITION
{{headline}} centered between y=290 and y=400, large and bold.
{{subheading}} centered between y=410 and y=450.
Product image centered between y=480 and y=900, occupying ~40-50% of frame width. Hero scale.
Feature grid below the product, between y=940 and y=1350:
  - {{grid_columns}}-column grid layout (2 columns for 4 pills, 3 columns for 6 pills).
  - Each cell contains a {{pill_shape}} pill with feature text.
  - Grid cells evenly spaced with consistent gutters (~20px between cells).
  - Grid spans x=60 to x=940.
CTA button centered at y=1420 to y=1500, pill-shaped.
Brand logo at y=1540, centered.

TYPOGRAPHY
Reference the uploaded Brand Spec Card for all font families, weights, and colors.
Headline: headline font, bold weight, {{headline_size}}px.
Subheading: subheading font, semibold, 30-34px.
Feature pill text: body font, semibold, 22-26px (slightly smaller to fit grid cells).
CTA: CTA font per spec sheet, 32px.

SAFE ZONES
Top 270px clear of critical content.
Bottom 340px clear.
Left margin 40px.
Right margin 120px from y=600 downward.
Primary content zone: x=40 to x=960, y=270 to y=1580.

COLOR AND TREATMENT
Background: solid brand color, clean.
Grid cells: brand accent color fill or outlined cards with subtle shadow/elevation.
Product lighting: bright, directional, studio-quality.
The grid should feel organized and premium, not like a spreadsheet.

BRAND IDENTITY
Logo placement per uploaded Brand Spec Card.
Brand colors from spec card only.

PHOTOGRAPHY DIRECTION
{{photography_direction}} from the brand brief.
Product uses uploaded product photo, photorealistic.

MOOD
{{energy}} -- organized, trustworthy, comprehensive. The grid says "we've thought of everything" without visual overwhelm.
```

#### GPT Image 2 Prompt

**Model preference:** Both

Prepend the E+ Safe Zone Block from [[GPT Image 2 Block]] before this prompt.

```
SCENE:
One continuous overhead photograph on a single surface, 1080x1920, 9:16 vertical.
Product centered between y=500 and y=900, hero scale, ~40-50% frame width. Shot on
85mm f/1.8 — product tack sharp, surface softly out of focus. Below the product, a
{{grid_columns}}-column grid of feature pills between y=940 and y=1350, spanning
x=150 to x=930. Each cell contains a {{pill_shape}} pill with brand accent color fill.
Grid cells evenly spaced with ~20px gutters. CTA button centered at y=1420,
pill-shaped. Brand logo at y=1500, centered, small, per spec card.

TYPOGRAPHY:
Reference uploaded Brand Spec Card for all fonts, weights, colors.
Headline: headline font, bold, large, centered between y=400 and y=490, spanning
x=150 to x=930.
Subheading: subheading font, semibold, 30-34px, centered below headline.
Feature pill text: body font, semibold, 22-26px.
CTA: CTA font per spec card, 32px.

COPY TO RENDER:
Headline: "{{headline}}"
Subheading: "{{subheading}}"
Pills: {{pill_texts}}
CTA: "{{cta_text}}"

PRODUCT FIDELITY: Match the uploaded product reference exactly. Do not restyle. Do not swap proportions.
NO ANTI-AI SLIPS: film grain visible, no hyper-smooth surfaces.
NO DASHES OR HYPHENS in rendered copy. Periods only.
```

#### Variation vectors

- **Pill shape:** rounded rectangle | circle | tag
- **Callout lines:** none (grid layout doesn't use leader lines)
- **Product prominence:** hero 50%+ | secondary 30%
- **Layout:** 2-column grid | 3-column grid
- **Energy:** clinical precision | bold confidence | warm approachability

---

### Style D: Portrait + Data Fusion

Portrait fills the canvas. Biomarker category pills are scattered around the portrait, connected by a trend line that weaves through the composition. The person IS the visual anchor — no product needed (works for service brands). The pills prove what the service measures; the trend line shows trajectory; the portrait humanizes it. This is the most visually rich F&B variant and the strongest performer in health/wellness verticals.

**Refs:** `References/creative-16.jpeg` (portrait + pills + trend line), `References/creative-2.jpeg` (portrait + feature points on curved arc)

#### Copy Template

```
[HEADLINE] - 3-12 words. Names an experience, transformation, or challenge.
Personal and specific.
[SUBHEADING] - Brand name + differentiator. Under 10 words.
[CATEGORY PILLS] - 5-8 pills, 1-3 words each. Biomarker categories or feature names.
These are not benefits — they are the inventory of what the service covers.
[SOCIAL PROOF BADGE] - Optional. Avatar circles + stars + volume metric.
[CTA] - Optional. 2-5 words.
```

#### Image generation prompt

```
Generate a vertical portrait-as-canvas feature ad, 1080x1920 pixels, 9:16 aspect ratio.

COMPOSITION:
One continuous image filling the entire frame. A close-up editorial portrait fills the
entire canvas as the background. The person is [PERSONA DESCRIPTION] — real, editorial,
warm natural light, soft focus on edges, eye contact. Not a model, not stock. The
portrait IS the ad's visual anchor.

[BRAND LOGO] positioned at top, centered, small, per spec card rules.

{{headline}} centered between y=290 and y=440, large and bold, spanning x=40 to x=960.
Rendered with clear contrast over the portrait — use subtle text shadow or
semi-transparent backdrop if needed.

{{subheading}} centered between y=450 and y=500, at 40-50% of headline weight.

CATEGORY PILLS (see Visual Elements — Scattered Pattern):
{{pill_count}} category pills scattered around the portrait between y=550 and y=1250.
Pills are positioned asymmetrically — not a grid. They alternate sides of the frame
(left zone x=40 to x=350, right zone x=650 to x=960) at varying y-positions. Each
pill is a {{pill_shape}} with brand accent color fill or frosted glass treatment,
containing the category name in white or brand text color, 22-26px.

TREND LINE (see Visual Elements):
A thin line (2-3px, white or brand accent) connecting the pills in a flowing curve
that weaves through the composition. The line passes behind the portrait subject and
connects to 4-6 of the pills with small circular data points (8px dots) at each
connection. The line creates visual cohesion between the scattered pills and implies
trajectory/data.

[If SOCIAL PROOF BADGE present]: Include a SOCIAL PROOF BADGE (see Visual Elements)
positioned near the bottom of the composition, between y=1300 and y=1360.

CTA button centered at y=1420 to y=1500, pill-shaped with brand accent color fill
and white text reading "{{cta_text}}".

TYPOGRAPHY:
Reference the uploaded Brand Spec Card for all font families, weights, and colors.
Headline: headline font, bold. Subheading: semibold, 30-34px. Category pill text:
body font, semibold, 22-26px. Social proof: body font, 18-20px. CTA: 32px.
No text smaller than 18px (exception: social proof volume text).

SAFE ZONES:
Top 270px clear. Bottom 340px clear. Left 40px. Right 120px from y=600 down.
Content zone: x=40 to x=960, y=270 to y=1580.

COLOR AND TREATMENT:
Portrait: warm natural light, editorial quality, soft focus edges. Color grading
editorial, not filtered. Category pills use brand accent color from spec card or
glassmorphism treatment. Trend line in white or brand accent — thin enough to not
compete with the portrait but visible enough to connect the pills.
No improvised colors.

BRAND IDENTITY:
Logo per spec card, small, top center.

PHOTOGRAPHY DIRECTION:
{{photography_direction}} from the brand brief. Editorial close-up portrait. Not
stock, not clinical. The person looks like someone the viewer would recognize from
their own life. Warm, intimate, confident.

MOOD:
{{energy}} — the portrait carries emotional weight, the pills and trend line carry
analytical proof. The combination says "this is about a real person AND real data."

REFERENCE IMAGES:
User will upload brand spec card, visual style card, and a reference ad showing
portrait + scattered pills + trend line (References/creative-16.jpeg).
```

#### GPT Image 2 Prompt

**Model preference:** GPT preferred

Prepend the E+ Safe Zone Block from [[GPT Image 2 Block]] before this prompt.

```
SCENE:
One continuous editorial photograph, 1080x1920, 9:16 vertical. A close-up editorial
portrait fills the entire canvas as the background. The person is [PERSONA DESCRIPTION]
— real, editorial, warm natural light, soft focus on edges, eye contact. Shot on
50mm f/1.4 — environmental portrait depth, subject sharp, background falls away
naturally. Not a model, not stock. The portrait IS the ad's visual anchor.

Brand logo at top, centered, small, per spec card.

{{pill_count}} category pills scattered asymmetrically around the portrait between
y=550 and y=1250. Pills alternate left (x=150 to x=350) and right (x=680 to x=930)
at varying y-positions. Each pill is a {{pill_shape}} with brand accent color fill or
frosted glass treatment, containing category name in white or brand text color. A thin
trend line (2-3px, white or brand accent) connects 4-6 pills in a flowing curve that
weaves through the composition, passing behind the portrait subject. Small circular
data points (8px dots) at each connection.

[If SOCIAL PROOF BADGE present]: badge between y=1300 and y=1360.
CTA button centered at y=1420, pill-shaped, brand accent fill, white text.

TYPOGRAPHY:
Reference uploaded Brand Spec Card for all fonts, weights, colors.
Headline: headline font, bold, large, centered between y=400 and y=520, spanning
x=150 to x=930. Clear contrast over portrait — subtle text shadow or semi-transparent
backdrop if needed.
Subheading: subheading font, semibold, 30-34px, centered below headline.
Category pill text: body font, semibold, 22-26px.
Social proof: body font, 18-20px.
CTA: CTA font per spec card, 32px.

COPY TO RENDER:
Headline: "{{headline}}"
Subheading: "{{subheading}}"
Pills: {{pill_texts}}
CTA: "{{cta_text}}"

PRODUCT FIDELITY: Match the uploaded product reference exactly. Do not restyle. Do not swap proportions.
NO ANTI-AI SLIPS: film grain visible, no hyper-smooth surfaces.
NO DASHES OR HYPHENS in rendered copy. Periods only.
```

#### Variation vectors

- **Pill shape:** frosted glass rounded rectangle | solid accent rounded rectangle | minimal text-only with dot connector
- **Trend line:** single white line | multi-colored parallel lines | arc/curved connector (creative-2 style)
- **Portrait framing:** extreme close-up (face fills frame) | head-and-shoulders | three-quarter
- **Pill count:** 5 | 6 | 8
- **Energy:** warm editorial confidence | clinical precision | aspirational vitality

---

### Style E: Category Inventory

No portrait, no product. A bold statistic or headline dominates the top half. The bottom half displays a scrolling or stacked inventory of categories the service covers. The sheer volume of categories IS the visual argument. A textured or abstract background (cellular, microscopic, gradient) keeps it science-forward without being clinical.

**Refs:** `References/creative-10.jpeg` (99% radial + scrolling pills), `References/creative-15.jpeg` (headline + vertical category list + bubble background)

#### Copy Template

```
[HEADLINE or STAT] - Either a bold statistic with context ("99% of members gain a deeper
understanding") or a short punchy headline ("No red tape. No copays. Just results.").
[SUBHEAD] - Brand mechanism or proof. Under 15 words.
[CATEGORY INVENTORY] - 12-20 category names displayed as scrolling pills or a vertical
list. The volume is the point.
[SOCIAL PROOF BADGE] - Optional.
[CTA] - Optional.
```

#### Image generation prompt

```
Generate a vertical category inventory ad, 1080x1920 pixels, 9:16 aspect ratio.

COMPOSITION:
One continuous image filling the entire frame. Background is {{background_treatment}}
— an abstract or textured surface that feels science-forward but not clinical.

[BRAND LOGO] at top, per spec card rules.

[If STAT style]: A large radial progress indicator or bold numeric stat centered
between y=350 and y=600 (e.g., "99%" in very large type with a circular progress ring
around it). Context text below the stat (e.g., "of members gain a deeper understanding
of their health") in body font, centered.

[If HEADLINE style]: {{headline}} between y=300 and y=550, large and bold with
selective emphasis on the key word. Left-aligned or centered.

{{subheading}} below the headline/stat, between y=600 and y=660.

CATEGORY INVENTORY (see Visual Elements — Scrolling or Vertical List):
[If scrolling pills]: 3-4 horizontal rows of pill-shaped tags between y=700 and
y=1300. Rows extend past the left and right frame edges (implying more categories
than visible). Each pill contains a category name. Rows offset horizontally for visual
variety. Pills use low-opacity fill (frosted glass or muted brand color).

[If vertical list]: Single column of category names on the right side of the
composition (x=550 to x=960), stacked vertically from y=400 to y=1400. List extends
beyond frame top and bottom (scroll implied). Each name in clean body text with subtle
separator.

[If SOCIAL PROOF BADGE present]: Near bottom, per Visual Elements spec.

CTA button centered at y=1420 to y=1500.

TYPOGRAPHY:
Reference brand spec card. Stat/headline: very large, bold. Subhead: 30-34px.
Category names: 20-24px, regular weight. No text smaller than 20px.

SAFE ZONES:
Top 270px clear. Bottom 340px clear. Left 40px. Right 120px from y=600. Content zone:
x=40 to x=960, y=270 to y=1580.

COLOR AND TREATMENT:
Background: {{background_treatment}}. Category pills or list items use muted,
low-contrast treatment — they provide texture and volume, not individual emphasis.
The stat or headline gets full contrast. Overall palette from brand spec card.

MOOD:
{{energy}} — comprehensive authority. The sheer volume of categories communicates
thoroughness. "We test everything" without saying it.

REFERENCE IMAGES:
User will upload brand spec card, visual style card, and a reference ad
(References/creative-10.jpeg for scrolling pills or References/creative-15.jpeg for
vertical list + bubble background).
```

#### GPT Image 2 Prompt

**Model preference:** Both

Prepend the E+ Safe Zone Block from [[GPT Image 2 Block]] before this prompt.

```
SCENE:
One continuous photograph on a single surface, 1080x1920, 9:16 vertical. Background is
{{background_treatment}} — an abstract or textured surface (cellular, microscopic,
gradient) that feels science-forward but not clinical. Shot on 85mm f/1.8 — shallow
depth gives the textured background subtle dimension. No product, no portrait. The
typography and category volume ARE the visual argument.

Brand logo at top, centered, small, per spec card.

[If STAT style]: A large radial progress indicator or bold numeric stat centered
between y=450 and y=600. Context text below the stat in body font, centered.

[If HEADLINE style]: {{headline}} between y=400 and y=550, large and bold with
selective emphasis on the key word.

{{subheading}} below the headline/stat, between y=600 and y=660.

CATEGORY INVENTORY:
[If scrolling pills]: 3-4 horizontal rows of pill-shaped tags between y=700 and
y=1300. Rows extend past left and right frame edges (implying more categories than
visible). Each pill contains a category name. Rows offset horizontally. Pills use
low-opacity fill (frosted glass or muted brand color).

[If vertical list]: Single column of category names on the right (x=550 to x=930),
stacked from y=500 to y=1350. List extends beyond frame top and bottom (scroll
implied). Each name in clean body text with subtle separator.

CTA button centered at y=1420, pill-shaped.

TYPOGRAPHY:
Reference uploaded Brand Spec Card for all fonts, weights, colors.
Stat/headline: very large, bold, within x=150 to x=930.
Subheading: 30-34px.
Category names: 20-24px, regular weight.
CTA: CTA font per spec card, 32px.

COPY TO RENDER:
Headline/Stat: "{{headline}}"
Subheading: "{{subheading}}"
Categories: {{category_texts}}
CTA: "{{cta_text}}"

PRODUCT FIDELITY: Match the uploaded product reference exactly. Do not restyle. Do not swap proportions.
NO ANTI-AI SLIPS: film grain visible, no hyper-smooth surfaces.
NO DASHES OR HYPHENS in rendered copy. Periods only.
```

#### Variation vectors

- **Primary element:** bold statistic with radial indicator | punchy headline
- **Category display:** scrolling pill rows | vertical list | grid
- **Background:** deep blue cellular/microscopic | warm blurred gradient | dark gradient | muted brand color
- **Energy:** comprehensive authority | confrontational directness | calm clinical |

---

## Global rules for Features & Benefits format

- **Every pill must be specific.** "Premium quality" fails. "3rd-party tested" passes. "Better results" fails. "93% saw improvement in 4 weeks" passes. If a pill can apply to any brand in the category, it's too vague.
- **Pill count: minimum 3, maximum 6.** Fewer than 3 doesn't justify the format -- use Headline + Image instead. More than 6 forces text too small for mobile.
- **Feature pills start with brand name when the claim is brand-specific** per Creative Image Ad Criteria. Generic benefits ("Gluten-free") don't need the brand name prefix.
- **Product is always visible.** This format exists to connect features to a physical product. If the product isn't visually prominent, use a different format.
- **Benefit-forward framing over feature-forward.** "Results in days" (benefit) beats "Fast-acting formula" (feature). The pill tells the viewer what they get, not what the product has, whenever possible.
- **No pill should duplicate the headline or subheading.** Each element carries unique information. If the headline says "50+ biomarkers tested," no pill should say "50+ biomarkers."
- **Quality tests:** (1) Read just the pills without the headline -- do they make a compelling case on their own? (2) Read just the headline without the pills -- does it stop the scroll? (3) Count the pills at phone size -- can you read all of them without squinting? (4) Remove any one pill -- does the ad still work? If not, that pill is carrying too much weight.

## Compliance

Copy quality rules: [[Creative Image Ad Criteria]] section "Features & Benefits" + [[Headline & Text Hook Criteria]] + [[Universal Copy Rules]]. Feature claims must pass brand compliance/guardrails. This template handles rendering only.
