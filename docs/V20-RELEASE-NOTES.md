# ORBITECH MASTER V20 — Autonomous Build Studio

## New in V20

- Added an AI-assisted multi-file project builder backed by `/api/v1/ai/build`.
- Generates a structured JSON file manifest using the configured OpenAI-compatible provider.
- Validates generated file paths, allowed file types, file count, per-file text types, total payload size, and required `index.html`.
- Shows a human-readable draft manifest and review notes before applying anything.
- Requires explicit confirmation to replace workspace files and automatically creates a pre-build snapshot.
- Generated code is not automatically executed.
- Updated health endpoint and test/deploy report version to V20.

## Run

1. Install Node.js 18 or newer.
2. Set `ORBITECH_AI_API_KEY` and `ORBITECH_AI_MODEL` in the server environment. Optionally set `ORBITECH_AI_BASE_URL`.
3. From this folder run `node server/app.js`.
4. Open `http://127.0.0.1:8787`.
5. Open **Autonomous Build Studio**, write a project brief, select a stack and size, then generate a draft.
6. Inspect the file list and notes. Export the draft JSON if needed. Click **Approve & Replace Workspace** only after reviewing the risks.
7. Run the Test & Deploy Lab, manually inspect generated code, and create another snapshot before further changes.

## Limits and security

- This is a local development prototype, not a production-ready multi-user build service.
- AI generation requires a configured provider and may incur usage charges. Provider compatibility varies.
- JSON-mode support varies by compatible providers; unsupported providers may return an error.
- The generated project is untrusted code. The app does not run generated commands, install dependencies, run tests, or deploy automatically.
- Before public deployment add authentication, authorization, rate limiting, origin/CSRF protections, request logging policy, secure secret storage, and server-side authorization.
- Browser localStorage is not a secure or cloud database.
