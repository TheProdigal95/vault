# Instagram Stories Q&A

NB2 format template. Mimics a native Instagram Stories "Ask me anything" Q&A response over a full-bleed lifestyle photograph. The ad reads as organic IG content, not a designed ad. The Q&A format creates a first-person testimonial framing where the "answer" IS the ad copy.

**Copy quality rules:** [[Creative Image Ad Criteria]] + [[Headline & Text Hook Criteria]] + [[Universal Copy Rules]]. This template handles rendering only.

**Prompt assembly:** Every prompt must include all items from the Prompt Assembly Checklist in [[Overview]].

**Scoring gate:** Copy must pass all 7 scoring dimensions at 90+ before generation. See `00 Global/Statics Generator/Scoring Agents/`.

**Models supported:** Both — NB2 and GPT Image 2. Model auto-selected per brief content.

---

## Format Anatomy

```
┌──────────────────────────────────┐
│  (lifestyle photo fills frame)   │
│                                  │
│    ┌──────────────────────┐      │
│    │   Ask me anything    │      │  ← IG Stories Q&A sticker
│    │                      │      │
│    │  [QUESTION TEXT]     │      │
│    └──────────────────────┘      │
│                                  │
│   ┌────────────────────────┐     │
│   │  [RESPONSE BLOCK 1]   │     │  ← cream/off-white bg, dark text
│   └────────────────────────┘     │
│                                  │
│   ┌────────────────────────┐     │
│   │  [RESPONSE BLOCK 2]   │     │  ← price/value/comparison beat
│   └────────────────────────┘     │
│                                  │
│   [Pay1] [Pay2] [Pay3] [Pay4]   │  ← payment badges (outlined pills)
│                                  │
│      [CTA TEXT] ↗               │
│                                  │
│   (fine print disclaimer)        │
└──────────────────────────────────┘
```

Three layers from back to front:
1. **Background:** Full-bleed lifestyle photograph — warm, real, phone-camera feel
2. **IG UI elements:** Q&A sticker + text-with-background response blocks — must look like native Instagram Stories tools, not designed cards
3. **Conversion elements:** Payment badges + CTA + disclaimer — subtle, bottom of frame

---

## Copy Template

```
[QUESTION] - 8-15 words. A question another person would ask via the IG Q&A sticker.
             Frames the category and the discovery moment. Second person or "how did you..."
             register.

[RESPONSE 1] - 20-40 words. First-person story: discovery, skepticism, action taken.
               Conversational register. Should sound like someone actually typing a Story
               response, not ad copy. Contractions, natural phrasing.

[RESPONSE 2] - 15-30 words. First-person value/proof beat: price, inclusions, comparison
               to alternatives. "But I did." pivot energy. Key numbers (price, $0 down)
               and key features (free bloodwork) in bold.

[PAYMENT BADGES] - 3-4 payment providers or trust signals as pill labels.

[CTA] - 4-7 words + link arrow (↗). Swipe-up style.
```

## Strategic Inputs

```
[BRAND NAME]
[SERVICE/PRODUCT]
[PERSONA from Creative Strategy Matrix]
[AWARENESS STAGE]
[THREE SELVES target]
[PHOTOGRAPHY DIRECTION] - everyday setting, warm lighting, real activity (cooking, morning
                          routine, walking). Must feel like a phone photo, not a shoot.
[QUESTION FRAMING] - what would a curious friend ask via IG Stories?
```

---

## NB2 Image Generation Prompt

```
Create a static ad mimicking a native Instagram Stories Q&A response. 1080x1920, 9:16 vertical.

CRITICAL: This must look like a real Instagram Story, not a designed ad. Every UI element
must match Instagram's actual Stories tools — the "Ask me anything" sticker, the text-with-
background blocks, the font sizing and spacing.

BACKGROUND:
Full-bleed lifestyle photograph filling the entire 1080x1920 frame. [PHOTOGRAPHY DIRECTION].
Warm natural lighting, slightly soft-focus in places. The photo should feel like it was taken
on a phone and posted to Stories — authentic, not produced. Real kitchen, real food, real
morning light. The photo is the environment, not the subject — text overlays are the content.

INSTAGRAM "ASK ME ANYTHING" STICKER:
Positioned between y=270 and y=480. A native Instagram Stories Q&A sticker:
- Gray header bar at the top: "Ask me anything" in small gray centered text
- White rounded-rectangle card below the header
- Question text inside: "[QUESTION]"
- Font: system sans-serif (similar to Instagram's native font), 22-28px, dark text (#1a1a1a)
- Card has subtle shadow and rounded corners (16-20px radius)
- The sticker must look IDENTICAL to Instagram's actual Q&A tool

RESPONSE TEXT BLOCKS:
Two text-with-background blocks below the sticker, between y=550 and y=1100. These mimic
Instagram Stories' text tool with background enabled:

Block 1 (y=550 to y=750):
"[RESPONSE 1]"
- Cream or off-white background (#f5f0e8 or #faf6ef), rounded rectangle
- Dark text (#1a1a1a or #222), system sans-serif, 20-24px
- Slight subtle shadow
- Natural, slightly casual text sizing — not perfectly uniform

Block 2 (y=800 to y=1000):
"[RESPONSE 2]"
- Same cream/off-white background treatment as Block 1
- Key terms in bold: price numbers, "free bloodwork", "supplements" — using Instagram's
  native bold formatting
- Same text size and style as Block 1

Both blocks should be different widths (not perfectly aligned) and may be at very slightly
different horizontal positions — as if placed by hand in the Stories editor, not designed
on a grid. This asymmetry is what makes it feel native.

PAYMENT BADGES:
Between y=1100 and y=1200. Four outlined pill badges in a horizontal row:
[PAYMENT BADGES]. Each badge: outlined dark stroke, rounded pill shape, dark text on
transparent or very light fill. Not filled teal — subtle, organic, like an afterthought.

CTA TEXT:
Between y=1220 and y=1300. "[CTA] ↗" — dark text, 24-28px, with a link arrow icon.
Mimics the Instagram Stories "link" sticker style. Not a button — text with arrow.

NO prominent brand logo. This should read as a real person's Story, not a brand post.

DISCLAIMER:
Minimal fine print at y=1820-1900. White or dark text at 50% opacity, ~8pt.

SAFE ZONES:
Top 270px clear. Bottom 340px clear. Left 40px. Right 120px from y=600.
Primary content zone: x=40 to x=960, y=270 to y=1580.

TYPOGRAPHY:
Reference the uploaded Brand Spec Card for brand fonts — but the IG UI elements (sticker,
text blocks) should use a system sans-serif that matches Instagram's native font. Only the
payment badges and CTA may use the brand font.

COLOR:
Warm tones from the lifestyle photo dominate. The text blocks are cream/off-white (not
pure white). The overall palette is warm and organic — golden kitchen light, natural food
colors, cream text blocks. No teal or brand color in the UI elements — save brand color
for the payment badges only.

MOOD:
Completely native Instagram Stories. A viewer scrolling through Stories should pause because
this looks like a friend's Q&A response, not because it looks like an ad. Warm, personal,
authentic. The story being told is intimate and real. The conversion elements (payment badges,
CTA) are the only signals that this is an ad, and they're subtle.

REFERENCE IMAGES:
Brand Spec Card + [composition reference from a winning IG Stories Q&A ad].
```

