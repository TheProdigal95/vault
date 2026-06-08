# UGC TikTok

## What this format is

Platform-native UGC ad rendered as a complete social media screen. The entire image IS the platform interface -- UGC footage fills the frame with the platform UI overlaid on top. GPT Image 2 renders platform UI elements at near-pixel accuracy, including interaction columns, navigation bars, and engagement counts. The format works because the viewer's thumb stops on what looks like organic content, not an ad.

This template is **GPT Image 2 only**. NB2 cannot render realistic skin texture or platform UI elements with sufficient fidelity. Every prompt in this template targets GPT Image 2.

**Copy quality rules:** [[Creative Image Ad Criteria]] + [[Headline & Text Hook Criteria]] + [[Universal Copy Rules]]. This template handles rendering only.

---

## Styles

### Style A: TikTok UI

The entire image IS a TikTok video screen. UGC footage fills the frame with the TikTok UI overlaid on top. The creator is mid-moment -- holding the product, mid-sentence, reacting. The UI elements (interaction column, caption, music row, navigation bar) complete the illusion that this is a paused TikTok video.

#### Copy template

- **Top caption hook:** Large white text with soft black dropshadow, hand-placed feel. Under 10 words. This is the scroll-stopper -- it reads like the creator typed it over their own video. (e.g., "POV: you replaced 4 products with 1")
- **@handle caption:** @[BRAND HANDLE] followed by a dot separator and timestamp (e.g., @elevateskin · 2h)
- **Caption text:** Casual caption with emoji and hashtag. Written the way a real creator would caption a post -- no polish, no brand voice. (e.g., "ok but this actually changed my routine fr fr #skincare")
- **Music row:** ♫ original sound -- [BRAND HANDLE]

#### Strategic inputs

- **BRAND NAME** — from Brand Context
- **PRODUCT NAME** — from Product Context
- **PERSONA** — pain-trigger name, never demographic (from Persona Context)
- **AWARENESS STAGE** — problem-aware, solution-aware, or product-aware
- **THREE SELVES TARGET** — Actual Self, Ideal Self, or Ought Self
- **PHOTOGRAPHY DIRECTION** — creator description, setting, lighting, expression

#### Image generation prompt

