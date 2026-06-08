# Testimonial

## What this format is

Social proof format built around a customer quote. The quote is the hero -- everything else (product, branding, imagery) supports the testimony. Wins when the brand has strong VoC language and the viewer needs to hear from someone like them before they'll consider the product. The quote does the selling; the design makes it feel real.

**Models supported:** Both — NB2 and GPT Image 2. Model auto-selected per brief content.

## Styles

### Style A: Quote card

Large quoted text dominates the frame with small attribution below. Product visible but secondary. Clean editorial feel -- the ad looks like a magazine pull-quote, not a designed ad. The restraint is what makes it credible.

#### Copy template

- **Rating display:** Star rating (5 stars) or review stat ("4.8/5" / "10,000+ reviews"). Placed above the quote as a credibility anchor.
- **Testimonial quote:** 15-40 words, verbatim from VoC. Must come from actual customer reviews -- never fabricated, never paraphrased beyond light grammar cleanup. The quote should name a specific experience or transformation, not generic praise. Source from Review Analysis Standout Language bucket or Persona Context Part 2 VoC quotes.
- **Attribution:** First name + one qualifying detail ("Sarah, 47" / "Mike, switched from [competitor]" / "Rachel, 3 months in"). Real first names only.
- **CTA:** 2-4 words, placed at bottom.

#### Image generation prompt

```
Generate a vertical testimonial quote card ad, 1080x1920 pixels, 9:16 aspect ratio.

COMPOSITION
{{rating_display}} centered between y=300 and y=370. Star icons or text stat, prominent but not larger than the quote.
The testimonial quote is the hero element, centered in the frame between y=420 and y=1000. Large text, generous line spacing. The quote occupies the visual center of gravity -- everything else orbits it.
Quotation marks (large, decorative, brand accent color) framing the quote -- opening mark at top-left of quote block, closing mark at bottom-right. Marks are typographic decoration, not part of the text rendering.
{{attribution}} centered below the quote, between y=1020 and y=1070. Smaller text, muted color.
Product image positioned between y=1120 and y=1350, centered, scaled to ~25-30% of frame width. Present but clearly secondary to the quote.
CTA button centered at y=1420 to y=1500, pill-shaped with brand accent color fill.
Brand logo at y=1540, centered, per spec sheet placement rules.

TYPOGRAPHY
Reference the uploaded Brand Spec Card for all font families, weights, and colors.
Rating: body font or icon font, 32-36px, brand accent color for stars, brand primary for text stats.
Testimonial quote: headline font or a serif/editorial font from the brand spec card, {{quote_size}}px. This is the largest text in the ad. Regular or light weight -- the size carries the emphasis, not bold weight.
Attribution: body font, regular, 24-28px, muted grey or secondary brand color.
Quotation marks: decorative, 80-120px, brand accent color, low opacity (40-60%).
CTA: CTA font per spec sheet, 32px.

SAFE ZONES
Top 270px clear of critical content (platform UI overlay zone).
Bottom 340px clear (engagement bar, caption preview, navigation).
Left margin 40px.
Right margin 120px from y=600 downward (side engagement buttons).
Primary content zone: x=40 to x=960, y=270 to y=1580.

COLOR AND TREATMENT
Background: clean, minimal. Solid light or dark brand background color -- the quote text must have high contrast against it. No busy patterns or gradients that compete with the text.
Lighting: if product is visible, soft studio lighting. The overall feel is editorial and restrained.
The ad should feel like a magazine testimonial page, not a designed marketing asset.

BRAND IDENTITY
Logo placement per uploaded Brand Spec Card.
Brand colors from spec card. Accent color used sparingly -- quotation marks and CTA only. The restraint in branding is what makes the testimonial feel authentic.

PHOTOGRAPHY DIRECTION
{{photography_direction}} from the brand brief.
Product uses uploaded product photo, photorealistic but secondary in scale and placement. The product proves "this is real" without overshadowing the human voice.

MOOD
{{energy}} -- authentic, personal, trustworthy. The viewer should feel like they're reading a real person's words, not a marketing message.
```

