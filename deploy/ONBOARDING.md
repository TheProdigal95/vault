# Reach Digital \xe2\x80\x94 Team Onboarding (1 page)

This is what every Reach Digital team member reads. **5 minutes start to finish.** If you get stuck, message Marce on Slack.

## What you're getting

A pre-configured AI agent for Reach Digital's creative strategy workflow. It knows the brands (IM8, Lifeforce, Stellar Sleep, Stepful, Comfort Ortho Wear, Elevate), the criteria, and the tools. You just chat.

## Step 1 \xe2\x80\x94 Install the Hermes app on your Mac (2 min)

1. Open https://hermes-agent.nousresearch.com/desktop in your browser
2. Download the macOS installer (`.dmg`, ~80MB)
3. Double-click the `.dmg`, drag Hermes to Applications
4. Open Hermes from Applications

The first time you open it, you'll be prompted to log in. **Skip that for now** \xe2\x80\x94 we're going to connect it to the team VPS instead.

## Step 2 \xe2\x80\x94 Get your config from Marce (1 min)

Marce will send you a YAML snippet in Slack. It looks like this:

```yaml
profile: <your-name>

terminal:
  backend: ssh
  ssh:
    host: hermes.reachdigital.com
    port: 22
    user: hermes
```

In the Hermes app, go to Settings \xe2\x86\x92 Config \xe2\x86\x92 Import, and paste the snippet. Click Save.

## Step 3 \xe2\x80\x94 Add your SSH key to the team VPS (1 min)

1. Open Terminal on your Mac
2. Generate an SSH key (if you don't already have one):
   ```bash
   ssh-keygen -t ed25519
   ```
   Press Enter to accept the defaults. No passphrase (or set one if you prefer).
3. Copy the public key:
   ```bash
   pbcopy < ~/.ssh/id_ed25519.pub
   ```
4. Send the copied key to Marce in Slack. He'll add it to the VPS.
5. Verify it works:
   ```bash
   ssh hermes@hermes.reachdigital.com
   ```
   You should get a Linux prompt. Type `exit` to log out.

## Step 4 \xe2\x80\x94 Add your API keys (2 min)

After Marce confirms your VPS access, he'll send you a one-time link. Click it, paste in your:
- **Gemini API key** (get one free at https://aistudio.google.com/apikey if you don't have one)
- **FAL.ai key** (get one at https://fal.ai/dashboard/keys if you don't have one)
- **Your ClickUp user ID** (find it in ClickUp: avatar \xe2\x86\x92 Settings \xe2\x86\x92 My Apps \xe2\x86\x92 API \xe2\x86\x92 Personal API Token)

That's it. You're done.

## Step 5 \xe2\x80\x94 Start using Hermes (now)

Open the Hermes app on your Mac. You should see a chat prompt with `reach-digital \xe2\x9d\xaf` as the indicator. Try:

> "What's in T002 working document for Stellar Sleep?"

Or:

> "Pull top spenders for Lifeforce, last 7 days"

The agent runs on the VPS \xe2\x80\x94 all the heavy lifting (transcription, ad library pulls, ClickUp loads) happens there. You just see the results in your chat.

## If something breaks

- **"Command not found" in the chat:** the VPS might be down. Message Marce.
- **"Auth failed" on the VPS:** your SSH key isn't loaded. Try `ssh-add ~/.ssh/id_ed25519` and retry.
- **"Profile not found":** your profile isn't set up yet. Message Marce.
- **For anything else:** type `/help` in the chat, or message Marce on Slack.

## What you DON'T do

- You don't install Homebrew, Go, Node, or anything else. The VPS has it all.
- You don't clone repos. The vault is already on the VPS.
- You don't manage API keys centrally. Yours stay on the VPS, in your own profile.

## Daily use

The agent is the same Hermes you know from the docs:
- Type naturally. The agent knows the team's context.
- Slash commands like `/transcribe`, `/ad-library`, `/clickup-load`, `/research-brand` work out of the box.
- Skills auto-load: `batch-planner`, `brand-researcher`, `script-writer`, `motion-top-spenders`, `grab-media`, and more.
- Your memories, sessions, and OAuth tokens are private to your profile.

Welcome to the team.
