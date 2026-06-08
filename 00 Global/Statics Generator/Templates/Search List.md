# Search List

NB2 format template. Mimics a Google search autocomplete UI on a clean background. The search query reflects the viewer's exact question, and the autocomplete suggestions surface features as answers. A phone showing the product/quiz below the search bar bridges from search to action.

**Copy quality rules:** [[Creative Image Ad Criteria]] + [[Headline & Text Hook Criteria]] + [[Universal Copy Rules]]. This template handles rendering only.

**Prompt assembly:** Every prompt must include all items from the Prompt Assembly Checklist in [[Overview]].

**Scoring gate:** Copy must pass all 7 scoring dimensions at 90+ before generation. See `00 Global/Statics Generator/Scoring Agents/`.

**Models supported:** Both — NB2 and GPT Image 2. Model auto-selected per brief content.

---

## Format Anatomy

```
┌──────────────────────────────────┐
│  [BRAND LOGO]                    │
│                                  │
│  ┌────────────────────────────┐  │
│  │ 🔍 [SEARCH QUERY]    🎤 📷│  │  ← Google search bar
│  ├────────────────────────────┤  │
│  │ 🔍 [SUGGESTION 1]         │  │  ← autocomplete dropdown
│  │ 🔍 [SUGGESTION 2]  **kw** │  │     bold keywords per line
│  │ 🔍 [SUGGESTION 3]  **kw** │  │
│  │ 🔍 [SUGGESTION 4]  **kw** │  │
│  │ 🔍 [SUGGESTION 5]  **kw** │  │
│  └────────────────────────────┘  │
│                                  │
│          ┌──────────┐            │
│          │          │            │  ← phone showing quiz/product
│          │  (phone  │            │
│          │  screen) │            │
│          │          │            │
│          └──────────┘            │
│                                  │
│   [Pay1] [Pay2] [Pay3] [Pay4]   │  ← payment badges
│                                  │
│  ┌────────────────────────────┐  │
│  │        [CTA BUTTON]        │  │  ← full-width brand-color button
│  └────────────────────────────┘  │
│                                  │
│   (fine print disclaimer)        │
└──────────────────────────────────┘
```

Three zones from top to bottom:
1. **Search zone:** Brand logo + search bar + autocomplete — the hook. Each suggestion is a self-identification moment.
2. **Bridge zone:** Phone showing the product/quiz — makes the search tangible and actionable.
3. **Conversion zone:** Payment badges + CTA button + disclaimer — drives the click.

---

## Copy Template

```
[SEARCH QUERY] - 4-8 words. A realistic Google search someone would type. Lowercase,
                 natural phrasing, no punctuation. Must include the category name.

[SUGGESTION 1] - Repeat of the search query (Google always shows the exact match first)
[SUGGESTION 2] - Category + key differentiator (bold the differentiator keyword)
[SUGGESTION 3] - Category + key differentiator (bold the differentiator keyword)
[SUGGESTION 4] - Category + price signal (bold the price keyword)
[SUGGESTION 5] - Category + unique inclusion (bold the inclusion keyword)

Each suggestion must be a plausible Google autocomplete — something real people search.
Bold keywords (**no insurance**, **near me**, **$0 down**, **free bloodwork**) signal
the feature that differentiates this suggestion from the others.

[PAYMENT BADGES] - 3-4 payment providers or trust signals.

[CTA] - 3-5 words. Action-oriented. Rendered as a full-width button.
```

## Strategic Inputs

```
[BRAND NAME]
[BRAND LOGO TREATMENT] - text wordmark (specify color + font) or logo image
[SERVICE/PRODUCT]
[PERSONA from Creative Strategy Matrix]
[AWARENESS STAGE] - most effective at Problem-Aware and Solution-Aware
[THREE SELVES target]
[PHONE SCREEN CONTENT] - quiz page / product page / results page / care plan
[BACKGROUND COLOR] - solid warm neutral (cream, beige) or solid light brand color
```

---

## NB2 Image Generation Prompt

