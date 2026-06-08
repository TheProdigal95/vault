# Headline

Rendering spec for the most common static ad format: a single dominant headline carries the entire message, and the visual and headline work as equal partners -- neither makes sense without the other.

**Models supported:** Both -- NB2 and GPT Image 2. Model auto-selected per brief content.

**Copy quality rules:** [[Creative Image Ad Criteria]] + [[Headline & Text Hook Criteria]] + [[Universal Copy Rules]]. This template handles rendering only.

**Prompt assembly:** Every prompt must include all items from the Prompt Assembly Checklist in [[Overview]].

**Scoring gate:** Copy must pass all 7 scoring dimensions at 90+ before generation. See `00 Global/Statics Generator/Scoring Agents/` -- especially Copy Editor (veto power).

---

## Styles

### Style A: Product Hero with Headline

The product commands the frame. The headline gives the viewer a reason to care.

**Model preference:** Both -- GPT for editorial brands, NB2 for product-discipline brands

#### Copy Template

```
[HEADLINE] - 3-12 words. One core idea. Must work as a standalone statement.
[SUBHEAD] - Optional. 5-15 words. Adds a new dimension: proof, specificity, or urgency. Must not repeat the headline.
[CTA] - Optional. 2-5 words.
```

#### Strategic Inputs

```
[BRAND NAME]
[PRODUCT NAME]
[PERSONA from Creative Strategy Matrix] - pain-trigger persona, never demographic-named
[AWARENESS STAGE] - Unaware / Problem-Aware / Solution-Aware / Product-Aware / Most-Aware
[THREE SELVES target] - Actual Self / Ideal Self / Ought Self
[PHOTOGRAPHY DIRECTION from brand brief]
```

#### NB2 Image Generation Prompt

```
Create a static ad for [BRAND NAME]'s [PRODUCT NAME]. 1080x1920, 9:16 vertical.

COMPOSITION:
One continuous image filling the entire frame. The brand's product from the uploaded
product reference image is the visual hero, positioned [PRODUCT POSITION from variation
selection] and occupying roughly 40-60% of the visual frame. The product should be
beautifully lit and accurately represented.

The headline "[HEADLINE]" is rendered as the dominant text element, positioned
[TEXT POSITION from variation selection]. The headline and the product should feel like
they're in conversation -- the headline explains what the product delivers, and the
product proves the headline is real.

[If SUBHEAD present]: Render "[SUBHEAD]" directly below or near the headline at roughly
40-50% of the headline's visual weight.

[If CTA present]: Render "[CTA]" styled per the brand spec sheet's CTA treatment rules
near the bottom of the primary content zone.

TYPOGRAPHY:
Reference the uploaded brand spec card for all fonts, weights, and colors. The headline
should use the brand's headline font at a size that balances with the product. No text
smaller than 24px equivalent. Sufficient contrast between text and background.

SAFE ZONES:
Top 270px clear (platform UI: status bar, app header, profile info).
Bottom 340px clear (engagement bar, caption preview, navigation).
Left margin 40px clear.
Right margin 120px clear from y=600 down (side engagement buttons).
Primary content zone: x=40 to x=960, y=270 to y=1580. All critical content -- headline,
subhead, product, CTA -- must land inside this zone.

COLOR AND TREATMENT:
Background should use colors from the brand spec card. The product and headline both need
clear contrast against the background. [BACKGROUND from variation selection]. Lighting
should be [LIGHTING from variation selection]. No improvised colors -- palette from spec
card only.

BRAND IDENTITY:
Logo per brand spec sheet rules (optional). Placement per spec card.

PHOTOGRAPHY DIRECTION:
[PHOTOGRAPHY DIRECTION from brand brief]. The product must look premium and desirable.
Use the uploaded product photo as the reference -- photorealistic representation, not
stylized.

MOOD:
[ENERGY from variation selection].

REFERENCE IMAGES:
User will upload brand spec card, visual style card, and product photo.
```

#### GPT Image 2 Prompt

Prepend the E+ Safe Zone Block from [[GPT Image 2 Block]] before this prompt.

