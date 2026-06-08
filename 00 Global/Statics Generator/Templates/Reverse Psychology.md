# Reverse Psychology

NB2 format template. Uses a giant provocative "don't do this" headline that dominates the upper frame, product imagery as a visual bridge, then a pivot ("Unless you want:") that flips the reverse psychology into a benefit checklist. The viewer reads the dare, recognizes it's exactly what they want, and the checklist confirms it.

**Copy quality rules:** [[Creative Image Ad Criteria]] + [[Headline & Text Hook Criteria]] + [[Universal Copy Rules]]. This template handles rendering only.

**Prompt assembly:** Every prompt must include all items from the Prompt Assembly Checklist in [[Overview]].

**Scoring gate:** Copy must pass all 7 scoring dimensions at 90+ before generation. See `00 Global/Statics Generator/Scoring Agents/`.

**Models supported:** Both — NB2 and GPT Image 2. Model auto-selected per brief content.

---

## Format Anatomy

```
┌──────────────────────────────────┐
│       [BRAND LOGO]               │
│                                  │
│   ██████████████████████████     │
│   ██  [GIANT HEADLINE]   ██     │  ← massive condensed type
│   ██  fills ~45% of      ██     │     dominates the frame
│   ██  the frame          ██     │     4-6 words max
│   ██████████████████████████     │
│                                  │
│        ╭─── ───╮                │
│       (  product  )              │  ← product photo or product + phone
│        ( imagery )               │     overlaps bottom of headline
│        ╰─── ───╯                │
│                                  │
│   Unless you want:               │  ← pivot line (flips the dare)
│                                  │
│   ┌────────────────────────────┐ │
│   │ ✓  [BENEFIT 1]            │ │  ← pill-shaped benefit bullets
│   └────────────────────────────┘ │
│   ┌────────────────────────────┐ │
│   │ ✓  [BENEFIT 2]            │ │
│   └────────────────────────────┘ │
│   ┌────────────────────────────┐ │
│   │ ✓  [BENEFIT 3]            │ │
│   └────────────────────────────┘ │
│                                  │
│   [Pay1] [Pay2] [Pay3] [Pay4]   │  ← payment badges
│                                  │
│   ┌────────────────────────────┐ │
│   │        [CTA BUTTON]        │ │  ← full-width brand-color button
│   └────────────────────────────┘ │
│                                  │
│   (fine print disclaimer)        │
└──────────────────────────────────┘
```

Three zones from top to bottom:
1. **Dare zone:** Brand logo + giant reverse-psychology headline — the pattern interrupt. The headline is so large it IS the composition. The viewer reads it as a challenge directed at them.
2. **Bridge zone:** Product imagery (capsules, packaging, phone with quiz) overlapping the bottom of the headline — makes the abstract dare concrete. The "Unless you want:" pivot line flips the challenge into desire.
3. **Proof zone:** Benefit checklist pills + payment badges + CTA — delivers the payoff. Each benefit is the answer to "why would I take the quiz?"

---

## Copy Template

```
[HEADLINE] - 3-6 words. A provocative reverse-psychology dare. ALL CAPS, massive type.
             Must work as a pattern interrupt — the viewer stops because they're told
             NOT to do the exact thing the ad wants them to do. Formats:
             "DON'T [ACTION]" / "STOP [ACTION]" / "WHATEVER YOU DO, DON'T [ACTION]"
             The action must be the brand's core conversion action (take the quiz,
             check your eligibility, try this, etc.).

[PIVOT LINE] - 3-5 words. The turn that flips the dare. Always starts with "Unless"
               or equivalent ("...except if", "...but if you want:"). Sentence case,
               much smaller than the headline. This line does the emotional judo —
               it gives the viewer permission to want the thing they were dared
               not to do.

[BENEFIT 1] - 5-10 words. The primary value proposition. What the viewer gets if they
              "disobey" the dare. Rendered as a pill-shaped badge with checkmark.
[BENEFIT 2] - 5-10 words. A friction-remover or objection-killer. Something that makes
              the action easier than expected.
[BENEFIT 3] - 2-5 words. The price/access signal. Short and punchy — the final push.

Each benefit must be a DIFFERENT type of value:
- Benefit 1 = what you get (outcome)
- Benefit 2 = what you don't need (barrier removed)
- Benefit 3 = what it costs (price anchor)

[PAYMENT BADGES] - 3-4 payment providers or trust signals.

[CTA] - 2-5 words. Must echo the dare's action — if the headline says "Don't Take
        This Quiz," the CTA says "Take the Quiz." The symmetry is the punchline.
```

