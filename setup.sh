#!/usr/bin/env bash
# ============================================================================
# Reach Digital Creative Strategy Vault — One-Command Setup
# ============================================================================
#
# Usage:
#   bash setup.sh                    Full setup (interactive prompts)
#   bash setup.sh --check            Verify everything is installed (no changes)
#
# Claude-driven mode (skip interactive prompts by passing env vars):
#   GEMINI_API_KEY=xxx FAL_KEY=yyy STRAT_NAME="Name" STRAT_CLICKUP_ID="123" bash setup.sh
#
# Supports macOS (primary) and Linux. Windows users: see Setup.md.
# Safe to re-run — every step is idempotent.
# ============================================================================

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m'

VAULT_DIR="$(cd "$(dirname "$0")" && pwd)"
CHECK_ONLY=false
ERRORS=()
WARNINGS=()

[[ "${1:-}" == "--check" ]] && CHECK_ONLY=true

info()    { echo -e "${BLUE}▸${NC} $1"; }
success() { echo -e "${GREEN}✓${NC} $1"; }
warn()    { echo -e "${YELLOW}⚠${NC} $1"; WARNINGS+=("$1"); }
fail()    { echo -e "${RED}✗${NC} $1"; ERRORS+=("$1"); }
section() { echo -e "\n${BOLD}━━━ $1 ━━━${NC}"; }

has_cmd() { command -v "$1" &>/dev/null; }

# ============================================================================
# Phase 1: System Dependencies
# ============================================================================
section "Phase 1: System Dependencies"

OS="$(uname -s)"
if [[ "$OS" != "Darwin" && "$OS" != "Linux" ]]; then
  fail "Unsupported OS: $OS. See Setup.md for Windows instructions."
  exit 1
fi

install_or_check() {
  local cmd="$1" install_cmd="$2" label="${3:-$1}"
  if has_cmd "$cmd"; then
    success "$label installed"
  elif $CHECK_ONLY; then
    fail "$label not installed"
  else
    info "Installing $label..."
    eval "$install_cmd"
    has_cmd "$cmd" && success "$label installed" || fail "$label failed to install"
  fi
}

if [[ "$OS" == "Darwin" ]]; then
  install_or_check brew \
    '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"' \
    "Homebrew"
  install_or_check yt-dlp "brew install yt-dlp" "yt-dlp"
  install_or_check ffmpeg "brew install ffmpeg" "ffmpeg"
  install_or_check node   "brew install node"   "Node.js"
  install_or_check go     "brew install go"     "Go"
  install_or_check python3 "brew install python3" "Python 3"
else
  install_or_check yt-dlp  "pip install yt-dlp"       "yt-dlp"
  install_or_check ffmpeg  "sudo apt install -y ffmpeg" "ffmpeg"
  install_or_check node    "sudo apt install -y nodejs npm" "Node.js"
  install_or_check go      "sudo apt install -y golang" "Go"
  install_or_check python3 "sudo apt install -y python3 python3-venv" "Python 3"
fi

# npm globals
install_or_check agent-browser "npm install -g agent-browser && agent-browser install" "agent-browser"
install_or_check claude-agent-acp "npm install -g @agentclientprotocol/claude-agent-acp" "claude-agent-acp"

# ============================================================================
# Phase 2: Project-Local Node Tools
# ============================================================================
section "Phase 2: Project Node Tools"

NODE_TOOLS=(gemini-api site-scraper review-sampler persona-counter ad-classifier fal-ai endcard-generator)

for tool in "${NODE_TOOLS[@]}"; do
  tool_dir="$VAULT_DIR/.claude/tools/$tool"
  if [[ ! -d "$tool_dir" ]]; then
    fail ".claude/tools/$tool directory missing"
    continue
  fi

  if [[ -d "$tool_dir/node_modules" ]]; then
    success "$tool: node_modules present"
  elif $CHECK_ONLY; then
    fail "$tool: node_modules missing"
  else
    info "Installing $tool dependencies..."
    (cd "$tool_dir" && npm install --no-fund --no-audit 2>&1 | tail -1)
    [[ -d "$tool_dir/node_modules" ]] && success "$tool installed" || fail "$tool install failed"
  fi
done

