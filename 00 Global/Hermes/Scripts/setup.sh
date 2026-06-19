#!/usr/bin/env bash
# ============================================================================
# Reach Digital Vault — Hermes-native Setup (cross-platform)
# ============================================================================
# Provisions a new machine (or recovers from a wipe) to a fully-working
# Reach Digital Hermes state. Idempotent — safe to re-run.
#
# Usage:
#   bash 00\ Global/Hermes/Scripts/setup.sh              Full setup (provisions what's missing)
#   bash 00\ Global/Hermes/Scripts/setup.sh --check     Verify only (no changes)
#   bash 00\ Global/Hermes/Scripts/setup.sh --help      Show this header
#
# Supports: macOS (Homebrew), Linux (apt or dnf). Windows requires WSL.
#
# Phases:
#   1. System deps       — git, yt-dlp, ffmpeg, go, node, python3, agent-browser, claude-agent-acp
#   2. Camofox browser   — clone/install local anti-bot browser backend, set CAMOFOX_URL, install macOS LaunchAgent
#   3. Node tools        — npm install in each tool dir under 00 Global/Hermes/tools/
#   4. Go CLIs           — build motion-pp-cli + clickup-pp-cli from printing-press source
#   5. API keys          — verify .env has GOOGLE_API_KEY, FAL_KEY; verify ClickUp config.toml has a valid auth_header
#   6. Strategist        — create 00 Global/Hermes/strategist.json template if missing
#   7. MCP servers       — verify ClickUp is configured; print Google Drive manual steps (Notion deprecated)
#   8. Browser profiles  — ensure review-sampler/profiles/{trustpilot,amazon} dirs exist
#   9. Smoke test        — run reach-digital-ops/scripts/smoke-test.sh at the end
# ============================================================================

set -euo pipefail

# --- Path setup ---------------------------------------------------------------
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VAULT_DIR="$(cd "$SCRIPT_DIR/../../.." && pwd)"
HERMES_DIR="$VAULT_DIR/00 Global/Hermes"
TOOLS_DIR="$HERMES_DIR/tools"
COMMANDS_DIR="$HERMES_DIR/Commands"
PROFILE_DIR="$HOME/.hermes/profiles/reach-digital"
SMOKE_TEST="$PROFILE_DIR/skills/reach-digital/reach-digital-ops/scripts/smoke-test.sh"
PRINTING_PRESS_REPO="${PRINTING_PRESS_REPO:-https://github.com/TheProdigal95/printing-press.git}"
PRINTING_PRESS_DIR="${PRINTING_PRESS_DIR:-$HOME/printing-press}"
CAMOFOX_REPO="${CAMOFOX_REPO:-https://github.com/jo-inc/camofox-browser.git}"
CAMOFOX_DIR="${CAMOFOX_DIR:-$PROFILE_DIR/camofox-browser}"
CAMOFOX_URL_VALUE="${CAMOFOX_URL_VALUE:-http://localhost:9377}"
CAMOFOX_LABEL="com.reachdigital.hermes-camofox"
CAMOFOX_PLIST="$HOME/Library/LaunchAgents/$CAMOFOX_LABEL.plist"
# Desktop-launched shells and fresh Hermes installs often do not inherit zsh PATH.
# Include the standard user binary locations before checking/building tools.
export PATH="$HOME/.local/bin:$HOME/go/bin:/opt/homebrew/bin:/usr/local/bin:$PATH"

# --- Output helpers -----------------------------------------------------------
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; BLUE='\033[0;34m'; BOLD='\033[1m'; NC='\033[0m'
ok()   { printf "  ${GREEN}✓${NC} %s\n" "$*"; }
warn() { printf "  ${YELLOW}!${NC} %s\n" "$*"; }
err()  { printf "  ${RED}✗${NC} %s\n" "$*"; }
hdr()  { printf "\n${BOLD}${BLUE}━━━ %s ━━━${NC}\n" "$*"; }
note() { printf "    ${YELLOW}→${NC} %s\n" "$*"; }
manual_block() {
  printf "\n${BOLD}${RED}━━━ MANUAL STEP REQUIRED ━━━${NC}\n"
  printf "  %s\n" "$1"
  printf "  ${YELLOW}(then re-run this script)${NC}\n\n"
}