## Strategic Inputs

```
[BRAND NAME]
[BRAND LOGO TREATMENT] - logo image or text wordmark (specify color + font)
[CORE CONVERSION ACTION] - "take the quiz" / "check eligibility" / "try this" / etc.
[HERO IMAGERY] - the product, device, ingredient, or benefit-related visual at bridge
                  scale. Could be physical product (bottles, packaging, food), a device
                  (phone with quiz, app screen), ingredients, or any tangible visual that
                  grounds the dare in something real.
[PERSONA from Creative Strategy Matrix]
[AWARENESS STAGE] - most effective at Solution-Aware and Product-Aware
[THREE SELVES target]
[BACKGROUND COLOR] - off-white or warm cream (clean, minimal — the headline IS the design)
[BENEFIT PILL COLOR] - brand primary color for pill backgrounds
```

---

## NB2 Image Generation Prompt

```
Create a static ad using a reverse psychology headline layout. 1080x1920, 9:16 vertical.

CRITICAL: The headline must be MASSIVE — it dominates the upper 45-50% of the frame.
Think billboard typography. The letters should be so large they feel architectural, not
typographic. The product imagery overlaps the bottom edge of the headline text, bridging
into the benefit section below.

BACKGROUND:
Clean solid background: [BACKGROUND COLOR]. Off-white (#fafaf8), warm cream (#f5f0eb),
or very light warm gray (#f2f0ed). NO photography as background, no gradients, no texture.
The simplicity of the background is what makes the giant typography and product imagery
pop. The entire frame is this solid color with elements laid on top.

BRAND LOGO:
[BRAND NAME] logo centered at the top, between y=60 and y=130. Use the brand's standard
logo treatment per the Brand Spec Card. Small relative to the headline — the logo identifies,
the headline dominates.

HEADLINE:
"[HEADLINE]" in massive condensed bold/black type, between y=140 and y=700. This text
fills the full width of the safe zone and stacks 3-4 lines tall. The type is:
- ALL CAPS
- Condensed or compressed width (letters are tall and narrow)
- Black/extra-bold weight
- Dark color (#1a1a1a or brand dark color)
- Font: brand headline font in its heaviest weight, or Impact/condensed gothic if the
  brand font doesn't have a compressed variant
- Size: 80-120px — as large as possible while fitting the words
- Tight line spacing (0.9-1.0x) — the lines stack with minimal gap
- Left-aligned or centered depending on word count

The headline should feel like it's SHOUTING at the viewer. The scale is the pattern
interrupt.

HERO IMAGERY:
Between y=580 and y=850, overlapping the bottom 1-2 lines of the headline text.
[HERO IMAGERY] — rendered as real product photography with natural shadows and depth.

The imagery must overlap the headline text, partially obscuring the bottom 1-2 lines.
This overlap creates physical depth — the product sits ON TOP of the dare, grounding
the abstract provocation in something tangible. The imagery should feel casually placed,
not rigidly arranged: scattered, angled, or piled naturally.

Examples by category:
- Supplements/pharma: scattered capsules, pill bottles, branded packaging
- Food/beverage: product containers, ingredients, prepared food
- Tech/app: phone showing the product screen, device at an angle
- Skincare/beauty: product bottles, tubes, jars with texture visible
- Service: phone showing quiz/booking page, branded materials

If combining a device with physical product (e.g., phone + scattered items around it),
the device is primary and the physical items are secondary accents.

The hero imagery is the visual proof that this dare is about something real.

PIVOT LINE:
"[PIVOT LINE]" between y=870 and y=930. Left-aligned or centered. Light/regular weight
sans-serif, 28-34px, dark text. Sentence case. This line is deliberately understated
compared to the headline — the contrast in scale IS the joke. A colon at the end signals
the list that follows.

BENEFIT PILLS:
Three pill-shaped badges stacked vertically between y=950 and y=1270, each ~90-100px tall:

Pill 1: "✓ [BENEFIT 1]"
Pill 2: "✓ [BENEFIT 2]"
Pill 3: "✓ [BENEFIT 3]"

Each pill: [BENEFIT PILL COLOR] background (brand primary), white checkmark icon on the
left (~24px), white text in brand font medium/semibold weight, 22-28px. Rounded pill shape
(full border-radius, ~45-50px). Width: ~880px, centered. Vertical gap between pills: 16-20px.

The checkmarks signal "you get this" — the visual inverse of the dare's "don't."

PAYMENT BADGES:
Between y=1300 and y=1380. Four pill badges: [PAYMENT BADGES]. Outlined style — thin dark
border, no fill or very light fill, dark text. Rounded pill shape, evenly spaced. These are
subtle and secondary — smaller than the benefit pills.

CTA BUTTON:
Full-width brand-colored button between y=1410 and y=1500. "[CTA]" in white text, brand
headline font, 26-32px. Rounded corners (12-16px) or full pill shape. Brand primary color
background. Width ~880px, centered. The CTA echoes the dare — "Take the Quiz" mirrors
"Don't Take This Quiz."

DISCLAIMER:
Fine print at y=1780-1900, dark text at 50% opacity on the light background.

SAFE ZONES:
Top 270px clear. Bottom 340px clear. Left 40px. Right 120px from y=600.
Primary content zone: x=40 to x=960, y=270 to y=1580.

TYPOGRAPHY:
- Brand logo: brand font per Brand Spec Card
- Headline: brand headline font at heaviest available weight, compressed/condensed. If
  the brand font doesn't go heavy enough, use a condensed gothic (Impact, Bebas Neue,
  or similar massive condensed face). The weight must be Black or ExtraBold minimum.
- Pivot line: brand body font, regular weight
- Benefit pills: brand font, medium or semibold, white on colored background
- Payment badges: brand font or system font, regular weight, small
- CTA button: brand headline font, semibold or bold
- Disclaimer: brand body font, light weight

COLOR:
The background is off-white/cream. The headline is near-black or brand dark color. The
product imagery introduces the brand's primary color (teal capsules, colored packaging).
The benefit pills are brand primary color with white text. The CTA button matches the
benefit pills. Payment badges are outlined/neutral. The palette is deliberately restrained:
light background + dark headline + one brand accent color. No gradients, no multi-color
sections.

MOOD:
Playful defiance. The giant headline is a dare — it's provocative but not aggressive, more
"I dare you" than "don't you dare." The product imagery grounds it in reality. The pivot
line is the wink — "unless you want..." The benefit checklist is the payoff. The clean
background and massive type give it billboard confidence. The overall feel: "we both know
you're going to take this quiz."

REFERENCE IMAGES:
Brand Spec Card + [composition reference from a winning reverse psychology ad].
```