# site-scraper needs Playwright Chromium
if [[ -d "$VAULT_DIR/.claude/tools/site-scraper/node_modules" ]]; then
  PW_CACHE_DIR="$HOME/Library/Caches/ms-playwright"
  [[ "$OS" == "Linux" ]] && PW_CACHE_DIR="$HOME/.cache/ms-playwright"
  if ls "$PW_CACHE_DIR"/chromium-* 1>/dev/null 2>&1; then
    success "site-scraper Playwright Chromium present"
  elif $CHECK_ONLY; then
    fail "site-scraper Playwright Chromium missing"
  else
    info "Installing Playwright Chromium for site-scraper..."
    (cd "$VAULT_DIR/.claude/tools/site-scraper" && npx playwright install chromium 2>&1 | tail -3)
    success "Playwright Chromium installed"
  fi
fi

# ============================================================================
# Phase 3: Python Venv (Review Scraper)
# ============================================================================
section "Phase 3: Python Venv (Review Scraper)"

VENV_DIR="$HOME/.claude/skills/review-scraper/.venv"

if [[ -f "$VENV_DIR/bin/python" ]]; then
  # Check deps
  if "$VENV_DIR/bin/python" -c "import httpx, playwright" 2>/dev/null; then
    success "Review scraper venv + deps OK"
  elif $CHECK_ONLY; then
    fail "Review scraper venv exists but deps missing"
  else
    info "Installing review scraper deps..."
    "$VENV_DIR/bin/pip" install --upgrade pip httpx playwright -q
    "$VENV_DIR/bin/playwright" install chromium
    success "Review scraper deps installed"
  fi
elif $CHECK_ONLY; then
  fail "Review scraper venv missing ($VENV_DIR)"
else
  info "Creating review scraper venv..."
  mkdir -p "$(dirname "$VENV_DIR")"
  python3 -m venv "$VENV_DIR"
  "$VENV_DIR/bin/pip" install --upgrade pip httpx playwright -q
  "$VENV_DIR/bin/playwright" install chromium
  success "Review scraper venv created"
fi

# ============================================================================
# Phase 4: Go CLIs (motion-pp-cli, clickup-pp-cli)
# ============================================================================
section "Phase 4: Go CLIs"

check_or_build_go_cli() {
  local name="$1" cmd_subdir="$2"
  local bin_path="$HOME/go/bin/$name"
  local src_dir="$VAULT_DIR/.claude/tools/$name"

  if [[ -f "$bin_path" ]]; then
    success "$name binary exists at $bin_path"
    return
  fi

  if $CHECK_ONLY; then
    fail "$name binary not found at $bin_path"
    return
  fi

  if [[ -d "$src_dir/cmd/$cmd_subdir" ]]; then
    info "Building $name from in-repo source..."
    (cd "$src_dir" && go install "./cmd/$cmd_subdir" 2>&1 | tail -3)
    [[ -f "$bin_path" ]] && success "$name built and installed" || fail "$name build failed"
  else
    fail "$name: source not found at $src_dir/cmd/$cmd_subdir"
  fi
}

check_or_build_go_cli "motion-pp-cli"  "motion-pp-cli"
check_or_build_go_cli "clickup-pp-cli" "clickup-pp-cli"

# ============================================================================
# Phase 5: API Keys & .env Files
# ============================================================================
section "Phase 5: API Keys"

GEMINI_ENV="$VAULT_DIR/.claude/tools/gemini-api/.env"
FAL_ENV="$VAULT_DIR/.claude/tools/fal-ai/.env"

# Gemini API key (check env var → existing file → prompt)
if [[ -f "$GEMINI_ENV" ]] && grep -q "GEMINI_API_KEY=." "$GEMINI_ENV" 2>/dev/null; then
  success "Gemini API key configured"
elif $CHECK_ONLY; then
  fail "Gemini API key missing (.claude/tools/gemini-api/.env)"
elif [[ -n "${GEMINI_API_KEY:-}" ]]; then
  echo "GEMINI_API_KEY=$GEMINI_API_KEY" > "$GEMINI_ENV"
  success "Gemini API key saved (from env)"
else
  echo ""
  echo -e "${YELLOW}Gemini API key needed for video analysis, ad classification, and endcard generation.${NC}"
  echo -e "Get a free key at: ${BLUE}https://aistudio.google.com/apikey${NC}"
  echo -n "Paste your Gemini API key (or press Enter to skip): "
  read -r GEMINI_KEY
  if [[ -n "$GEMINI_KEY" ]]; then
    echo "GEMINI_API_KEY=$GEMINI_KEY" > "$GEMINI_ENV"
    success "Gemini API key saved"
  else
    warn "Gemini API key skipped — video analysis and ad classification won't work"
  fi