# --- Argument parsing ---------------------------------------------------------
CHECK_ONLY=false
case "${1:-}" in
  --check) CHECK_ONLY=true ;;
  --help|-h)
    sed -n '3,25p' "$0"
    exit 0
    ;;
  "") ;;
  *) err "Unknown flag: $1"; exit 2 ;;
esac

# --- OS + package manager detection -------------------------------------------
OS_TYPE="$(uname -s)"
PKG_MGR=""
HAS_SUDO=""

detect_pkg_mgr() {
  if [ "$OS_TYPE" = "Darwin" ]; then
    if command -v brew >/dev/null 2>&1; then
      PKG_MGR="brew"
    else
      PKG_MGR="brew-missing"
    fi
  elif [ "$OS_TYPE" = "Linux" ]; then
    if command -v apt-get >/dev/null 2>&1; then
      PKG_MGR="apt"
    elif command -v dnf >/dev/null 2>&1; then
      PKG_MGR="dnf"
    elif command -v pacman >/dev/null 2>&1; then
      PKG_MGR="pacman"
    elif command -v brew >/dev/null 2>&1; then
      PKG_MGR="brew"
    else
      PKG_MGR="none"
    fi
  else
    PKG_MGR="unsupported"
  fi
  if command -v sudo >/dev/null 2>&1; then HAS_SUDO="sudo"; fi
}

# Package name mapping per manager (apt and dnf have different names from brew)
pkg_name() {
  local generic="$1"
  case "$PKG_MGR:$generic" in
    brew:git) echo "git" ;;
    brew:yt-dlp) echo "yt-dlp" ;;
    brew:ffmpeg) echo "ffmpeg" ;;
    brew:go) echo "go" ;;
    brew:node) echo "node" ;;
    brew:python3) echo "python3" ;;
    apt:git) echo "git" ;;
    apt:yt-dlp) echo "yt-dlp" ;;
    apt:ffmpeg) echo "ffmpeg" ;;
    apt:go) echo "golang-go" ;;
    apt:node) echo "nodejs npm" ;;
    apt:python3) echo "python3 python3-pip python3-venv" ;;
    dnf:git) echo "git" ;;
    dnf:yt-dlp) echo "yt-dlp" ;;
    dnf:ffmpeg) echo "ffmpeg" ;;
    dnf:go) echo "golang" ;;
    dnf:node) echo "nodejs npm" ;;
    dnf:python3) echo "python3 python3-pip python3-virtualenv" ;;
    pacman:git) echo "git" ;;
    pacman:yt-dlp) echo "yt-dlp" ;;
    pacman:ffmpeg) echo "ffmpeg" ;;
    pacman:go) echo "go" ;;
    pacman:node) echo "nodejs npm" ;;
    pacman:python3) echo "python python-pip" ;;
    *) echo "$generic" ;;
  esac
}

pkg_install() {
  local pkgs="$*"
  case "$PKG_MGR" in
    brew)
      brew install $pkgs
      ;;
    apt)
      [ -n "$HAS_SUDO" ] && $HAS_SUDO apt-get update -y && $HAS_SUDO apt-get install -y $pkgs || apt-get install -y $pkgs
      ;;
    dnf)
      [ -n "$HAS_SUDO" ] && $HAS_SUDO dnf install -y $pkgs || dnf install -y $pkgs
      ;;
    pacman)
      [ -n "$HAS_SUDO" ] && $HAS_SUDO pacman -S --noconfirm $pkgs || pacman -S --noconfirm $pkgs
      ;;
    *)
      err "No supported package manager found"
      return 1
      ;;
  esac
}