```
You are generating a social media ad for [BRAND NAME]. Render all copy directly in the image using brand typography from the uploaded brand spec card.

SCENE: One continuous 1080x1920 frame. [BRAND NAME]'s [PRODUCT NAME] from the uploaded product reference is the visual hero, positioned [PRODUCT POSITION from variation selection], occupying 40-60% of the visual frame. Shot on 85mm f/1.8, shallow depth of field. [BACKGROUND from variation selection]. Lighting: [LIGHTING from variation selection]. The product and headline are in conversation -- the headline explains what the product delivers, the product proves it.

TYPOGRAPHY:
- Headline: Brand headline font from spec card. Dominant text element, positioned [TEXT POSITION from variation selection]. Balances with the product in scale.
- Subhead (if present): Below or near headline, 40-50% of headline weight. Brand body font.
- CTA (if present): Per brand spec card CTA treatment, near bottom of content zone.

COPY TO RENDER (literal, no labels):
Headline: [HEADLINE]
Sub-headline: [SUBHEAD, if present]
CTA button: [CTA, if present]

PRODUCT FIDELITY: Match the uploaded product reference exactly. Do not restyle. Do not swap proportions.
NO ANTI-AI SLIPS: film grain visible, no hyper-smooth surfaces.
NO DASHES OR HYPHENS in rendered copy. Periods only.
```

#### Variation Vectors

| Vector | Options |
|---|---|
| Product position | center with headline above / left side with headline right / bottom half with headline top / angled-dynamic positioning / flat lay from above |
| Text position | top third of primary content zone / overlaid on a clean area / bottom third above CTA / centered vertically beside product |
| Background | solid brand color / lifestyle context related to persona / clean white-neutral surface / textured surface / environmental setting |
| Lighting | soft natural light / studio lighting clean / warm golden hour / bright and even / dramatic with contrast |
| Energy | confident and direct / warm and inviting / bold and attention-grabbing / premium and restrained / playful and energetic |

---

### Style B: Lifestyle Context with Headline

A person or scene using/experiencing the product. The headline provides meaning. The viewer sees their life (or aspiration) first, then reads the headline to understand why it matters.

**Model preference:** GPT preferred (real skin, natural light)

#### Copy Template

```
[HEADLINE] - 3-12 words. One core idea. Must pass the "photograph test": reading this
headline, you should picture the exact person it's for.
[SUBHEAD] - Optional. 5-15 words. Adds proof, specificity, or urgency. Must not repeat
the headline.
[CTA] - Optional. 2-5 words.
```

#### Strategic Inputs

```
[BRAND NAME]
[PRODUCT NAME]
[PERSONA from Creative Strategy Matrix] - pain-trigger persona, never demographic-named
[AWARENESS STAGE] - Unaware / Problem-Aware / Solution-Aware / Product-Aware / Most-Aware
[THREE SELVES target] - Actual Self / Ideal Self / Ought Self
[PHOTOGRAPHY DIRECTION from brand brief]
```

#### NB2 Image Generation Prompt

```
Create a static ad for [BRAND NAME]'s [PRODUCT NAME]. 1080x1920, 9:16 vertical.

COMPOSITION:
One continuous image filling the entire frame. The scene shows [SCENE CONTEXT from
variation selection] -- a moment the persona recognizes as their life or aspiration. The
product is present naturally within the scene (not floating, not staged awkwardly). The
scene should feel candid and real, not stock photography.

The headline "[HEADLINE]" is rendered as the dominant text overlay, positioned
[TEXT POSITION from variation selection] in a calm area of the image with clear contrast.
The headline gives the scene its meaning -- without the headline, the image is just a
moment; with the headline, it becomes a statement.

[If SUBHEAD present]: Render "[SUBHEAD]" directly below or near the headline at roughly
40-50% of the headline's visual weight.

[If CTA present]: Render "[CTA]" styled per the brand spec sheet's CTA treatment rules
near the bottom of the primary content zone.

TYPOGRAPHY:
Reference the uploaded brand spec card for all fonts, weights, and colors. The headline
should use the brand's headline font at a size that commands attention while leaving the
scene visible. No text smaller than 24px equivalent. Sufficient contrast between text and
background -- use a subtle text shadow or semi-transparent backdrop if the scene is busy.

SAFE ZONES:
Top 270px clear (platform UI: status bar, app header, profile info).
Bottom 340px clear (engagement bar, caption preview, navigation).
Left margin 40px clear.
Right margin 120px clear from y=600 down (side engagement buttons).
Primary content zone: x=40 to x=960, y=270 to y=1580. All critical content -- headline,
subhead, CTA -- must land inside this zone.

COLOR AND TREATMENT:
Scene colors should feel natural to the context. Any overlay text needs strong contrast
against the scene. Lighting should be [LIGHTING from variation selection]. Color grading
should feel editorial, not filtered.

BRAND IDENTITY:
Logo per brand spec sheet rules (optional). Placement per spec card.

PHOTOGRAPHY DIRECTION:
[PHOTOGRAPHY DIRECTION from brand brief]. The scene should feel aspirational but
believable -- not a perfume ad, not a stock photo. The person (if present) should look
like the persona, not a model.

MOOD:
[ENERGY from variation selection].

REFERENCE IMAGES:
User will upload brand spec card, visual style card, and product photo.
```

