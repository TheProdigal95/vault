# Visual Elements Library

Shared rendering specs for recurring visual elements across format templates. When a template references an element from this file, NB2 gets the same rendering instructions regardless of format.

**Source:** Extracted from Function Health, Juniper, and other health/wellness competitor ads in `00 Global/Statics Generator/References/`.

---

## Biomarker Data Card

A floating card showing a single biomarker reading. Appears over portraits, lifestyle scenes, or dark backgrounds.

**Refs:** creative-9.jpeg (Steps/Sleep/Bio Age cards — 30-48% frame width, 55-70% opaque, clustered in lower-right, layered with depth, one cropped by frame edge), creative-8.jpeg (ApoB 97, centered — works when the card IS the hero concept), creative-12.jpeg (ApoB 82, alongside portrait)

**Key insight from Gemini analysis of creative-9:** Cards aren't small or ghostly. They're 30-48% frame width and clearly visible (55-70% opaque). What makes them feel like accents is **clustering, layering, and spatial separation** — all cards occupy ONE quadrant (lower-right), overlap each other with depth, and never compete with the headline which owns the opposite side. The person's body naturally divides headline zone from card zone.

```
BIOMARKER DATA CARD (accent scale — default):
Glassmorphism card with frosted-glass blur. Can be 30-45% of frame width — doesn't
need to be tiny. 55-70% opaque with strong background blur (scene shows through but
content is clearly readable). No visible border — edges defined by contrast against
blurred background. Rounded corners (15-20px). Subtle soft drop shadow.

Inside the card — 2 elements max:
- Biomarker name in small text (e.g., "ApoB")
- Value in bold (e.g., "82")
No units on a separate line, no status indicator, no trend line, no date labels.

CRITICAL — CLUSTER, DON'T DISTRIBUTE:
All cards cluster in ONE quadrant (typically lower-right). They overlap and layer
with depth — one card behind another, one card cropped by the frame edge. The
headline occupies the opposite side. Never distribute cards evenly across the
frame width (left-center-right = dashboard, not accent).

BIOMARKER DATA CARD (hero scale — Statistics/Data Viz formats only):
When the card IS the primary visual (no portrait, no lifestyle photo competing),
it can be larger (40-50% of frame width) with more internal detail: name, value,
unit, status indicator, and optional trend line.
```

---

## Trend Line

A connected data-point line that weaves through the composition, separate from a data card. Used to show trajectory or progress over time. Can carry category labels at each node.

**Refs:** creative-16.jpeg (biomarker pills along trend line), creative-11.jpeg (timeline 2025-2027), creative-14.jpeg (flowing colored lines)

```
TREND LINE:
A thin line (2-3px) connecting 4-6 circular data points (8-10px dots) across the
composition. The line flows organically -- not a rigid chart, but a gentle curve that
integrates with the layout.

Each data point can optionally carry a label (category name, date, or value) in a small
pill or plain text positioned near the dot.

Styles:
- Monochrome: single color (white or brand accent) on dark backgrounds
- Multi-line: 2-3 colored lines flowing in parallel (each representing a different
  biomarker category), with subtle color differentiation
- Timeline: dots positioned along an implied x-axis with date labels below

The trend line should feel like a data visualization integrated into the ad's visual
language, not a chart pasted on top.
```

---

## Category Pills (Scrolling / Scattered)

Biomarker or feature category labels displayed as a visual inventory. Shows breadth and comprehensiveness. Two rendering patterns.

**Refs:** creative-10.jpeg (scrolling rows at bottom), creative-15.jpeg (vertical list, right column), creative-16.jpeg (scattered around portrait)

```
CATEGORY PILLS — SCROLLING PATTERN:
Multiple horizontal rows of pill-shaped tags extending past the frame edges (implying
there are more than visible). Each pill contains a category name in 18-22px text.
Pills have a subtle background (frosted glass, low-opacity white, or muted brand color).
Rows are offset horizontally for visual interest. 3-4 rows, 4-6 visible pills per row.
Example categories: "Thyroid", "Heavy Metals", "Nutrients", "Metabolic", "Heart",
"Autoimmunity", "Liver", "Hormones", "Cancer Signals", "Biological Age"

CATEGORY PILLS — SCATTERED PATTERN:
Individual pills positioned at varying locations around a central element (portrait or
headline). Not a grid -- asymmetric placement with varying y-positions. Connected to the
central element by thin lines, trend line, or proximity. 5-8 visible pills.

CATEGORY PILLS — VERTICAL LIST:
Single column of category names on one side of the composition, stacked vertically with
consistent spacing. Each name in clean body text, possibly with subtle underline or
separator. The list extends beyond the frame top and bottom (scroll implied). 12-20 items
visible.
```

