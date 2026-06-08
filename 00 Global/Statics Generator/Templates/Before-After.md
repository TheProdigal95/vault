# Before-After

## What this format is

Transformation format that shows the change the product creates. The viewer sees two states -- where they are now and where they could be -- and the contrast does the selling. Wins when the product delivers a visible, tangible, or measurable transformation and the brand can represent that change honestly. The emotional engine is aspiration grounded in proof.

**Models supported:** Both -- NB2 and GPT Image 2. Model auto-selected per brief content.

## Styles

### Style A: Side-by-side

Left is before (muted, less desirable), right is after (vibrant, aspirational). The viewer compares two states simultaneously. The visual treatment disparity makes the "after" side feel like relief. Works for transformations that can be captured in two contrasting images or visual states.

#### Copy template

- **Transformation headline:** 3-10 words naming the change ("What 12 weeks actually looks like" / "Same person. Different protocol." / "Before [Brand]. After [Brand]."). The headline frames the transformation without overpromising.
- **Before label:** 2-5 words identifying the before state ("Week 1" / "Before [Brand]" / "The old way"). Placed on or near the before image.
- **After label:** 2-5 words identifying the after state ("Week 12" / "After [Brand]" / "With [Brand]"). Placed on or near the after image.
- **Timeframe (if applicable):** "Week 1 to Week 12" / "Day 1 to Day 30" / "Before to After." Placed between or below the two states.
- **CTA:** 2-4 words, placed at bottom.

#### Image generation prompt

```
Generate a vertical side-by-side before-after ad, 1080x1920 pixels, 9:16 aspect ratio.

COMPOSITION
{{transformation_headline}} centered between y=290 and y=430, large and bold, spanning x=40 to x=960.
The frame below the headline splits into two columns:
  - Before column (left, x=40 to x=490): before image or visual state from y=480 to y=1100. {{before_label}} overlaid at top of column, y=490 to y=540.
  - After column (right, x=530 to x=960): after image or visual state from y=480 to y=1100. {{after_label}} overlaid at top of column, y=490 to y=540.
A clean divider between columns -- thin vertical line, subtle. Not a jagged edge or decorative separator.
{{timeframe_display}} centered below both columns, between y=1120 and y=1170, if applicable.
Product image centered between y=1200 and y=1370, scaled to ~25% of frame width. Visible in or below the after column area.
CTA button centered at y=1420 to y=1500, pill-shaped with brand accent color fill.
Brand logo at y=1540, centered, per spec sheet placement rules.

TYPOGRAPHY
Reference the uploaded Brand Spec Card for all font families, weights, and colors.
Transformation headline: headline font, bold weight, {{headline_size}}px.
Before label: body font, semibold, 26-30px. Muted color -- white at 70% opacity or grey.
After label: body font, semibold, 26-30px. Brand accent color or bright white.
Timeframe: body font, regular, 24-28px. Neutral color.
CTA: CTA font per spec sheet, 32px.

SAFE ZONES
Top 270px clear of critical content (platform UI overlay zone).
Bottom 340px clear (engagement bar, caption preview, navigation).
Left margin 40px.
Right margin 120px from y=600 downward (side engagement buttons).
Primary content zone: x=40 to x=960, y=270 to y=1580.

COLOR AND TREATMENT
Before column: {{before_treatment}} -- muted, desaturated, or slightly grey-shifted. The before state should feel uncomfortable or stagnant, not ugly. Subtle visual suppression, not heavy-handed.
After column: {{after_treatment}} -- full color, enhanced vibrancy, warm or bright lighting. The after state should feel aspirational and achievable, not unrealistically perfect.
Background behind both columns: solid dark or brand background color, consistent across both sides. The image treatment creates the contrast, not the background.
The transition from before to after should feel like a relief, not a trick.

BRAND IDENTITY
Logo placement per uploaded Brand Spec Card.
Brand colors from spec card. Accent color used on the after side and CTA. Before side uses desaturated versions of brand palette.

PHOTOGRAPHY DIRECTION
{{photography_direction}} from the brand brief.
Before image: {{before_image_description}}. Realistic, relatable, slightly uncomfortable.
After image: {{after_image_description}}. Aspirational but believable. Same subject/context as before, transformed.
Product uses uploaded product photo if visible.

MOOD
{{energy}} -- hopeful transformation. The before side creates recognition ("that's me now"), the after side creates desire ("that's where I want to be"). The contrast is motivating, not shaming.
```