fi

# Copy Gemini key to tools that need it
for target in ad-classifier endcard-generator; do
  target_env="$VAULT_DIR/.claude/tools/$target/.env"
  if [[ -f "$GEMINI_ENV" ]] && grep -q "GEMINI_API_KEY=." "$GEMINI_ENV" 2>/dev/null; then
    if [[ ! -f "$target_env" ]] || ! diff -q "$GEMINI_ENV" "$target_env" &>/dev/null; then
      if ! $CHECK_ONLY; then
        cp "$GEMINI_ENV" "$target_env"
        success "$target .env synced from gemini-api"
      else
        fail "$target .env out of sync or missing"
      fi
    else
      success "$target .env in sync"
    fi
  fi
done

# fal.ai API key (check env var → existing file → prompt)
if [[ -f "$FAL_ENV" ]] && grep -q "FAL_KEY=." "$FAL_ENV" 2>/dev/null; then
  success "fal.ai API key configured"
elif $CHECK_ONLY; then
  fail "fal.ai API key missing (.claude/tools/fal-ai/.env)"
elif [[ -n "${FAL_KEY:-}" ]]; then
  echo "FAL_KEY=$FAL_KEY" > "$FAL_ENV"
  success "fal.ai API key saved (from env)"
else
  echo ""
  echo -e "${YELLOW}fal.ai API key needed for AI image generation (NanoBanana 2, Kling video).${NC}"
  echo -e "Get your key at: ${BLUE}https://fal.ai/dashboard/keys${NC}"
  echo -n "Paste your fal.ai API key (or press Enter to skip): "
  read -r FAL_KEY
  if [[ -n "$FAL_KEY" ]]; then
    echo "FAL_KEY=$FAL_KEY" > "$FAL_ENV"
    success "fal.ai API key saved"
  else
    warn "fal.ai key skipped — image generation won't work"
  fi
fi

# ============================================================================
# Phase 6: Strategist Identity
# ============================================================================
section "Phase 6: Strategist Identity"

STRAT_FILE="$VAULT_DIR/.claude/strategist.json"

if [[ -f "$STRAT_FILE" ]] && python3 -c "import json; d=json.load(open('$STRAT_FILE')); assert d.get('name') and d.get('clickup_id')" 2>/dev/null; then
  CUR_STRAT_NAME=$(python3 -c "import json; print(json.load(open('$STRAT_FILE'))['name'])")
  success "Strategist identity: $CUR_STRAT_NAME"
elif $CHECK_ONLY; then
  fail "Strategist identity not configured ($STRAT_FILE)"
elif [[ -n "${STRAT_NAME:-}" && -n "${STRAT_CLICKUP_ID:-}" ]]; then
  cat > "$STRAT_FILE" << EOJSON
{ "name": "$STRAT_NAME", "clickup_id": "$STRAT_CLICKUP_ID" }
EOJSON
  success "Strategist identity saved (from env): $STRAT_NAME"
else
  echo ""
  echo -e "${YELLOW}Your identity is used for ClickUp task assignment and session detection.${NC}"
  echo -n "Enter your full name: "
  read -r STRAT_NAME
  echo -n "Enter your ClickUp user ID (ask team lead if unsure): "
  read -r CLICKUP_ID
  if [[ -n "$STRAT_NAME" && -n "$CLICKUP_ID" ]]; then
    cat > "$STRAT_FILE" << EOJSON
{ "name": "$STRAT_NAME", "clickup_id": "$CLICKUP_ID" }
EOJSON
    success "Strategist identity saved"
  else
    warn "Strategist identity skipped — ClickUp loading won't assign correctly"
  fi
fi

# ============================================================================
# Phase 7: Obsidian Vault Configuration
# ============================================================================
section "Phase 7: Obsidian Configuration"

OBS_DIR="$VAULT_DIR/.obsidian"
mkdir -p "$OBS_DIR/plugins" "$OBS_DIR/themes/Minimal" "$OBS_DIR/snippets"

# --- Theme: Minimal ---
if [[ -f "$OBS_DIR/themes/Minimal/theme.css" ]]; then
  success "Minimal theme installed"
elif $CHECK_ONLY; then
  fail "Minimal theme missing"
