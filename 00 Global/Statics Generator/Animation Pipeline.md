# Animation Pipeline

Convert winning static ads into animated GIFs and short videos. Lower CPMs than statics on Meta. Extends a winning ad's life without new creative concepting — the strategic work is already validated by performance data.

**Source:** Adapted from Will Sartorius (Self Made Agency / Skipper) static-to-animation workflow. Extended with Reach Digital's NB2 prompt conventions and fal.ai API tooling.

---

## Why Animate Statics

- **Lower CPMs.** Meta rewards video/GIF placements with cheaper impressions than static images.
- **Extended creative life.** A winning static that's fatiguing gets a second run as an animation without any new strategic work.
- **Scroll-stopping motion.** Even subtle movement (product sliding in, background elements shifting) breaks the static pattern in a feed and pulls attention.
- **Minimal production cost.** No new shoot, no new brief review. The copy, layout, and brand identity are already approved.

---

## The 6-Step Workflow

### Step 1: Ideate Animation Concepts

Upload the winning static to Claude. Generate 5 animation concepts. For each concept:

1. **Is the static the START or END frame?** This determines the direction of motion.
2. **What does the other frame look like?** Describe the missing frame in detail — what elements are present, absent, or repositioned compared to the static.
3. **What motion happens between the two frames?** The physical movement, transition, or reveal.
4. **Why does this motion make sense for the product?** The animation should reinforce the product story, not just be decorative movement.

**Prompt template:**

> I want to animate this static ad. Give me 5 animation concepts. For each one tell me: (1) Is my static the START or END frame? (2) What does the other frame look like? (3) What motion happens between the two frames? (4) Why does this motion make sense for the product? Rules: all text must stay frozen in place throughout, no camera movement, 3-4 seconds max

The strategist picks one concept (or combines elements from multiple) before moving to Step 2.

### Step 2: Generate the Missing Frame

Write an NB2 prompt for the frame the static doesn't provide. This is a still image generation — not animation yet.

**Requirements:**
- Every piece of text reproduced verbatim — character for character, line break for line break
- Background, lighting, color palette, and visual style match the static exactly
- Only the elements that change between frames are different (product position, background elements, character state)
- Exact dimensions specified (1080x1920 for vertical, 1080x1080 for square)
- Upload the original static as a reference image so NB2 can match the style

**Prompt template:**

> I want to animate this static ad. The concept is: [chosen concept]. My static is the [START/END] frame. I need you to write a Nano Banana 2 prompt to generate the other frame as a still image. Based on the animation concept, figure out which elements need to be added, removed, or repositioned. Every piece of text must be reproduced verbatim. The prompt must specify exact dimensions (1080x1920). Be extremely detailed — NB2 won't guess.

Generate 4 variants, pick the best. The missing frame must be close enough to the static that the animation model can interpolate cleanly between them.

### Step 3: Write the Animation Prompt

Describe the motion between the two frames for Veo 3.1. This prompt governs what happens in the video — not what the frames look like (the frames handle that).

**Requirements:**
- All text explicitly called out as frozen — no movement, warping, fading, or morphing
- No camera movement
- Background stays perfectly still
- Detailed description of motion with physics and easing (e.g., "product slides in from left with slight deceleration," not just "product appears")
- Animation resolves cleanly into the end frame

**Prompt template:**

> I'm uploading two frames for a video animation. IMAGE 1 is the START frame. IMAGE 2 is the END frame. The animation concept: [describe motion]. Write a Veo 3.1 prompt with: every piece of text reproduced verbatim, explicit instruction that ALL text stays frozen, no camera movement, background stays still, detailed description of motion with physics and easing, animation resolves cleanly into end frame.

### Step 4: Generate via fal.ai Veo 3.1

Call `.claude/tools/fal-ai/generate-video.js` with:
- First frame image
- Last frame image
- Animation prompt from Step 3
- Duration: 8 seconds (standard)
- Resolution: 1080p (default) or 4K if needed

**Primary endpoint:** `fal-ai/veo3.1/first-last-frame-to-video` — takes both start and end frames. This is the default for all animation pipeline work because we always have both frames.

**Fallback endpoint:** `fal-ai/veo3.1/image-to-video` — single frame only. Use when the missing frame generation failed or when animating from a single keyframe without a defined end state.

### Step 5: Review

Strategist watches the output and describes any failures. Common issues:
- Text warping, sliding, or fading during animation
- Motion too fast or too slow
- Product distortion during movement
- Background elements moving when they should be still
- Animation not resolving cleanly into the end frame
- Unnatural physics (objects floating, snapping, or teleporting)

### Step 6: Iterate

Feed the output video plus the original start and end frames back to Claude. Describe what went wrong. Get a corrected prompt.

**Prompt template:**

> I'm uploading the animation output plus original start and end frames. Here's what's wrong: [issues]. Give me a corrected Veo 3.1 prompt that fixes these issues. Keep everything that worked.