```
INSTAGRAM SAFE ZONE — HARD CONSTRAINTS:

THE TOP 400 PIXELS MUST CONTAIN NO TEXT. Background only.
THE BOTTOM 400 PIXELS MUST CONTAIN NO TEXT. Background only.
THE LEFT AND RIGHT 150 PIXELS MUST CONTAIN NO TEXT.
Text only lives in the center area from y=400 to y=1520, x=150 to x=930.

BACKGROUND CONTINUITY:
The background surface is ONE CONTINUOUS PHOTOGRAPHIC PLANE extending to ALL FOUR EDGES of the 1080x1920 frame. The empty top/bottom zones are the SAME surface as the center, just without text.

DO NOT RENDER:
- A paper card, poster, or printed rectangle inset into the frame
- A visible border, frame, or edge between the center content and the top/bottom
- A shadow line suggesting the ad is an object on another surface
- A background-within-a-background

DO:
- Shoot as a single overhead photograph on ONE continuous surface.
- Text floats directly on the photographed surface.
- If content is sparse, let empty top/bottom be empty surface — do not invent a frame.

RENDER AT 1080x1920 (9:16 vertical).

You are generating a TikTok-style UGC ad for {{BRAND_NAME}}. The entire image IS a TikTok video screen — the UGC footage fills the frame, with the TikTok UI overlaid on top.

SCENE: {{CREATOR_DESCRIPTION — e.g. "A real woman, 28-35, natural lived-in skin with visible pores and freckles (celebrated, never smoothed), messy bun, wearing a cream knit sweater. Soft bathroom morning light. Holding [PRODUCT] up near her cheek, mid-sentence, warm expression. No glam, no filter, phone front-camera aesthetic."}} Shot on iPhone 15 Pro 24mm f/1.78.

TIKTOK UI CHECKLIST (render ALL of these):
- Top-right: three-dot menu icon
- Right-edge stacked interaction column: profile avatar with + follow button below it, heart icon with count "{{HEART_COUNT — e.g. 24.2K}}", speech-bubble icon with count "{{COMMENT_COUNT — e.g. 1,203}}", share arrow icon with count "{{SHARE_COUNT — e.g. 5.7K}}", spinning music disc at bottom of column
- Bottom-left: @{{BRAND_HANDLE}} · {{TIMESTAMP — e.g. 2h}}, then the caption text with emoji and hashtag on the next line
- Music row: ♫ original sound — @{{BRAND_HANDLE}}
- Bottom navigation bar: Home · Discover · [+] · Inbox · Profile with appropriate icons

COPY TO RENDER:
Top caption (large white text with soft black dropshadow, hand-placed feel): "{{HOOK — under 10 words}}"
@handle caption: @{{BRAND_HANDLE}} · {{TIMESTAMP}}
Caption text: "{{CAPTION — casual, emoji, hashtag}}"
Music row: ♫ original sound — {{BRAND_HANDLE}}

EXCEPTIONS TO BRAND RULES: The TikTok UI uses native rounded pills and platform-standard icons — this is intentional platform fidelity, not a brand violation. The brand CTA is REPLACED by the TikTok UI interaction column in this format (no separate brand CTA button).

PRODUCT FIDELITY: Match the uploaded product reference exactly. Product held near the creator's face or clearly visible in frame, label legible.
REAL SKIN: Visible pores, freckles, natural lines, natural skin texture. Never smoothed. No ring light. No glamour lighting. The entire format fails if the person looks AI-generated.

PRODUCT FIDELITY: Match the uploaded product reference exactly. Do not restyle. Do not swap proportions.
NO ANTI-AI SLIPS: film grain visible, no hyper-smooth surfaces.
NO DASHES OR HYPHENS in rendered copy. Periods only.
```

#### Variation vectors

| Vector | Options |
|---|---|
| Creator type | young woman morning routine / mid-30s woman kitchen / woman at gym / woman at desk / woman outdoors |
| Creator expression | mid-sentence excited / calm knowing smile / surprised reaction / earnest recommendation |
| Engagement numbers | low authentic (874 hearts, 43 comments, 12 shares) / medium (3.2K, 287, 94) / high viral (24.2K, 1,203, 5.7K) |
| Product visibility | held near face / on counter beside creator / in hand showing label / being applied |
| Environment | bathroom morning light / kitchen natural light / bedroom evening / outdoor natural |

#### Pro tips

- Specific engagement numbers (24.2K hearts, 1,203 comments) render more believably than "some likes." GPT anchors on concrete numbers.
- For higher perceived authenticity, pick a number like 1.2K or 874 -- big round numbers (25K, 1,000) scream staged.
- The top caption hook should read like the creator typed it casually over their own video. "POV:" openers, "wait til you see," "ok but actually" -- these are TikTok-native language patterns.
- If GPT drops a UI element on the first render, add explicit emphasis on the missing element in the next iteration (e.g., "YOU MUST RENDER the spinning music disc at the bottom of the right-side interaction column").

---

### Style B: IG Story UI

Same concept but for Instagram Stories. The entire image IS an Instagram Story screen -- UGC footage fills the frame with the Stories-native UI overlaid on top. The creator is in the same mid-moment as Style A, but the interface elements are Stories-specific: progress bar segments, profile header, optional interactive sticker, and the Send Message bar at the bottom.

#### Copy template

- **Caption sticker hook:** Stories-style text sticker with the hook line. White or brand-tinted text on a translucent rounded-rectangle sticker background. Under 10 words. Hand-placed, slightly off-center -- the way a real creator would place a text sticker. (e.g., "the only thing that actually worked")
- **Profile header:** Profile picture circle + username + timestamp (e.g., "elevateskin · 2h")
- **Interactive sticker (optional):** Poll sticker ("Did you know this?  Yes / Tell me more"), question sticker ("ask me about my routine"), or countdown sticker ("RESTOCK DROPS IN 2 DAYS"). Only include when the brief calls for engagement -- not every execution needs one.
- **Send Message bar:** "Send message" placeholder text + paper plane share icon at bottom of frame