#### GPT Image 2 Prompt

**Model preference:** Both (product-focused, no human subjects required)

Prepend the E+ Safe Zone Block from [[GPT Image 2 Block]] before this prompt.

```
SCENE:
Clean solid background: [BACKGROUND COLOR]. Off-white (#fafaf8), warm cream (#f5f0eb), or
very light warm gray (#f2f0ed). No photography, no gradients, no texture. Shot as a single
overhead photograph on one continuous surface. 1080x1920, 9:16 vertical.
Camera spec: 85mm f/1.8 for product elements — creamy bokeh on hero imagery, shallow depth
of field isolating the product from the flat background.

TYPOGRAPHY:
All text renders inside the GPT safe zone (y=400 to y=1520, x=150 to x=930).

Brand logo: [BRAND NAME] centered near the top of the safe zone. Small relative to headline.
Per Brand Spec Card.

Headline: "[HEADLINE]" in massive condensed bold/black type. ALL CAPS. Fills the full width
of the safe zone, stacks 3-4 lines. Condensed or compressed width — letters are tall and
narrow. Black/extra-bold weight, dark color (#1a1a1a or brand dark). Size: 80-120px. Tight
line spacing (0.9-1.0x). The headline dominates the upper portion of the safe zone. It should
feel like it is SHOUTING at the viewer.

Hero imagery: [HERO IMAGERY] — real product photography with natural shadows and depth.
Overlapping the bottom 1-2 lines of the headline text, creating physical depth. Casually
placed, not rigidly arranged: scattered, angled, or piled naturally.

Pivot line: "[PIVOT LINE]" below the hero imagery. Light/regular weight sans-serif, 28-34px,
dark text. Sentence case. Deliberately understated compared to the headline — the contrast
in scale IS the joke.

Three benefit pills stacked vertically, each ~90-100px tall:
- "✓ [BENEFIT 1]"
- "✓ [BENEFIT 2]"
- "✓ [BENEFIT 3]"
[BENEFIT PILL COLOR] background (brand primary), white checkmark on the left (~24px), white
text in brand font medium/semibold, 22-28px. Full pill border-radius (~45-50px). Width ~780px,
centered. Gap between pills: 16-20px.

Payment badges: [PAYMENT BADGES]. Four outlined pill badges — thin dark border, no fill or
very light fill, dark text. Subtle and secondary.

CTA button: Full-width brand-colored button. "[CTA]" in white text, brand headline font,
26-32px. Rounded corners (12-16px). Brand primary color background. Width ~780px, centered.

COPY TO RENDER:
- Logo: [BRAND NAME]
- Headline: "[HEADLINE]"
- Pivot line: "[PIVOT LINE]"
- Benefit 1: "✓ [BENEFIT 1]"
- Benefit 2: "✓ [BENEFIT 2]"
- Benefit 3: "✓ [BENEFIT 3]"
- Payment badges: [PAYMENT BADGES]
- CTA button: "[CTA]"
- Disclaimer: fine print at bottom of safe zone, dark text at 50% opacity

PRODUCT FIDELITY: Match the uploaded product reference exactly. Do not restyle. Do not swap proportions.
NO ANTI-AI SLIPS: film grain visible, no hyper-smooth surfaces.
NO DASHES OR HYPHENS in rendered copy. Periods only.
```

