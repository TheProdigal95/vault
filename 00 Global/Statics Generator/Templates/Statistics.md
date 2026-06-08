# Statistics

## What this format is

Data-driven social proof where a statistic or number is the hero visual element. The number replaces the product as the scroll-stop -- its sheer size and visual weight demands attention. Wins when the brand has strong quantitative proof points (clinical results, user survey data, scale metrics) that can be stated in one number and contextualized in one line.

**Models supported:** Both — NB2 and GPT Image 2. Model auto-selected per brief content.

## Styles

### Style A: Single stat hero

One massive number dominates the frame. Everything else -- context line, product, CTA -- exists to support that number. The composition is radically simple: the number is so large it becomes the visual, not just text. Works best with percentages, counts, or time metrics that communicate impact in a single glance.

#### Copy template

- **Stat headline:** The number itself. One value only ("93%" / "10,000+" / "4.8/5" / "14 days"). This is rendered at maximum visual impact -- 2-3x larger than any other text in the ad.
- **Stat context:** 5-15 words explaining what the number means ("of users reported better sleep within 2 weeks" / "5-star reviews and counting"). The context line turns the number from abstract to meaningful.
- **Source attribution:** Study name, survey description, or data source ("Based on a 12-week clinical trial" / "of 2,847 surveyed users"). Every stat must be verifiable.
- **CTA:** 2-4 words, placed at bottom.

#### Image generation prompt

```
Generate a vertical single-stat hero ad, 1080x1920 pixels, 9:16 aspect ratio.

COMPOSITION
The stat number is the hero element. "{{stat_headline}}" centered in the frame, positioned between y=450 and y=850. The number is MASSIVE -- rendered at {{stat_font_size}}px minimum, occupying 50-60% of the frame's vertical real estate in the primary content zone. The number IS the visual.
{{stat_context}} centered below the number, between y=870 and y=960. Smaller text that gives the number meaning.
{{source_attribution}} centered below the context, between y=980 and y=1030. Smallest text, muted color, italicized. Establishes credibility without competing for attention.
Product image between y=1080 and y=1300, centered, scaled to ~20-25% of frame width. Small and secondary -- the number is the hero, not the product.
CTA button centered at y=1420 to y=1500, pill-shaped with brand accent color fill.
Brand logo at y=1540, centered, per spec sheet placement rules.

TYPOGRAPHY
Reference the uploaded Brand Spec Card for all font families, weights, and colors.
Stat headline: headline font, bold or black weight, {{stat_font_size}}px. This must be 2-3x larger than any other text. {{number_color}} -- brand accent color or brand primary, whichever creates the strongest contrast. The number should feel like it's pushing out of the frame.
Stat context: body font, regular, 30-36px, white or brand text color.
Source attribution: body font, regular italic, 22-26px, muted grey or secondary color at 70% opacity.
CTA: CTA font per spec sheet, 32px.

SAFE ZONES
Top 270px clear of critical content (platform UI overlay zone).
Bottom 340px clear (engagement bar, caption preview, navigation).
Left margin 40px.
Right margin 120px from y=600 downward (side engagement buttons).
Primary content zone: x=40 to x=960, y=270 to y=1580.

COLOR AND TREATMENT
Background: solid dark or solid light brand background -- high contrast with the stat number is mandatory. The background exists to make the number pop. No patterns, no gradients, no competing visual elements.
The stat number can have a subtle treatment: slight drop shadow, slight glow in brand accent color, or slight 3D extrusion -- but only if it increases legibility. No decorative effects that distract.
Product lighting: soft, consistent with background mood.

BRAND IDENTITY
Logo placement per uploaded Brand Spec Card.
Brand colors from spec card. The stat number uses brand accent or primary for maximum impact.
No improvised colors.

PHOTOGRAPHY DIRECTION
{{photography_direction}} from the brand brief.
Product uses uploaded product photo, photorealistic but secondary.

MOOD
{{energy}} -- the number speaks for itself. The composition should feel like confidence made visual. No hyperbole in the design -- the restraint of a single number landing hard.
```