else
  info "Downloading Minimal theme..."
  curl -sL "https://github.com/kepano/obsidian-minimal/releases/latest/download/obsidian.css" \
    -o "$OBS_DIR/themes/Minimal/theme.css"
  curl -sL "https://github.com/kepano/obsidian-minimal/releases/latest/download/manifest.json" \
    -o "$OBS_DIR/themes/Minimal/manifest.json"
  success "Minimal theme installed"
fi

# --- Appearance settings ---
if [[ ! -f "$OBS_DIR/appearance.json" ]]; then
  if ! $CHECK_ONLY; then
    cat > "$OBS_DIR/appearance.json" << 'EOJSON'
{
  "theme": "obsidian",
  "cssTheme": "Minimal",
  "showRibbon": true,
  "translucency": false,
  "nativeMenus": true,
  "enabledCssSnippets": [
    "hide-terminal-ai-buttons",
    "terminal-ai-darker-bg"
  ],
  "accentColor": ""
}
EOJSON
    success "Appearance settings written"
  else
    fail "appearance.json missing"
  fi
else
  success "Appearance settings exist"
fi

# --- CSS Snippets ---
write_snippet() {
  local name="$1" content="$2"
  local path="$OBS_DIR/snippets/$name.css"
  if [[ -f "$path" ]]; then
    success "Snippet: $name"
  elif $CHECK_ONLY; then
    fail "Snippet missing: $name"
  else
    echo "$content" > "$path"
    success "Snippet written: $name"
  fi
}

write_snippet "hide-terminal-ai-buttons" '.terminal-ai-open-root-btn,
.empty-state-cta .terminal-ai-open-root-btn,
[class*="terminal-ai-open-root"] {
  display: none !important;
}'

write_snippet "terminal-ai-darker-bg" '/* Restore contrast in Claude Code agent panel.
   Default theme: --background-primary is darker than --background-secondary,
   so user messages and input box stand out. Minimal unifies them.
   This makes --background-primary darker within the agent panel only. */

.theme-dark .workspace-leaf-content[data-type="agent-client-chat-view"] {
  --background-primary: hsl(
    var(--base-h),
    var(--base-s),
    calc(var(--base-l) - 2%)
  );
}

/* Mute diff colors — less vivid green/red */
.agent-client-diff-line-added {
  background-color: rgba(46, 160, 67, 0.08) !important;
}
.agent-client-diff-line-removed {
  background-color: rgba(248, 81, 73, 0.08) !important;
}
.agent-client-diff-word-added {
  background-color: rgba(46, 160, 67, 0.25) !important;
}
.agent-client-diff-word-removed {
  background-color: rgba(248, 81, 73, 0.25) !important;
}'

# --- Obsidian Plugins ---
install_obsidian_plugin() {
  local id="$1" repo="$2" data_json="${3:-}"
  local dir="$OBS_DIR/plugins/$id"

  if [[ -f "$dir/main.js" ]]; then
    success "Plugin: $id"
    return
  fi

  if $CHECK_ONLY; then
    fail "Plugin missing: $id"
    return
  fi

  info "Installing Obsidian plugin: $id..."
  mkdir -p "$dir"

  curl -sL "https://github.com/$repo/releases/latest/download/main.js" -o "$dir/main.js"
  curl -sL "https://github.com/$repo/releases/latest/download/manifest.json" -o "$dir/manifest.json"
  curl -sL "https://github.com/$repo/releases/latest/download/styles.css" -o "$dir/styles.css" 2>/dev/null || true

  if [[ -n "$data_json" ]]; then
    echo "$data_json" > "$dir/data.json"
  fi

  [[ -f "$dir/main.js" ]] && success "Plugin installed: $id" || fail "Plugin failed: $id"
}

install_obsidian_plugin "obsidian-minimal-settings" "kepano/obsidian-minimal-settings" '{
  "lightStyle": "minimal-light",
  "darkStyle": "minimal-dark",
  "lightScheme": "minimal-default-light",
  "darkScheme": "minimal-default-dark",
  "editorFont": "",
  "lineHeight": 1.5,
  "lineWidth": 40,
  "lineWidthWide": 50,
  "maxWidth": 88,
  "textNormal": 16,
  "textSmall": 13,
  "imgGrid": false,
  "imgWidth": "img-default-width",
  "tableWidth": "table-default-width",
  "iframeWidth": "iframe-default-width",
  "mapWidth": "map-default-width",
  "chartWidth": "chart-default-width",
  "colorfulHeadings": false,
  "colorfulFrame": false,
  "colorfulActiveStates": false,
  "trimNames": true,
  "labeledNav": false,
  "fullWidthMedia": true,
  "bordersToggle": true,
  "minimalStatus": true,
  "focusMode": false,
  "underlineInternal": true,
  "underlineExternal": true,
  "folding": true,
  "lineNumbers": false,
  "readableLineLength": true,
  "devBlockWidth": false
}'