#### Strategic inputs

- **BRAND NAME** — from Brand Context
- **PRODUCT NAME** — from Product Context
- **PERSONA** — pain-trigger name, never demographic (from Persona Context)
- **AWARENESS STAGE** — problem-aware, solution-aware, or product-aware
- **THREE SELVES TARGET** — Actual Self, Ideal Self, or Ought Self
- **PHOTOGRAPHY DIRECTION** — creator description, setting, lighting, expression
- **INTERACTIVE STICKER TYPE** — poll / question / countdown / none

#### Image generation prompt

```
INSTAGRAM SAFE ZONE — HARD CONSTRAINTS:

THE TOP 400 PIXELS MUST CONTAIN NO TEXT. Background only.
THE BOTTOM 400 PIXELS MUST CONTAIN NO TEXT. Background only.
THE LEFT AND RIGHT 150 PIXELS MUST CONTAIN NO TEXT.
Text only lives in the center area from y=400 to y=1520, x=150 to x=930.

BACKGROUND CONTINUITY:
The background surface is ONE CONTINUOUS PHOTOGRAPHIC PLANE extending to ALL FOUR EDGES of the 1080x1920 frame. The empty top/bottom zones are the SAME surface as the center, just without text.

DO NOT RENDER:
- A paper card, poster, or printed rectangle inset into the frame
- A visible border, frame, or edge between the center content and the top/bottom
- A shadow line suggesting the ad is an object on another surface
- A background-within-a-background

DO:
- Shoot as a single overhead photograph on ONE continuous surface.
- Text floats directly on the photographed surface.
- If content is sparse, let empty top/bottom be empty surface — do not invent a frame.

RENDER AT 1080x1920 (9:16 vertical).

You are generating an Instagram Story-style UGC ad for {{BRAND_NAME}}. The entire image IS an Instagram Story screen — the UGC footage fills the frame, with the Stories UI overlaid on top.

SCENE: {{CREATOR_DESCRIPTION — e.g. "A real woman, 28-35, natural lived-in skin with visible pores and freckles (celebrated, never smoothed), messy bun, wearing a cream knit sweater. Soft bathroom morning light. Holding [PRODUCT] up near her cheek, mid-sentence, warm expression. No glam, no filter, phone front-camera aesthetic."}} Shot on iPhone 15 Pro 24mm f/1.78.

IG STORY UI CHECKLIST (render ALL of these):
- Top: story progress bar segments (thin white lines with gaps between them, spanning the full width near the very top of the frame)
- Below progress bar: small circular profile picture + username "{{BRAND_HANDLE}}" + timestamp "{{TIMESTAMP — e.g. 2h}}" + three-dot menu icon, all in a horizontal row
- Caption sticker: Stories-style text sticker with rounded-rectangle translucent background, positioned in the upper-center area of the frame. Text is white or brand-tinted. Sticker is slightly off-center — hand-placed feel, not mechanically centered
- {{INTERACTIVE_STICKER — if poll: render a poll sticker with question text and two tappable option pills. If question: render a question sticker with "Ask me a question" header and text input field. If countdown: render a countdown sticker with event name and timer. If none: omit this element}}
- Bottom: "Send message" text input bar spanning the width with a paper plane share icon on the right side

COPY TO RENDER:
Caption sticker (white or brand-tinted text on translucent rounded-rectangle sticker, hand-placed feel): "{{HOOK — under 10 words}}"
Profile header: {{BRAND_HANDLE}} · {{TIMESTAMP}}
{{If interactive sticker — Poll question: "{{POLL_QUESTION}}" with options "{{OPTION_1}}" / "{{OPTION_2}}"}}
{{If interactive sticker — Question prompt: "{{QUESTION_TEXT}}"}}
{{If interactive sticker — Countdown: "{{EVENT_NAME}}" with timer display}}

EXCEPTIONS TO BRAND RULES: The IG Story UI uses native Stories sticker shapes and fonts — intentional platform fidelity. The brand CTA is REPLACED by the Stories UI in this format (no separate brand CTA button). The "Send message" bar IS the conversion mechanism.

PRODUCT FIDELITY: Match the uploaded product reference exactly. Product held near the creator's face or clearly visible in frame, label legible.
REAL SKIN: Visible pores, freckles, natural lines, natural skin texture. Never smoothed. No ring light. No glamour lighting. The entire format fails if the person looks AI-generated.

PRODUCT FIDELITY: Match the uploaded product reference exactly. Do not restyle. Do not swap proportions.
NO ANTI-AI SLIPS: film grain visible, no hyper-smooth surfaces.
NO DASHES OR HYPHENS in rendered copy. Periods only.
```