#### GPT Image 2 Prompt

Model preference: GPT preferred (editorial text rendering, warm surfaces)

```
Prepend the E+ Safe Zone Block from [[GPT Image 2 Block]] before this prompt.

You are generating a social media ad for [BRAND NAME]. Centered editorial testimonial composition.

SCENE: One continuous {{surface}} surface, full-bleed to all four edges. {{product}} sits centered below the attribution, scaled to ~25% of frame width. Soft natural daylight from upper-left. 85mm f/1.8, shallow depth of field, product sharp against creamy bokeh. Generous vertical white space — this is an editorial composition, not a dense one.

TYPOGRAPHY:
- Testimonial quote: brand headline font or editorial serif, {{quote_size}}px, centered between y=450 and y=950. Largest text in the ad. Regular or light weight — size carries emphasis, not bold.
- Decorative quotation marks: brand accent color, 80-120px, 40-60% opacity. Opening mark at top-left of quote block, closing mark at bottom-right.
- {{rating_display}} centered between y=400 and y=440. Star icons or text stat, prominent but smaller than quote.
- Attribution: monospace uppercase, 22-26px, letter-spaced, muted grey, centered at y=970 to y=1010.
- CTA button: pill-shaped, brand accent fill, centered at y=1380 to y=1440.

COPY TO RENDER:
Rating: {{rating_display}}
Opening mark: "
Quote: {{quote}}
Closing mark: "
Attribution: {{attribution_name}} · {{attribution_detail}}
CTA button: {{cta_text}}

PRODUCT PLACEMENT: {{product}} sits elegantly below the attribution as visual proof. Smaller scale than a product-hero layout — the QUOTE is the hero.
PRODUCT FIDELITY: Match the uploaded product reference exactly. Do not restyle. Do not swap proportions.
NO ANTI-AI SLIPS: film grain visible, no hyper-smooth surfaces.
NO DASHES OR HYPHENS in rendered copy. Periods only.
```

#### Variation vectors

- **Quote presentation:** large text centered | card with subtle border | handwritten feel
- **Attribution style:** name only | name + qualifying detail | name + photo silhouette
- **Rating display:** 5 stars | "4.8/5" text | "10,000+ reviews" count
- **Product placement:** subtle background | alongside quote at bottom | absent (quote-only)
- **Energy:** intimate and personal | confident and proven | editorial and clean

---

### Style B: Quote over lifestyle

Quote text overlaid on a lifestyle or context image that matches the testimonial's scenario. The image grounds the quote in a real-world moment -- if the testimonial mentions mornings, the image is a morning scene. If it mentions energy, the image shows activity. The visual and verbal channels reinforce each other.

#### Copy template

- **Rating display:** Star rating or review stat. Placed above the quote.
- **Testimonial quote:** 15-40 words, verbatim from VoC. Source from Review Analysis Standout Language bucket or Persona Context Part 2 VoC quotes.
- **Attribution:** First name + one qualifying detail.
- **CTA:** 2-4 words, placed at bottom.

#### Image generation prompt

