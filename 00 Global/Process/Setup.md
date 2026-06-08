# First-Time Setup (New Strategist)

**Easiest way:** Open Claude Code in the vault and say **"This is my first time. Set me up."** Claude runs the setup script, asks for your API keys conversationally, and walks you through browser logins.

**Manual alternative:** Run `bash setup.sh` from the vault root. It prompts for API keys interactively. Pass env vars to skip prompts:
```bash
GEMINI_API_KEY="xxx" FAL_KEY="yyy" STRAT_NAME="Your Name" STRAT_CLICKUP_ID="12345" bash setup.sh
```

**Check your setup** without changing anything:
```bash
bash setup.sh --check
```

Safe to re-run anytime — every step is idempotent.

---

## What Gets Installed

The setup script handles all of the following automatically. This reference documents what each component does, for troubleshooting and manual setup.

### System dependencies (Phase 1)

| Tool | Purpose | Install |
|---|---|---|
| Homebrew | Package manager (macOS) | Auto-detected |
| yt-dlp | Download video from YouTube, TikTok, Twitter, etc. | `brew install yt-dlp` |
| ffmpeg | Video processing, format conversion | `brew install ffmpeg` |
| Node.js | Runtime for project tools and grab.js | `brew install node` |
| Go | Build motion-pp-cli and clickup-pp-cli | `brew install go` |
| Python 3 | Review scraper venv | `brew install python3` |
| agent-browser | Browser automation for Motion login + review scraping | `npm install -g agent-browser` |
| claude-agent-acp | ACP adapter for Obsidian Agent Client plugin | `npm install -g @agentclientprotocol/claude-agent-acp` |

### Project-local Node tools (Phase 2)

All live in `.claude/tools/` and need `npm install` in their directory:

| Tool | Purpose | Extra |
|---|---|---|
| gemini-api | Gemini API wrapper — video analysis, strategic breakdowns | Needs `GEMINI_API_KEY` in `.env` |
| site-scraper | Whole-site crawl for Brand/Product Context | Needs Playwright Chromium (`npx playwright install chromium`) |
| review-sampler | Stratified review sampling for persona discovery | — |
| persona-counter | Persona-dictionary regex classification | — |
| ad-classifier | Text-only Meta ad classification + angle dedup | Needs `GEMINI_API_KEY` in `.env` (copied from gemini-api) |
| fal-ai | NanoBanana 2 image generation, Kling video animation | Needs `FAL_KEY` in `.env` |
| endcard-generator | End card composition + visual comparison | Needs `GEMINI_API_KEY` in `.env` (copied from gemini-api) |

### Python venv — review scraper (Phase 3)

Dedicated venv at `~/.claude/skills/review-scraper/.venv/` with httpx, playwright, and Chromium. Avoids PEP-668 / Homebrew Python conflicts.

### Go CLIs (Phase 4)

| CLI | Purpose | Source |
|---|---|---|
| motion-pp-cli | Motion API — pull top creatives, download media, angles/formats/highlights | `.claude/tools/motion-pp-cli/` |
| clickup-pp-cli | ClickUp loading — push briefs/scripts, footage requests | `.claude/tools/clickup-pp-cli/` |

Source code is included in the repo. The setup script builds both automatically with `go install` — binaries go to `$HOME/go/bin/`.

### API keys (Phase 5)