#### GPT Image 2 Prompt

Prepend the E+ Safe Zone Block from [[GPT Image 2 Block]] before this prompt.

```
You are generating a social media ad for [BRAND NAME]. Render all copy directly in the image using brand typography from the uploaded brand spec card.

SCENE: One continuous 1080x1920 frame. A lifestyle photograph showing [SCENE CONTEXT from variation selection] -- a moment the persona recognizes as their life or aspiration. The product is present naturally within the scene. Shot on 50mm f/1.4, natural light. The scene feels candid and editorial, not stock photography. Person (if present) looks like the persona, not a model. Lighting: [LIGHTING from variation selection].

TYPOGRAPHY:
- Headline: Brand headline font from spec card. Dominant text overlay, positioned [TEXT POSITION from variation selection] in a calm area with clear contrast. Use subtle text shadow or semi-transparent backdrop if the scene is busy.
- Subhead (if present): Below or near headline, 40-50% of headline weight. Brand body font.
- CTA (if present): Per brand spec card CTA treatment, near bottom of content zone.

COPY TO RENDER (literal, no labels):
Headline: [HEADLINE]
Sub-headline: [SUBHEAD, if present]
CTA button: [CTA, if present]

PRODUCT FIDELITY: Match the uploaded product reference exactly. Do not restyle. Do not swap proportions.
NO ANTI-AI SLIPS: film grain visible, no hyper-smooth surfaces.
NO DASHES OR HYPHENS in rendered copy. Periods only.
```

#### Variation Vectors

| Vector | Options |
|---|---|
| Text position | top third with scene below / bottom third with scene above / left-aligned with scene right / centered overlay on calm area |
| Scene context | morning routine / outdoor activity / social setting / quiet personal moment / work environment |
| Lighting | soft natural light / warm golden hour / bright daylight / moody window light / overcast even |
| Energy | confident and direct / warm and inviting / calm and grounded / aspirational and bright / intimate and personal |

---

### Style C: Typography-Dominant

Minimal or no imagery. The headline IS the creative. Words at scale are the visual. This style works when the copy is powerful enough to stop the scroll alone -- punchy, rhythmic, undeniable.

**Model preference:** GPT preferred (superior text rendering)

#### Copy Template

```
[HEADLINE] - 3-10 words. Must be powerful enough to be the entire visual. Short, punchy,
rhythmic. This headline carries the whole ad -- no image to help.
[CTA] - Optional. 2-5 words.
```

#### Strategic Inputs

```
[BRAND NAME]
[PRODUCT NAME]
[PERSONA from Creative Strategy Matrix] - pain-trigger persona, never demographic-named
[AWARENESS STAGE] - Unaware / Problem-Aware / Solution-Aware / Product-Aware / Most-Aware
[THREE SELVES target] - Actual Self / Ideal Self / Ought Self
```

#### NB2 Image Generation Prompt