#### GPT Image 2 Prompt

**Model preference:** Both

Prepend the E+ Safe Zone Block from [[GPT Image 2 Block]] before this prompt.

```
SCENE
Overhead photograph on one continuous surface, 1080x1920, 9:16 vertical. The frame splits into two columns below the headline zone. Left column (x=150 to x=510): the "before" state. Right column (x=570 to x=930): the "after" state. A thin vertical divider separates them. Product centered below both columns, scaled to ~25% frame width. Camera: 85mm f/1.8, shallow depth of field on the product, both columns in focus.

{{before_image_description}} fills the left column, muted and desaturated. {{after_image_description}} fills the right column, full color, warm lighting, vibrant. Same subject in both columns, different state. The visual treatment gap does the selling.

TYPOGRAPHY
Reference the uploaded Brand Spec Card for all font families, weights, and colors.
{{transformation_headline}} — headline font, bold, centered between y=400 and y=520, spanning x=150 to x=930.
{{before_label}} — body font, semibold, 26px, white at 70% opacity, top of left column ~y=560.
{{after_label}} — body font, semibold, 26px, brand accent color, top of right column ~y=560.
{{timeframe_display}} — body font, regular, 24px, centered below both columns ~y=1200, if applicable.
CTA — CTA font per spec sheet, 32px, pill button with brand accent fill, centered ~y=1380.
Brand logo centered ~y=1480.

COPY TO RENDER
{{transformation_headline}}
{{before_label}}
{{after_label}}
{{timeframe_display}}
{{cta_text}}

PRODUCT FIDELITY: Match the uploaded product reference exactly. Do not restyle. Do not swap proportions.
NO ANTI-AI SLIPS: film grain visible, no hyper-smooth surfaces.
NO DASHES OR HYPHENS in rendered copy. Periods only.
```

#### Variation vectors

- **Split approach:** left-right | top-bottom | diagonal
- **Before treatment:** muted/grey | slightly desaturated | labeled "before" with no color shift
- **After treatment:** full color | enhanced vibrancy | labeled "after" with slight saturation boost
- **Timeframe display:** specific dates ("Week 1 to Week 12") | general ("Before to After") | implicit via visual
- **Product placement:** visible in after only | visible alongside both | below both columns
- **Energy:** hopeful transformation | dramatic reveal | steady progress

---

### Style B: Timeline

Sequential frames or markers showing progression over time. The viewer sees the journey, not just the endpoints. Works when the transformation is gradual and the intermediate states strengthen the credibility -- "this didn't happen overnight."

#### Copy template

- **Transformation headline:** 3-10 words naming the change or the journey.
- **Timeline markers:** 3-4 time points with labels ("Day 1" / "Week 4" / "Week 8" / "Week 12"). Each marker has 2-5 words describing the state at that point.
- **CTA:** 2-4 words, placed at bottom.

#### Image generation prompt