#### GPT Image 2 Prompt

Prepend the E+ Safe Zone Block from [[GPT Image 2 Block]] before this prompt.

```
SCENE:
Overhead photograph on a single continuous surface. 85mm f/1.8. One product unit placed small and secondary in the lower third of the safe zone (around y=1200 to y=1400, centered). The surface is clean and uncluttered — the stat number IS the visual, everything else recedes. Soft natural lighting, film grain visible.

TYPOGRAPHY:
Reference the uploaded Brand Spec Card for all font families, weights, and colors.
"{{stat_headline}}" centered in the safe zone between y=500 and y=850. MASSIVE — this number occupies 50-60% of the vertical safe zone. Headline font, bold or black weight. {{number_color}} — brand accent or primary, whichever creates strongest contrast against the surface.
"{{stat_context}}" centered below the number at y=870 to y=950. Body font, regular, smaller. White or brand text color.
"{{source_attribution}}" centered at y=970 to y=1010. Body font, italic, muted grey at 70% opacity. Smallest text.
CTA pill button centered at y=1420 to y=1490. Brand accent fill, CTA font per spec sheet.
Brand logo centered at y=1500, per spec card.

COPY TO RENDER:
- Stat headline: "{{stat_headline}}"
- Stat context: "{{stat_context}}"
- Source attribution: "{{source_attribution}}"
- CTA: "{{cta_text}}"

PRODUCT FIDELITY: Match the uploaded product reference exactly. Do not restyle. Do not swap proportions.
NO ANTI-AI SLIPS: film grain visible, no hyper-smooth surfaces.
NO DASHES OR HYPHENS in rendered copy. Periods only.
```

**Model preference:** Both

#### Variation vectors

- **Number presentation:** percentage | count | ratio | time
- **Number scale:** single stat dominating 50%+ of content zone | single stat with large supporting visual
- **Supporting visual:** product small at bottom | abstract data visualization (bar, circle) | none
- **Color emphasis:** number in accent color | number in primary color | number with gradient treatment
- **Energy:** clinical authority | bold impact | quiet confidence

---

### Style B: Multi-stat layout

Two or three statistics arranged in a visual hierarchy. The primary stat is largest, secondary stats support it. Works when the brand's proof story needs multiple data points to land -- one number for the result, another for the scale, a third for the speed.

#### Copy template

- **Primary stat:** The most impactful number ("93%"). Rendered largest.
- **Primary context:** 5-10 words explaining the primary stat.
- **Secondary stats:** 1-2 additional numbers ("10,000+ users" / "14-day average"). Rendered smaller than primary but still prominent.
- **Secondary contexts:** 3-8 words each explaining the secondary stats.
- **Source attribution:** Study name or data source covering all stats.
- **CTA:** 2-4 words, placed at bottom.

#### Image generation prompt