```
Create a static ad using a Google search autocomplete UI layout. 1080x1920, 9:16 vertical.

CRITICAL: The search bar and autocomplete must look like real Google search UI — accurate
icons, font sizing, spacing, and behavior. The autocomplete suggestions must be realistic
search queries with selectively bolded keywords.

BACKGROUND:
Clean solid background color: [BACKGROUND COLOR]. NO lifestyle photography, no texture,
no gradient. The simplicity of the solid background is what makes the search UI feel real
and native. The entire frame is this solid color except for the overlaid elements.

BRAND LOGO:
[BRAND NAME] wordmark in the brand's primary color, positioned top-left between y=50 and
y=120. Reference the uploaded Brand Spec Card for exact logo treatment. The logo anchors
brand identity but doesn't dominate.

SEARCH BAR:
Positioned between y=200 and y=300. A white rounded-rectangle search bar that accurately
mimics Google's search input:
- Magnifying glass search icon on the left (gray, ~20px)
- Search query text: "[SEARCH QUERY]" in regular-weight sans-serif, 20-24px, dark gray
- Text cursor blinking at the end of the query
- Microphone icon and camera/lens icon on the right (gray, ~20px each)
- White background (#ffffff), subtle shadow (0 2px 6px rgba(0,0,0,0.1))
- Rounded corners (24px radius — Google's pill shape)
- Width: ~920px, centered

AUTOCOMPLETE DROPDOWN:
Directly below the search bar (no gap), between y=300 and y=720. A white card continuing
from the search bar with the same width and shadow:

Each suggestion line (~70-80px height):
- Small gray magnifying glass icon on the left
- Suggestion text in regular sans-serif, 18-22px
- Selectively bolded keywords per the copy template
- Thin gray divider line (1px, #e8e8e8) between each suggestion
- Bottom of the dropdown has rounded bottom corners matching the search bar

Suggestions:
1. "[SUGGESTION 1]"
2. "[SUGGESTION 2]" — with **bold keyword**
3. "[SUGGESTION 3]" — with **bold keyword**
4. "[SUGGESTION 4]" — with **bold keyword**
5. "[SUGGESTION 5]" — with **bold keyword**

The first suggestion matches the typed query exactly (no bold). Subsequent suggestions
have one or two keywords bolded (rendered in a heavier weight) to signal the unique
feature each suggestion surfaces.

PHONE WITH SCREEN:
Between y=780 and y=1250. A realistic smartphone held by real hands, angled slightly
(5-10 degrees). The phone screen shows [PHONE SCREEN CONTENT] — a quiz landing page,
product page, or results screen branded with [BRAND NAME]. The hands are real and natural —
photographed, not rendered. The phone bridges from "searching" to "doing."

PAYMENT BADGES:
Between y=1280 and y=1370. Four pill badges in a horizontal row: [PAYMENT BADGES].
Brand-colored background (primary brand color) with white text. Pill-shaped, evenly
spaced across the safe zone width.

CTA BUTTON:
Full-width brand-colored button between y=1400 and y=1490. "[CTA]" in white text,
brand's headline font, 26-32px. Rounded corners (12-16px). The button spans nearly the
full safe zone width (~880px). Brand primary color background.

DISCLAIMER:
Fine print at y=1780-1900, dark text at 50% opacity on the light background.

SAFE ZONES:
Top 270px clear. Bottom 340px clear. Left 40px. Right 120px from y=600.
Primary content zone: x=40 to x=960, y=270 to y=1580.

TYPOGRAPHY:
- Brand logo: brand font per Brand Spec Card
- Search bar + autocomplete: system sans-serif mimicking Google's font (similar to
  Roboto or Product Sans). Regular weight with selective bold for keywords.
- Payment badges: brand font, medium weight, ALL CAPS
- CTA button: brand headline font, semibold or bold
- Disclaimer: brand body font, light weight

COLOR:
The background color anchors the entire palette. The search UI is white. Payment badges
and CTA button use the brand's primary color. Bolded keywords in the autocomplete are
darker/heavier but same color as the regular text. Minimal color — the content hierarchy
comes from typography weight and size, not from color variety.

MOOD:
Informational and native. The viewer has typed this exact search before — the autocomplete
reflects their own curiosity. The clean background and real Google UI create trust. The
phone grounds the search in action. The overall feel: "the algorithm surfaced exactly what
you needed, and here's the answer."

REFERENCE IMAGES:
Brand Spec Card + [composition reference from a winning search list ad].
```

#### GPT Image 2 Prompt

**Model preference:** GPT only (platform UI rendering requires precise text fidelity)

Prepend the E+ Safe Zone Block from [[GPT Image 2 Block]] before this prompt.