```
Generate a vertical timeline transformation ad, 1080x1920 pixels, 9:16 aspect ratio.

COMPOSITION
{{transformation_headline}} centered between y=290 and y=420, large and bold, spanning x=40 to x=960.
A vertical timeline running from y=470 to y=1300, centered at x=500. The timeline is a thin vertical line (2-3px, brand accent color or muted grey) connecting {{timeline_point_count}} evenly spaced markers.
Each timeline marker consists of:
  - A circle or dot (16-24px) on the timeline line, brand accent color for later points, muted for earlier points.
  - Time label to the left of the dot (x=60 to x=420): "{{time_label}}" in semibold, 26-30px.
  - State description to the right of the dot (x=540 to x=920): "{{state_description}}" in regular, 24-28px.
  Optional: small thumbnail images (120x120px) at each marker, showing the visual state at that time point. Positioned to the left of the time label or below the state description.
The progression from top (earliest) to bottom (latest) should show visual improvement -- earlier markers muted, later markers vibrant.
Product image between y=1320 and y=1450, centered, ~20-25% of frame width.
CTA button centered at y=1420 to y=1500 (or below product), pill-shaped.
Brand logo at y=1540, centered.

TYPOGRAPHY
Reference the uploaded Brand Spec Card for all font families, weights, and colors.
Transformation headline: headline font, bold weight, {{headline_size}}px.
Time labels: subheading font, semibold, 26-30px. Progress from muted grey (first marker) to brand accent color (final marker).
State descriptions: body font, regular, 24-28px. White or brand text color.
CTA: CTA font per spec sheet, 32px.

SAFE ZONES
Top 270px clear of critical content.
Bottom 340px clear.
Left margin 40px.
Right margin 120px from y=600 downward.
Primary content zone: x=40 to x=960, y=270 to y=1580.

COLOR AND TREATMENT
Background: solid brand background color, clean.
Timeline visual progression: earlier markers are muted (desaturated dots, grey text), later markers gain color and vibrancy. The final marker is full brand accent -- the visual climax.
The gradient of improvement across the timeline should be visible even before reading any text.

BRAND IDENTITY
Logo placement per uploaded Brand Spec Card.
Brand colors from spec card. Accent color intensifies toward the final timeline marker.

PHOTOGRAPHY DIRECTION
{{photography_direction}} from the brand brief.
If using thumbnail images at markers: each thumbnail represents the visual state at that time point, progressing from "before" to "after" across the timeline.
Product uses uploaded product photo.

MOOD
{{energy}} -- progressive hope. Each timeline marker builds credibility. The viewer sees a journey, not a switch -- which makes the transformation feel more achievable.
```

#### GPT Image 2 Prompt

**Model preference:** Both

Prepend the E+ Safe Zone Block from [[GPT Image 2 Block]] before this prompt.

```
SCENE
Overhead photograph on one continuous surface, 1080x1920, 9:16 vertical. A vertical timeline runs down the center of the frame from y=480 to y=1250, rendered as a thin 2px line in brand accent color. {{timeline_point_count}} evenly spaced marker dots sit on the line, progressing from muted (top, earliest) to vibrant (bottom, latest). Each marker has a time label to its left and a state description to its right. Product centered below the timeline. Camera: 85mm f/1.8, product in sharp focus, timeline markers slightly soft.

Earlier markers: desaturated dots, muted grey text. Later markers gain color and vibrancy. Final marker is full brand accent — the visual climax of the journey.

TYPOGRAPHY
Reference the uploaded Brand Spec Card for all font families, weights, and colors.
{{transformation_headline}} — headline font, bold, centered between y=400 and y=500, spanning x=150 to x=930.
Time labels — subheading font, semibold, 26px, left of each marker dot (x=150 to x=430). Color progresses from muted grey (first) to brand accent (final).
State descriptions — body font, regular, 24px, right of each marker dot (x=570 to x=930). White or brand text color.
CTA — CTA font per spec sheet, 32px, pill button with brand accent fill, centered ~y=1380.
Brand logo centered ~y=1480.

COPY TO RENDER
{{transformation_headline}}
{{time_label_1}}: {{state_description_1}}
{{time_label_2}}: {{state_description_2}}
{{time_label_3}}: {{state_description_3}}
{{time_label_4}}: {{state_description_4}}
{{cta_text}}

PRODUCT FIDELITY: Match the uploaded product reference exactly. Do not restyle. Do not swap proportions.
NO ANTI-AI SLIPS: film grain visible, no hyper-smooth surfaces.
NO DASHES OR HYPHENS in rendered copy. Periods only.
```

#### Variation vectors

