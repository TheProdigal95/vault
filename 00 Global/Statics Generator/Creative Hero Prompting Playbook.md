# Creative Hero Prompting Playbook

Prompting rules for the hero-image stage of `/creative-image`. Adapted from the Flora AI operational playbook for Reach Digital's existing fal.ai API wrapper.

This is not the final-composition prompt format. Hero prompts create the standalone visual ingredient that the normal `/generate-static` pipeline later uses as a reference.

---

## Core Rules

1. **Prompting is downstream of understanding.** Clarify the angle before writing image prompts.
2. **Describe literal visuals.** Do not ask the model to infer an abstract emotion or metaphor. Describe the physical scene piece by piece.
3. **One readable punchline.** The viewer should understand the scene in a glance.
4. **Minimalism wins.** Remove secondary elements that do not strengthen the punchline.
5. **No ad copy by default.** End with `No text in image, no labels.` Allow short structural labels only when the concept is an infographic or the text belongs naturally inside the scene.
6. **Build breathing room into the environment.** Place the subject low in frame against sky, wall, darkness, water, or a seamless void. Do not request an artificial empty rectangle or gradient band.
7. **Use uploaded references intentionally.** Include a product photo only when the product belongs in the hero. Refer to it as `Product Image`. For an approved prior render, describe exactly which composition qualities to preserve.
8. **References inspire; they do not dictate.** Extract the treatment or visual principle from external examples. Do not copy competitor branding, copy, or literal structure.
9. **Iterate surgically.** Preserve prompt language for details that already work.

---

## Prompt Anatomy

Write the prompt as one continuous block for NB2. GPT Image 2 can accept a short structured prompt when structure improves precision, but keep the instructions scene-first and avoid final-ad typography blocks.

Include:

1. `Vertical 9:16 image`
2. Visual treatment
3. Lighting
4. Environment and background
5. Main subject: anatomy, pose, expression, material, and position
6. Secondary objects only when necessary
7. `Product Image` placement only when used
8. Framing and natural breathing room
9. First-glance punchline
10. `No text in image, no labels.`

Example skeleton:

```text
Vertical 9:16 image, [visual treatment], [lighting], [environment]. In the lower portion of the frame, [literal subject description with pose, expression, materials, and action]. [Necessary secondary elements]. [Product Image placement if used]. The upper portion shows [natural environmental breathing room]. The composition reads instantly: [visual punchline]. No text in image, no labels.
```

---

## Product Reference Rule

When the hero includes the real product:

- Upload the product photo through `.claude/tools/fal-ai/upload.js`.
- Refer to it in the prompt as `Product Image`.
- State its location, angle, scale, and relationship to the scene.
- Do not rely on the product or brand name alone to preserve fidelity.

When the hero does not include the product, omit product-reference language entirely.

---

## Natural Breathing Room

For later layout composition, the hero often needs usable calm areas. Make those areas part of the scene:

| Technique | Example |
|---|---|
| Subject placement | Character centered in the lower third |
| Clean surface | Empty wall, calm water, seamless cream void |
| Dark environment | Spotlight on subject with shadowed upper frame |
| Open environment | Clear sky or uncluttered room |
| Directed lighting | Bright focal point below, subdued background above |

Do not generate headline copy during the hero pass just because the final ad will need a headline.

---

## Visual Treatment Library

Treatments are starting points, not mandatory categories. Rotate them to prevent sameness.

| Treatment | Useful for |
|---|---|
| Stylized matte 3D | Friendly personification, simple educational scenes |
| Cinematic realistic 3D | Premium product heroes, dramatic metaphors |
| Hand-drawn editorial illustration | Warm explainers, playful infographics |
| Cartoon illustration | Humor, exaggerated action, high-energy scenes |
| Claymation / stop-motion | Tactile emotional scenes, sweet-versus-absurd contrast |
| Vintage comic | Dramatized before-after or multi-beat storytelling |
| UGC phone photo | Relatable real-life pain moments |
| Documentary photography | Absurd scenes presented with realism |
| Miniature diorama | Worlds, systems, top-down comparisons |
| Scientific textbook illustration | Anatomy and mechanism support |
| Premium UI / glassmorphism | Data-supporting hero visuals |
| Cartoon noir | Elevated dark humor or tension |
| Smooth inflated isometric 3D | Simplified worlds and instant readability |

Do not overuse one treatment within a brand. A treatment is not a concept.

---

## Visual-Idea Patterns

Use these patterns after the angle-understanding pass:

| Pattern | Question |
|---|---|
| Metaphor | What familiar object behaves like this pain? |
| Personification | What organ, object, or product would express the frustration if it were alive? |
| Scale distortion | What becomes oversized or tiny to make the imbalance obvious? |
| Literal scenario | What exact trigger event can be shown as a photograph? |
| Absurd realism | What impossible scene would communicate the truth immediately if photographed seriously? |
| Desired outcome | What changes visibly when the problem is solved? |
| Contrast | What two states make the difference undeniable? |
| Mechanism support | What visual makes the educational explanation easier to understand? |

---

## Common Failures

| Failure | Fix |
|---|---|
| Generic mood image | Replace emotional adjectives with physical action, pose, and objects |
| Cluttered frame | Remove secondary props; preserve one visual punchline |
| Fake blank rectangle for text | Describe a real wall, sky, shadow, or void instead |
| Product drifts | Upload product photo and reference `Product Image` explicitly |
| Text artifacts | Add `No text in image, no labels.` |
| Same-looking batch | Re-run diversity gate across both ideas and treatments |
| Mechanism becomes artistic but unclear | Use the creative hero as support inside an educational or infographic template |
| Compliance risk from imagery | Treat the visual implication as a claim and revise or block it |

---

## Delivery Format

After the strategist selects concepts, deliver all prompts together:

~~~markdown
## 1. [Concept title]

**Product visible:** Yes / No
**Model:** NB2 / GPT Image 2

```text
[prompt]
```

**Risk note:** [only when needed]
~~~

Do not ask confirmation questions for secondary visual details. Make a reasonable choice, state any material assumption briefly, and move into generation.