#### GPT Image 2 Prompt

**Model preference:** GPT preferred (lifestyle photography with human subjects)

Prepend the E+ Safe Zone Block from [[GPT Image 2 Block]] before this prompt.

```
SCENE:
Full-bleed lifestyle photograph filling the entire 1080x1920 frame. [PHOTOGRAPHY DIRECTION].
Shot on iPhone 15 Pro 24mm f/1.78 — warm natural lighting, slightly soft focus in places.
The photo feels like it was taken on a phone and posted to Stories. Real kitchen, real food,
real morning light. The photo is the environment, not the subject.

TYPOGRAPHY:
All text renders inside the GPT safe zone (y=400 to y=1520, x=150 to x=930).

Instagram "Ask me anything" Q&A sticker at the top of the safe zone:
- Gray header bar: "Ask me anything" in small gray centered text
- White rounded-rectangle card below with "[QUESTION]" in system sans-serif, 22-28px, dark (#1a1a1a)
- Card has subtle shadow and rounded corners (16-20px radius)
- Must look identical to Instagram's actual Q&A tool

Two text-with-background response blocks below the sticker:

Block 1:
"[RESPONSE 1]"
Cream background (#f5f0e8), rounded rectangle, dark text (#1a1a1a), system sans-serif, 20-24px.
Slight shadow. Natural, slightly casual text sizing.

Block 2:
"[RESPONSE 2]"
Same cream background treatment. Key terms in bold: price numbers, "free bloodwork",
"supplements" — using Instagram's native bold formatting.

Both blocks are different widths and at slightly different horizontal positions — placed by
hand in the Stories editor, not on a grid.

Payment badges below the response blocks: [PAYMENT BADGES]. Four outlined pill badges —
thin dark stroke, rounded pill shape, dark text on transparent fill. Subtle, organic.

CTA: "[CTA] ↗" — dark text, 24-28px, with link arrow icon. Mimics the Instagram Stories
"link" sticker style. Not a button — text with arrow.

COPY TO RENDER:
- Q&A sticker question: "[QUESTION]"
- Response block 1: "[RESPONSE 1]"
- Response block 2: "[RESPONSE 2]"
- Payment badges: [PAYMENT BADGES]
- CTA: "[CTA] ↗"
- Disclaimer: fine print at bottom of safe zone, 50% opacity, ~8pt

PRODUCT FIDELITY: Match the uploaded product reference exactly. Do not restyle. Do not swap proportions.
NO ANTI-AI SLIPS: film grain visible, no hyper-smooth surfaces.
NO DASHES OR HYPHENS in rendered copy. Periods only.
```

## Variation Vectors

| Vector | Options |
|---|---|
| Photography | kitchen/cooking scene / morning routine / outdoor cafe / living room with natural light / food prep close-up |
| Question framing | discovery ("how did you find...") / skepticism reversal ("were you nervous to try...") / results ("what changed for you...") / cost ("how do you afford...") |
| Response 1 tone | skeptic-to-believer / accidental discovery / friend recommendation / "I almost didn't" |
| Response 2 emphasis | price anchor / free inclusions / comparison to alternatives / speed/convenience |
| Text block placement | centered stack / left-aligned cascade / staggered (block 2 shifted right) |
| Payment badge style | outlined pills / small text only / frosted pills / icon badges |

---

## What Makes This Format Work

- **Platform familiarity:** The IG Stories Q&A sticker is instantly recognized — viewers have used it themselves. This triggers "content" processing, not "ad" processing.
- **First-person register:** The response blocks are someone's actual words, not marketing copy. Contractions, casual phrasing, "I thought for sure I wouldn't qualify."
- **Two-block structure:** Block 1 is the story (earns trust), Block 2 is the value (delivers the sell). The pivot between them is the emotional turn.
- **Warm photography grounds reality:** The kitchen, the food, the morning light — this is someone's actual life, not a branded environment.
- **Conversion elements are afterthoughts:** Payment badges and CTA sit below the story, not integrated into it. The story does the selling; the conversion elements just make it actionable.