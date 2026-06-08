# Comfort Ortho Wear Design System

## Core Identity

**Brand voice:** Clinical warmth. Confident, direct, never desperate. The visual language says "this shoe solves your problem" — not "please buy our shoe."

### Colors
- **Navy (Primary text):** #1B2A4A
- **Purple (Product accent):** The shoe's perforated dot panels ARE the purple — let the product provide the color pop
- **Red (Urgency only):** #D32F2F — sale badges, Memorial Day banners. Never for body text.
- **Cream (Background):** #F5F2F3 — warm, not sterile
- **White (Background):** #FFFFFF — for typographic-led layouts
- **Lavender (Gradient accent):** Subtle lilac wash, never solid — adds warmth without clutter

### Typography
- **Headline:** Bold condensed sans-serif, all-caps, dark navy. Should feel massive and confident.
- **Subheadline:** Lighter weight, grey (#666666), smaller. Always the opposite visual weight from headline.
- **Body/Benefits:** Clean sans-serif. Purple plus (+) markers for benefit lists.
- **CTA:** Navy rounded button, white text. Or white button on dark backgrounds.

## Product — Ortho Stretch Cushion Shoes

**What the shoe actually looks like (CRITICAL for AI generation):**
- Low-cut athletic silhouette — NOT a sock-style slip-on, NOT high-collar
- Elastic bungee laces at the top — NOT laceless, NOT traditional tied laces
- **Distinctive perforated dot panels on the side mesh in PURPLE** — small round holes/dots pattern. This is the shoe's most recognizable visual feature.
- Black breathable mesh upper
- Chunky WHITE platform sole with dense EVA cushion (NO visible air bubble — sole is solid, not air-based)
- Pull tab at the back heel
- No visible brand markings on the shoe itself

**Reference images:** `00 Assets/Product Photos/ortho-stretch-cushion-shoes-black-purple-584202_800x800.png` (lifestyle, on feet) and `ortho-stretch-cushion-shoes-black-purple-563908.png` (clean product shot). Always upload both as GPT Image 2 references.

**Hero colorway:** Black/Purple (the purple dots are the accent)
**Other colorways:** Midnight Black, White Blue, Grey Pink, Black Sky Blue

**Styling:** 3/4 view, floating with soft drop shadow. Give the shoe PLENTY of space — it should sit in open air, never crammed.

## Composition Philosophy

**The winning formula:** Correct product refs + editorial restraint + one subtle color/texture touch.

### What works
- **Generous negative space** — 80px+ margins, wide gaps between elements. Nothing touches edges. Every element breathes.
- **Single visual anchor** — the shoe is always the hero, never competing with other visuals
- **Flat design** — no 3D effects, no glossy surfaces, no gradients on UI elements
- **Subtle background interest** — lavender gradient wash, thin navy accent bar, marble texture. ONE touch, not three.
- **The shoe's purple dots as the main color pop** — don't add competing purple elements
- **Typographic confidence** — large bold headlines that own their space
- **Benefit pills/markers** — 3 rounded pills (horizontal) or 6 benefit lines with purple + markers (vertical)

### What fails
- Cramming too many elements (price badge + stars + pills + trust bar + guarantee + HSA = visual noise)
- Dark/light split compositions with too much going on in each half
- Lifestyle photo backgrounds that compete with the product for attention
- Adding logos or brand wordmarks
- Sock-style or slip-on shoes (that's the wrong product)
- Athletic running shoes with traditional laces (also wrong)
- Generic AI-generated shoes without product references

## Approved Layout Types

### 1. `cream-editorial` (S04 pattern)
- Warm cream (#F5F2F3) background
- Subtle lavender gradient wash at bottom third
- Small colored pill badge at top (sale/event)
- Bold navy headline
- Lighter grey subheadline
- Product floating centered with space
- Three horizontal benefit pills below
- Navy CTA button
- Small guarantee text

### 2. `typographic-hero` (S11 pattern)
- Clean white background
- Thin navy accent bar at very top edge (30px)
- Massive bold headline dominates top 30%
- Lighter subheadline
- Product floating centered, slightly smaller than headline
- Six benefit lines with purple + markers (right side)
- Navy CTA button at bottom

### 3. `textured-editorial` (S33 pattern)
- Full-frame texture background (grey marble, cobblestone, stone)
- Medium grey tone — not too dark, shoe's black/purple pops against it
- Bold white headline with subtle drop shadow, stacked sentences
- Smaller off-white subheadline
- Product sitting ON the texture with natural shadow
- Four thin white annotation lines to feature labels
- White CTA button
- Small guarantee + shipping text

## Generation Rules

1. **Always upload product refs** — both the 800x800 lifestyle and the clean product shot
2. **Always include the product description block** in the prompt (see approved-prompts.md)
3. **`--num-images 1`** — one at a time, iterate
4. **`--model gpt`** — GPT Image 2 for all ComfortWear statics (text rendering + product accuracy)
5. **`--quality high`** — always
6. **No logo** in any composition
7. **Save to `00 Assets/Statics/[concept]-[version]/`** — never overwrite previous versions
8. **Add to canvas immediately** after generation