```
Generate a vertical testimonial-over-lifestyle ad, 1080x1920 pixels, 9:16 aspect ratio.

COMPOSITION
Full-bleed lifestyle image covering the entire 1080x1920 frame. The image depicts a scene that matches the testimonial's scenario -- {{lifestyle_scene_description}}.
A semi-transparent overlay (dark gradient from bottom, or a frosted card region) between y=700 and y=1400, creating a readable text zone over the lifestyle image.
{{rating_display}} at the top of the text zone, y=720 to y=770.
Testimonial quote centered in the text zone, between y=800 and y=1150. Large, high-contrast text against the overlay.
{{attribution}} below the quote, y=1170 to y=1210.
Product image small, between y=1230 and y=1370, centered, scaled to ~20% of frame width. Anchors the brand without competing with the lifestyle image.
CTA button centered at y=1420 to y=1500, pill-shaped.
Brand logo at y=1540, centered.

TYPOGRAPHY
Reference the uploaded Brand Spec Card for all font families, weights, and colors.
Rating: body font, 30-34px, white or brand accent.
Testimonial quote: headline font, {{quote_size}}px, white. Must be fully legible against the overlay. Drop shadow or text outline if needed for contrast.
Attribution: body font, regular, 24-28px, white at 80% opacity.
CTA: CTA font per spec sheet, 32px.

SAFE ZONES
Top 270px clear of critical content.
Bottom 340px clear.
Left margin 40px.
Right margin 120px from y=600 downward.
Primary content zone: x=40 to x=960, y=270 to y=1580.

COLOR AND TREATMENT
Lifestyle image: warm, natural lighting. Authentic feel -- not stock-photo-perfect. The scene matches the testimonial's emotional context.
Overlay: dark gradient (black at 50-70% opacity) rising from y=1400 to y=700, or a frosted card with brand background color at 85% opacity between y=700 and y=1400.
Product lighting: consistent with the scene.
The testimonial text must be fully readable -- if the overlay isn't providing enough contrast, increase opacity.

BRAND IDENTITY
Logo placement per uploaded Brand Spec Card.
Minimal branding -- the lifestyle image and quote carry the ad. Logo and product are present but not dominant.

PHOTOGRAPHY DIRECTION
{{photography_direction}} from the brand brief.
Lifestyle image: {{lifestyle_scene_description}}. Must visually match the testimonial content. If the quote mentions sleep, the image is a bedroom scene. If it mentions energy, the image shows movement.
Product uses uploaded product photo.

MOOD
{{energy}} -- grounded, real, relatable. The lifestyle image makes the testimonial feel like it happened in the viewer's world.
```

#### GPT Image 2 Prompt

Model preference: GPT preferred (real skin, natural light)

```
Prepend the E+ Safe Zone Block from [[GPT Image 2 Block]] before this prompt.

You are generating a social media ad for [BRAND NAME]. Testimonial quote overlaid on a lifestyle scene.

SCENE: Full-bleed lifestyle photograph filling the entire 1080x1920 frame. {{lifestyle_scene_description}} — warm, natural lighting, authentic feel. 50mm f/1.4, environmental portrait depth. The scene matches the testimonial's emotional context. A semi-transparent dark gradient rises from the bottom third, creating a readable text zone over the lifestyle image.

TYPOGRAPHY:
- {{rating_display}} at y=700 to y=740, centered, white or brand accent, 30-34px.
- Testimonial quote: brand headline font, {{quote_size}}px, white, centered between y=760 and y=1100. Must be fully legible against the overlay. Drop shadow if needed for contrast.
- Attribution: body font, 24-28px, white at 80% opacity, centered at y=1120 to y=1160.
- Product image small, centered at y=1180 to y=1300, ~20% of frame width. Anchors the brand without competing with the scene.
- CTA button: pill-shaped, brand accent fill, centered at y=1380 to y=1440.

COPY TO RENDER:
Rating: {{rating_display}}
Opening mark: "
Quote: {{quote}}
Closing mark: "
Attribution: {{attribution_name}} · {{attribution_detail}}
CTA button: {{cta_text}}

PRODUCT PLACEMENT: {{product}} appears small below the attribution, anchoring the brand. The lifestyle scene and quote are the heroes — the product proves "this is real" without overshadowing.
PRODUCT FIDELITY: Match the uploaded product reference exactly. Do not restyle. Do not swap proportions.
NO ANTI-AI SLIPS: film grain visible, no hyper-smooth surfaces.
NO DASHES OR HYPHENS in rendered copy. Periods only.
```

#### Variation vectors

- **Quote presentation:** white text on dark overlay | text in frosted card | text with drop shadow on image
- **Attribution style:** name only | name + qualifying detail | name + photo silhouette
- **Rating display:** 5 stars | "4.8/5" text | "10,000+ reviews" count
- **Product placement:** small at bottom | absent (lifestyle + quote only) | integrated into scene
- **Energy:** warm and personal | aspirational and bright | calm and grounded

---

### Style C: Star rating with quote

Rating stars prominently displayed above the testimonial text. The stars are the first thing the viewer sees -- they establish credibility before the quote is read. The composition is top-heavy with social proof, grounding everything that follows in "this is verified."

