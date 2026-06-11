#!/usr/bin/env bash
# ============================================================================
# Reach Digital — VPS Provisioner
# ============================================================================
# Provisions a fresh Ubuntu 22.04+ VPS into a hardened, Docker-ready host
# ready to run the Reach Digital Hermes stack.
#
# Usage:
#   sudo bash vps-provision.sh <deploy_user>   # e.g. sudo bash vps-provision.sh hermes
#
# What it does:
#   1. Creates a non-root deploy user (default: hermes) with sudo + SSH
#   2. Hardens SSH: disables root login, disables password auth
#   3. Installs UFW firewall (opens 22 + 443 only)
#   4. Installs fail2ban (brute-force protection)
#   5. Enables unattended security upgrades
#   6. Installs Docker + Docker Compose
#   7. Installs Node.js 20 LTS + Go 1.21+
#   8. Installs jq, git, curl, htop, unattended-upgrades
#   9. Sets timezone (defaults to UTC; override with TZ env var)
#  10. Prints a summary + next steps
#
# After this script finishes, run deploy-stack.sh to deploy the actual stack.
# ============================================================================

set -euo pipefail

# --- Argument parsing ---------------------------------------------------------
DEPLOY_USER="${1:-hermes}"
TZ="${TZ:-UTC}"
SSH_PORT="${SSH_PORT:-22}"

if [ "$(id -u)" -ne 0 ]; then
  echo "ERROR: this script must be run as root (sudo bash vps-provision.sh)" >&2
  exit 1
fi

# --- Output helpers -----------------------------------------------------------
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; BLUE='\033[0;34m'; BOLD='\033[1m'; NC='\033[0m'
ok()   { printf "  ${GREEN}\xe2\x9c\x93${NC} %s\n" "$*"; }
warn() { printf "  ${YELLOW}!${NC} %s\n" "$*"; }
err()  { printf "  ${RED}\xe2\x9c\x97${NC} %s\n" "$*"; }
hdr()  { printf "\n${BOLD}${BLUE}\xe2\x94\xbf\xe2\x94\xbf\xe2\x94\xbf %s \xe2\x94\xbf\xe2\x94\xbf\xe2\x94\xbf${NC}\n" "$*"; }

# --- Phase 0: preflight -------------------------------------------------------
hdr "Pre-flight"
. /etc/os-release
if [[ "$ID" != "ubuntu" && "$ID" != "debian" ]]; then
  err "This script targets Ubuntu 22.04+ / Debian 11+. Detected: $ID $VERSION_ID"
  exit 1
fi
ok "OS: $PRETTY_NAME"

if ! command -v sudo >/dev/null 2>&1; then
  err "sudo not installed. Run: apt update && apt install -y sudo"
  exit 1
fi
ok "sudo available"

# --- Phase 1: create deploy user ---------------------------------------------
hdr "Phase 1: deploy user ($DEPLOY_USER)"
if id "$DEPLOY_USER" >/dev/null 2>&1; then
  ok "$DEPLOY_USER already exists"
else
  adduser --disabled-password --gecos "" "$DEPLOY_USER"
  usermod -aG sudo "$DEPLOY_USER"
  ok "Created $DEPLOY_USER with sudo"
fi

# Ensure SSH key auth works for the new user.
# Assumes the root user (or whoever ran this script) already has at least one
# SSH key in their authorized_keys, and we copy that into the new user's
# authorized_keys. The deploy user needs SSH access from the admin's machine.
ADMIN_HOME="$(getent passwd "${SUDO_USER:-root}" | cut -d: -f6)"
if [ -f "$ADMIN_HOME/.ssh/authorized_keys" ]; then
  mkdir -p "/home/$DEPLOY_USER/.ssh"
  cp "$ADMIN_HOME/.ssh/authorized_keys" "/home/$DEPLOY_USER/.ssh/authorized_keys"
  chown -R "$DEPLOY_USER:$DEPLOY_USER" "/home/$DEPLOY_USER/.ssh"
  chmod 700 "/home/$DEPLOY_USER/.ssh"
  chmod 600 "/home/$DEPLOY_USER/.ssh/authorized_keys"
  ok "SSH authorized_keys copied from $ADMIN_HOME"
