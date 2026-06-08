---
version: alpha
name: IM8 End Cards
description: "Visual design system for IM8 animated end cards. 5 palettes, 8 composition types, 2 type registers. Canvas: 1080x1920."

colors:
  maroon-primary: "#4A1A22"
  maroon-deep: "#311B1B"
  maroon-dark: "#35080B"
  maroon-cta: "#4B0E15"
  maroon-badge: "#5B2931"
  cream: "#F5F2F3"
  cream-warm: "#F6F2F2"
  off-white: "#F5F1ED"
  pink-muted: "#806A6D"
  warm-muted: "#7A5E60"
  border-light: "#C8BBBB"
  sub-muted: "#E0DEDD"
  sub-warm: "#D4C8BE"
  accent-red: "#CD3F3C"
  red-pill: "#9F1F1F"
  red-cta: "#8B2228"
  check-green: "#3D6B35"
  blue-deep: "#0A1A3A"
  blue-dark: "#0F2550"
  red-organic: "#3D1015"
  terracotta: "#8B4332"

typography:
  headline-bold:
    fontFamily: ABC Arizona Flare Variable Unlicensed Trial
    fontSize: 88px
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: 0em
  headline-serif:
    fontFamily: ABC Arizona Flare Variable Unlicensed Trial
    fontSize: 88px
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: 0em
  subhead:
    fontFamily: ABC Arizona Flare Variable Unlicensed Trial
    fontSize: 46px
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: 0em
  subhead-sm:
    fontFamily: ABC Arizona Flare Variable Unlicensed Trial
    fontSize: 36px
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: 0em
  stat-number:
    fontFamily: ABC Arizona Flare Variable Unlicensed Trial
    fontSize: 180px
    fontWeight: 700
    lineHeight: 1.0
    letterSpacing: 0em
  capsule:
    fontFamily: Manrope
    fontSize: 26px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: 3px
  badge-title:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: 800
    lineHeight: 1
    letterSpacing: 0em
  badge-alt:
    fontFamily: Manrope
    fontSize: 36px
    fontWeight: 800
    lineHeight: 1
    letterSpacing: 0em
  cta:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: 800
    lineHeight: 1
    letterSpacing: 3px
  disclaimer:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0em
  footnote:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: 400
    lineHeight: 1
    letterSpacing: 0em

rounded:
  none: 0px
  disclaimer: 14px
  badge-sm: 16px
  window: 20px
  cta: 20px
  badge-md: 35px
  badge-lg: 40px
  capsule: 60px

spacing:
  canvas-w: 1080
  canvas-h: 1920
  content-top: 50px
  content-sides: 76px
  content-bottom: 28px
  content-width: 928px
  gap-sm: 16px
  gap-md: 24px
  gap: 30px
  gap-lg: 36px
  badge-gap: 16px
  badge-pad-v: 20px
  badge-pad-h: 12px
  cta-pad: 38px
  logo-h: 56px
  logo-bottom-h: 48px