- **Split approach:** vertical timeline | horizontal timeline (markers left to right)
- **Before treatment:** muted dots and grey text | numbered markers with grey backgrounds | faded thumbnails
- **After treatment:** vibrant dots and accent text | highlighted final marker with glow | full-color final thumbnail
- **Timeframe display:** specific dates | weeks | months | numbered steps
- **Product placement:** at final timeline marker | below timeline | absent
- **Energy:** patient journey | accelerating progress | clinical documentation

---

### Style C: Overlay/reveal

Single frame where the before state is partially visible beneath the after state. A diagonal wipe, gradient transition, or peel-back effect creates the illusion of transformation happening in real time. Works when the two states share the same subject and the reveal creates a dramatic visual moment.

#### Copy template

- **Transformation headline:** 3-10 words naming the change.
- **Before label:** 2-5 words, placed on the visible before portion.
- **After label:** 2-5 words, placed on the after portion.
- **CTA:** 2-4 words, placed at bottom.

#### Image generation prompt

```
Generate a vertical overlay-reveal before-after ad, 1080x1920 pixels, 9:16 aspect ratio.

COMPOSITION
{{transformation_headline}} centered between y=290 and y=420, large and bold, spanning x=40 to x=960.
A single continuous image spanning y=470 to y=1250. The image shows the same subject/scene in two states:
  - The "after" state covers the majority of the frame (60-70%), positioned on the right or bottom.
  - The "before" state is visible on the left or top (30-40%), partially obscured by a {{reveal_type}} transition.
  The transition between states is a clean {{reveal_type}}:
    - Diagonal wipe: a diagonal line from approximately (x=300, y=470) to (x=700, y=1250), with before on the upper-left and after on the lower-right.
    - Gradient blend: a 100-150px blend zone where before fades into after.
    - Peel-back: the after state appears to peel away from the before state at one corner, with a subtle shadow creating depth.
{{before_label}} positioned on the before portion, 26-30px, muted color.
{{after_label}} positioned on the after portion, 26-30px, brand accent color.
Product image between y=1270 and y=1400, centered, ~25% of frame width.
CTA button centered at y=1420 to y=1500, pill-shaped.
Brand logo at y=1540, centered.

TYPOGRAPHY
Reference the uploaded Brand Spec Card for all font families, weights, and colors.
Transformation headline: headline font, bold weight, {{headline_size}}px.
Before label: body font, semibold, 26-30px. White at 80% opacity or muted grey. Positioned within the before region.
After label: body font, semibold, 26-30px. Brand accent color. Positioned within the after region.
CTA: CTA font per spec sheet, 32px.

SAFE ZONES
Top 270px clear of critical content.
Bottom 340px clear.
Left margin 40px.
Right margin 120px from y=600 downward.
Primary content zone: x=40 to x=960, y=270 to y=1580.

COLOR AND TREATMENT
Before region: {{before_treatment}} -- desaturated, muted, slightly darker. Represents the "old" state.
After region: {{after_treatment}} -- full color, vibrant, well-lit. Represents the transformed state.
The transition between regions should feel smooth and intentional. The before state bleeds into the after state -- the transformation is happening, not static.
Background visible at edges: solid brand color.

BRAND IDENTITY
Logo placement per uploaded Brand Spec Card.
Brand colors from spec card.

PHOTOGRAPHY DIRECTION
{{photography_direction}} from the brand brief.
The before and after images must show the same subject in two states. Same angle, same framing, different condition. The reveal only works when the viewer recognizes "same thing, transformed."
Product uses uploaded product photo.

MOOD
{{energy}} -- dramatic reveal. The overlay creates a cinematic moment -- the transformation is caught mid-motion. More emotionally engaging than a static split.
```

#### GPT Image 2 Prompt

**Model preference:** GPT preferred

Prepend the E+ Safe Zone Block from [[GPT Image 2 Block]] before this prompt.