ensure_env_var() {
  local file="$1" key="$2" value="$3"
  mkdir -p "$(dirname "$file")"
  touch "$file"
  local tmp
  tmp="$(mktemp)"
  awk -v k="$key" -v v="$value" '
    BEGIN { done=0 }
    $0 ~ "^" k "=" { print k "=" v; done=1; next }
    { print }
    END { if (!done) print k "=" v }
  ' "$file" > "$tmp"
  mv "$tmp" "$file"
}

install_camofox_launch_agent() {
  [ "$OS_TYPE" = "Darwin" ] || return 0
  mkdir -p "$HOME/Library/LaunchAgents" "$PROFILE_DIR/camofox/profile" "$PROFILE_DIR/camofox/cookies" "$PROFILE_DIR/camofox/traces"
  local cmd
  cmd="cd '$CAMOFOX_DIR' && export PATH='$HOME/.local/bin:$HOME/go/bin:/opt/homebrew/bin:/usr/local/bin:$PATH' && CAMOFOX_PORT=9377 CAMOFOX_PROFILE_DIR='$PROFILE_DIR/camofox/profile' CAMOFOX_COOKIES_DIR='$PROFILE_DIR/camofox/cookies' CAMOFOX_TRACES_DIR='$PROFILE_DIR/camofox/traces' npm start"
  python3 - "$CAMOFOX_PLIST" "$CAMOFOX_LABEL" "$cmd" <<'PY'
import plistlib, sys
path, label, cmd = sys.argv[1:4]
plist = {
    "Label": label,
    "ProgramArguments": ["/bin/bash", "-lc", cmd],
    "RunAtLoad": True,
    "KeepAlive": True,
    "StandardOutPath": f"/tmp/{label}.out.log",
    "StandardErrorPath": f"/tmp/{label}.err.log",
    "EnvironmentVariables": {"CAMOFOX_PORT": "9377"},
}
with open(path, "wb") as f:
    plistlib.dump(plist, f)
PY
  launchctl bootout "gui/$(id -u)" "$CAMOFOX_PLIST" >/dev/null 2>&1 || true
  if launchctl bootstrap "gui/$(id -u)" "$CAMOFOX_PLIST" >/dev/null 2>&1; then
    launchctl kickstart -k "gui/$(id -u)/$CAMOFOX_LABEL" >/dev/null 2>&1 || true
    ok "Camofox LaunchAgent installed: $CAMOFOX_PLIST"
  else
    warn "Camofox LaunchAgent could not be loaded automatically. Start manually: cd '$CAMOFOX_DIR' && CAMOFOX_PORT=9377 npm start"
  fi
}

# --- Pre-flight ---------------------------------------------------------------
hdr "Pre-flight"
if [ ! -d "$HERMES_DIR" ]; then
  err "Vault restructure not found — $HERMES_DIR does not exist"
  err "This script must run from a Reach Digital vault that has the Hermes-native structure"
  exit 1
fi
ok "Vault found: $VAULT_DIR"
ok "Hermes config found: $HERMES_DIR"
ok "OS: $OS_TYPE"

detect_pkg_mgr
ok "Package manager: ${PKG_MGR:-(none detected)}"

if [ "$PKG_MGR" = "unsupported" ]; then
  err "OS $OS_TYPE is not supported. Use WSL on Windows, or run on macOS/Linux natively."
  exit 1
fi

# --- Phase 1: System dependencies ---------------------------------------------
hdr "Phase 1: System dependencies"
if [ "$PKG_MGR" = "brew-missing" ]; then
  err "Homebrew not found. This is required on macOS."
  manual_block "Install Homebrew by pasting this into your terminal (it is interactive):
    /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\"

  After install, re-run: bash $0"
  if [ "$CHECK_ONLY" = false ]; then exit 1; fi
elif [ "$PKG_MGR" = "none" ]; then
  err "No supported package manager found (looked for: apt, dnf, pacman, brew)."
  err "Install one of: apt (Debian/Ubuntu), dnf (Fedora/RHEL), or Homebrew (Linuxbrew)."
  if [ "$CHECK_ONLY" = false ]; then exit 1; fi
fi

