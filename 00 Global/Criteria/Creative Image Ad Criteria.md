---
cssclasses:
  - table-wide
  - wide
---
# Creative Image Ad Criteria

Rules for designed/creative image ads — ads where the image is a designed creative piece, not a native screenshot. Includes Headline + Image, Us vs Them, Features & Benefits, and Branded Comparison layouts. Apply on top of [[Universal Copy Rules]].

Derived from Lifeforce T002 and GrowthPod portfolio patterns.

---

## Headlines

- **8-12 words max, average ~10.** The headline's only job is to stop the scroll.
- **Name the experience, not the mechanism.** "Night Sweats Since 41. Three Doctors. Zero Hormone Tests." names an experience. "50+ Biomarkers. A Real Clinician." is a feature list. The headline makes the viewer feel seen.
- The headline does NOT carry the mechanism. That's the subheading's job.
- Build 12-headline vaults per concept. Pick 3 for testing. Variety in type and register across picks.
- Use [[Headline & Text Hook Criteria]] for type variety (Provocation, VoC Hook, Reframe, Confrontational Command, Alternative Callout, Problem-Only, Conditional, Mechanism Contrast, etc.) — that doc is the canonical source for hook definition, 18 core types, and 3 registers.
- Bold headline dominates the top of the ad. Keep it to 8-15 words visually.

---

## Subheadings

- Always starts with the brand name followed by a period. "[Brand]. [Mechanism or differentiator]."
- Carries the mechanism or key differentiator that the headline intentionally left out.
- Under 10 words.
- Rotate 3 variants per concept for testing.

---

## Feature Pills

- **2-5 words max per pill.** "50+ biomarkers" not "50+ biomarkers tested at home every quarter."
- Think GrowthPod-style: "365-day guarantee," "Results in days," "22,000+ reviews." Scannable at a glance.
- **Benefit-forward, not feature-forward.** The pill should tell the viewer what they GET, not what the product HAS (when possible).
- 2-4 pills per ad. Don't clutter.

---

## In-Image CTA

- Part of the design, not the Meta platform button.
- **2-4 words.** Short, action-forward.
- Examples: "SHOP NOW," "TRY IT RISK-FREE," "Get Tested," "Start for $49," "See Your Biomarkers."
- Match the CTA to the offer for that ad. Don't use a generic CTA if there's a specific price point or action.
- Placed at the bottom of the ad.

---

## Image Direction

- The designer-facing brief contains one committed image direction. Multiple visual options belong in internal ideation, not in the brief.
- **Good creative images:** (1) represent the pain point as a visual metaphor, (2) isolate a specific element of the problem and make it visceral, (3) use humor where it fits the audience, (4) aim for an immediate emotional reaction at first glance — curiosity, recognition, surprise, or laughter — before a single word is read.
- Format column = layout type (Headline + Image, Us vs Them, Features & Benefits, Branded Comparison).
- Image Direction column = the visual concept. Not the layout, not the copy.
- Must be formatted as bullet points in the brief — separate platform UI, image content, and style notes.
- Do NOT duplicate copy in the image direction. If copy appears in the image, write "text from the copy section" — don't repeat it.

---

## Creative Hero Pre-Pass

When the strategist explicitly requests creative image ideation or invokes `/creative-image`, run the optional hero-first workflow in `00 Global/Statics Generator/Creative Hero Workflow.md`.

- Ideate multiple metaphorical, personified, dramatized, or scenario-based hero visuals internally.
- Run the diversity gate against existing and in-progress ads before presenting options.
- Stop for strategist selection before rendering.
- Generate and approve the standalone hero image before final layout work.
- Feed the approved hero into the normal `/generate-static` composition pipeline as a reference.
- The final layout may use any appropriate existing template, including infographic and educational formats.
- Do not auto-route ordinary static briefs into this workflow.

---

## Category Clarity

Every static ad must answer "what is being sold?" through the headline + subheading + hero combo — before the viewer reads a single line of primary text. On feed, the primary text is often collapsed or skipped.