```
Create a static ad for [BRAND NAME]'s [PRODUCT NAME]. 1080x1920, 9:16 vertical.

COMPOSITION:
One continuous image filling the entire frame. The headline "[HEADLINE]" is the visual
centerpiece, occupying the center of the primary content zone at maximum scale. Typography
IS the creative -- the words are the visual statement.

[PRODUCT TREATMENT from variation selection]: The product [appears small in the corner /
sits below the headline / is absent / is integrated subtly into the background]. The
headline dominates; the product is secondary or absent.

[If CTA present]: Render "[CTA]" styled per the brand spec sheet's CTA treatment rules
near the bottom of the primary content zone.

TYPOGRAPHY:
Reference the uploaded brand spec card for all fonts, weights, and colors. The headline
uses [TYPE TREATMENT from variation selection]. The type treatment is the creative
decision -- it replaces imagery as the visual interest. No text smaller than 24px
equivalent.

SAFE ZONES:
Top 270px clear (platform UI: status bar, app header, profile info).
Bottom 340px clear (engagement bar, caption preview, navigation).
Left margin 40px clear.
Right margin 120px clear from y=600 down (side engagement buttons).
Primary content zone: x=40 to x=960, y=270 to y=1580. The headline must land inside this
zone and command it.

COLOR AND TREATMENT:
[BACKGROUND from variation selection]. The background exists to serve the type -- maximum
contrast, maximum readability. No competing visual elements.

BRAND IDENTITY:
Logo per brand spec sheet rules (optional). Placement per spec card.

MOOD:
[ENERGY from variation selection].

REFERENCE IMAGES:
User will upload brand spec card and visual style card. Product photo optional depending
on product treatment selection.
```

#### GPT Image 2 Prompt

Prepend the E+ Safe Zone Block from [[GPT Image 2 Block]] before this prompt.

```
You are generating a social media ad for [BRAND NAME]. Render all copy directly in the image using brand typography from the uploaded brand spec card.

SCENE: One continuous 1080x1920 frame. [BACKGROUND from variation selection]. No imagery -- typography IS the visual. The headline "[HEADLINE]" occupies the center of the frame at maximum scale. [PRODUCT TREATMENT from variation selection]: the product [appears small in the corner / sits below the headline / is absent / is integrated subtly into the background].

TYPOGRAPHY:
- Headline: Brand headline font from spec card. [TYPE TREATMENT from variation selection]. The type treatment is the creative decision -- it replaces imagery as the visual interest. Maximum scale, maximum contrast.
- CTA (if present): Per brand spec card CTA treatment, near bottom of content zone.

COPY TO RENDER (literal, no labels):
Headline: [HEADLINE]
CTA button: [CTA, if present]

PRODUCT FIDELITY: Match the uploaded product reference exactly. Do not restyle. Do not swap proportions.
NO ANTI-AI SLIPS: film grain visible, no hyper-smooth surfaces.
NO DASHES OR HYPHENS in rendered copy. Periods only.
```

#### Variation Vectors

| Vector | Options |
|---|---|
| Product treatment | small corner placement / below headline / absent / integrated into background texture |
| Type treatment | all caps bold / mixed emphasis (key word highlighted) / stacked line-by-line / single line at max width |
| Background | solid primary brand color / accent brand color / black / white / textured-subtle pattern |
| Energy | confident and direct / stark and confrontational / warm and conversational / premium and restrained / urgent and bold |

---

### Style D: Data Visualization + Headline

The headline makes the claim; a floating biomarker data card proves it. Dark or moody blurred background keeps the focus on typography and data. No lifestyle scene, no product hero — just the statement and its evidence. Works when the headline names a specific metric or health insight that can be visualized as a data point.

**Model preference:** Both

**Refs:** `References/creative-8.jpeg` (ApoB card on dark bg), `References/creative-11.jpeg` (hs-CRP card + timeline on warm bg)

#### Copy Template

```
[HEADLINE] - 3-12 words. Names a measurable insight or challenge. Must pair with the
data card — the headline creates the question, the data card shows the answer.
One or two words receive SELECTIVE EMPHASIS (see Visual Elements) — bold italic or
accent color on the key concept word.
[SUBHEAD] - Optional. 5-15 words. Adds proof or mechanism.
[FEATURE LIST] - Optional. 2-3 short statements stacked vertically below the data card.
Each under 5 words. Benefit-forward.
[CTA] - Optional. 2-5 words.
```

#### NB2 Image Generation Prompt