#### Copy template

- **Star rating:** 5 stars, large and prominent. Optionally with a numeric rating ("4.9") or review count ("Based on 10,000+ reviews") directly below.
- **Testimonial quote:** 15-40 words, verbatim from VoC. Source from Review Analysis Standout Language bucket or Persona Context Part 2 VoC quotes.
- **Attribution:** First name + one qualifying detail.
- **CTA:** 2-4 words, placed at bottom.

#### Image generation prompt

```
Generate a vertical star-rating testimonial ad, 1080x1920 pixels, 9:16 aspect ratio.

COMPOSITION
Five large star icons centered between y=300 and y=400. Stars are {{star_color}} (brand accent or gold), 60-80px each, with minimal spacing. These are the hero visual element.
Optional rating text ("{{rating_number}}" or "{{review_count}}") centered at y=420 to y=460, smaller supporting text.
Testimonial quote centered between y=520 and y=1000, large text, generous line spacing.
{{attribution}} centered below the quote, y=1020 to y=1060.
Product image between y=1100 and y=1350, centered, scaled to ~25-30% of frame width.
CTA button centered at y=1420 to y=1500, pill-shaped.
Brand logo at y=1540, centered.

TYPOGRAPHY
Reference the uploaded Brand Spec Card for all font families, weights, and colors.
Star icons: 60-80px, {{star_color}}.
Rating text: body font, semibold, 28-32px, brand primary.
Testimonial quote: headline font, {{quote_size}}px. Second-largest element after the stars.
Attribution: body font, regular, 24-28px, muted color.
CTA: CTA font per spec sheet, 32px.

SAFE ZONES
Top 270px clear of critical content.
Bottom 340px clear.
Left margin 40px.
Right margin 120px from y=600 downward.
Primary content zone: x=40 to x=960, y=270 to y=1580.

COLOR AND TREATMENT
Background: clean, minimal. Solid brand background color.
Stars: {{star_color}} -- gold (#FFD700) or brand accent color. Filled, not outlined.
The stars dominate the top of the frame visually. Everything below them is contextualized by the credibility they establish.
Product lighting: soft, studio-quality.

BRAND IDENTITY
Logo placement per uploaded Brand Spec Card.
Brand colors from spec card.

PHOTOGRAPHY DIRECTION
{{photography_direction}} from the brand brief.
Product uses uploaded product photo, photorealistic.

MOOD
{{energy}} -- proven, trusted, validated. The stars say "thousands of people agree" before the viewer reads a word.
```

#### GPT Image 2 Prompt

Model preference: Both

```
Prepend the E+ Safe Zone Block from [[GPT Image 2 Block]] before this prompt.

You are generating a social media ad for [BRAND NAME]. Star-rating-led testimonial composition.

SCENE: One continuous {{surface}} surface, full-bleed to all four edges. Clean and minimal — solid brand background color. {{product}} sits centered below the quote block, scaled to ~25% of frame width. Soft studio lighting on product. 85mm f/1.8, product sharp. The stars dominate the top of the frame visually — everything below is contextualized by the credibility they establish.

TYPOGRAPHY:
- Five large star icons centered between y=400 and y=480. Stars are {{star_color}} (brand accent or gold), 60-80px each, minimal spacing. These are the hero visual element.
- Optional rating text ("{{rating_number}}" or "{{review_count}}") centered at y=490 to y=520, body font, semibold, 28-32px, brand primary.
- Testimonial quote: brand headline font, {{quote_size}}px, centered between y=560 and y=950. Second-largest element after the stars. Generous line spacing.
- Attribution: body font, 24-28px, muted color, centered at y=970 to y=1010.
- CTA button: pill-shaped, brand accent fill, centered at y=1380 to y=1440.

COPY TO RENDER:
Stars: 5 filled stars, {{star_color}}
Rating text: {{rating_number}} or {{review_count}}
Opening mark: "
Quote: {{quote}}
Closing mark: "
Attribution: {{attribution_name}} · {{attribution_detail}}
CTA button: {{cta_text}}

PRODUCT PLACEMENT: {{product}} sits centered below the attribution as visual proof. The STARS and QUOTE are the heroes — product anchors.
PRODUCT FIDELITY: Match the uploaded product reference exactly. Do not restyle. Do not swap proportions.
NO ANTI-AI SLIPS: film grain visible, no hyper-smooth surfaces.
NO DASHES OR HYPHENS in rendered copy. Periods only.
```