palettes:
  light:
    name: Light (Warm Cream)
    textured: false
    vars:
      --bg: "#F5F2F3"
      --bg-image: none
      --text-primary: "#4A1A22"
      --text-secondary: "#806A6D"
      --text-muted: "#7a5e60"
      --badge-bg: "#FFFFFF"
      --badge-border: "#c8bbbb"
      --badge-text: "#4A1A22"
      --badge-shadow: "0 2px 8px rgba(0,0,0,0.06)"
      --badge-radius: 16px
      --cta-bg: "#4A1A22"
      --cta-text: "#FFFFFF"
      --border-color: "#c8bbbb"
      --pill-border: "#4A1A22"
      --pill-text: "#4A1A22"
      --pill-bg: transparent
      --text-shadow: none
      --logo-filter: none
      --photo-border: "3px solid #c8bbbb"

  dark:
    name: Dark (Deep Maroon)
    textured: false
    vars:
      --bg: "#311B1B"
      --bg-image: none
      --text-primary: "#F5F1ED"
      --text-secondary: "#d4c8be"
      --text-muted: "#d4c8be"
      --badge-bg: transparent
      --badge-border: "rgba(200, 187, 187, 0.4)"
      --badge-text: "#F5F1ED"
      --badge-shadow: none
      --badge-radius: 35px
      --cta-bg: "#8b2228"
      --cta-text: "#FFFFFF"
      --border-color: "rgba(200, 187, 187, 0.25)"
      --pill-border: transparent
      --pill-text: "#FFFFFF"
      --pill-bg: "#9F1F1F"
      --text-shadow: none
      --logo-filter: "brightness(0) invert(1)"
      --photo-border: "3px solid rgba(200, 187, 187, 0.25)"

  blue-molecular:
    name: Blue Molecular
    textured: true
    vars:
      --bg: "#0a1a3a"
      --bg-image: "url(bg.png)"
      --text-primary: "#FFFFFF"
      --text-secondary: "rgba(255,255,255,0.9)"
      --text-muted: "rgba(255,255,255,0.7)"
      --badge-bg: "rgba(255,255,255,0.08)"
      --badge-border: "rgba(255,255,255,0.5)"
      --badge-text: "#FFFFFF"
      --badge-shadow: none
      --badge-radius: 40px
      --cta-bg: "#FFFFFF"
      --cta-text: "#0f2550"
      --border-color: "rgba(255,255,255,0.3)"
      --pill-border: "rgba(255,255,255,0.5)"
      --pill-text: "#FFFFFF"
      --pill-bg: transparent
      --text-shadow: "0 2px 12px rgba(0,0,0,0.4)"
      --logo-filter: "brightness(0) invert(1)"
      --photo-border: "3px solid rgba(255,255,255,0.2)"

  red-organic:
    name: Red Organic
    textured: true
    vars:
      --bg: "#3D1015"
      --bg-image: "url(bg.png)"
      --text-primary: "#FFFFFF"
      --text-secondary: "rgba(255,255,255,0.9)"
      --text-muted: "rgba(255,255,255,0.7)"
      --badge-bg: "rgba(255,255,255,0.12)"
      --badge-border: "rgba(255,255,255,0.45)"
      --badge-text: "#FFFFFF"
      --badge-shadow: none
      --badge-radius: 40px
      --cta-bg: "#FFFFFF"
      --cta-text: "#4A1A22"
      --border-color: "rgba(255,255,255,0.25)"
      --pill-border: "rgba(255,255,255,0.5)"
      --pill-text: "#FFFFFF"
      --pill-bg: transparent
      --text-shadow: "0 2px 10px rgba(0,0,0,0.5)"
      --logo-filter: "brightness(0) invert(1)"
      --photo-border: "3px solid rgba(255,255,255,0.2)"

  terracotta:
    name: Terracotta
    textured: true
    vars:
      --bg: "#8B4332"
      --bg-image: "url(bg.png)"
      --text-primary: "#FFFFFF"
      --text-secondary: "rgba(255,255,255,0.85)"
      --text-muted: "rgba(255,255,255,0.65)"
      --badge-bg: "rgba(255,255,255,0.15)"
      --badge-border: "rgba(255,255,255,0.4)"
      --badge-text: "#FFFFFF"
      --badge-shadow: "0 2px 8px rgba(0,0,0,0.15)"
      --badge-radius: 40px
      --cta-bg: "#FFFFFF"
      --cta-text: "#4A1A22"
      --border-color: "rgba(255,255,255,0.25)"
      --pill-border: "rgba(255,255,255,0.45)"
      --pill-text: "#FFFFFF"
      --pill-bg: transparent
      --text-shadow: "0 2px 10px rgba(0,0,0,0.45)"
      --logo-filter: "brightness(0) invert(1)"
      --photo-border: "3px solid rgba(255,255,255,0.2)"

components:
  cta-button:
    width: "{spacing.content-width}"
    rounded: "{rounded.cta}"
    padding: "{spacing.cta-pad}"
    typography: "{typography.cta}"
  badge:
    padding: "{spacing.badge-pad-v} {spacing.badge-pad-h}"
    typography: "{typography.badge-title}"
  capsule:
    rounded: "{rounded.capsule}"
    padding: "{spacing.badge-pad-v} 36px"
    typography: "{typography.capsule}"
  photo-window:
    width: "{spacing.content-width}"
    rounded: "{rounded.window}"
  magazine-hero:
    width: "100%"
    typography-scale: "820px"
    line-height: "0.72"
    letter-spacing: "-35px"
    fontFamily: "DM Serif Display"
  disclaimer-box:
    width: "{spacing.content-width}"
    rounded: "{rounded.disclaimer}"
    padding: "16px 24px"
    typography: "{typography.disclaimer}"
---

## Overview

IM8 is a premium wellness supplement brand targeting adults 30s–50s. End cards close 9:16 video ads with a single decisive visual — one clear hierarchy, one action. The visual identity is warm, clinical-premium, and typographically confident. Never cold, never clinical-sterile, never infomercial.

Two font families carry the brand: **Arizona Flare** (serif — headlines, subheads, stat numbers) and **Manrope** (sans-serif — badges, CTAs, disclaimers, utility text). Arizona Flare is installed locally as `ABC Arizona Flare Variable Unlicensed Trial`; Manrope loads from Google Fonts. For special "Type 3I" magazine layouts, **DM Serif Display** is used to achieve massive optical scaling and luxury tension.

## Colors