```
Create a static ad for [BRAND NAME]'s [PRODUCT NAME]. 1080x1920, 9:16 vertical.

COMPOSITION:
One continuous image filling the entire frame. The background is [BACKGROUND from
variation selection] — no product hero, no lifestyle scene. The background exists to
give the headline and data card maximum contrast and breathing room.

[BRAND LOGO] positioned at top of composition per brand spec card, small, between
y=290 and y=340.

The headline "[HEADLINE]" is rendered large and bold between y=360 and y=600, spanning
x=40 to x=960. The word "[EMPHASIS WORD]" receives selective emphasis treatment — bold
italic or brand accent color while the rest of the headline is bold regular. The
headline is the dominant text element.

Include a BIOMARKER DATA CARD (see Visual Elements) floating between y=650 and y=900,
centered horizontally. The card shows [BIOMARKER NAME] at [VALUE] [UNIT] with a
[TRAJECTORY] trend line. The card uses glassmorphism treatment — frosted glass,
background blur, subtle border, rounded corners. It should feel like a UI element
layered on top of the background with depth.

[If FEATURE LIST present]: 2-3 short text lines stacked vertically between y=1000 and
y=1200, centered. Each line uses selective emphasis on the key word — bold or italic on
the operative word. Clean, editorial spacing between lines.

[If SUBHEAD present]: Render "[SUBHEAD]" between y=1220 and y=1280 at roughly 40-50%
of the headline's visual weight.

[If CTA present]: Render "[CTA]" styled per brand spec sheet's CTA treatment rules
near the bottom of the primary content zone.

TYPOGRAPHY:
Reference the uploaded brand spec card for all fonts, weights, and colors. Headline
uses the brand's headline font. The selective emphasis word uses bold italic or accent
color. Feature list uses body font with individual word emphasis. No text smaller than
24px equivalent.

SAFE ZONES:
Top 270px clear. Bottom 340px clear. Left margin 40px. Right margin 120px from y=600
down. Primary content zone: x=40 to x=960, y=270 to y=1580.

COLOR AND TREATMENT:
Background: [BACKGROUND from variation selection]. Dark or muted backgrounds work best
for this style — the data card's glassmorphism effect needs contrast. No busy patterns
or competing visual elements. Subtle gradient or texture is fine.

BRAND IDENTITY:
Logo per brand spec sheet, small, positioned at top.

MOOD:
[ENERGY from variation selection]. Data-driven confidence. The headline challenges,
the data card proves.

REFERENCE IMAGES:
User will upload brand spec card, visual style card, and optionally a reference ad
showing the data card + headline composition (References/creative-8.jpeg or
References/creative-11.jpeg).
```

#### GPT Image 2 Prompt

Prepend the E+ Safe Zone Block from [[GPT Image 2 Block]] before this prompt.

```
You are generating a social media ad for [BRAND NAME]. Render all copy directly in the image using brand typography from the uploaded brand spec card.

SCENE: One continuous 1080x1920 frame. [BACKGROUND from variation selection] -- no product hero, no lifestyle scene. The background provides maximum contrast and breathing room for the headline and data card. Shot on 85mm f/1.8, shallow depth of field on the background texture. [BRAND LOGO] small at top of composition.

TYPOGRAPHY:
- Headline: Brand headline font from spec card, large and bold. The word "[EMPHASIS WORD]" receives selective emphasis -- bold italic or brand accent color, rest of headline is bold regular.
- Feature list (if present): Brand body font with individual word emphasis (bold or italic on the operative word). Clean editorial spacing.
- Subhead (if present): 40-50% of headline weight. Brand body font.
- CTA (if present): Per brand spec card CTA treatment, near bottom of content zone.

COPY TO RENDER (literal, no labels):
Headline: [HEADLINE]
Data card: [BIOMARKER NAME] at [VALUE] [UNIT] with [TRAJECTORY] trend line. Glassmorphism treatment -- frosted glass, background blur, subtle border, rounded corners. Floating with depth.
Feature callouts: [FEATURE 1] / [FEATURE 2] / [FEATURE 3, if present]
Sub-headline: [SUBHEAD, if present]
CTA button: [CTA, if present]

PRODUCT FIDELITY: Match the uploaded product reference exactly. Do not restyle. Do not swap proportions.
NO ANTI-AI SLIPS: film grain visible, no hyper-smooth surfaces.
NO DASHES OR HYPHENS in rendered copy. Periods only.
```

#### Variation Vectors

| Vector | Options |
|---|---|
| Background | dark gradient / warm blurred tones / muted grey / deep brand color / soft bokeh |
| Data card biomarker | brand-relevant metric (ApoB, testosterone, hematocrit, biological age, cortisol) |
| Data card trajectory | improving (line going down for bad markers, up for good) / flagged (out of range) |
| Feature list | present with 2-3 items / absent |
| Energy | clinical authority / warm confidence / stark confrontation / premium restraint |