else
  warn "No authorized_keys found at $ADMIN_HOME/.ssh/authorized_keys"
  warn "You'll need to add a public key to /home/$DEPLOY_USER/.ssh/authorized_keys before SSH works as $DEPLOY_USER"
fi

# --- Phase 2: harden SSH ------------------------------------------------------
hdr "Phase 2: harden SSH"
SSHD_CONFIG="/etc/ssh/sshd_config"
cp "$SSHD_CONFIG" "$SSHD_CONFIG.bak-$(date +%Y%m%d-%H%M%S)"

# Disable root login, disable password auth, allow our user
sed -i -E 's/^#?PermitRootLogin.*/PermitRootLogin no/' "$SSHD_CONFIG"
sed -i -E 's/^#?PasswordAuthentication.*/PasswordAuthentication no/' "$SSHD_CONFIG"
sed -i -E 's/^#?PubkeyAuthentication.*/PubkeyAuthentication yes/' "$SSHD_CONFIG"
# Ensure AllowUsers line lets the deploy user in (append, don't duplicate)
if ! grep -q "^AllowUsers.*$DEPLOY_USER" "$SSHD_CONFIG"; then
  echo "AllowUsers $DEPLOY_USER" >> "$SSHD_CONFIG"
fi

if sshd -t 2>/dev/null; then
  systemctl reload ssh
  ok "SSH hardened (root login off, password auth off, AllowUsers $DEPLOY_USER)"
else
  err "sshd config test failed. Restoring backup."
  cp "$SSHD_CONFIG.bak-"* "$SSHD_CONFIG"
  exit 1
fi

# --- Phase 3: firewall --------------------------------------------------------
hdr "Phase 3: UFW firewall"
if command -v ufw >/dev/null 2>&1; then
  ok "ufw already installed"
else
  apt-get update -qq && apt-get install -y -qq ufw
  ok "Installed ufw"
fi
ufw --force reset >/dev/null
ufw default deny incoming
ufw default allow outgoing
ufw allow "$SSH_PORT/tcp" comment "SSH"
ufw allow 443/tcp comment "HTTPS (for future web UI / Open WebUI)"
ufw --force enable
ok "Firewall: only $SSH_PORT (SSH) and 443 (HTTPS) open"

# --- Phase 4: fail2ban --------------------------------------------------------
hdr "Phase 4: fail2ban"
if command -v fail2ban-server >/dev/null 2>&1; then
  ok "fail2ban already installed"
else
  apt-get install -y -qq fail2ban
  ok "Installed fail2ban"
fi
# Default jail: 5 failed attempts -> 10 min ban
cat > /etc/fail2ban/jail.local <<'EOF'
[DEFAULT]
bantime  = 10m
findtime = 10m
maxretry = 5

[sshd]
enabled = true
port    = ssh
filter  = sshd
logpath = /var/log/auth.log
EOF
systemctl enable fail2ban
systemctl restart fail2ban
ok "fail2ban enabled (5 strikes -> 10 min ban)"

# --- Phase 5: unattended upgrades --------------------------------------------
hdr "Phase 5: unattended security upgrades"
if dpkg -l unattended-upgrades >/dev/null 2>&1; then
  ok "unattended-upgrades already installed"
else
  apt-get install -y -qq unattended-upgrades
  ok "Installed unattended-upgrades"
fi
cat > /etc/apt/apt.conf.d/20auto-upgrades <<'EOF'
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Unattended-Upgrade "1";
APT::Periodic::AutocleanInterval "7";
APT::Periodic::Download-Upgradeable-Packages "1";
EOF
ok "Auto security updates enabled (daily)"

# --- Phase 6: Docker ----------------------------------------------------------
hdr "Phase 6: Docker + Compose"
if command -v docker >/dev/null 2>&1; then
  ok "Docker already installed ($(docker --version))"
else
  curl -fsSL https://get.docker.com | sh
  ok "Installed Docker"
