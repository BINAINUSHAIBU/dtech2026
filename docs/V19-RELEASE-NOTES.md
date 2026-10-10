# ORBITECH MASTER V19 — Quality & Deployment Lab

## What's new
- Added the AI Engine to the main navigation and removed the duplicated AI view from V18.
- Added a Test & Deploy Lab with browser-side JavaScript syntax parsing, JSON validation, basic HTML checks, local asset reference checks, a heuristic secret-like pattern scan, and a downloadable JSON report.
- Added a persistent deployment readiness checklist.
- Added a deployment-kit export with starter `netlify.toml`, `.env.example`, deployment notes, readiness selections, and the latest local test report.
- Updated the local server health version to 19.

## Run locally
Requires Node.js 18 or newer.

```bash
node server/app.js
```

Open http://127.0.0.1:8787. Set `ORBITECH_AI_API_KEY`, `ORBITECH_AI_MODEL`, and optionally `ORBITECH_AI_BASE_URL` in the server environment to enable AI requests. Do not put real secrets in frontend files or commit them to source control.

## Limitations and deployment caution
The Test & Deploy Lab runs advisory static checks in the browser; it does not execute user project code, run a full unit-test suite, or perform a complete security audit. The deployment-kit export downloads a JSON bundle of starter configuration files; it does not automatically publish a site. The included Node server binds to `127.0.0.1` for local development and is not configured for direct public production hosting. Before public deployment, implement authentication, rate limiting, CSRF/origin protections as appropriate, robust logging, backups, dependency review, and a production server configuration.