---

### Style E: Lifestyle + UI Cards

A lifestyle scene establishes context. Floating glassmorphism UI cards show data points from the product's interface. The headline frames why the data matters. The viewer sees their life first, then discovers the data layer that could transform it. Works when the product has a visual interface (app, dashboard) worth showcasing without making it a pure screenshot ad.

**Model preference:** Both

**Refs:** `References/creative-9.jpeg` (runner + steps/bio age cards), `References/creative-13.jpeg` (couple + UI card grid), `References/creative-14.jpeg` (woman + flowing data lines)

#### Copy Template

```
[HEADLINE] - 3-12 words. Names the gap between what the viewer tracks now and what
they could track. The headline should make the UI cards feel like a revelation, not
a feature list.
[SUBHEAD] - Optional. 5-15 words. Brand positioning or mechanism.
[CTA] - Optional. 2-5 words.
```

#### NB2 Image Generation Prompt

```
Create a static ad for [BRAND NAME]'s [PRODUCT NAME]. 1080x1920, 9:16 vertical.

COMPOSITION:
One continuous image filling the entire frame. The background is a lifestyle photograph
showing [SCENE CONTEXT from variation selection]. The scene should feel candid and real
— not stock photography. The scene fills the entire canvas at full bleed.

[BRAND LOGO] positioned at top-left, small, between y=290 and x=40.

The headline "[HEADLINE]" is rendered large and bold, positioned [TEXT POSITION from
variation selection]. The headline should contrast clearly against the lifestyle
background — use text shadow or a semi-transparent backdrop if the scene is busy.

[UI CARD CLUSTER]: 2-4 glassmorphism cards (see Visual Elements — Glassmorphism Card)
floating over the lifestyle scene. Cards are scattered at varying positions with slight
size variation and optional subtle rotation (1-3 degrees). Each card shows one data
point:
- Card 1: [DATA POINT 1] (e.g., biomarker name + value, or metric + number)
- Card 2: [DATA POINT 2]
- Card 3: [DATA POINT 3] (optional)
- Card 4: [DATA POINT 4] (optional)

Cards should feel like they are floating above the scene with depth. They peek into the
product's data world without being a full screenshot. Position them in the lower half
of the composition (y=700 to y=1300) so they don't compete with the headline.

[If flowing data lines instead of cards]: 2-3 colored lines flowing horizontally across
the composition with category labels at intervals (e.g., "Heart", "Thyroid",
"Hormones"). Lines have a gentle sine-wave shape and subtle color differentiation.

[If SUBHEAD present]: Below headline at 40-50% weight.

[If CTA present]: Near bottom of primary content zone.

TYPOGRAPHY:
Reference brand spec card. Headline: headline font, bold. Data inside UI cards: body
font, clean, readable. No text smaller than 24px.

SAFE ZONES:
Top 270px clear. Bottom 340px clear. Left 40px. Right 120px from y=600. Content zone:
x=40 to x=960, y=270 to y=1580.

COLOR AND TREATMENT:
Scene colors natural. UI cards use glassmorphism — semi-transparent with background
blur, subtle white border, rounded corners. Cards should feel premium and tech-forward,
not clinical. The scene provides warmth; the cards provide precision.

BRAND IDENTITY:
Logo per spec sheet, small, top positioning.

PHOTOGRAPHY DIRECTION:
[PHOTOGRAPHY DIRECTION from brand brief]. Scene should feel aspirational but
believable. Person (if present) matches persona — not a model.

MOOD:
[ENERGY from variation selection]. The lifestyle scene grounds the viewer in reality;
the floating UI cards reveal the data layer beneath. Curiosity and possibility.

REFERENCE IMAGES:
User will upload brand spec card, visual style card, and a reference ad showing the
lifestyle + UI card composition (References/creative-9.jpeg or
References/creative-14.jpeg).
```

#### GPT Image 2 Prompt

Prepend the E+ Safe Zone Block from [[GPT Image 2 Block]] before this prompt.