fi
usermod -aG docker "$DEPLOY_USER"
ok "Added $DEPLOY_USER to docker group (re-login required)"
docker compose version >/dev/null 2>&1 && ok "Docker Compose: $(docker compose version)" || err "Docker Compose missing"

# --- Phase 7: Node + Go + utilities ------------------------------------------
hdr "Phase 7: Node.js 20 LTS + Go 1.21+ + utilities"
if ! command -v node >/dev/null 2>&1 || [ "$(node -v | cut -d. -f1 | tr -d 'v')" -lt 20 ]; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y -qq nodejs
  ok "Installed Node $(node -v)"
else
  ok "Node $(node -v) already installed"
fi

if ! command -v go >/dev/null 2>&1; then
  GO_VERSION="1.21.5"
  curl -fsSL "https://go.dev/dl/go${GO_VERSION}.linux-amd64.tar.gz" | tar -C /usr/local -xz
  ln -sf /usr/local/go/bin/go /usr/local/bin/go
  ln -sf /usr/local/go/bin/gofmt /usr/local/bin/gofmt
  ok "Installed Go $(go version)"
else
  ok "Go $(go version) already installed"
fi

# Utilities the stack needs
apt-get install -y -qq git jq htop tmux build-essential python3-pip python3-venv unzip
ok "Installed: git, jq, htop, tmux, build-essential, python3-pip, python3-venv, unzip"

# Media + browser stack the creative tools need (grab / transcribe / research / site-scraper).
# Guarded with `|| warn` so a single failure never aborts the hardened provision.
apt-get install -y -qq ffmpeg
apt-get install -y -qq yt-dlp 2>/dev/null \
  || python3 -m pip install --quiet --upgrade --break-system-packages yt-dlp 2>/dev/null \
  || python3 -m pip install --quiet --upgrade yt-dlp 2>/dev/null \
  || warn "yt-dlp install failed — install manually (apt install yt-dlp / pip install yt-dlp)"
npm install -g agent-browser claude-agent-acp >/dev/null 2>&1 \
  || warn "agent-browser/claude-agent-acp global npm install failed — install manually"
npx --yes playwright install --with-deps chromium >/dev/null 2>&1 \
  || warn "playwright chromium install failed — run manually: npx playwright install --with-deps chromium"
ok "Media/browser stack: ffmpeg, yt-dlp, agent-browser, claude-agent-acp, playwright chromium"
note "MLX transcription is Apple-Silicon-only — on this Linux VPS /transcribe uses Gemini, not MLX."

# --- Phase 8: timezone -------------------------------------------------------
hdr "Phase 8: timezone"
timedatectl set-timezone "$TZ"
ok "Timezone set to $TZ ($(date))"

# --- Phase 9: per-user Hermes dirs (the deploy user owns them) --------------
hdr "Phase 9: Hermes scaffold dirs"
sudo -u "$DEPLOY_USER" mkdir -p "/home/$DEPLOY_USER/.hermes/profiles"
sudo -u "$DEPLOY_USER" mkdir -p "/home/$DEPLOY_USER/.local/bin"
ok "Created /home/$DEPLOY_USER/.hermes/profiles and ~/.local/bin"

# --- Done --------------------------------------------------------------------
hdr "Done"
cat <<EOF

  VPS is hardened and ready for the Reach Digital stack.

  Next steps (run as $DEPLOY_USER, not root):
    1. Log out, log back in as $DEPLOY_USER (SSH key-only auth now)
       ssh $DEPLOY_USER@<this-vps-ip>

    2. Clone the 3 reach-digital repos to /opt/reach-digital/:
       sudo mkdir -p /opt/reach-digital
       sudo chown $DEPLOY_USER:$DEPLOY_USER /opt/reach-digital
       cd /opt/reach-digital
       git clone <vault-private-repo-url>          vault
       git clone <printing-press-private-repo-url> printing-press
       git clone <hermes-profile-private-repo-url> hermes-profile

    3. Run deploy-stack.sh to finish setup:
       bash /opt/reach-digital/vault/deploy/deploy-stack.sh

  The full deploy doc is at /opt/reach-digital/vault/deploy/README.md
  (after you clone the vault in step 2).
EOF
