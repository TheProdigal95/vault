# Statics Generator — Implementation Log

Changes to the spec card system, generation prompts, and visual design language.

---

## 2026-06-01 — Creative Hero Pre-Pass

**What changed:** Added an optional `/creative-image` workflow for Creative Image static ads that need an original hero visual before final layout. The workflow deepens the angle, produces a diverse concept board, pauses for strategist selection, renders text-free hero variants through the existing fal.ai wrapper, and passes the approved hero into `/generate-static` as a composition reference.

**Why:** The existing generator is strong at final designed compositions but did not formalize the upstream visual-concept step used for metaphorical, personified, dramatized, and scenario-based hero images. The new workflow adds that step without replacing format templates or changing normal static routing.

**Routing rule:** The workflow is opt-in only. Ordinary static briefs continue through `/generate-static`. Any existing template, including infographic and educational formats, can be used after hero approval.

**Files added:**
- `Creative Hero Workflow.md`
- `Creative Hero Prompting Playbook.md`
- `.claude/commands/creative-image.md`
- `.agents/skills/source-command-creative-image/SKILL.md`
- `.claude/tools/add_to_canvas.js` — optional `--prompt-file` support for stable prompt nodes beside rendered variants

**Files updated:**
- `Overview.md`
- `.claude/commands/generate-static.md`
- `.agents/skills/source-command-generate-static/SKILL.md`
- `00 Global/Criteria/Creative Image Ad Criteria.md`
- `00 Global/Process/Brief Structure.md`
- `00 Global/Process/System Overview.md`
- `AGENTS.md`
- `CLAUDE.md`
- `GEMINI.md`

---

## 2026-04-25 — Spec Card Visual Design Language (v2)

**What changed:** Rewrote both spec card generation prompts (Brand Spec Card Prompt.md, Visual Style Card Prompt.md) to encode a concrete visual design language. Previously the prompts specified content structure (what sections to include) but not visual rendering (how those sections should look). This caused v1 cards to render as dense documentation pages instead of clean visual reference cards.

**Why:** v1 Lifeforce cards looked like style guide PDFs — small swatches, specs tables, slider bars, dense text blocks. Will Sartorius's Jones Road Beauty cards (the reference from Motion Foundations) use a different visual language: branded header bars, bordered cards with generous whitespace, large type specimens, tall color swatches, text-weight mood spectrums. The gap was that v1 encoded *content* but not *design* into the prompts.

**What the prompts now specify:**

- **Dark branded header bar** — brand's primary dark color, brand name uppercase left, card type + ref number right
- **Bordered cards** for content grouping (1px solid, brand's beige/light border color)
- **Numbered section labels** in small uppercase muted text with em-dash separators
- **Typography:** 3 primary role cards (headline, body, accent) + weight specimen grid + typeset composition block showing all elements together
- **Color swatches:** 160px tall in 5-column grid + accessible text/background pairing boxes
- **Design rules:** arrow/× markers, 5+5 minimum, one rule per line
- **CTA buttons:** real brand CTAs pulled from website/ads, not generic × 3; specs annotation row below
- **Photography direction:** text-first cards with outlined pills at bottom (not pill-first with filled pills)
- **Mood spectrum:** text-weight rendering (bold/large = active, faded/small = extremes) instead of slider bars with gradient fills
- **Product styling:** conceptual sub-cards (THE BOTTLE, THE CAPSULES, THE CONTEXT) + structured specs table grid
- **Brandmark + lockup rendering** when the brand has an icon mark separate from the wordmark
- **Real brand copy** for all specimens — pull from manifesto, website, product pages. Never lorem ipsum or generic filler

**Content restored from v1 that was initially dropped in the v2 visual redesign:**

| Card | Restored Element |
|---|---|
| Brand Spec | Brandmark SVG + approved lockup rendering |
| Brand Spec | Additional weight specimens (Bradford Regular, Unica Light/Medium/Bold) |
| Brand Spec | Typeset composition block (overline + headline + body + CTA together) |
| Brand Spec | Accessible color pairing boxes (4 approved text/bg combos) |
| Brand Spec | CTA specs annotation row (font, case, spacing, radius, padding) |
| Brand Spec | 5+5 design rules (was 4+4) — restored wordmark color-context and letterform rules |
| Visual Style | Label typography details (product name font, category font) |
| Visual Style | Hero product pricing in specs table |
| Visual Style | Explicit "never flat-lay" and "never cold steel/glass" bans |
| Visual Style | Secondary products mention (same styling rules apply) |
| Visual Style | Structured product specs table alongside conceptual cards |

**Files modified:**
- `Brand Spec Card Prompt.md` — visual design language added to generation prompt + formatting rules
- `Visual Style Card Prompt.md` — visual design language added, mood spectrum changed from slider to text-weight, photography pills moved to bottom, product styling restructured
- `Lifeforce/00 Context/Brand Spec Card.png` — regenerated with v2 design
- `Lifeforce/00 Context/Visual Style Card.png` — regenerated with v2 design

**Reference:** Will Sartorius, Jones Road Beauty spec cards (Motion Foundations slide deck, April 2026)

---

## 2026-04-25 — Actual Assets Over SVG Approximations

**What changed:** Updated Brand Spec Card Prompt to encode the principle that complex brand visuals (gradient-heavy marks, data visualizations, multi-shape compositions) must use actual extracted images via `<img>` tags, not hand-drawn SVG approximations.

**Why:** SVG approximations of complex brand visuals (e.g., Lifeforce's Lifescore — three overlapping organic cellular shapes with gradient fills) consistently fail to match the original. The AI model that sees these spec cards needs the real brand asset to reproduce it faithfully. Simple geometric shapes (uniform-stroke icons, rectangles, circles) are fine as SVG; anything with gradients, organic shapes, or photographic elements must be the real thing.

**Rule encoded in the prompt:**
- Section 5 (Brand-Specific Visual Elements) → Signature data visualization: extract and embed via `<img>`, don't approximate
- Formatting rules: new "Actual assets over SVG approximations" rule with the complexity threshold (gradients/organic shapes/photographic = real asset; simple geometry = SVG OK)
- Extracted images saved to `/tmp/` alongside the HTML so Playwright resolves relative paths

**Files modified:**
- `Brand Spec Card Prompt.md` — updated Section 5 guidance + added formatting rule
- `Lifeforce/00 Context/Brand Spec Card.png` — regenerated with actual Lifescore PNG replacing SVG approximation