| Key | Where to get it | Stored at | Used by |
|---|---|---|---|
| `GEMINI_API_KEY` | [Google AI Studio](https://aistudio.google.com/apikey) (free) | `.claude/tools/gemini-api/.env` | gemini-api, ad-classifier, endcard-generator |
| `FAL_KEY` | [fal.ai Dashboard](https://fal.ai/dashboard/keys) | `.claude/tools/fal-ai/.env` | fal-ai (image gen, video animation) |

The Gemini key is automatically copied to ad-classifier and endcard-generator `.env` files.

### Strategist identity (Phase 6)

`.claude/strategist.json` stores your name and ClickUp user ID. Used by:
- clickup-pp-cli for task assignment
- Claude Code for session detection

Format: `{ "name": "Your Name", "clickup_id": "12345678" }`

### Obsidian configuration (Phase 7)

Since `.obsidian/` is gitignored (each person configures their own), the setup script creates the full environment:

**Theme:** [Minimal](https://github.com/kepano/obsidian-minimal) — downloaded from GitHub releases.

**Plugins (4):**
- **obsidian-minimal-settings** — Minimal theme controls (font, line width, etc.)
- **obsidian-style-settings** — CSS variable overrides for Minimal
- **obsidian42-brat** — Beta plugin manager (manages Agent Client updates)
- **agent-client** — Claude Code chat UI inside Obsidian (uses claude-agent-acp)

**CSS Snippets (2):**
- `hide-terminal-ai-buttons` — hides default Obsidian AI buttons
- `terminal-ai-darker-bg` — contrast fix for Agent Client panel in dark mode

**Appearance:** Dark mode, Minimal theme, both snippets enabled.

All plugin configs (`data.json`) are written with team-standard settings. Agent Client's config includes resolved paths for your machine's `node` and `claude-agent-acp` binaries.

### Claude Code MCP servers (Phase 8)

The setup script configures these automatically by writing to `~/.claude.json` and `~/.claude/settings.json`:

| Server | Type | URL | Scope | Setup |
|---|---|---|---|---|
| ClickUp | HTTP (cloud) | `https://mcp.clickup.com/mcp` | Project | Automatic |
| Notion | HTTP (cloud) | `https://mcp.notion.com/mcp` | Project | Automatic |
| Notion plugin | Marketplace | `makenotion/claude-code-notion-plugin` | User | Automatic |
| Motion Creative | Marketplace | `Motion-Creative/motion-creative-plugin` | User | Automatic |
| Google Drive | Local (npx) | `npx @piotr-agier/google-drive-mcp` | User (global) | Manual |

**ClickUp and Notion** are configured as project-level servers (stored in `~/.claude.json` under the vault's project entry). First use prompts for OAuth login.

**Notion and Motion Creative marketplace plugins** are registered in `~/.claude/settings.json`. Claude Code downloads the plugins on first launch after setup.

**Google Drive** requires manual OAuth credential setup:
1. Create OAuth credentials at [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Download the JSON and save to `~/.config/google-drive-mcp/gcp-oauth.keys.json`
3. In a Claude Code session, ask Claude to add the Google Drive MCP, or run:
   `claude mcp add google-drive -s user -- npx @piotr-agier/google-drive-mcp`

All OAuth-based servers prompt for login on first use in Claude Code.

### Interactive logins (Phase 9)

One-time browser logins via agent-browser. Run when needed:

**Motion** (required for `/motion-pull`):
```bash
agent-browser --session motion --profile ~/.claude/tools/grab/motion-profile --headed open https://projects.motionapp.com/login
# Log in → see dashboard → then:
agent-browser --session motion close
```

**Trustpilot** (optional — unlocks unlimited review pagination):
```bash
agent-browser --session trustpilot --profile ~/.claude/skills/review-scraper/profiles/trustpilot --headed open https://www.trustpilot.com/users/login
# Log in, then: agent-browser --session trustpilot close
```

**Amazon** (required for Amazon review scraping):
```bash
agent-browser --session amazon --profile ~/.claude/skills/review-scraper/profiles/amazon --headed open https://www.amazon.com/ap/signin
# Log in, then: agent-browser --session amazon close
```

Cookie profiles persist independently of your regular browser. If a session expires, the relevant tool returns an auth-required error — just rerun the login.

### Local transcription — Pinokio MLX (Phase 10, optional)

macOS only. Provides free, offline speech-to-text via MLX Whisper. Without it, `/transcribe` uses Gemini API (works fine, uses credits).

1. Download [Pinokio](https://pinokio.computer)
2. In Pinokio, search "MLX Video Transcription" and install
3. Done — `mlx-transcribe.py` auto-detects the Pinokio environment

---

## Troubleshooting

**`command not found` for a tool:** Run `bash setup.sh --check` to see what's missing, then `bash setup.sh` to fix.

**Motion login expired:** Re-run the Motion login command above. Cookies refresh automatically.

**Plugin not showing in Obsidian:** Restart Obsidian (Cmd+Q → reopen). Check that `community-plugins.json` lists the plugin ID.

**Agent Client shows "authentication required":** Run `claude login` in the terminal, then restart Obsidian.

**Go CLI missing and no printing-press directory:** Ask your team lead for the source directory or a pre-built binary. Copy the binary to `$HOME/go/bin/`.

**Google Drive MCP OAuth fails:** Make sure `~/.config/google-drive-mcp/gcp-oauth.keys.json` exists and contains valid credentials. Run `npx @piotr-agier/google-drive-mcp auth` to re-authenticate.

---

## Windows Setup

The `setup.sh` script is macOS/Linux only. For Windows, follow the same phases manually using PowerShell equivalents:

- Use `winget` instead of `brew` for system packages
- Use `$env:USERPROFILE` instead of `$HOME`/`~`
- Python venv uses `Scripts\` instead of `bin/`
- Go CLIs: `go install` works the same, binaries go to `$env:GOPATH\bin\`
- Obsidian plugin paths use backslashes

See the phase-by-phase breakdown above for what each step does.