---

## Social Proof Badge

Compact trust indicator combining avatar circles, star rating, and volume metric.

**Refs:** creative-10.jpeg, creative-14.jpeg, creative-15.jpeg, creative-16.jpeg

```
SOCIAL PROOF BADGE:
A compact horizontal strip, approximately 300x50px equivalent. Contains:
- 3-4 overlapping circular avatar photos (32px each, overlapping by ~10px)
- Five-star rating (filled stars in gold/amber, 16px each)
- Volume text: "[X]M+ [metric]" in small semibold text (e.g., "5M+ Biomarkers Tested",
  "10M+ Tests Completed")

Positioned near the bottom of the primary content zone, left-aligned or centered.
The badge is subtle -- it provides credibility without competing with the headline or
primary visual. Treat it as a footer element.
```

---

## Glassmorphism / Frosted Card Treatment

Floating UI elements that look like translucent interface cards layered over the background.

**Refs:** creative-9.jpeg (Steps/Sleep/Bio Age cards — 30-48% frame width, 55-70% opaque, clustered in lower-right quadrant with layered depth), creative-13.jpeg (multiple UI cards over lifestyle photo)

**Key insight from Gemini analysis of creative-9:** Cards are NOT ghostly or barely-there. They're clearly visible (55-70% opaque) and moderately sized (30-48% frame width). What makes them feel like accents is **spatial clustering and layered depth**: all cards occupy one quadrant, overlap each other, and one is cropped by the frame edge. The headline owns the opposite side of the frame. The person's body naturally divides headline zone from card zone. Photography + headline command ~90% of attention; cards command ~10% — not because they're invisible, but because they're contained in one region.

```
GLASSMORPHISM CARD:
Semi-transparent card with:
- Background blur (significant blur on content behind the card — frosted glass)
- 55-70% opaque (clearly readable, scene shows through but doesn't compete)
- No visible border — edges defined by contrast against blurred background
- Rounded corners (15-20px radius)
- Subtle soft drop shadow for minimal depth

SCALE: Individual cards can be 30-45% of frame width. They don't need to be tiny.
Readability matters more than smallness.

CLUSTERING (CRITICAL):
All cards cluster in ONE quadrant of the frame (typically lower-right when headline
is left-aligned). Cards overlap and layer with depth — one card partially behind
another, one card's edge cropped by the frame. This creates a "floating interface"
feel. NEVER distribute cards evenly across the frame (left-center-right = dashboard).

CONTENT: 2 text elements per card max (label + value). No sub-labels, no units,
no trend lines inside cards at accent scale.

Multiple cards: varying sizes (not all the same), layered with overlapping depth,
one partially cropped by frame edge. 2-4 cards maximum.
```

---

## Selective Typography Emphasis

Headline treatment where one or two key words receive different styling for visual punch.

**Refs:** creative-8.jpeg ("manage" in bold), creative-9.jpeg ("steps" and "biology" in italic/bold), creative-15.jpeg ("results" in italic)

```
SELECTIVE EMPHASIS:
Within the headline text, one or two words receive a different typographic treatment:
- Bold italic on the emphasis word while the rest is bold regular
- Different color on the emphasis word (brand accent) while the rest is white/primary
- Underline or highlight treatment on the emphasis word

The emphasis word should be the emotional or conceptual anchor of the headline -- the word
that carries the most meaning or creates the most tension.

Apply sparingly. One emphasis per headline maximum. The contrast draws the eye to the
key concept.
```

---

## Usage in Templates

When a format template calls for one of these elements, reference it by name:

```
Include a BIOMARKER DATA CARD (see Visual Elements) floating at [position],
showing [biomarker name] at [value] [unit] with a [improving/declining] trend line.
```

Templates should specify position, which element, and any content-specific values. The rendering specs above handle the visual treatment.
