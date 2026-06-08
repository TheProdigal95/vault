# GPT Image 2 — Shared Prompt Block

Prepend this block verbatim to every GPT Image 2 generation prompt. GPT ignores standard safe zone language — it needs pixel-precise constraints or text will land in the platform UI overlay zones.

NB2 does not use this block. NB2 has its own safe zone rules in the template prompts.

---

## E+ Safe Zone Block

```
INSTAGRAM SAFE ZONE — HARD CONSTRAINTS:

THE TOP 400 PIXELS MUST CONTAIN NO TEXT. Background only.
THE BOTTOM 400 PIXELS MUST CONTAIN NO TEXT. Background only.
THE LEFT AND RIGHT 150 PIXELS MUST CONTAIN NO TEXT.
Text only lives in the center area from y=400 to y=1520, x=150 to x=930.

BACKGROUND CONTINUITY:
The background surface is ONE CONTINUOUS PHOTOGRAPHIC PLANE extending to ALL FOUR EDGES of the 1080×1920 frame. The empty top/bottom zones are the SAME surface as the center, just without text.

DO NOT RENDER:
- A paper card, poster, or printed rectangle inset into the frame
- A visible border, frame, or edge between the center content and the top/bottom
- A shadow line suggesting the ad is an object on another surface
- A background-within-a-background

DO:
- Shoot as a single overhead photograph on ONE continuous surface.
- Text floats directly on the photographed surface.
- If content is sparse, let empty top/bottom be empty surface — do not invent a frame.

RENDER AT 1080×1920 (9:16 vertical).
```

---

## GPT Universal Rules

Append these to every GPT Image 2 prompt, after the template-specific content:

```
PRODUCT FIDELITY: Match the uploaded product reference exactly. Do not restyle. Do not swap proportions.
NO ANTI-AI SLIPS: film grain visible, no hyper-smooth surfaces.
NO DASHES OR HYPHENS in rendered copy. Periods only.
```

---

## Camera + Lens Cheatsheet

GPT Image 2 responds well to photographic specs. Use the appropriate lens in the SCENE section of GPT prompts:

| Spec | Best For |
|---|---|
| 85mm f/1.8 | Product shots, portraits, lifestyle. Creamy bokeh. |
| 50mm f/1.4 | Editorial lifestyle, environmental portraits. |
| 35mm f/2.0 | Environmental scenes, bathroom/kitchen settings. |
| iPhone 15 Pro 24mm f/1.78 | UGC. Anything unproduced. |
| 100mm macro f/2.8 | Extreme close-ups on product details. |

---

## Anti-Sameness: Batch Variation Rules

When generating multiple ads for the same brand in a batch, rotate these vectors to prevent visual monotony:

- **Surfaces:** warm linen → cool white marble → warm wooden table → clean seamless white → off-black with charcoal texture
- **Palettes:** warm cream / clean white / dark mode / monochromatic single-hue / natural environment
- **Compositions:** product centered-lower / product right-aligned with type dominant / flat lay / held-by-hand UGC
- **Product variants:** rotate shades/colors if the product has variants — tests fidelity AND adds visual variety