install_obsidian_plugin "obsidian-style-settings" "mgmeyers/obsidian-style-settings" '{
  "minimal-style@@maximize-tables-off": "maximize-tables-auto",
  "minimal-style@@sidebar-tabs-style": "sidebar-tabs-wide",
  "minimal-style@@pdf-invert-dark": false,
  "minimal-style@@tabs-style": "tabs-default",
  "minimal-style@@tab-stacked-spine-orientation": "tab-stack-top",
  "minimal-style@@sidebar-tabs-names": "tab-names-off"
}'

install_obsidian_plugin "obsidian42-brat" "TfTHacker/obsidian42-brat" '{
  "pluginList": ["RAIT-09/obsidian-agent-client"],
  "pluginSubListFrozenVersion": [{"repo": "RAIT-09/obsidian-agent-client", "version": "latest"}],
  "themesList": [],
  "updateAtStartup": true,
  "updateThemesAtStartup": true,
  "enableAfterInstall": true,
  "loggingEnabled": false,
  "loggingPath": "BRAT-log",
  "loggingVerboseEnabled": false,
  "debuggingMode": false,
  "notificationsEnabled": true,
  "globalTokenName": "",
  "personalAccessToken": "",
  "selectLatestPluginVersionByDefault": false,
  "allowIncompatiblePlugins": false
}'

# Agent Client plugin (with resolved paths for the ACP adapter)
AGENT_DIR="$OBS_DIR/plugins/agent-client"
if [[ -f "$AGENT_DIR/main.js" ]]; then
  success "Plugin: agent-client"
else
  if $CHECK_ONLY; then
    fail "Plugin missing: agent-client"
  else
    info "Installing Obsidian plugin: agent-client..."
    mkdir -p "$AGENT_DIR"
    curl -sL "https://github.com/RAIT-09/obsidian-agent-client/releases/latest/download/main.js" -o "$AGENT_DIR/main.js"
    curl -sL "https://github.com/RAIT-09/obsidian-agent-client/releases/latest/download/manifest.json" -o "$AGENT_DIR/manifest.json"
    curl -sL "https://github.com/RAIT-09/obsidian-agent-client/releases/latest/download/styles.css" -o "$AGENT_DIR/styles.css" 2>/dev/null || true
    [[ -f "$AGENT_DIR/main.js" ]] && success "Plugin installed: agent-client" || fail "Plugin failed: agent-client"
  fi
fi

# Write agent-client data.json with resolved paths (always refresh — paths are machine-specific)
if has_cmd node && has_cmd claude-agent-acp && ! $CHECK_ONLY; then
  NODE_PATH="$(which node)"
  ACP_PATH="$(which claude-agent-acp)"
  cat > "$AGENT_DIR/data.json" << EOJSON
{
  "nodePath": "$NODE_PATH",
  "defaultAgentId": "claude-code-acp",
  "chatViewLocation": "right-tab",
  "enableFloatingChat": false,
  "autoAllowPermissions": false,
  "autoMentionActiveNote": true,
  "claude": {
    "id": "claude-code-acp",
    "displayName": "Claude Code",
    "apiKey": "",
    "command": "$ACP_PATH",
    "args": [],
    "env": []
  },
  "customAgents": []
}
EOJSON
  success "Agent Client config written (node: $NODE_PATH)"
fi

# --- community-plugins.json ---
EXPECTED_PLUGINS='["obsidian-minimal-settings","obsidian-style-settings","obsidian42-brat","agent-client"]'
CPFILE="$OBS_DIR/community-plugins.json"

if [[ -f "$CPFILE" ]]; then
  success "community-plugins.json exists"
else
  if ! $CHECK_ONLY; then
    echo "$EXPECTED_PLUGINS" > "$CPFILE"
    success "community-plugins.json written"
  else
    fail "community-plugins.json missing"
  fi
fi

