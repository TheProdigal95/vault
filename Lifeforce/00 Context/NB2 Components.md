# NB2 Brand Components — Lifeforce

Drop-in prompt blocks that reinforce what the Brand Spec Card shows but NB2 inconsistently extracts from the image. Assemble prompts from: **format template + relevant components below + concept-specific copy.**

These exist because NB2 defaults to sans-serif, glassmorphism, stock photography, and cool tones unless the text prompt redundantly enforces the brand's visual language. The spec card provides the direction; these blocks make it stick.

---

## Background: Cellular Organic Texture

Use for: non-portrait concepts (statistics, category inventory, data visualization, typography-dominant layouts).

```
The background is a full-bleed warm cellular organic texture. Close-up microscopic
photography of golden-amber organic cells or molecular structures, softly blurred and
warmly lit. The cells are rounded, translucent, overlapping, in warm amber, golden
brown, and honey tones. This is Lifeforce's signature background treatment: warm
organic cellular imagery that bridges science and humanity. The cellular shapes should
be soft-edged, gently luminous, and slightly out of focus so they function as a
textured surface rather than a literal microscope image. The overall color temperature
is warm golden-brown, like amber glass or honey in sunlight. No cool tones, no grey,
no clinical white.
```

---

## Background: Editorial Portrait

Use for: portrait-driven concepts (testimonial, dismissed woman, lifestyle, persona).

```
One continuous image filling the entire frame. A close-up or three-quarter editorial
portrait fills the entire canvas. [PERSONA DESCRIPTION — age, build, expression,
clothing]. Photographed with warm directional light creating golden skin tones and
amber shadows. Editorial magazine quality — shallow depth of field, warm color
grading, intimate framing. NOT stock photography: no posed shots, no perfect lighting,
no model-perfect features. The person looks specific, real, and like someone the
viewer would recognize from their own life. The color grading is warm throughout:
golden skin tones, amber highlights, warm shadows. Match the photography direction
shown on the Visual Style Card.
```

---

## Background: Lifestyle Context

Use for: concepts showing a person in an environment (home, office, outdoors).

```
Full-bleed editorial photograph of [PERSON DESCRIPTION] in [SETTING]. The photography
style is EDITORIAL MAGAZINE quality — shallow depth of field, warm color grading in
the amber-golden range, natural lighting. This should look like it belongs in a
high-end editorial spread. NOT stock photography — no perfect staging, no catalog
poses, no generic model. The person is mid-action, natural, unposed. The color grading
pushes warm: golden highlights, warm shadows, amber midtones. The photograph fills the
entire canvas.
```

---

## Typography Enforcement

Drop into every prompt. NB2 defaults to sans-serif unless forced.

```
CRITICAL: The headline MUST use Bradford Light serif — a warm editorial serif font
with clearly visible serifs. Look at the uploaded Brand Spec Card for the exact visual
character of this font. It has distinctive serifs, elegant curves, and a literary
quality that distinguishes it from any sans-serif. Match the serif specimens shown on
the spec card. NOT a sans-serif under any circumstances. If the headline comes out in
a sans-serif, the ad fails brand compliance.

Body text, labels, pills, CTA, and all non-headline text use the brand's clean
sans-serif.
```

**Font metadata stripping rule:** Never include font-name + pixel-size specs in the prompt (e.g., "Neue Haas Unica, 18-20px"). NB2 renders these as literal text in the image. Describe fonts by role and relative size instead:
- "the brand's clean sans-serif, small" not "Neue Haas Unica 18px"
- "headline serif, bold, large" not "Bradford Light 48px"
- "very small muted text" not "14px white at 40%"

---

## Pill Treatment

Use for: feature pills, category pills, badge elements.

```
Each pill: rounded rectangle with warm mocha brown fill (#5C4033 from brand palette,
at 75% opacity) and a subtle cream border (1px, #F5F0E8 at 30%). Text in warm cream
(#F5F0E8), the brand's clean sans-serif, semibold. The pills use SOLID warm brown
fills — NOT glassmorphism, NOT transparent, NOT grey. Warm, branded, Lifeforce.
```

---

## Data Card Treatment

Use for: floating biomarker cards, dashboard elements, stat displays.

**Gemini analysis of creative-9 (Function Health runner) — the gold standard:**
Cards are 30-48% frame width (not tiny), 55-70% opaque (clearly visible, not ghostly), with heavy glassmorphism blur. What makes them work as accents isn't invisibility — it's **clustering, layering, and spatial separation**:
- All cards cluster in ONE region (lower-right quadrant) — they never spread across the full frame width
- Cards overlap and layer with depth (one behind another, one cropped by the frame edge)
- The headline owns the LEFT side of the frame; cards own the RIGHT side — they never compete for the same space
- The person's body creates a natural divider between text zone and card zone
- Photography + headline command ~90% of attention; cards command ~10%

The failure mode isn't "cards too big" — it's "cards spread across the frame like a dashboard." When cards are distributed evenly (left card, center card, right card), they become the composition's primary structure. When they're clustered in one corner with layered depth, they feel like a peek into a data world.

