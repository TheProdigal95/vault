# Slack message — copy/paste this when onboarding a new team member

> Hey <name> \xe2\x80\x94 setting you up on the team's Hermes instance. 5 min, 4 steps:
>
> **1. Install the Hermes app** (skip the in-app login):
> https://hermes-agent.nousresearch.com/desktop
>
> **2. Send me your SSH public key:**
> ```
> cat ~/.ssh/id_ed25519.pub
> ```
> (If you don't have one yet, run `ssh-keygen -t ed25519` first.)
>
> **3. Once I confirm you're added, paste this config into the Hermes app** (Settings \xe2\x86\x92 Config \xe2\x86\x92 Import):
> ```yaml
> <the-onboard-user.sh-output>
> ```
>
> **4. Get your free API keys** (only if you don't have them already):
> - Gemini: https://aistudio.google.com/apikey
> - FAL.ai: https://fal.ai/dashboard/keys
>
> Send them to me and I'll add them to your profile. You don't paste anything yourself.
>
> Full guide if you want context: deploy/ONBOARDING.md
>
> Hit me up if anything's weird.