# ============================================================================
# Phase 8: Claude Code MCP Servers
# ============================================================================
section "Phase 8: Claude Code MCP Servers"

# Claude Code can be installed as a native desktop app, npm global, or via IDE extension.
# We configure MCP servers by writing directly to ~/.claude.json (project-level servers)
# and ~/.claude/settings.json (marketplace plugins) — no CLI needed.

CLAUDE_JSON="$HOME/.claude.json"

configure_project_mcps() {
  python3 << PYEOF
import json, os, sys

claude_json = os.path.expanduser("~/.claude.json")
vault_path = "$VAULT_DIR"

# Read or create
if os.path.exists(claude_json):
    with open(claude_json) as f:
        data = json.load(f)
else:
    data = {}

projects = data.setdefault("projects", {})
proj = projects.setdefault(vault_path, {})
servers = proj.setdefault("mcpServers", {})

changed = False

# ClickUp (project-level, cloud HTTP)
if "clickup" not in servers:
    servers["clickup"] = {"type": "http", "url": "https://mcp.clickup.com/mcp"}
    changed = True

# Notion (project-level, cloud HTTP)
if "notion" not in servers:
    servers["notion"] = {"type": "http", "url": "https://mcp.notion.com/mcp"}
    changed = True

if changed:
    with open(claude_json, "w") as f:
        json.dump(data, f, indent=2)
    print("CONFIGURED")
else:
    print("ALREADY_SET")
PYEOF
}

configure_marketplace_plugins() {
  python3 << PYEOF
import json, os

settings_file = os.path.expanduser("~/.claude/settings.json")
os.makedirs(os.path.dirname(settings_file), exist_ok=True)

if os.path.exists(settings_file):
    with open(settings_file) as f:
        data = json.load(f)
else:
    data = {}

changed = False

# Marketplace sources
markets = data.setdefault("extraKnownMarketplaces", {})
if "notion-plugin-marketplace" not in markets:
    markets["notion-plugin-marketplace"] = {
        "source": {"source": "github", "repo": "makenotion/claude-code-notion-plugin"}
    }
    changed = True

if "motion-mcp" not in markets:
    markets["motion-mcp"] = {
        "source": {"source": "github", "repo": "Motion-Creative/motion-creative-plugin"}
    }
    changed = True

# Enable plugins
plugins = data.setdefault("enabledPlugins", {})
if "notion-workspace-plugin@notion-plugin-marketplace" not in plugins:
    plugins["notion-workspace-plugin@notion-plugin-marketplace"] = True
    changed = True

if changed:
    with open(settings_file, "w") as f:
        json.dump(data, f, indent=2)
    print("CONFIGURED")
else:
    print("ALREADY_SET")
PYEOF
}

if $CHECK_ONLY; then
  # Check project-level MCPs
  if [[ -f "$CLAUDE_JSON" ]] && python3 -c "
import json
with open('$CLAUDE_JSON') as f: d = json.load(f)
s = d.get('projects',{}).get('$VAULT_DIR',{}).get('mcpServers',{})
assert 'clickup' in s and 'notion' in s
" 2>/dev/null; then
    success "Project MCP servers configured (ClickUp, Notion)"
  else
    fail "Project MCP servers missing (ClickUp and/or Notion)"
  fi

  # Check marketplace plugins (can be in settings.json OR known_marketplaces.json)
  if python3 -c "
import json, os
found = set()
for path in [
    os.path.expanduser('~/.claude/settings.json'),
    os.path.expanduser('~/.claude/plugins/known_marketplaces.json')
]:
    if os.path.exists(path):
        with open(path) as f:
            d = json.load(f)
        # settings.json uses extraKnownMarketplaces; known_marketplaces.json is top-level
        markets = d.get('extraKnownMarketplaces', d) if 'extraKnownMarketplaces' in d else d
        found.update(markets.keys())
assert 'notion-plugin-marketplace' in found and 'motion-mcp' in found
" 2>/dev/null; then
    success "Marketplace plugins configured (Notion, Motion)"
  else
    fail "Marketplace plugins missing (Notion and/or Motion)"
  fi