# What we need and what we can install via package manager
SYS_PACKAGES=(git yt-dlp ffmpeg go node python3)
NEED_INSTALL=()
for pkg in "${SYS_PACKAGES[@]}"; do
  if command -v "$pkg" >/dev/null 2>&1; then
    ok "$pkg ($(command -v "$pkg"))"
  else
    if [ "$CHECK_ONLY" = true ]; then
      err "$pkg — missing (will be installed by re-running without --check)"
    else
      NEED_INSTALL+=("$(pkg_name "$pkg")")
    fi
  fi
done
if [ ${#NEED_INSTALL[@]} -gt 0 ] && [ "$CHECK_ONLY" = false ]; then
  note "Installing via $PKG_MGR: ${NEED_INSTALL[*]}"
  if ! pkg_install "${NEED_INSTALL[@]}"; then
    err "Package install failed. See error above. You may need to run with sudo or check your network."
    exit 1
  fi
  # Re-verify after install
  for pkg in "${SYS_PACKAGES[@]}"; do
    command -v "$pkg" >/dev/null 2>&1 && ok "$pkg — installed ($(command -v "$pkg"))"
  done
fi

# npm globals (only after node is available)
for pkg in agent-browser claude-agent-acp; do
  if command -v "$pkg" >/dev/null 2>&1; then
    ok "$pkg ($(command -v "$pkg"))"
  else
    if [ "$CHECK_ONLY" = true ]; then
      err "$pkg — missing (npm install -g $pkg)"
    else
      note "Installing npm global: $pkg"
      npm install -g "$pkg" || err "Failed to install $pkg (may need sudo)"
    fi
  fi
done

# Go is needed for Go CLI builds. If missing after Phase 1, the Go CLI build will fail.
if ! command -v go >/dev/null 2>&1; then
  warn "Go not found — Go CLIs cannot be built in this run. Install Go and re-run."
fi

# --- Phase 2: Camofox local browser backend -----------------------------------
hdr "Phase 2: Camofox local browser backend"
ENV_FILE="$PROFILE_DIR/.env"
if [ "$CHECK_ONLY" = true ]; then
  [ -d "$CAMOFOX_DIR" ] && ok "Camofox source present: $CAMOFOX_DIR" || warn "Camofox source missing (will clone $CAMOFOX_REPO)"
  [ -d "$CAMOFOX_DIR/node_modules" ] && ok "Camofox node_modules installed" || warn "Camofox node_modules missing (will npm install)"
  if [ -f "$ENV_FILE" ] && grep -q "^CAMOFOX_URL=$CAMOFOX_URL_VALUE" "$ENV_FILE"; then
    ok "CAMOFOX_URL set in profile .env"
  else
    warn "CAMOFOX_URL not set in $ENV_FILE (will add $CAMOFOX_URL_VALUE)"
  fi
  if command -v curl >/dev/null 2>&1 && curl -fsS "$CAMOFOX_URL_VALUE/health" >/dev/null 2>&1; then
    ok "Camofox health endpoint reachable: $CAMOFOX_URL_VALUE/health"
  else
    warn "Camofox not currently reachable on $CAMOFOX_URL_VALUE (LaunchAgent/manual start needed)"
  fi
else
  mkdir -p "$PROFILE_DIR"
  if [ -d "$CAMOFOX_DIR/.git" ]; then
    ok "Camofox source present: $CAMOFOX_DIR"
  elif command -v git >/dev/null 2>&1; then
    note "Cloning Camofox browser backend: $CAMOFOX_REPO → $CAMOFOX_DIR"
    git clone "$CAMOFOX_REPO" "$CAMOFOX_DIR" && ok "Camofox source cloned" || warn "Camofox clone failed"
  else
    warn "git not found — cannot clone Camofox browser backend"
  fi
  if [ -f "$CAMOFOX_DIR/package.json" ] && command -v npm >/dev/null 2>&1; then
    note "Installing Camofox dependencies (downloads browser binaries on first install)"
    (cd "$CAMOFOX_DIR" && npm install) && ok "Camofox npm install complete" || warn "Camofox npm install failed"
    install_camofox_launch_agent
  else
    warn "Camofox package.json or npm missing — skipping Camofox npm install"
  fi
  ensure_env_var "$ENV_FILE" "CAMOFOX_URL" "$CAMOFOX_URL_VALUE"
  ok "CAMOFOX_URL set in $ENV_FILE"
fi

# --- Phase 3: Node tools -------------------------------------------------------
hdr "Phase 3: Node tools (00 Global/Hermes/tools/)"
if ! command -v npm >/dev/null 2>&1; then
  err "npm not found — cannot install Node tools. Re-run Phase 1 first."
else
  for tool_dir in "$TOOLS_DIR"/*/; do
    [ -d "$tool_dir" ] || continue
    name="$(basename "$tool_dir")"
    [ -f "$tool_dir/package.json" ] || { ok "$name (not a Node tool, skipping)"; continue; }

    if [ -d "$tool_dir/node_modules" ]; then
      # Distinguish "no env needed" (pure local) from "env present" so future
      # sessions don't flag the 3 no-env tools (site-scraper, review-sampler,
      # persona-counter) as "missing" — they have no .env.example and never need
      # one. Tools that DO need env (gemini-api, fal-ai, ad-classifier,
      # endcard-generator) keep the standard message.
      if [ ! -f "$tool_dir/.env.example" ] && [ ! -f "$tool_dir/.env" ]; then
        ok "$name — node_modules installed (no .env needed: pure local processing)"
      else
        ok "$name — node_modules installed"
      fi
    else
      if [ "$CHECK_ONLY" = true ]; then
        err "$name — node_modules missing (cd \"$tool_dir\" && npm install)"
      else
        note "Installing $name: npm install (cwd: $tool_dir)"
        (cd "$tool_dir" && npm install) && ok "$name — installed" || err "$name — install FAILED"
      fi
    fi

    if [ -f "$tool_dir/.env.example" ] && [ ! -f "$tool_dir/.env" ]; then
      if [ "$CHECK_ONLY" = true ]; then
        warn "$name — .env missing (template at .env.example)"
      else
        note "Copying .env.example → .env for $name (edit with your keys)"
        cp "$tool_dir/.env.example" "$tool_dir/.env"
        warn "$name — .env created from template, EDIT IT with your keys"
      fi
    fi
  done
fi

# --- Phase 4: Go CLIs ---------------------------------------------------------
cli_source_dir() {
  case "$1" in
    motion-pp-cli)  echo "$PRINTING_PRESS_DIR/library/motion" ;;
    clickup-pp-cli) echo "$PRINTING_PRESS_DIR/library/clickup" ;;
    *)              echo "$PRINTING_PRESS_DIR/library/$1" ;;
  esac
}

ensure_printing_press_repo() {
  if [ -d "$PRINTING_PRESS_DIR/.git" ]; then
    ok "printing-press source present: $PRINTING_PRESS_DIR"
    return 0
  fi
  if [ "$CHECK_ONLY" = true ]; then
    err "printing-press source missing at $PRINTING_PRESS_DIR (will clone $PRINTING_PRESS_REPO)"
    return 1
  fi
  if ! command -v git >/dev/null 2>&1; then
    err "git not found — cannot clone printing-press source"
    return 1
  fi
  note "Cloning printing-press source: $PRINTING_PRESS_REPO → $PRINTING_PRESS_DIR"
  git clone "$PRINTING_PRESS_REPO" "$PRINTING_PRESS_DIR" \
    && ok "printing-press source cloned" \
    || { err "printing-press clone failed"; return 1; }
}

hdr "Phase 4: Go CLIs (printing-press source)"
mkdir -p "$HOME/go/bin"
for cli in motion-pp-cli clickup-pp-cli; do
  if command -v "$cli" >/dev/null 2>&1; then
    ok "$cli — installed at $(command -v "$cli")"
  elif [ -x "$HOME/go/bin/$cli" ]; then
    ok "$cli — installed at $HOME/go/bin/$cli (add $HOME/go/bin to PATH if Hermes cannot find it)"
  elif ! command -v go >/dev/null 2>&1; then
    if [ "$CHECK_ONLY" = true ]; then
      err "$cli — missing AND Go not installed (can't build)"
    else
      err "$cli — Go not installed; skipping build. Install Go and re-run."
    fi
  else
    if [ "$CHECK_ONLY" = true ]; then
      err "$cli — missing (will build from $PRINTING_PRESS_DIR)"
    else
      ensure_printing_press_repo || continue
      src="$(cli_source_dir "$cli")"
      if [ -d "$src" ]; then
        note "Building $cli from $src"
        (cd "$src" && go build -o "$HOME/go/bin/$cli" ./cmd/"$cli") \
          && ok "$cli — built and installed to $HOME/go/bin/$cli" \
          || err "$cli — build FAILED. Check Go env and printing-press source."
      else
        err "$cli — source not found at $src"
      fi
    fi
  fi
done

# --- Phase 5: API keys ---------------------------------------------------------
hdr "Phase 5: API keys (profile .env)"
ENV_FILE="$PROFILE_DIR/.env"
if [ ! -f "$ENV_FILE" ]; then
  err ".env not found at $ENV_FILE."
  err "Create it (e.g. by copying from a working machine or by running 'hermes auth' which writes one)."
  if [ "$CHECK_ONLY" = false ]; then exit 1; fi
else
  for key in GOOGLE_API_KEY FAL_KEY; do
    val=$(grep "^$key=" "$ENV_FILE" 2>/dev/null | head -1 | cut -d= -f2-)
    if [ -n "$val" ] && [ "$val" != "#" ] && [[ "$val" != \#* ]]; then
      ok "$key set"
    else
      err "$key missing or commented out in $ENV_FILE"
      note "Get keys from: Gemini https://aistudio.google.com/apikey · FAL https://fal.ai/dashboard/keys"
    fi
  done
  # ClickUp: NOT an env var. The Go CLI reads ~/.config/clickup-pp-cli/config.toml → auth_header.
  # Verify the config file is present and the CLI can do a live API call.
  CLICKUP_CFG="$HOME/.config/clickup-pp-cli/config.toml"
  if [ -f "$CLICKUP_CFG" ] && grep -qE "^auth_header\s*=\s*['\"]pk_" "$CLICKUP_CFG"; then
    if command -v clickup-pp-cli >/dev/null 2>&1 || [ -x "$HOME/go/bin/clickup-pp-cli" ]; then
      if clickup-pp-cli team --json --compact >/dev/null 2>&1; then
        ok "ClickUp CLI auth: config.toml has valid pk_ token, live API reachable"
      else
        err "ClickUp CLI auth: config.toml has a pk_ token but live API returns 401 — token may be revoked"
        note "Rotate at: https://app.clickup.com → Settings → Apps → API → Personal API Token, then 'clickup-pp-cli auth set-token <NEW>' or edit $CLICKUP_CFG"
      fi
    else
      warn "ClickUp CLI binary not found yet (will be installed in phase 3); cannot verify auth"
    fi
  else
    err "ClickUp CLI auth: $CLICKUP_CFG missing or has no pk_ auth_header"
    note "Generate a token at https://app.clickup.com → Settings → Apps → API → Personal API Token, then 'clickup-pp-cli auth set-token <NEW>' (which writes $CLICKUP_CFG)"
  fi
fi

# --- Phase 6: Strategist identity ----------------------------------------------
hdr "Phase 6: Strategist identity (00 Global/Hermes/strategist.json)"
STRATEGIST="$HERMES_DIR/strategist.json"
if [ -f "$STRATEGIST" ]; then
  ok "strategist.json present: $(cat "$STRATEGIST")"
elif [ "$CHECK_ONLY" = true ]; then
  err "strategist.json missing"
else
  note "Creating template strategist.json — EDIT IT with your name + ClickUp user ID"
  printf '{ "name": "Your Name", "clickup_id": "12345678" }\n' > "$STRATEGIST"
  err "strategist.json template created. Edit it NOW with: nano $STRATEGIST"
  err "If you don't know your ClickUp user ID, ask the system: it can look you up in team_to_clickup.json"
fi

# --- Phase 7: MCP servers ------------------------------------------------------
hdr "Phase 7: MCP servers"
if command -v hermes >/dev/null 2>&1; then
  if [ "$CHECK_ONLY" = true ]; then
    note "Run: hermes mcp list — ClickUp should show ✓ enabled, 51 tools"
  else
    note "Running: hermes mcp list"
    hermes mcp list 2>&1 | head -10 || warn "hermes mcp list failed"
    if ! hermes mcp list 2>&1 | grep -q "clickup.*✓ enabled"; then
      warn "ClickUp MCP not enabled. To enable it:"
      note "  hermes mcp add clickup --url https://mcp.clickup.com/mcp --auth oauth"
      note "  (browser will open for OAuth on first use)"
    fi
  fi
else
  warn "hermes CLI not on PATH. Install Hermes Agent first from https://hermes-agent.nousresearch.com"
fi

# --- Phase 8: Browser profile dirs ---------------------------------------------
hdr "Phase 8: Browser profiles (agent-browser)"
for service in trustpilot amazon; do
  prof="$TOOLS_DIR/review-sampler/profiles/$service"
  if [ -d "$prof" ]; then
    ok "profiles/$service/ exists"
  elif [ "$CHECK_ONLY" = true ]; then
    warn "profiles/$service/ missing — created on first agent-browser login"
  else
    mkdir -p "$prof"
    ok "profiles/$service/ created"
  fi
done

# --- Phase 9: Smoke test -------------------------------------------------------
hdr "Phase 9: Smoke test"
if [ -f "$SMOKE_TEST" ]; then
  if [ "$CHECK_ONLY" = true ]; then
    note "Run: bash $SMOKE_TEST"
  else
    note "Running smoke test..."
    if bash "$SMOKE_TEST" 2>&1 | tail -25; then
      ok "Smoke test complete"
    else
      warn "Smoke test reported warnings (see output above). Re-run for full details."
    fi
  fi
else
  warn "Smoke test script not found at $SMOKE_TEST"
fi

# --- Phase 10: Profile cwd sync -------------------------------------------------
hdr "Phase 10: Hermes profile working directory"
if command -v hermes >/dev/null 2>&1; then
  if [ "$CHECK_ONLY" = true ]; then
    note "Run after provisioning: hermes -p reach-digital config set terminal.cwd '$VAULT_DIR'"
  else
    if hermes -p reach-digital config set terminal.cwd "$VAULT_DIR" >/dev/null 2>&1; then
      ok "reach-digital terminal.cwd set to $VAULT_DIR"
    else
      warn "Could not set terminal.cwd automatically. Run manually: hermes -p reach-digital config set terminal.cwd '$VAULT_DIR'"
    fi
  fi
else
  warn "hermes CLI not on PATH — set the Desktop profile working directory manually to $VAULT_DIR"
fi

# --- Done ----------------------------------------------------------------------
hdr "Done"
if [ "$CHECK_ONLY" = true ]; then
  echo "  This was --check mode. Re-run without --check to provision missing items."
  echo "  Or use the 'setup' Hermes skill for a guided walkthrough."
else
  echo "  Setup complete. If any ✗ above, address them before running batch work."
  echo "  Next: open Hermes in the vault ('hermes') and try a real workflow."
  echo "  Manual steps you may still need to take:"
  echo "    - Edit .env with your own API keys if any are missing"
  echo "    - Edit strategist.json with your name + ClickUp user ID if it was templated"
  echo "    - OAuth-login to ClickUp MCP in your browser (if just added)"
  echo "    - Run agent-browser logins for Motion / Trustpilot / Amazon as needed"
  echo "    - Restart Hermes Desktop after CAMOFOX_URL is added so browser tools use Camofox"
fi