## Variation Vectors

| Vector | Options |
|---|---|
| Headline verb | "Don't [action]" / "Stop [action]" / "Whatever You Do, Don't [action]" / "You Probably Shouldn't [action]" |
| Hero imagery | physical product only / phone or device + product accents / packaging or containers / ingredients or materials / product-in-use context |
| Hero placement | overlapping headline bottom / floating between headline and pivot / scattered across full width at headline base / single centered object |
| Benefit pill count | 3 pills (standard) / 4 pills (more detail) / 2 pills (more punchy) |
| Benefit pill style | filled brand color + white text / outlined brand color + dark text / gradient fill + white text |
| Payment badge style | outlined pills / small text only / branded logo pills / frosted pills |
| CTA echo strategy | exact action echo ("Take the Quiz") / softened echo ("Start the Quiz") / urgency echo ("Take It Now") |
| Background warmth | cool off-white (#fafafa) / warm cream (#f5f0eb) / warm beige (#f0ece4) / pure white (#ffffff) |

---

## What Makes This Format Work

- **Pattern interrupt through contradiction:** "Don't take this quiz" is the opposite of what every other ad says. The viewer stops because the message conflicts with expectations — ads are supposed to sell you, not dare you not to buy.
- **Massive type as composition:** The headline IS the design. No hero image, no complex layout — just enormous words on a clean background. This gives it billboard energy that cuts through the visual noise of a feed.
- **Hero imagery as reality anchor:** The product or device overlapping the headline text creates literal depth — the dare is about something real, not abstract. The tangible imagery proves the stakes of the dare.
- **The pivot as emotional judo:** "Unless you want:" is the hinge. It takes the viewer from "I was told not to" to "but I DO want this." The small, casual typography of the pivot line contrasts with the screaming headline — it's a whisper after a shout.
- **Benefit checklist as permission:** After the dare and the pivot, the checkmarks give the viewer reasons to "disobey." Each benefit answers "why would I take the quiz?" in a different way — outcome, barrier removed, price.
- **CTA as punchline:** When the CTA echoes the headline's action ("Take the Quiz" after "Don't Take This Quiz"), it completes the joke. The viewer was dared not to, shown why they should, and now here's the button. The symmetry makes clicking feel inevitable.
- **Scale hierarchy drives reading order:** Giant headline → product bridge → small pivot → medium pills → CTA. The eye follows the size gradient downward without any explicit visual flow elements.