else
  # Configure project-level MCPs
  RESULT=$(configure_project_mcps)
  if [[ "$RESULT" == "CONFIGURED" ]]; then
    success "Project MCP servers configured (ClickUp, Notion)"
  else
    success "Project MCP servers already configured"
  fi

  # Configure marketplace plugins
  RESULT=$(configure_marketplace_plugins)
  if [[ "$RESULT" == "CONFIGURED" ]]; then
    success "Marketplace plugins configured (Notion, Motion)"
  else
    success "Marketplace plugins already configured"
  fi

  echo ""
  echo -e "  ${BOLD}Google Drive (optional — needs separate OAuth setup):${NC}"
  echo -e "  1. Create OAuth credentials at https://console.cloud.google.com/apis/credentials"
  echo -e "  2. Save the JSON to ~/.config/google-drive-mcp/gcp-oauth.keys.json"
  echo -e "  3. Add to Claude Code: In a session, ask Claude to add the Google Drive MCP"
  echo ""
fi

info "First time using ClickUp or Notion, Claude Code will prompt you to log in via browser."

# ============================================================================
# Phase 9: Interactive Logins
# ============================================================================
section "Phase 9: Interactive Logins"

echo -e "${BLUE}These logins happen via a browser window. Run them when ready:${NC}\n"

echo -e "  ${BOLD}Motion (required for pulling top creatives):${NC}"
echo -e "  agent-browser --session motion --profile ~/.claude/tools/grab/motion-profile --headed open https://projects.motionapp.com/login"
echo -e "  # Log in, then: agent-browser --session motion close\n"

echo -e "  ${BOLD}Trustpilot (optional — unlocks unlimited review pagination):${NC}"
echo -e "  agent-browser --session trustpilot --profile ~/.claude/skills/review-scraper/profiles/trustpilot --headed open https://www.trustpilot.com/users/login"
echo -e "  # Log in, then: agent-browser --session trustpilot close\n"

echo -e "  ${BOLD}Amazon (required for Amazon review scraping):${NC}"
echo -e "  agent-browser --session amazon --profile ~/.claude/skills/review-scraper/profiles/amazon --headed open https://www.amazon.com/ap/signin"
echo -e "  # Log in, then: agent-browser --session amazon close\n"

success "Login commands printed above — run them when needed"

# ============================================================================
# Phase 10: Optional — Pinokio MLX Transcription (macOS only)
# ============================================================================
section "Phase 10: Local Transcription (Optional)"

if [[ "$OS" == "Darwin" ]]; then
  if [[ -d "$HOME/pinokio/api/mlx-video-transcription.git/app" ]]; then
    success "Pinokio MLX transcription installed"
  else
    echo -e "${BLUE}Local transcription uses Pinokio + MLX Whisper (free, offline, macOS only).${NC}"
    echo -e "Without it, /transcribe falls back to Gemini API (works fine, uses API credits).\n"
    echo -e "To install:"
    echo -e "  1. Download Pinokio from ${BLUE}https://pinokio.computer${NC}"
    echo -e "  2. In Pinokio, search for 'MLX Video Transcription' and install it"
    echo -e "  3. That's it — mlx-transcribe.py auto-detects the Pinokio environment\n"
    warn "Pinokio MLX not installed (optional — Gemini transcription still works)"
  fi
else
  info "MLX transcription is macOS-only. /transcribe will use Gemini API."
fi

# ============================================================================
# Summary
# ============================================================================
section "Setup Complete"

echo ""
if [[ ${#ERRORS[@]} -gt 0 ]]; then
  echo -e "${RED}${BOLD}${#ERRORS[@]} error(s):${NC}"
  for e in "${ERRORS[@]}"; do
    echo -e "  ${RED}✗${NC} $e"
  done
  echo ""
fi

if [[ ${#WARNINGS[@]} -gt 0 ]]; then
  echo -e "${YELLOW}${BOLD}${#WARNINGS[@]} warning(s):${NC}"
  for w in "${WARNINGS[@]}"; do
    echo -e "  ${YELLOW}⚠${NC} $w"
  done
  echo ""
fi

if [[ ${#ERRORS[@]} -eq 0 && ${#WARNINGS[@]} -eq 0 ]]; then
  echo -e "${GREEN}${BOLD}Everything looks good!${NC}"
fi

echo ""
echo -e "${BOLD}Next steps:${NC}"
echo "  1. Open (or restart) Obsidian with this vault"
echo "  2. Start Claude Code (open the vault directory in terminal and run 'claude',"
echo "     or use the Agent Client sidebar in Obsidian)"
echo "  3. Run the Motion login when you need /motion-pull"
echo ""
echo -e "Run ${BOLD}bash setup.sh --check${NC} anytime to verify your setup."
