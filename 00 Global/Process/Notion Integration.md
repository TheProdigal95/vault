# Notion Integration

**Setup:** Notion MCP authenticates via OAuth — no API keys. Claude Code prompts for Notion login on first use. The user must be a member of the Reach Digital workspace. All IDs below are shared across the team.

## Key pages

The team workspace lives in Notion. Key pages:

| Page | Notion ID | What it is |
|---|---|---|
| **Reach Digital Workspace** | `d66e8926-bc7c-4041-9b49-77581bb77c73` | Top-level workspace |
| **Creative Strategy area** | `28f522bd-bdba-8065-a5ea-e1cdf6558e96` | Strategy team hub — planners, scorecard, references |
| **Client Space** | `1bd522bd-bdba-8057-9d45-fc908795767d` | All client pages |
| **Designer area** | `257522bd-bdba-8080-bf8d-c6fa555a1b0f` | Design team resources |
| **Audits & Proposals** | `2f7522bd-bdba-8006-8475-e14df27d8547` | Client proposals |

## Creative References Database

**Notion database ID:** `8331092b-523c-40a0-8ffa-913187da6876`
**Data source ID:** `16359a9c-f1b1-42fb-bddb-1a6d678e3ae6`

A Notion database under **Creative Strategy area > References** for cataloguing winning creative elements across all brands. This is the cross-brand highlight reel that gets fed primarily by ads analysis work. Each entry is a page with rich content — what it is, what makes it work, how to apply it, and examples.

**When to add references:** Only when the strategist explicitly asks. They decide what's worth logging. Before adding, always search the database first to check for duplicates. Only log things that are genuinely transferable across brands — not brand-specific copy or claims.

**Database properties:**
- **Name** (Title) — Descriptive name, no brand prefix (e.g. "Benefits Timeline" not "IM8 — Benefits Timeline")
- **Type** (Select) — Hook — Video, Hook — Static, Script Structure, Copy — Headline, Copy — Body, Format, Proof Structure, Caption Style, Landing Page, Email, UGC Format
- **Brand** (Multi-select) — Which brand/advertiser it came from
- **Link** (URL) — Direct link to the asset (any source — no restrictions)
- **Source** (Select) — Where it was found: Motion, Ad Library, Foreplay, Pinterest, Organic, Other
- **Added by** (Person) — Who logged it
- **Date added** (Date) — When it was saved
- **Tags** (Multi-select) — For filtering: temporal-discounting, curiosity-gap, authority, social-proof, UGC, CGI, lo-fi, app-screenshot, proof-stacking, overwhelm-simplify

**Views:**
- **All References** — full table, sorted by date
- **Hooks & Copy** — filtered to Hook and Copy types
- **Structures & Formats** — Script Structure, Proof Structure, UGC Format
- **Formats** — gallery view of Format entries (A-roll / full-video formats: whiteboard, green screen, graphic yap, podcast interview, AI animated character, etc.)
- **B-Roll Types** — gallery view of B-Roll Type entries (interchangeable B-roll that can layer into any format: CGI animations, hand-drawn sketch, visual metaphor, papercut, etc.)
- **Memes & Effects** — gallery view of Meme Template and Effect / Filter entries

**Type definitions:**
- **Format** = A-roll formats that define the entire video structure (whiteboard expert lecture, green screen commentary, podcast interview, graphic yap, AI animated character VSL) or how a static ad mimics a platform (tweet screenshot, Reddit post, Facebook group post, Instagram Story)
- **B-Roll Type** = interchangeable visual B-roll that can layer into any Format — not tied to a specific A-roll structure (CGI medical animations, hand-drawn sketch animation, visual metaphor sequences, papercut explainer)
- **Script Structure** = how the narrative/argument is organized (benefits timeline, overwhelm-simplify, versus comparison)
- **Proof Structure** = credibility elements that aren't a full script (proof barrage close)
- **Hook** = the opening that stops the scroll
- **Copy** = headline or body text patterns
- **Meme Template** = a reusable meme format with a known cultural template (sigma male / masculine frame, Drake format, tier list, etc.) — the visual hook inside platform-native ads
- **Effect / Filter** = social media filters, AR effects, or visual treatments to reference in creative direction

**Page content structure — execution-focused, role-based, skip filler:**

Every section below is optional. Only include the ones that carry real signal for the entry type.

