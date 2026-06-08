---
name: Image generation briefs skip primary text
description: When writing briefs for AI image generation testing, don't spend time on primary text — it doesn't get rendered in the image
type: feedback
---

For image generation briefs (NB2 pipeline), focus on the image-facing elements: headline, subheading, feature pills, CTA, and image direction. Primary text is Meta ad copy that goes in the text field above the image — it has zero impact on what NB2 generates. Don't run scoring loops or revision passes on primary text when the goal is testing image generation.

**Why:** During the Lifeforce T002 ApoB format multiplication test, most revision cycles were spent fixing primary text issues (persona fit, Three Selves register, em dashes, banned constructions) that had no effect on the generated images. The actual image-facing copy was fine after the first pass.

**How to apply:** When the task is brief writing for image generation (format multiplication, generation pipeline testing, `/generate-static`), write primary text once and move on. Save the deep primary text QA for batch production where primary text goes to Meta ads.