```
You are generating a social media ad for [BRAND NAME]. Render all copy directly in the image using brand typography from the uploaded brand spec card.

SCENE: One continuous 1080x1920 frame. A lifestyle photograph showing [SCENE CONTEXT from variation selection] -- candid, editorial, not stock photography. The scene fills the entire canvas at full bleed. Shot on 50mm f/1.4, natural light. Person (if present) matches the persona, not a model. Lighting: [LIGHTING from variation selection]. [BRAND LOGO] small at top-left.

2-4 glassmorphism UI cards float over the lifestyle scene in the lower half (y=700 to y=1300). Each card shows one data point from the product's interface. Cards are scattered with slight size variation and optional subtle rotation (1-3 degrees). Semi-transparent with background blur, subtle white border, rounded corners. They feel like a data layer hovering above reality.

[If flowing data lines instead of cards]: 2-3 colored lines flowing horizontally across the composition with category labels at intervals. Gentle sine-wave shape, subtle color differentiation.

TYPOGRAPHY:
- Headline: Brand headline font from spec card, large and bold, positioned [TEXT POSITION from variation selection]. Clear contrast against the lifestyle background -- use text shadow or semi-transparent backdrop if the scene is busy.
- Subhead (if present): Below headline, 40-50% weight. Brand body font.
- CTA (if present): Per brand spec card CTA treatment, near bottom of content zone.
- Data inside UI cards: Brand body font, clean, readable.

COPY TO RENDER (literal, no labels):
Headline: [HEADLINE]
Card 1: [DATA POINT 1]
Card 2: [DATA POINT 2]
Card 3: [DATA POINT 3, if present]
Card 4: [DATA POINT 4, if present]
Sub-headline: [SUBHEAD, if present]
CTA button: [CTA, if present]

PRODUCT FIDELITY: Match the uploaded product reference exactly. Do not restyle. Do not swap proportions.
NO ANTI-AI SLIPS: film grain visible, no hyper-smooth surfaces.
NO DASHES OR HYPHENS in rendered copy. Periods only.
```

#### Variation Vectors

| Vector | Options |
|---|---|
| Text position | top-left aligned / top centered / bottom-left aligned |
| Scene context | morning routine / outdoor activity / at-home relaxed / work environment / fitness |
| UI card style | glassmorphism cards / flowing data lines / hybrid (cards + connecting line) |
| Card count | 2 / 3 / 4 |
| Energy | curious and inviting / warm and grounded / tech-forward and confident / aspirational |

---

## Global Rules

### Visual-Headline Coherence (CRITICAL)

The single most important quality gate for this format. Two tests, both must pass:

1. **Cover the headline.** Does the image hint at the same idea?
2. **Cover the image.** Does the headline conjure a visual that matches?

If both yes, the ad has coherence. If either fails, the ad is two unrelated pieces sharing a frame. This test applies before any other evaluation. A beautiful image with a mismatched headline is worse than an average image with a coherent one.

### Scoring Gate

Copy must pass all 7 scoring dimensions at 90+ before generation. See `00 Global/Statics Generator/Scoring Agents/` -- especially Copy Editor, which holds veto power over the entire pipeline. Grammar, spelling, punctuation, banned characters (no em dashes), number consistency, duplicate content, word count compliance, brand name capitalization.

### Price Is Not a Default Element

Price appears only when the offer is the concept (e.g., "$49/month" as the hook for a price-anchoring angle). When price is not the concept, omit it. The ad earns the click through the headline and visual, not through the price.

### Fewer Elements by Default

Every element must justify its presence. Default to headline + product + background. Add subhead only if it carries a genuinely new dimension. Add CTA only if the offer demands it. Add feature pills only if the format calls for them. An ad with 3 strong elements outperforms one with 6 diluted ones.

### What to Avoid

- Generic headlines that could apply to any brand in the category
- Product and headline fighting for visual dominance (one leads, the other supports)
- Text placed over busy or detailed areas of the image
- Subheads that repeat or rephrase the headline instead of adding new information
- Generic lifestyle imagery (smiling person holding product, white background product float)
- Product on dark background without clear visual separation (product disappears)
- Improvised colors not from the brand spec card
- Text smaller than 24px equivalent
- Critical content outside the primary content zone (x=40 to x=960, y=270 to y=1580)

## Compliance

Copy quality rules: [[Creative Image Ad Criteria]] + [[Headline & Text Hook Criteria]] + [[Universal Copy Rules]]. This template handles rendering only.