#### Variation vectors

| Vector | Options |
|---|---|
| Creator type | young woman morning routine / mid-30s woman kitchen / woman at gym / woman at desk / woman outdoors |
| Creator expression | mid-sentence excited / calm knowing smile / surprised reaction / earnest recommendation |
| Interactive sticker | poll ("Did you know this?" Yes / Tell me more) / question ("ask me about my routine") / countdown ("RESTOCK DROPS IN 2 DAYS") / none |
| Product visibility | held near face / on counter beside creator / in hand showing label / being applied |
| Environment | bathroom morning light / kitchen natural light / bedroom evening / outdoor natural |

#### Pro tips

- The progress bar segments at the top are a strong authenticity signal. If there are 3-5 segments with one highlighted, it implies the brand posts Stories regularly -- more believable than a single segment.
- Poll stickers with a slightly skewed vote ratio (73% / 27%) look more real than clean splits (50/50 or 80/20).
- The "Send message" bar at the bottom is critical -- it's the most recognizable Stories UI element. If GPT drops it, emphasize it in the next iteration.
- Caption sticker placement should be slightly off-center and rotated 1-2 degrees if the prompt supports it. Perfectly centered text stickers look designed, not creator-placed.

---

## Global rules for UGC TikTok format

- **Creator descriptions must be specific.** "A woman holding the product" fails. Describe age range, skin texture ("visible pores and freckles, celebrated, never smoothed"), hair, clothing, setting, lighting, expression, camera angle. The specificity is what makes GPT render a real person instead of a stock photo.
- **Engagement numbers must feel real.** Use non-round numbers. 1,203 comments, not 1,200. 24.2K hearts, not 25K. 874 hearts, not 900. Big round numbers read as fake to anyone who uses the platform.
- **Platform UI must be complete.** Missing UI elements break the illusion instantly. Every element in the checklist must be rendered. If GPT drops one on the first pass, add explicit emphasis on the missing element in the next iteration -- call it out by name and position.
- **No brand CTA button.** The platform UI IS the CTA. Adding a brand-styled button on top of a TikTok or IG Story screen breaks platform fidelity and kills the native feel.
- **Camera spec: iPhone 15 Pro 24mm f/1.78.** Always. This format is unproduced by definition -- any studio lens (85mm, 50mm) destroys the UGC illusion.
- **Real skin is non-negotiable.** Visible pores, freckles, natural lines, natural skin texture. Never smoothed. No ring light. No glamour lighting. The whole format fails if the person looks AI-generated. This is the hardest thing for image models to get right and the first thing viewers detect.
- **One platform per image.** Never mix TikTok and IG Story UI elements in the same image. Each style is a distinct platform -- cross-contamination (e.g., TikTok interaction column on an IG Story) is an instant fail.
- **Product must be visible and legible.** The product grounds the UGC as an ad. Without it, the image is just a social media screenshot. Product label should be readable even at thumbnail scale.

## Compliance

Copy quality rules: [[Creative Image Ad Criteria]] + [[Headline & Text Hook Criteria]] + [[Universal Copy Rules]]. UGC-style claims are still claims -- a creator "testimonial" in the caption must pass brand compliance/guardrails the same way a quote card testimonial would. This template handles rendering only.

**Model supported:** GPT Image 2 only. NB2 cannot render realistic skin texture or platform UI elements.
