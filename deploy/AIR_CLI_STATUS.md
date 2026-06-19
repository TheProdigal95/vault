# Air CLI Status

Short version: **Air CLI is not part of the working Reach Digital setup yet. Do not block onboarding on it.**

## What works today

- Public Air share links like `https://app.air.inc/a/...` can be opened in a browser and often downloaded/inspected with normal media tools.
- Hermes can use browser tools through Camofox/Camoufox when `CAMOFOX_URL=http://localhost:9377` is configured.
- Camofox helps with browser pages, login flows, and anti-bot pages.

## What does not work yet

- `air-pp-cli` is **not** included in the `printing-press` repo.
- The current standard setup does **not** install a production Air CLI.
- Camofox does **not** automatically authenticate a command-line Air API client.
- A minimal `air-pp-cli` that asks for `AIR_API_KEY` / `AIR_WORKSPACE_ID` will fail until those credentials exist.

## Why

Air has two different surfaces:

1. **Air web app** (`app.air.inc`) — browser login, Cloudflare/Akamai/CAPTCHA, works through a real browser/Camofox when a user is logged in.
2. **Air public API** (`api.air.inc/v1`) — server-to-server API with headers:
   - `x-api-key: <API key>`
   - `x-air-workspace-id: <Workspace ID>`

Those are not interchangeable. Browser cookies/Camofox login do not become an `AIR_API_KEY`.

## What to tell a teammate

If their Hermes says:

> `air-pp-cli doctor` fails because `AIR_API_KEY` / `AIR_WORKSPACE_ID` are missing

that is expected. Do **not** invent an API key and do **not** treat this as a Camofox problem.

Tell them:

```text
Skip Air CLI for now. It is not required for Reach Digital onboarding.
Use the Air web app/share links in the browser. Camofox helps Hermes browse pages, but it does not replace an Air API key for air-pp-cli.
```

## Future path

If Reach Digital wants a real `air-pp-cli`, a workspace admin needs to generate an Air API key and Workspace ID from Air's API Access settings. Then we can build/finish the CLI against the official API.