#### Variation vectors

- **Quote presentation:** large text centered | card with border | editorial serif
- **Attribution style:** name only | name + qualifying detail | name + photo silhouette
- **Rating display:** 5 large stars | 5 stars + "4.8/5" | 5 stars + "10,000+ reviews"
- **Product placement:** subtle at bottom | alongside quote | absent
- **Energy:** warm trust | bold social proof | clinical validation

---

### Style D: Portrait + Data-Backed Quote

Dark, editorial portrait with the testimonial quote overlaid as the headline element. A floating biomarker data card provides the quantitative proof behind the qualitative claim. The portrait carries gravitas; the quote carries voice; the data card carries evidence. Three layers working together.

**Refs:** `References/creative-12.jpeg` (athletic portrait + quote + ApoB data card)

#### Copy template

- **Testimonial quote:** 15-35 words, verbatim from VoC. Must name a transformation or state of mind that connects to a measurable biomarker.
- **Biomarker data card:** One specific metric shown in a floating card (biomarker name + value + trend line). The metric should substantiate the quote's claim.
- **Attribution:** First name + one qualifying detail.
- **CTA:** Optional. 2-4 words.

#### Image generation prompt

```
Generate a vertical testimonial ad with data proof, 1080x1920 pixels, 9:16 aspect ratio.

COMPOSITION
One continuous image filling the entire frame. A close-up or three-quarter editorial
portrait fills the canvas as the background. [PERSONA DESCRIPTION] — real, editorial,
dramatic lighting. The portrait is dark and moody — studio or window light with deep
shadows. The person should feel strong and composed. The portrait fills the entire frame.

[BRAND LOGO] at top-left, small, per spec card rules, between y=290 and y=340.

Testimonial quote "{{quote}}" rendered between y=350 and y=650, left-aligned at x=40
to x=700. Large editorial serif or brand headline font, white text. The quote is in
quotation marks and feels like a pull-quote from a magazine profile.

Include a BIOMARKER DATA CARD (see Visual Elements) floating between y=750 and y=1000.
Position the card so it overlaps or sits alongside the portrait's body. The card shows
{{biomarker_name}} at {{value}} {{unit}} with an improving trend line. Glassmorphism
treatment — frosted glass, subtle border, rounded corners.

{{attribution}} below the data card, between y=1050 and y=1100, small text, left-aligned.

[If CTA present]: CTA button at y=1420 to y=1500, pill-shaped.
Brand logo at y=1540 if not placed at top.

TYPOGRAPHY
Reference brand spec card. Quote: headline font or editorial serif, bold, large — the
quote is the primary text element. Quotation marks visible. Data card internals per
Visual Elements spec. Attribution: body font, 22-26px, muted white/grey.

SAFE ZONES
Top 270px clear. Bottom 340px clear. Left 40px. Right 120px from y=600. Content zone:
x=40 to x=960, y=270 to y=1580.

COLOR AND TREATMENT
Portrait: dark, dramatic, editorial. Deep shadows, directional light. The overall image
skews dark — white text pops against it. Data card uses glassmorphism with slight
luminosity to stand out against the dark portrait. No competing visual elements.

MOOD
{{energy}} — gravitas and quiet confidence. The dark portrait + white quote + glowing
data card creates a three-layer hierarchy: emotion, voice, evidence.

REFERENCE IMAGES
User will upload brand spec card, visual style card, and References/creative-12.jpeg.
```

#### GPT Image 2 Prompt

Model preference: GPT preferred (real portraits, dramatic lighting)