- **The test:** Imagine the viewer sees only the image, no caption. Can they identify the category (supplement, weight loss care, sleep aid, financial service, etc.) within a half-second glance? If no, the ad fails category clarity.
- **Branded formats can lean on their anchors.** When the composition has a logo + a card/chart with category-specific copy (ingredient names, "care plan," "biomarkers," "diagnostic"), the headline is free to be abstract or VoC-driven. The anchor carries the category.
- **Unbranded formats can't.** Editorial layouts (pull-quote + lifestyle photo, no logo), native-screenshot formats, and variant posters without a clear product anchor MUST carry the category in the subheading. "Medical weight loss, personalized" is a category tag. "Provider-led care" is ambiguous.
- **Structural solves beat per-variation solves.** When a format ships with multiple headline variations and the card/chart is shared across variations, put the category as a small anchor line at the top of the card (e.g., "Medical weight loss" above the price). This protects every variation from losing category signal, independent of how abstract the headline gets.
- **Abstract + category-clear is the best combination.** An abstract headline earns the scroll-stop; the category anchor below it stops the viewer from scrolling past because they don't recognize the category.

---

## Ad-Unit Congruence

Every narrative element inside a static ad must tell the same story. The headline, the hero image, the VoC quote block (if present), and the subheading form a single message — not four adjacent messages.

- **The test:** Read headline + hero description + VoC quote + subheading as one sentence. Does it cohere, or does it jump between unrelated moments?
- **Common failure:** VoC quote and hero image describe different micro-moments. A headline about a seatbelt paired with a hero of a plane seat and a VoC quote about tying shoes on a stool is three moments stapled together. Viewers feel the incoherence even if they can't name it — the ad reads as "assembled" rather than authored.
- **Fix pattern:** Pick the strongest element (usually the hero image — it's the scroll-stop) and conform the others to it. If the hero is an airplane seatbelt, the VoC quote must be about an airplane seatbelt and the headline must reference the same moment. Don't hope the elements read as "thematically related."
- **Where this matters most:** Creative + Social VoC layouts that pair a hero image with a Reddit-style quote block. Any format with 3+ narrative surfaces has the same risk.
- **Swap rule:** If you change the hero for congruence, also check the subheading, card copy, and primary text hook — they often reference the original hero.

---

## Layout Types

### Headline + Image
- Bold headline at top. Subheading below. Feature pills. Product shot or conceptual image. CTA at bottom.
- The image is the emotional hook. The headline names the experience. The subheading delivers the mechanism.

### Us vs Them (Comparison)
- Split comparison. Left column muted/gray (competitor/status quo), right column brand colors (our product).
- 3-4 comparison rows.
- CTA at bottom.
- Proven converter — this format has the best ROAS in accounts that run it.

### Features & Benefits
- Feature pills arranged around a product shot or conceptual image.
- Benefit-forward framing.
- CTA at bottom.

### Branded Comparison
- Designed comparison card (not a native screenshot, not a conceptual creative).
- Two-column comparison with visual disparity making the winner obvious.
- Informational — the data tells the story.

---

## Designer Notes — Creative Images

- Designer notes are optional. Include them only when the selected hero needs execution-specific guidance that is not already captured in Image Direction.
- When the creative hero pre-pass was used, the approved hero concept is fixed. The designer may refine composition but must not replace the metaphor without strategist approval.
- The headline, feature pills, subheading, and CTA are fixed — don't change copy.

---

## Quality Checklist (Creative Image Ads)

1. Headline is 8-12 words and names an experience, not a mechanism
2. Subheading starts with brand name, carries the mechanism, under 10 words
3. 3 headline variations with type and register variety
4. 3 subheading variants
5. Feature pills are 2-5 words each, benefit-forward
6. 2-4 feature pills (not cluttered)
7. In-image CTA present, 2-4 words, matches the offer
8. Image direction is formatted as bullet points (platform UI, image content, style)
9. Image direction does not duplicate copy
10. Image concept aims for emotional reaction at first glance
11. Designer-facing Image Direction commits to one hero visual; internal ideation options are resolved before briefing
12. Designer notes included only when execution-specific guidance is needed
13. References section includes relevant top spender links only
14. Category clarity — headline + sub + hero combo answers "what is being sold?" on a half-second glance without primary text