- **What it is** — keep only when the format needs explanation (script structures, non-obvious formats). Skip when the name + image makes it self-evident (visual formats like Grimy Poster, Premium Frosted Glass).
- **What makes it work** — keep only when it carries genuine signal: demographic data, psychological mechanism (Barnum effect, identity signaling), UI context that affects credibility. Skip when the reason is generic ("looks native, bypasses ad detection").
- **Role-based execution sections** — pick the ones that apply:
  - **For strategists** — audience fit, funnel position, when to use and when NOT to use
  - **For copywriters** — voice (first vs. third person if relevant), hook templates, beat structure, copy patterns
  - **For designers** — typography with **download links** (SF Pro: `developer.apple.com/fonts`, Reddit Sans: `fonts.google.com/specimen/Reddit+Sans`, Chirp: `github.com/mojolo/Chirp-Font-X-Twitter`), hex codes, composition, corner radius, weight budget
  - **For editors** (video) — pacing, transitions, cutaways, slide duration
  - **For creators** (filming) — camera, lighting, audio, takes
- **Pairs with** — cross-reference related entries by name when one entry commonly pairs with another (e.g., a static image format that pairs with a long-form copy format).

**Conventions:**

- **No unlinked "used in X ad" examples.** The Link field handles specific ads; don't reference internal T001/T002 batch concepts — they go stale.
- **Soften prescriptive language.** Use "typically / often / tends to" instead of "never / don't" so strategists can break patterns intentionally. Reserve hard rules for things that genuinely break the format.
- **Verify before including platform specs.** Typeface names, hex codes, UI details should be verified from authoritative sources (official brand pages, Google Fonts, Apple Developer). Don't guess.
- **Prioritize iOS mockups** for platform-native formats that use system fonts (Facebook, Instagram). Explicitly note "design as an iOS mockup" and reference SF Pro.
- **Decouple lumped concepts.** If an entry describes two things that can be used independently (e.g., a static image format AND a long-form copy format), split them into separate entries and cross-link via "Pairs with."
- **Don't log brand-specific copy or claims.** Only transferable patterns.

## How to use Notion MCP tools

**Adding a Creative Reference entry:** Use `mcp__notion__notion-create-pages` with parent `{ type: "data_source_id", data_source_id: "16359a9c-f1b1-42fb-bddb-1a6d678e3ae6" }`. Properties: Name, Type, Brand, Link, Source, Tags, Added by, date:Date added:start. Follow the role-based page content structure above.

**Setting "Added by":** Always set this to the current strategist's Notion user ID — same detection pattern as ClickUp. Flow:
1. Read `.claude/strategist.json` for the current strategist's `notion_id`.
2. If the file doesn't have a `notion_id` field, ask the strategist for their Notion user ID, append it, and continue.
3. Every `notion-create-pages` call to the References Database must include `"Added by": "<notion_id>"`.

Known strategist Notion IDs:
- Marcelo Acosta — `33cd872b-594c-81eb-bb3f-0002fa2a28ad`
- Kylie McCreary — (unknown, ask when she first logs)
- Michael Starr — (unknown, ask when first used)
- Cristina Cepeda — (unknown, ask when first used)

If "Added by" is missing or wrong, the strategist has to manually fix the attribution later. It's a one-field property — never skip it.

**Searching:** Use `mcp__notion__notion-search`. To search within the References Database specifically, use `data_source_url: "collection://16359a9c-f1b1-42fb-bddb-1a6d678e3ae6"`.

**Reading page content:** Use `mcp__notion__notion-fetch` with the page URL or ID.

**Modifying an existing Notion page — image safety rules:**
- **Never use `replace_content` on a page that contains images.** `replace_content` deletes every image block on the page. Image URLs from Notion's `prod-files-secure.s3` are signed and expire in ~1 hour, so re-embedding the URL after deletion is NOT a real restore — the image will break once the signature expires, and the underlying Notion file reference is gone for good.
- **Use `update_content` with surgical `old_str` / `new_str` operations** to rewrite prose sections while leaving image blocks untouched. Fetch the current page first to get exact text to match.
- `replace_content` is only acceptable when you've confirmed the page has zero image blocks (no `![](...)` anywhere in the fetched content).
- If you're about to rewrite a page and you're unsure whether it has images, fetch it first and check.

**Adding a new Brand to the References Database:**
If a brand value isn't in the Brand multi-select options, add it to the schema first using `mcp__notion__notion-update-data-source` with `ALTER COLUMN "Brand" SET MULTI_SELECT(...)` — listing all existing options plus the new one — then set the property on the page. Never leave Brand blank because the value wasn't in the dropdown yet.

**When to interact with Notion:**
- **Only add to the References Database when the user explicitly asks.** The strategist decides what's worth logging — never auto-add entries after analysis or batches.
- Before adding, **search the database first** to check if a similar entry already exists. If it does, ask the user whether to update the existing entry or create a new one.
- When the user asks to search for references, patterns, or prior work
- **Never create or modify Notion pages unless the user explicitly asks**