```
Prepend the E+ Safe Zone Block from [[GPT Image 2 Block]] before this prompt.

You are generating a social media ad for [BRAND NAME]. Dark editorial portrait with data-backed testimonial overlay.

SCENE: One continuous dark background filling the entire 1080x1920 frame. A close-up or three-quarter editorial portrait fills the canvas — [PERSONA DESCRIPTION], real, editorial, dramatic lighting. Studio or window light with deep shadows. The person should feel strong and composed. 85mm f/1.8, shallow depth of field, portrait sharp against dark background. The overall image skews dark — white text pops against it.

TYPOGRAPHY:
- [BRAND LOGO] at top-left, small, per spec card rules, between y=400 and y=440.
- Testimonial quote: brand headline font or editorial serif, bold, large, white, left-aligned between y=460 and y=700 at x=150 to x=700. The quote is in quotation marks and feels like a pull-quote from a magazine profile.
- Biomarker data card: glassmorphism treatment (frosted glass, subtle border, rounded corners), floating between y=750 and y=980. Shows {{biomarker_name}} at {{value}} {{unit}} with an improving trend line. Slight luminosity to stand out against the dark portrait.
- Attribution: body font, 22-26px, muted white/grey, left-aligned at y=1000 to y=1040.
- CTA button (if present): pill-shaped, brand accent fill, centered at y=1380 to y=1440.

COPY TO RENDER:
Opening mark: "
Quote: {{quote}}
Closing mark: "
Data card label: {{biomarker_name}}
Data card value: {{value}} {{unit}}
Attribution: {{attribution_name}} · {{attribution_detail}}
CTA button: {{cta_text}}

PRODUCT PLACEMENT: No product in this style — the portrait IS the proof. The data card provides quantitative evidence.
PRODUCT FIDELITY: Match the uploaded product reference exactly if product appears in any variation. Do not restyle.
NO ANTI-AI SLIPS: film grain visible, no hyper-smooth surfaces.
NO DASHES OR HYPHENS in rendered copy. Periods only.
```

#### Variation vectors

- **Portrait mood:** dark dramatic | moody window light | low-key studio
- **Quote position:** top-left overlay | center overlay | right-aligned
- **Data card position:** center-right | lower-left | alongside portrait subject
- **Energy:** gravitas and authority | intimate confidence | quiet strength

---

## Global rules for Testimonial format

- **Quotes must be real.** Every testimonial must come from actual customer reviews. Source from the brand's Review Analysis Standout Language bucket or Persona Context Part 2 VoC quotes. Never fabricate, heavily paraphrase, or composite quotes from multiple reviewers. Light grammar cleanup is acceptable; changing the meaning is not.
- **Quote length: 15-40 words.** Under 15 feels thin and untrustworthy. Over 40 becomes a wall of text that won't be read at scroll speed.
- **The quote names a specific experience.** "Great product, highly recommend" is a dead quote. "I stopped waking up at 3 AM after the first week" is alive. Specificity is credibility.
- **Attribution is real and minimal.** First name + one detail that makes the reviewer relatable to the target persona. Never full names. Never fake details.
- **Product is secondary.** In this format, the human voice is the hero. Product appears to anchor the brand but never competes with the quote for visual attention.
- **Rating display is earned.** Only display star ratings or review counts that the brand can actually substantiate. "10,000+ reviews" must be verifiable.
- **VoC pipeline link:** Testimonial quotes flow from the research pipeline. Review Analysis (Standout Language section) and Persona Context Part 2 (VoC Quotes per persona) are the source databases. If neither exists for the brand, flag it -- don't fabricate quotes.
- **Quality tests:** (1) Read the quote in isolation without the brand name visible -- does it describe a specific, believable experience? (2) Does the quote match the target persona's language and pain point? (3) Is the attribution detail relatable to the target persona? (4) Would this quote survive a "is this a real review?" challenge? (5) Does the lifestyle image (Style B) match the scenario described in the quote?

## Compliance

Copy quality rules: [[Creative Image Ad Criteria]] + [[Headline & Text Hook Criteria]] + [[Universal Copy Rules]]. Testimonial claims must pass brand compliance/guardrails -- implied results claims in quotes are still claims. This template handles rendering only.