```
Generate a vertical multi-stat ad, 1080x1920 pixels, 9:16 aspect ratio.

COMPOSITION
Primary stat "{{primary_stat}}" centered between y=350 and y=650, rendered at {{primary_stat_size}}px. This is the largest element.
{{primary_context}} centered below at y=660 to y=720.
{{secondary_stat_count}} secondary stats arranged below the primary, between y=780 and y=1150:
  - If 2 stats: side by side, left stat at x=60 to x=460, right stat at x=540 to x=940.
  - If 1 stat: centered, x=200 to x=800.
  Each secondary stat has the number above and context text below, stacked vertically.
  Secondary stat numbers: {{secondary_stat_size}}px -- smaller than primary but still prominent.
{{source_attribution}} centered at y=1170 to y=1210, small and muted.
Product image between y=1230 and y=1370, centered, ~20% of frame width.
CTA button centered at y=1420 to y=1500, pill-shaped.
Brand logo at y=1540, centered.

TYPOGRAPHY
Reference the uploaded Brand Spec Card for all font families, weights, and colors.
Primary stat: headline font, bold or black weight, {{primary_stat_size}}px. Brand accent color.
Primary context: body font, regular, 30-34px.
Secondary stat numbers: headline font, bold, {{secondary_stat_size}}px. Brand primary color.
Secondary context: body font, regular, 24-28px.
Source attribution: body font, regular italic, 22-26px, muted color.
CTA: CTA font per spec sheet, 32px.

SAFE ZONES
Top 270px clear of critical content.
Bottom 340px clear.
Left margin 40px.
Right margin 120px from y=600 downward.
Primary content zone: x=40 to x=960, y=270 to y=1580.

COLOR AND TREATMENT
Background: solid brand background, high contrast.
Primary stat: largest, brand accent color. Visually dominant.
Secondary stats: brand primary color, clearly subordinate in size but still readable.
The hierarchy must be unambiguous -- no viewer should wonder which stat matters most.

BRAND IDENTITY
Logo placement per uploaded Brand Spec Card.
Brand colors from spec card.

PHOTOGRAPHY DIRECTION
{{photography_direction}} from the brand brief.
Product uses uploaded product photo, photorealistic.

MOOD
{{energy}} -- comprehensive proof. The primary stat lands the headline; the secondaries say "and that's not all." Confident but not cluttered.
```

#### GPT Image 2 Prompt

Prepend the E+ Safe Zone Block from [[GPT Image 2 Block]] before this prompt.

```
SCENE:
Overhead photograph on a single continuous surface. 85mm f/1.8. One product unit placed small in the lower portion of the safe zone (around y=1250 to y=1400, centered). The surface is clean — all visual weight belongs to the numbers. Soft natural lighting, film grain visible.

TYPOGRAPHY:
Reference the uploaded Brand Spec Card for all font families, weights, and colors.
Primary stat "{{primary_stat}}" centered between y=450 and y=700. Headline font, bold or black weight, largest element in the frame. Brand accent color.
"{{primary_context}}" centered below at y=710 to y=770. Body font, regular, 30-34px equivalent.
Secondary stats arranged between y=820 and y=1100:
  - If 2 stats: left stat at x=200 to x=480, right stat at x=600 to x=880. Numbers above, context below, stacked.
  - If 1 stat: centered, x=300 to x=780.
Secondary stat numbers: headline font, bold, clearly smaller than primary. Brand primary color.
Secondary context: body font, regular, 24-28px equivalent.
"{{source_attribution}}" centered at y=1120 to y=1160. Body font, italic, muted grey at 70% opacity.
CTA pill button centered at y=1420 to y=1490. Brand accent fill, CTA font per spec sheet.
Brand logo centered at y=1500, per spec card.

COPY TO RENDER:
- Primary stat: "{{primary_stat}}"
- Primary context: "{{primary_context}}"
- Secondary stat(s): "{{secondary_stats}}"
- Secondary context(s): "{{secondary_contexts}}"
- Source attribution: "{{source_attribution}}"
- CTA: "{{cta_text}}"

PRODUCT FIDELITY: Match the uploaded product reference exactly. Do not restyle. Do not swap proportions.
NO ANTI-AI SLIPS: film grain visible, no hyper-smooth surfaces.
NO DASHES OR HYPHENS in rendered copy. Periods only.
```

**Model preference:** Both

#### Variation vectors

- **Number presentation:** percentage + count | percentage + time | count + ratio
- **Number scale:** 2 stats tiered | 3 stats tiered
- **Supporting visual:** product small | divider lines between stats | stat cards with background fills
- **Color emphasis:** primary in accent, secondary in primary | all in accent with size hierarchy | primary highlighted, secondary muted
- **Energy:** clinical authority | stacking proof | calm comprehensiveness

---

### Style C: Before/after stat

A number comparison showing transformation. Two numbers side by side or stacked with a directional indicator (arrow, "to," percentage change) between them. The contrast between the two numbers tells the transformation story. Works for clinical results, habit changes, before/after measurements.

