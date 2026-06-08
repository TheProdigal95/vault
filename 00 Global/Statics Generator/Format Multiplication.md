# Format Multiplication

Take a winning brief and auto-rebrief across format templates. Same persona, same angle, same awareness stage, same Three Selves target, same core product truth — different visual format. Extends a winning concept's life across formats without new strategic work.

**Source:** Production efficiency layer built on top of Reach Digital's format template system and scoring agents. The strategic foundation is validated by performance data; multiplication only changes the packaging.

---

## Why Multiply Formats

- **Winning angles deserve more surface area.** A concept that works as a headline ad may also work as a testimonial, statistics, or features-and-benefits format. Each format reaches slightly different scroll behaviors and attention patterns.
- **Lower concepting cost per asset.** The expensive work (persona research, angle development, copy iteration, scoring) is done once. Multiplication is mechanical rebriefing, not creative development.
- **Format testing without strategic confounds.** When the same angle runs across multiple formats, performance differences isolate format impact from angle impact. Clean signal.

---

## The Workflow

### Input

- One approved winning brief (must have passed Concept Validation and scoring agents at 90+)
- List of target format templates from `00 Global/Statics Generator/Templates/`

### Step 1: Rebrief Across Formats

For each target template, Claude rewrites the brief to match that template's structure. What stays constant:

- **Persona** — same pain-trigger persona
- **Messaging angle** — same core truth from the Creative Strategy Matrix cell
- **Awareness stage** — same stage drives same expression tactics
- **Three Selves target** — same Actual/Ideal/Ought register
- **Core product truth** — same mechanism, same proof points, same VoC language

What changes:

- **Headline lengths and copy slots** — each format has different text constraints (headline-dominant vs. copy-heavy vs. minimal text)
- **Composition and layout** — product placement, text hierarchy, visual balance per the target template's rendering specs
- **Creative direction** — photography style, background treatment, supporting visuals adapted to the new format's visual requirements
- **CTA treatment** — button vs. pill vs. embedded vs. implied, per format conventions

Each rewritten brief is a complete brief per `00 Global/Process/Brief Structure.md` — not a sketch or shorthand.

### Step 2: Score Each Variant

Each rewritten brief runs through the scoring evaluator (7 dimensions). The 90+ threshold applies to every variant, same as originals. A format multiplication that degrades copy quality is not worth producing.

Dimension scores to watch especially closely on multiplied briefs:
- **Format Compliance** — the whole point is format fit; this score must be high
- **Copy Editor** — rebriefing can introduce banned constructions or pacing issues when copy is restructured
- **Persona Fit** — VoC language and pain-trigger framing must survive the repackaging

### Step 3: Convert to NB2 Prompts

Each passing brief gets converted to a NanoBanana 2 prompt using the target template's rendering specs. Same process as the standard generation pipeline: load brand spec cards, apply the template's composition rules, render all copy verbatim.

### Step 4: Generate Images

Generate via fal.ai NB2. 4 variants per prompt. Strategist picks the best.

---

## Differentiation Rule Exemption

Under normal batch production, the Concept Validation differentiation rule requires each concept to shift at least 2 of 4 axes (persona, angle, format, hook tactic) from every other concept. This prevents a batch full of near-identical concepts.

**Format Multiplication is explicitly exempt from this rule.** Multiplied variants shift only 1 axis (visual format) by design — that's the entire point. They are production efficiency, not creative diversity.

However:
- Multiplied variants ARE still counted in the Creative Diversity Audit's Format Spread dimension. If multiplication is creating format concentration (e.g., the batch ends up 80% headline ads because a headline winner got multiplied into 4 more headline styles), that's a portfolio balance problem.
- Multiplied variants DO NOT count as distinct concepts for the batch's creative diversity. A winning headline ad multiplied into 5 formats is still 1 concept for diversity purposes, with 5 format executions.

---

## Within-Format Multiplication

Multiplication also works within a single format's style variants. Not just "headline ad to testimonial ad" — also "headline Style A to headline Style B and Style C."

Example: a winning Style A headline ad (product hero composition) can be rebriefed into:
- Style B (lifestyle context composition) — same headline, same copy, different visual framing
- Style C (typography-dominant composition) — same headline, same copy, text takes the visual lead

Same logic applies: strategic foundation stays, visual packaging changes. Each variant runs through scoring. Each gets its own NB2 prompt.

Within-format multiplication is especially useful when a headline is the proven winner — testing whether the visual treatment or the copy is driving performance.

---

## Portfolio Balance Check

Before multiplying, check the batch's current format distribution. Multiplication should improve portfolio balance, not worsen it.

**Check against the Creative Diversity Audit's Format Spread dimension:**
- If the static portfolio is already heavy on one format (>50% concentration), multiplication should prioritize other formats
- If a format category is completely untested, that's a multiplication opportunity
- If the winning angle only exists in one format, multiplication tells you whether the angle or the format drove performance

**Decision flow:**
1. Run the Format Spread check on the current batch/portfolio
2. Identify underrepresented formats
3. Prioritize multiplication targets that fill gaps
4. Deprioritize multiplication into formats that are already concentrated

This check is advisory, not blocking. If the strategist wants to multiply a winner into an already-concentrated format for a specific reason, that's a valid call.

---

## Prompt Template

> I have a winning ad brief that I want to multiply across format templates. The original brief is below.
>
> [brief]
>
> Here are my format templates: [list].
>
> For EACH template: rewrite the brief to fit that format exactly. Keep the same persona, angle, awareness stage, Three Selves target, and core product truth. Rewrite copy to match the new format's structure. Adjust creative direction to match new format's visual requirements. Write a complete NB2 prompt for each. Do not change the strategic foundation — only change the packaging.

When using this prompt, also provide:
- The brand's spec cards (Brand Spec Card + Visual Style Card)
- The original brief's scoring report (so the evaluator can check that multiplied variants maintain quality)
- The batch's current format distribution (so portfolio balance can be checked)

---

## What Multiplication Is Not

- **Not creative development.** If the angle needs work, fix the angle first. Multiplication amplifies what exists — including weaknesses.
- **Not a substitute for new concepts.** A batch cannot be entirely multiplied variants. The batch still needs distinct concepts per the Concept Validation quality bar.
- **Not automatic.** Multiplication is triggered by the strategist, not run by default after every winning brief. The strategist decides which winners are worth multiplying and into which formats.
