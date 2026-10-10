# ORBITECH MASTER V20 — AI Engine + Autonomous Build Studio

V18 adds an AI workbench and a Node.js server that proxies requests to an OpenAI-compatible chat-completions API. The API key remains in the server environment and is never returned to the browser.

## Run locally

1. Install Node.js 18 or newer.
2. Extract the ZIP and open a terminal in the `orbi` folder.
3. Configure environment variables in your terminal (examples below). Do not paste a real key into frontend code or commit it to source control.
4. Run `node server/app.js`.
5. Open `http://127.0.0.1:8787` in your browser. Do not open `index.html` directly when using the AI Engine.

### Windows PowerShell example

```powershell
$env:ORBITECH_AI_BASE_URL="https://api.openai.com/v1/chat/completions"
$env:ORBITECH_AI_API_KEY="YOUR_REAL_KEY"
$env:ORBITECH_AI_MODEL="YOUR_AVAILABLE_MODEL"
node server/app.js
```

### macOS / Linux example

```bash
export ORBITECH_AI_BASE_URL="https://api.openai.com/v1/chat/completions"
export ORBITECH_AI_API_KEY="YOUR_REAL_KEY"
export ORBITECH_AI_MODEL="YOUR_AVAILABLE_MODEL"
node server/app.js
```

For another OpenAI-compatible provider, set `ORBITECH_AI_BASE_URL` to its chat-completions endpoint and configure a model supported by that provider. Provider formats and compatibility can vary.

## V18 AI Engine

- Backend connection/status check
- AI tasks for planning, code generation, debugging, code review, and explanations
- Optional context input, limited by the backend
- Response copy and save-to-workspace controls
- Server-side API key handling, request size limits, input validation, 60-second provider timeout, and clear error messages
- Existing local project builder, workspace editor, sandbox preview, QA checks, snapshots and import/export

## Important deployment/security notes

- This is a local development scaffold, not a production-ready multi-user service. Before exposing it publicly, add authentication, authorization, rate limiting, abuse monitoring, HTTPS, a secure secret manager, CSRF/origin protections, and suitable logging/retention controls.
- The API key and model must be available from your provider account. Provider usage may incur charges.
- AI outputs are untrusted suggestions. Review and test generated code; do not run untrusted output automatically.
- AI connection is not the same as web search or autonomous agents. No browsing, external file changes, or deployment occurs automatically.
- Browser localStorage is not shared cloud storage or a secure database.
- Use only APIs and media you are authorized to access.


## V20 Autonomous Build Studio

Open **Autonomous Build Studio** to ask the configured AI provider for a structured multi-file project draft. Choose a stack and build size, inspect the manifest, and explicitly approve before replacing workspace files. An automatic snapshot is created first. Generated files are never executed automatically. See `V20-RELEASE-NOTES.md` for details and limitations.


## V21 Visual Website Builder
Open the Visual Website Builder in the sidebar. Add components, edit text and colour, reorder sections, preview the page, then use Save to Code Workspace or Download HTML. See `V21-RELEASE-NOTES.md`. The contact form is a non-submitting demo.


## V22 Responsive Design Studio

V22 adds themes, content-width controls, desktop/tablet/mobile preview sizing, automatic local draft saving, and validated JSON layout import/export. See `V22-RELEASE-NOTES.md`.