```
SCENE
Single continuous photograph, 1080x1920, 9:16 vertical. One subject shown in two states within the same frame. The "after" state covers 60-70% of the image (right/bottom), the "before" state is visible on the remaining 30-40% (left/top). A {{reveal_type}} transition separates them — diagonal wipe, gradient blend, or peel-back with subtle shadow depth. The transition feels like the transformation is happening in real time. Product centered below the reveal image. Camera: 50mm f/1.4, subject in focus across the full reveal, shallow depth of field on background elements.

Before region: desaturated, muted, slightly darker — the old state. After region: full color, vibrant, well-lit — the transformed state. Same subject, same angle, same framing, different condition.

TYPOGRAPHY
Reference the uploaded Brand Spec Card for all font families, weights, and colors.
{{transformation_headline}} — headline font, bold, centered between y=400 and y=520, spanning x=150 to x=930.
{{before_label}} — body font, semibold, 26px, white at 80% opacity, positioned within the before region ~y=580.
{{after_label}} — body font, semibold, 26px, brand accent color, positioned within the after region ~y=580.
CTA — CTA font per spec sheet, 32px, pill button with brand accent fill, centered ~y=1380.
Brand logo centered ~y=1480.

COPY TO RENDER
{{transformation_headline}}
{{before_label}}
{{after_label}}
{{cta_text}}

PRODUCT FIDELITY: Match the uploaded product reference exactly. Do not restyle. Do not swap proportions.
NO ANTI-AI SLIPS: film grain visible, no hyper-smooth surfaces.
NO DASHES OR HYPHENS in rendered copy. Periods only.
```

#### Variation vectors

- **Split approach:** diagonal wipe | gradient blend | peel-back
- **Before treatment:** muted/grey | slightly desaturated | full color with "before" label only
- **After treatment:** full color | enhanced vibrancy | warm lighting boost
- **Timeframe display:** labels with dates | "before/after" text | implicit via visual difference
- **Product placement:** visible below reveal | integrated into the after region | absent
- **Energy:** dramatic reveal | gentle transformation | clinical documentation

---

## Global rules for Before-After format

- **Transformations must be honest.** This is the highest-compliance-risk format. Every before/after representation must be achievable, realistic, and compliant with the brand's guardrails. No misleading imagery. No impossible transformations. When in doubt, use time-locked framing ("Week 1 vs Week 12") over ambiguous "before/after" -- it sets honest expectations.
- **Same subject, two states.** The before and after must clearly show the same thing transformed. Different subjects being compared is an Us vs Them ad, not a Before-After. The viewer must recognize the continuity.
- **Before is uncomfortable, not shameful.** The before state should create recognition ("that's me right now"), not disgust. Muting and desaturation communicate "less desirable" without degrading. The viewer should want to leave the before state, not feel attacked for being in it.
- **After is aspirational, not unrealistic.** The after state should feel achievable. Over-enhanced vibrancy or impossibly perfect results break credibility and can trigger compliance issues. "Better" beats "perfect."
- **Time-locked framing is preferred.** "Day 1 vs Day 30" is stronger than "Before vs After" because it sets a concrete expectation. It's also safer for compliance -- the timeframe qualifies the claim.
- **Minimum two states, maximum four (timeline).** Side-by-side is always two. Timeline can show 3-4 progression points. More than 4 points shrinks each to illegibility at mobile size.
- **Product appears on the after side or below.** The product is the bridge between the two states. It should be visually associated with the "after" result, not the "before" problem.
- **Quality tests:** (1) Is the transformation honest and achievable per brand compliance? (2) Does the before state create recognition without shame? (3) Does the after state feel aspirational without being unrealistic? (4) Is the timeframe specified when the brand requires it? (5) At phone size, can the viewer identify both states and the direction of change in under 2 seconds? (6) Does the headline name the transformation specifically, not vaguely?

## Compliance

Copy quality rules: [[Creative Image Ad Criteria]] + [[Headline & Text Hook Criteria]] + [[Universal Copy Rules]]. Before-after representations carry the highest compliance risk of any format. Transformation claims MUST pass brand compliance/guardrails. Time-locked framing preferred when brand requires qualified claims. Misleading visual transformations are blocked even if copy is compliant -- the image IS a claim. This template handles rendering only.