```
Glassmorphism cards with frosted-glass blur, clustered in one region of the frame.
Individual cards can be 30-45% of frame width — they don't need to be tiny. Opacity
is moderate: 55-70% opaque with strong background blur, so the scene shows through
but the card content is clearly readable. No visible border — edges defined by
contrast against the blurred background. Rounded corners (15-20px). Subtle soft
drop shadow for minimal depth.

CRITICAL — CLUSTERING AND LAYERING:
All cards cluster together in ONE quadrant of the frame (typically lower-right when
the headline is on the left). They overlap each other with layered depth — one card
partially behind another, one card's edge cropped by the frame. This creates a
"floating interface" feel, like the viewer is peeking into a data layer.

NEVER distribute cards evenly across the bottom of the frame. Never place one card
on the left and one on the right. The headline zone and the card zone are SEPARATE
spatial regions with the portrait subject as the natural divider.

Card internals: label + value only. Two text elements max per card. No sub-labels,
no units on a separate line, no trend arrows. The card's message should be readable
in one glance: "Testosterone +35%" not "Testosterone / +35% / from baseline at 55%".
```

**Do NOT:** Distribute cards across the full frame width. Don't arrange them in rows or grids. Don't give them more than 2 text lines. Don't position them in the headline zone. Don't make them "ghostly" at 10% opacity — they should be readable with glassmorphism blur, not invisible.

---

## Color Palette

Full hex reference. Name colors descriptively AND by hex — NB2 needs both.

```
The palette is built from Lifeforce's brand colors as shown on the spec card:
- Warm mocha brown (#5C4033) — pill fills, accents, CTA option 1
- Warm cream (#F5F0E8) — text highlights, borders, pill text
- Warm teal (#5B8C7A) — data points, CTA option 2, checkmarks
- Warm gold (#D4A952) — stars, rating displays
- Warm terracotta (#C4553A) — "out of range" indicators, X marks
- White — headline text, body text on dark backgrounds
- NO cool blues, no greys, no neutral tones. Every element is warm.
```

---

## CTA Button

Two options depending on emphasis:

```
Option A (primary — warm teal):
"[CTA TEXT] →" in warm cream text (#F5F0E8), the brand's clean sans-serif, semibold,
inside a pill-shaped rounded rectangle with warm teal fill (#5B8C7A).

Option B (secondary — warm brown):
"[CTA TEXT] →" in warm cream text (#F5F0E8), the brand's clean sans-serif, semibold,
inside a pill-shaped rounded rectangle with warm mocha brown fill (#5C4033).
```

---

## Social Proof Badge

```
Three small circular avatar thumbnails (diverse adults, slightly overlapping) followed
by five small gold stars (#D4A952) and "[PROOF METRIC]" in the brand's clean
sans-serif, white at 70-80%.
```

Proof metrics from approved copy: "50,000+ Telehealth Visits" | "85% feel better in 3 months" | "4.3/5 on Trustpilot"

---

## Safe Zones

Standard across all 9:16 formats:

```
Top 270px clear of critical content (platform UI overlay zone).
Bottom 340px clear (engagement bar, caption preview, navigation).
Left margin 40px.
Right margin 120px from y=600 downward (side engagement buttons).
Primary content zone: x=40 to x=960, y=270 to y=1580.
```

---

## Composition Complexity Rules

Learned from T002 generation passes — NB2's rendering limits:

1. **Max 5-6 distinct text elements per image.** Beyond that, text rendering degrades (word repeats, size inconsistencies, layout breaks). Count: logo + headline + subheading + pills + CTA = 5. Adding data card labels + source attribution + social proof pushes past the limit.

2. **No text smaller than 20px equivalent.** NB2 renders anything below this as illegible smudges. Source attributions, date labels on trend lines, and sub-labels on comparison rows all fall below this threshold. If a text element won't be readable at phone scroll speed, don't include it.

3. **Favor visual hierarchy over information density.** The strongest Lifeforce images have one hero visual (portrait or cellular texture) + one hero text element (headline or stat) + a few supporting elements (pills, CTA). Formats that require many small precise elements (Us vs Them comparison rows, data dashboards with trend lines) produce weaker results.

4. **Generate 4 variants minimum.** Expect 1-2 to have text rendering issues (word repeats, markdown leaks, layout breaks). This is normal NB2 variance, not a prompt problem.

---

## Prompt Assembly Checklist

When writing an NB2 prompt for Lifeforce:

1. Pick a format template from `00 Global/Statics Generator/Templates/`
2. Choose the right background component (cellular, portrait, or lifestyle)
3. Drop in Typography Enforcement (every prompt, no exceptions)
4. Drop in Pill Treatment if the format has pills/badges
5. Drop in Data Card Treatment if the format has floating cards
6. Drop in Color Palette (every prompt)
7. Drop in CTA Button (every prompt)
8. Drop in Safe Zones (every prompt)
9. Add concept-specific copy (headline, pills text, CTA text, persona description)
10. Check composition complexity — cut any element that won't be readable at phone size
11. Strip any font metadata (font-name + pixel-size combinations)
12. Reference images: always upload Brand Spec Card + Visual Style Card. Third slot: a prior successful Lifeforce output in the same format if available.