2-3 iterations is typical. If text keeps warping after 3 iterations, consider whether the animation concept requires too much movement near text regions — simplify the motion or reposition text in the missing frame.

---

## Animation Rules

These apply to every animation generated through this pipeline. Non-negotiable.

1. **All text stays FROZEN.** No movement, warping, fading, morphing, scaling, or rotation of any text element. Text that moves or morphs looks amateur. Specify frozen text explicitly in every prompt — Veo will move text if you don't tell it not to.
2. **No camera movement.** The camera is locked. No pan, zoom, tilt, dolly, or handheld shake.
3. **Background stays perfectly still.** No parallax, no shifting, no atmospheric movement in the background.
4. **Only visual elements animate.** Product, characters, foreground objects, decorative elements — these can move. Text, background, and brand marks cannot.
5. **8 seconds is standard duration.** Long enough for motion to register in a scroll, short enough to loop cleanly as a GIF.
6. **Clean resolution into end frame.** The animation must settle into a stable final state. No lingering drift, jitter, or unresolved motion at the end.

---

## fal.ai Endpoints

| Endpoint | Use Case |
|---|---|
| `fal-ai/veo3.1/first-last-frame-to-video` | Primary. Start frame + end frame + prompt. Default for all animation pipeline work. |
| `fal-ai/veo3.1/image-to-video` | Fallback. Single frame + prompt. When missing frame generation failed. |
| `fal-ai/veo3.1/extend-video` | Lengthen an existing video. Use when 8 seconds isn't enough or when chaining animations. |

---

## Pricing

| Tier | Cost per second | 8s video cost |
|---|---|---|
| 1080p without audio | $0.20/s | ~$1.60 |
| 4K without audio | $0.40/s | ~$3.20 |
| Fast tier | $0.10/s | ~$0.80 |

For iteration cycles (2-3 attempts typical), budget $4-6 per winning animation at 1080p. Use fast tier for initial tests, 1080p for final output.

---

## Fallback Models

If Veo 3.1 produces persistent issues (text warping it can't fix, physics artifacts, resolution problems), these alternatives are available on fal.ai:

| Model | Endpoint | Notes |
|---|---|---|
| Kling O3 Standard | `kling-video/o3/standard/image-to-video` | Single frame input only. Good physics. |
| Seedance 2.0 | `bytedance/seedance-2.0/image-to-video` | ByteDance. Native audio generation. Single frame input. |
| Sora 2 | `sora-2/image-to-video` | OpenAI. Single frame input. |

All fallback models are single-frame-input only — no first-last-frame mode. This means less control over the end state. Use Veo 3.1 first-last-frame whenever possible.

---

## Post-Processing

### MP4 to GIF

For Meta upload, GIF is often preferred (auto-loops, no play button).

```bash
ffmpeg -i output.mp4 -vf "fps=15,scale=1080:-1:flags=lanczos" -c:v gif output.gif
```

Parameters:
- `fps=15` — 15 frames per second. Lower than video (24-30) but smooth enough for feed. Keeps file size reasonable.
- `scale=1080:-1` — Width 1080, height auto-calculated to preserve aspect ratio.
- `flags=lanczos` — High-quality scaling algorithm.

### File size considerations

GIFs can balloon in file size. If output exceeds 15MB:
- Reduce fps to 12
- Reduce scale to 720
- Trim duration if the animation resolves before 8 seconds
- Use MP4 instead — Meta accepts both

---

## Full Prompt Templates

### Ideation

> I want to animate this static ad. Give me 5 animation concepts. For each one tell me: (1) Is my static the START or END frame? (2) What does the other frame look like? (3) What motion happens between the two frames? (4) Why does this motion make sense for the product? Rules: all text must stay frozen in place throughout, no camera movement, 3-4 seconds max

### Missing Frame Generation

> I want to animate this static ad. The concept is: [chosen concept]. My static is the [START/END] frame. I need you to write a Nano Banana 2 prompt to generate the other frame as a still image. Based on the animation concept, figure out which elements need to be added, removed, or repositioned. Every piece of text must be reproduced verbatim. The prompt must specify exact dimensions (1080x1920). Be extremely detailed — NB2 won't guess.

### Veo 3.1 Animation

> I'm uploading two frames for a video animation. IMAGE 1 is the START frame. IMAGE 2 is the END frame. The animation concept: [describe motion]. Write a Veo 3.1 prompt with: every piece of text reproduced verbatim, explicit instruction that ALL text stays frozen, no camera movement, background stays still, detailed description of motion with physics and easing, animation resolves cleanly into end frame.

### Iteration

> I'm uploading the animation output plus original start and end frames. Here's what's wrong: [issues]. Give me a corrected Veo 3.1 prompt that fixes these issues. Keep everything that worked.