#### Copy template

- **Before stat:** The starting number ("3 hours" / "68%" / "$200/month"). Rendered in muted treatment.
- **After stat:** The result number ("7 hours" / "94%" / "$49/month"). Rendered in brand accent, larger.
- **Directional indicator:** Arrow, "to" connector, or percentage change between them.
- **Stat context:** 5-15 words framing the transformation ("Average sleep improvement after 4 weeks").
- **Source attribution:** Study name or data source.
- **CTA:** 2-4 words, placed at bottom.

#### Image generation prompt

```
Generate a vertical before-after stat ad, 1080x1920 pixels, 9:16 aspect ratio.

COMPOSITION
Before stat "{{before_stat}}" positioned at left or top of the comparison zone, between y=400 and y=700. Rendered in muted treatment -- smaller or desaturated.
Directional indicator ({{direction_indicator}} -- arrow, "to" text, or percentage change) between the two stats.
After stat "{{after_stat}}" positioned at right or bottom of the comparison zone. Rendered in brand accent color, larger and more vibrant than the before stat.
The comparison zone spans y=400 to y=900, centered horizontally.
  - Side-by-side layout: before at x=60 to x=420, indicator at x=440 to x=560, after at x=580 to x=940.
  - Stacked layout: before centered at y=400-550, indicator at y=560-620, after centered at y=630-800.
{{stat_context}} centered below the comparison at y=920 to y=990.
{{source_attribution}} at y=1010 to y=1050, small and muted.
Product image between y=1100 and y=1350, centered, ~25% of frame width.
CTA button centered at y=1420 to y=1500, pill-shaped.
Brand logo at y=1540, centered.

TYPOGRAPHY
Reference the uploaded Brand Spec Card for all font families, weights, and colors.
Before stat: headline font, regular weight, {{before_stat_size}}px. Muted grey or desaturated brand color.
After stat: headline font, bold or black weight, {{after_stat_size}}px (larger than before). Brand accent color.
Directional indicator: 40-60px, neutral color or brand accent.
Stat context: body font, regular, 28-32px.
Source attribution: body font, regular italic, 22-26px, muted.
CTA: CTA font per spec sheet, 32px.

SAFE ZONES
Top 270px clear of critical content.
Bottom 340px clear.
Left margin 40px.
Right margin 120px from y=600 downward.
Primary content zone: x=40 to x=960, y=270 to y=1580.

COLOR AND TREATMENT
Background: solid brand background, high contrast.
Before stat: visually suppressed -- muted, smaller, desaturated. It represents the "old" state.
After stat: vibrant, larger, brand accent color. It represents the transformation.
The directional indicator connects the two states -- the viewer's eye should travel from before to after naturally.

BRAND IDENTITY
Logo placement per uploaded Brand Spec Card.
Brand colors from spec card.

PHOTOGRAPHY DIRECTION
{{photography_direction}} from the brand brief.
Product uses uploaded product photo, photorealistic.

MOOD
{{energy}} -- transformation proof. The contrast between the two numbers does the persuasion. Clean, clinical, undeniable.
```

#### GPT Image 2 Prompt

Prepend the E+ Safe Zone Block from [[GPT Image 2 Block]] before this prompt.