```
SCENE:
Clean solid background color: [BACKGROUND COLOR]. No lifestyle photography, no texture, no
gradient. The simplicity of the solid background is what makes the search UI feel real and
native. Shot as a single overhead photograph on one continuous surface. 1080x1920, 9:16 vertical.
Camera spec: 85mm f/1.8 for the phone/product elements below the search UI.

TYPOGRAPHY:
All text renders inside the GPT safe zone (y=400 to y=1520, x=150 to x=930).

Brand logo: [BRAND NAME] wordmark in brand's primary color, top-left of the safe zone. Per
Brand Spec Card.

Search bar: White rounded-rectangle (#ffffff), subtle shadow (0 2px 6px rgba(0,0,0,0.1)),
rounded corners (24px — Google's pill shape). Width ~780px, centered.
- Gray magnifying glass icon on the left (~20px)
- "[SEARCH QUERY]" in regular-weight sans-serif (Roboto or similar), 20-24px, dark gray
- Text cursor blinking at end of query
- Microphone icon and camera/lens icon on the right (gray, ~20px each)

Autocomplete dropdown: Directly below the search bar (no gap), same width and shadow. White
card with rounded bottom corners:
1. "[SUGGESTION 1]" — no bold (exact match of typed query)
2. "[SUGGESTION 2]" — with **bold keyword**
3. "[SUGGESTION 3]" — with **bold keyword**
4. "[SUGGESTION 4]" — with **bold keyword**
5. "[SUGGESTION 5]" — with **bold keyword**
Each line ~70-80px height. Small gray magnifying glass icon on the left. Regular sans-serif,
18-22px. Thin gray divider (1px, #e8e8e8) between suggestions. Bold keywords rendered in
heavier weight, same color.

Phone with screen: Below the autocomplete. A realistic smartphone showing [PHONE SCREEN CONTENT]
branded with [BRAND NAME]. Phone angled slightly (5-10 degrees). If hands are shown, they
must look real and natural. Camera spec for phone: iPhone 15 Pro 24mm f/1.78 — the phone
itself should feel like a photograph of a real device.

Payment badges: [PAYMENT BADGES]. Four pill badges — brand-colored background (primary brand
color) with white text. Pill-shaped, evenly spaced.

CTA button: Full-width brand-colored button. "[CTA]" in white text, brand headline font,
26-32px. Rounded corners (12-16px). Brand primary color background. Width ~780px, centered.

COPY TO RENDER:
- Logo: [BRAND NAME]
- Search query: "[SEARCH QUERY]"
- Suggestion 1: "[SUGGESTION 1]"
- Suggestion 2: "[SUGGESTION 2]" with bold on [keyword]
- Suggestion 3: "[SUGGESTION 3]" with bold on [keyword]
- Suggestion 4: "[SUGGESTION 4]" with bold on [keyword]
- Suggestion 5: "[SUGGESTION 5]" with bold on [keyword]
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
| Background color | warm cream (#f5f0e8) / light brand color / soft gray (#f5f5f5) / warm beige (#f0ece4) / pale sage (#e8ede8) |
| Search query | category question ("am I eligible for...") / feature search ("...no insurance") / price search ("affordable...") / location search ("...near me") |
| Bold keyword strategy | one bold keyword per suggestion / two bold keywords per suggestion / bold only on feature differentiators / bold only on price/free signals |
| Phone screen | quiz landing page / results page ("you qualify") / care plan overview / product/service page |
| Phone presentation | held by hands (angled) / flat on surface (overhead) / floating without hands (clean) / phone frame only (no hands) |
| CTA button style | full-width brand color / outlined with brand color / rounded pill / rectangular with sharp corners |

---

## What Makes This Format Work

- **Search recognition:** Everyone has typed a query like this. The autocomplete triggers "I've been here" recognition, bypassing ad skepticism.
- **Self-identification through suggestions:** Each autocomplete line is a pain point or need. The viewer scans and counts how many apply to them — same psychology as the symptom scatter format but in a UI context.
- **Bold keywords as feature selling:** The selectively bolded terms (**no insurance**, **$0 down**, **free bloodwork**) communicate features without needing a features list. The bold treatment makes them pop even on a fast scroll.
- **Clean background = trust:** The solid background makes the search UI feel real. A busy lifestyle photo behind a search bar breaks the illusion. Simplicity signals credibility.
- **Phone as action bridge:** The phone showing the quiz/product page makes the transition from "searching" to "doing" feel inevitable. The viewer sees the next step before they've decided to take it.
- **Duplicate suggestion removal:** Avoid repeating the same keyword phrase in multiple suggestions (e.g., "no insurance" twice). Each suggestion should surface a DIFFERENT feature or angle to maximize the self-identification surface area.