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
#   1. System deps       — yt-dlp, ffmpeg, go, node, python3, agent-browser, claude-agent-acp
#   2. Node tools        — npm install in each tool dir under 00 Global/Hermes/Tools/
#   3. Go CLIs           — build motion-pp-cli + clickup-pp-cli from printing-press source
#   4. API keys          — verify .env has GOOGLE_API_KEY, FAL_KEY, CLICKUP_API_TOKEN
#   5. Strategist         — create 00 Global/Hermes/strategist.json template if missing
#   6. MCP servers        — verify ClickUp is configured; print Notion/Drive manual steps
#   7. Browser profiles   — ensure review-sampler/profiles/{trustpilot,amazon} dirs exist
#   8. Smoke test         — run reach-digital-ops/scripts/smoke-test.sh at the end
# ============================================================================

set -euo pipefail

# --- Path setup ---------------------------------------------------------------
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VAULT_DIR="$(cd "$SCRIPT_DIR/../../.." && pwd)"
HERMES_DIR="$VAULT_DIR/00 Global/Hermes"
TOOLS_DIR="$HERMES_DIR/Tools"
COMMANDS_DIR="$HERMES_DIR/Commands"
PROFILE_DIR="$HOME/.hermes/profiles/reach-digital"
SMOKE_TEST="$PROFILE_DIR/skills/reach-digital/reach-digital-ops/scripts/smoke-test.sh"

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
    brew:yt-dlp) echo "yt-dlp" ;;
    brew:ffmpeg) echo "ffmpeg" ;;
    brew:go) echo "go" ;;
    brew:node) echo "node" ;;
    brew:python3) echo "python3" ;;
    apt:yt-dlp) echo "yt-dlp" ;;
    apt:ffmpeg) echo "ffmpeg" ;;
    apt:go) echo "golang-go" ;;
    apt:node) echo "nodejs npm" ;;
    apt:python3) echo "python3 python3-pip python3-venv" ;;
    dnf:yt-dlp) echo "yt-dlp" ;;
    dnf:ffmpeg) echo "ffmpeg" ;;
    dnf:go) echo "golang" ;;
    dnf:node) echo "nodejs npm" ;;
    dnf:python3) echo "python3 python3-pip python3-virtualenv" ;;
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
SYS_PACKAGES=(yt-dlp ffmpeg go node python3)
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

# --- Phase 2: Node tools -------------------------------------------------------
hdr "Phase 2: Node tools (00 Global/Hermes/Tools/)"
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

# --- Phase 3: Go CLIs ---------------------------------------------------------
hdr "Phase 3: Go CLIs (printing-press source)"
for cli in motion-pp-cli clickup-pp-cli; do
  if command -v "$cli" >/dev/null 2>&1; then
    ok "$cli — installed at $(command -v "$cli")"
  elif ! command -v go >/dev/null 2>&1; then
    if [ "$CHECK_ONLY" = true ]; then
      err "$cli — missing AND Go not installed (can't build)"
    else
      err "$cli — Go not installed; skipping build. Install Go and re-run."
    fi
  else
    if [ "$CHECK_ONLY" = true ]; then
      err "$cli — missing (clone printing-press or copy binary to $HOME/go/bin/)"
    elif [ -d "$HOME/printing-press/library/$cli" ]; then
      note "Building $cli from $HOME/printing-press/library/$cli"
      (cd "$HOME/printing-press/library/$cli" && go build -o "$HOME/go/bin/$cli" ./cmd/"$cli") \
        && ok "$cli — built and installed to $HOME/go/bin/$cli" \
        || err "$cli — build FAILED. Check Go env and printing-press source."
    else
      err "$cli — source not found at ~/printing-press/library/$cli."
      err "Either clone printing-press (if you have access) or copy a pre-built binary to $HOME/go/bin/."
    fi
  fi
done

# --- Phase 4: API keys ---------------------------------------------------------
hdr "Phase 4: API keys (profile .env)"
ENV_FILE="$PROFILE_DIR/.env"
if [ ! -f "$ENV_FILE" ]; then
  err ".env not found at $ENV_FILE."
  err "Create it (e.g. by copying from a working machine or by running 'hermes auth' which writes one)."
  if [ "$CHECK_ONLY" = false ]; then exit 1; fi
else
  for key in GOOGLE_API_KEY FAL_KEY CLICKUP_API_TOKEN; do
    val=$(grep "^$key=" "$ENV_FILE" 2>/dev/null | head -1 | cut -d= -f2-)
    if [ -n "$val" ] && [ "$val" != "#" ] && [[ "$val" != \#* ]]; then
      ok "$key set"
    else
      err "$key missing or commented out in $ENV_FILE"
      note "Get keys from: Gemini https://aistudio.google.com/apikey · FAL https://fal.ai/dashboard/keys · ClickUp: Settings → Apps → API"
    fi
  done
fi

# --- Phase 5: Strategist identity ----------------------------------------------
hdr "Phase 5: Strategist identity (00 Global/Hermes/strategist.json)"
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

# --- Phase 6: MCP servers ------------------------------------------------------
hdr "Phase 6: MCP servers"
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

# --- Phase 7: Browser profile dirs ---------------------------------------------
hdr "Phase 7: Browser profiles (agent-browser)"
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

# --- Phase 8: Smoke test -------------------------------------------------------
hdr "Phase 8: Smoke test"
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
fi