Five color systems provide visual range across batches while maintaining brand recognition.

- **Maroon Primary (#4A1A22):** The brand signature. Headlines on light backgrounds, CTA fills, badge text. Deep and warm, never cold brown.
- **Cream (#F5F2F3):** Light palette background. Warmer than white — deliberate warmth, not "default gray."
- **Deep Maroon (#311B1B):** Dark palette background. Almost-black with red warmth — darker and richer than maroon-primary.
- **Off-White (#F5F1ED):** Text on dark backgrounds. Slightly warm, softer than pure white.
- **Pink Muted (#806A6D):** Secondary text and sub-headlines on light backgrounds. Carries warmth.
- **Blue Deep (#0A1A3A):** Blue molecular world. Scientific, clinical trust.
- **Red Organic (#3D1015):** Red organic world. Alive, warm, premium-natural.
- **Terracotta (#8B4332):** Terracotta world. Editorial, tactile, warm.
- **Check Green (#3D6B35):** Ingredient checkmark icons only. Never used for backgrounds or text.

## Typography

### Two type registers

| Register | Typeface | Weight | Transform | Use |
|----------|----------|--------|-----------|-----|
| **Bold sans-serif** | Arizona Flare | 700 | UPPERCASE | Stat-led, confrontational, clinical headlines |
| **Elegant serif** | Arizona Flare | 400 | Mixed case | Emotional, testimonial, promise, cost headlines |

Sub-headlines use the opposite weight from the headline. Sub-headlines are always a step down in contrast — muted color, never the same weight as the headline.

Statement headlines end with a period. Question headlines do not.

On textured backgrounds, headlines get text-shadow for legibility. On flat backgrounds, no shadow.

### Font loading

```css
@font-face {
  font-family: "Arizona Flare";
  src: local("ABC Arizona Flare Variable Unlicensed Trial");
  font-weight: 100 700;
}
```

Manrope loads via Google Fonts: `Manrope:wght@400;600;700;800`.

## Layout & Spacing

Canvas: 1080 x 1920 px (9:16 vertical video frame).

Content area: 76px side padding, 50px top, 28px bottom. Effective content width: 928px.

### 5-Layer Vertical Stack

Every end card follows this top-to-bottom structure:

| Layer | Content | % of Frame |
|-------|---------|------------|
| A — Authority | Logo, capsule label, or press row | 5–8% |
| B — Headline | Primary headline + sub-headline | 20–35% |
| C — Hero Visual | B-roll window, product, flat-lay, stat, composite | 25–45% |
| D — Proof Zone | 3 trust/ingredient/offer badges | 10–15% |
| E — CTA + Disclaimer | Button, disclaimer, wordmark | 10–12% |

Every card has one clear visual anchor. It can be photography, a giant stat number, or a confrontational headline — but hierarchy is always singular.

## Elevation & Depth

Flat design throughout. No gradients on UI elements, no 3D effects, no glossy surfaces.

Depth comes from: textured backgrounds (molecular, organic, terracotta), photo window borders on textured backgrounds (subtle white glow), and badge shadows on light palettes only.

Text-shadow on textured backgrounds for legibility — never decorative, always functional.

## Shapes

- **CTA button:** 20px radius, full content width with margins
- **Photo window:** 20px radius with overflow hidden
- **Badges:** 16px on light, 35px on dark, 40px on textured
- **Capsule labels:** 60px radius (full pill)
- **Disclaimer box:** 14px radius
- **Badge icons:** Circular containers when present

Corner radii never mix within a composition. All badges in a row share the same radius.

## Components

### CTA Button
Full width (928px), 38px vertical padding, 20px radius. Single line of bold uppercase text (Manrope 48px/800). Background and text colors invert per palette.

### Badges
Always 3 in a horizontal row (exception: 2x2 for 4 items). Equal width, flex distribution. 16px gap between. Each badge: border + optional background + bold uppercase title. Content type never mixes — all ingredient, all trust, or all offer.

### Capsule Label
Small authority qualifier between logo and headline. Thin border, transparent fill, small uppercase text (Manrope 26px/700). Never large.

### Photo Window
928px wide, flex-grows to fill available space. 20px radius, overflow hidden. Holds b-roll video (crossfade montage) or static hero image. Border color from palette.

### Disclaimer
928px wide, thin border, 14px radius. FDA text at 18px muted color. Always below CTA, never competes visually.

## Do's and Don'ts

- Do use at least 2 base palettes and 1 texture world per batch of 6+
- Do end statement headlines with a period
- Do use the opposite weight for sub-headlines (serif headline = sans sub, vice versa)
- Do use Arizona Flare for all headlines and stat numbers — never Lora, never system serif
- Do generate logo.png with process-logo.js for proper transparency — never use CSS filter hacks
- Don't mix badge content types on the same card
- Don't use gold stars, 3D effects, or glossy badges — IM8 is premium and flat
- Don't use more than 3 consecutive cards in the same palette
- Don't show tired, struggling, or sick-looking human subjects
- Don't put more than 4 consecutive cards of the same composition type
- Don't specify background color in image generation prompts — texture backgrounds are generated separately

## Video Background (VBG) Conversion

Rules for converting any end card composition to use a video background instead of a static/textured bg.

### Overlay

Always dark maroon: `rgba(49,27,27,0.64)`. Never use a light or cream overlay — it washes out the video and makes dark text illegible. The video should read as ambient texture through the dark film.

### Color flip

Regardless of the source palette, all VBG compositions use dark-palette colors:

| Element | VBG Value |
|---------|-----------|
| Background (`html, body, #root`) | `#311B1B` |
| Headline / subhead text | `#F5F1ED` |
| Secondary / muted text | `#d4c8be` |
| Badge bg | `transparent` |
| Badge border | `2px solid rgba(200, 187, 187, 0.4)` |
| Badge radius | `35px` |
| Badge text | `#F5F1ED` |
| CTA fill | `#8b2228` |
| Photo border | `3px solid rgba(200, 187, 187, 0.25)` |
| Disclaimer text | `#d4c8be` |
| Logo | `filter: brightness(0) invert(1)` or flip text color to `#F5F1ED` |

### Fonts

Preserve the original composition's font-family. Don't swap Lora or other serifs to Arizona Flare — the original typeface weight was chosen for that layout and Arizona Flare at 700 reads much bolder.

### Background video

Must be 15 seconds minimum. Never use 5-second clips. Check duration with ffprobe before linking. If only a short version exists, look for longer versions in the same anim-tests directory.

### Z-index layering

```
bg-video   → z-index: 0
bg-overlay → z-index: 1
content    → z-index: 2 (via #root > *:not(.bg-video):not(.bg-overlay) { position: relative; z-index: 2; })
```

### B-roll timing (15s composition)

6 clips distributed across the full duration:

```
broll-1: data-start="0"  data-duration="15"  (base layer)
broll-2: data-start="4"  data-duration="11"
broll-3: data-start="6"  data-duration="9"
broll-4: data-start="8"  data-duration="7"
broll-5: data-start="10" data-duration="5"
broll-6: data-start="12" data-duration="3"
```

GSAP montage: `montageStart = 2.5`, `montageEnd = 14.5`.

### Reference

T003-joints-anim-vbg is the gold standard for what a good VBG composition looks like.

## Agent Prompt Guide

How to apply this system when building end card compositions. Follow this decision sequence.

### 1. Pick composition type before anything else

Match the card's intent to a composition type (3A–3H). The type determines layout, hero element, and which CSS overrides apply. Don't freestyle layouts — every card fits one of the 8 types.

### 2. Pick palette, then check the batch

Select from the 5 palettes. Before committing, check what other cards in the batch use — enforce the batch diversity rule (no more than 3 consecutive same-palette, use at least 2 base + 1 texture in batches of 6+).

### 3. Pick type register, then set the opposite for subhead

Bold sans register (700, uppercase) for stat-led, confrontational, clinical headlines. Elegant serif register (400, mixed case) for emotional, testimonial, promise headlines. Sub-headline always uses the opposite weight.

### 4. Use base.css — don't reinvent component styles

All shared component styles live in `base.css`. Templates only override what's genuinely different for that composition type. Never re-declare badge, CTA, disclaimer, or pill styles from scratch in a template — the base handles it.

### 5. Use animations.js — don't write entrance GSAP by hand

The `buildEntrance(type, opts)` function in `animations.js` generates standardized choreography for every component. Each component has ONE canonical entrance animation. The only composition-specific animations are hero reveals and hold animations, which are also defined there.

### 6. Color budget

- Background color fills 70–80% of surface
- Primary text + headlines: 10–15%
- Accent elements (CTA, pill borders, badge highlights): max 2 per card
- Don't reuse the CTA color on badges, capsules, and headlines simultaneously — it flattens the hierarchy

### 7. Common mistakes

- Forgetting `text-shadow: var(--text-shadow)` on headlines over textured backgrounds — text becomes unreadable
- Using `tl.from()` instead of `tl.fromTo()` — causes seek failures in the capture engine (see motion-principles.md)
- Putting ambient animations on bare `gsap.to()` instead of the timeline — they won't render in video
- Mixing badge content types on one card (ingredients + trust + offer)
- Declaring component styles inline that contradict base.css — the base is the source of truth
- Hardcoding hex colors instead of using `var(--text-primary)` etc. — breaks palette switching