```
SCENE:
Overhead photograph on a single continuous surface. 85mm f/1.8. One product unit placed small in the lower portion of the safe zone (around y=1200 to y=1400, centered). The surface is clean — the before/after number contrast is the entire visual story. Soft natural lighting, film grain visible.

TYPOGRAPHY:
Reference the uploaded Brand Spec Card for all font families, weights, and colors.
Before stat "{{before_stat}}" positioned in the upper-left of the comparison zone within the safe area.
  - Side-by-side layout: before at x=200 to x=460, centered vertically around y=550 to y=700. Headline font, regular weight. Muted grey or desaturated brand color — visually suppressed.
  - Stacked layout: before centered at y=500 to y=620. Same muted treatment.
Directional indicator ({{direction_indicator}} — arrow, "to" text, or percentage change) between the two stats. 40-60px, neutral or brand accent color.
  - Side-by-side: indicator at x=480 to x=600.
  - Stacked: indicator centered at y=630 to y=680.
After stat "{{after_stat}}" positioned at right or below the indicator. Headline font, bold or black weight, LARGER than the before stat. Brand accent color, vibrant.
  - Side-by-side: after at x=620 to x=880.
  - Stacked: after centered at y=690 to y=850.
"{{stat_context}}" centered below the comparison at y=900 to y=970. Body font, regular, 28-32px equivalent.
"{{source_attribution}}" centered at y=990 to y=1030. Body font, italic, muted grey at 70% opacity.
CTA pill button centered at y=1420 to y=1490. Brand accent fill, CTA font per spec sheet.
Brand logo centered at y=1500, per spec card.

COPY TO RENDER:
- Before stat: "{{before_stat}}"
- After stat: "{{after_stat}}"
- Directional indicator: "{{direction_indicator}}"
- Stat context: "{{stat_context}}"
- Source attribution: "{{source_attribution}}"
- CTA: "{{cta_text}}"

PRODUCT FIDELITY: Match the uploaded product reference exactly. Do not restyle. Do not swap proportions.
NO ANTI-AI SLIPS: film grain visible, no hyper-smooth surfaces.
NO DASHES OR HYPHENS in rendered copy. Periods only.
```

**Model preference:** Both

#### Variation vectors

- **Number presentation:** percentage change | absolute numbers | time comparison | cost comparison
- **Number scale:** side-by-side equal size with treatment difference | after stat 2x larger than before
- **Supporting visual:** product below | before/after visual metaphor (grey to color) | none
- **Color emphasis:** before muted grey, after accent | before desaturated brand, after saturated brand
- **Energy:** clinical transformation | dramatic improvement | steady progress

---

## Global rules for Statistics format

- **Every stat must be verifiable.** Never fabricate numbers. Every statistic must trace to a real source: clinical trial, user survey, verified review count, published study. The source attribution line is mandatory, not optional.
- **Source attribution is always visible.** Even when small and muted, the source must be present in the ad. This is both a credibility requirement and a compliance requirement.
- **The stat number IS the visual.** In this format, the number replaces the product as the hero element. Typography size, weight, and color must make the number the first thing the viewer sees. If the product competes with the number for attention, the product is too large.
- **Number typography: 2-3x larger than any other text.** This is the defining visual characteristic of the format. If the stat doesn't visually dominate, it's a Features & Benefits ad with a number, not a Statistics ad.
- **One stat per concept (Style A).** The single-stat hero works because of focus. Don't dilute it with secondary numbers -- use Style B if the proof story needs multiple data points.
- **Multi-stat hierarchy must be unambiguous (Style B).** The viewer should never wonder which number matters most. Size, color, and position must create a clear primary-secondary-tertiary reading order.
- **Before/after stats must be honest (Style C).** The before number and after number must come from the same measurement, the same population, and the same time frame. Cherry-picking the worst "before" and best "after" from different studies is misleading.
- **Quality tests:** (1) Can the viewer understand the stat in under 2 seconds? If the context line is required to make the number meaningful, the number is wrong. (2) Is the source attribution present and specific? "Based on a study" fails -- "Based on a 12-week clinical trial, n=847" passes. (3) Does the stat match the target persona's pain point? A stat about ingredient purity doesn't help a persona whose pain is cost. (4) At phone size, is the number the first thing the eye hits?

## Compliance

Copy quality rules: [[Creative Image Ad Criteria]] + [[Headline & Text Hook Criteria]] + [[Universal Copy Rules]]. Statistical claims are the highest-risk copy element -- they MUST pass brand compliance/guardrails and be traceable to a specific source document. Claims that cannot be sourced are blocked. This template handles rendering only.
