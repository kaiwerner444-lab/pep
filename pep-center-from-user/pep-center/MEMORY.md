# PEP.CENTER â Session Memory

**READ THIS FILE AT THE START OF EVERY SESSION.**

---

## Project Overview

pep.center is a research peptide e-commerce site owned by Kai (kaiwerner444@gmail.com).

- **Stack**: React 19 + Vite SPA, hosted on Netlify, auto-deploys from GitHub `master` branch
- **Database**: Supabase (tables: `orders`, `analytics_events`)
- **GitHub repo**: https://github.com/kaiwerner444-lab/pep (branch: `master`)
- **Live site**: https://pep.center
- **Admin dashboard**: https://pep.center/pep-dashboard.html (PIN: 0314)

---

## Key File Locations

### On GitHub (source of truth â auto-deploys to Netlify)

| File | Path in repo |
|---|---|
| Main app source | `pep-center-from-user/pep-center/src/` |
| Public assets | `pep-center-from-user/pep-center/public/` |
| Admin dashboard | `pep-center-from-user/pep-center/public/pep-dashboard.html` |
| Netlify config | `pep-center-from-user/pep-center/netlify.toml` |
| Vite config | `pep-center-from-user/pep-center/vite.config.js` |
| Package.json | `pep-center-from-user/pep-center/package.json` |

### Local workspace (Cowork sandbox)

| File | Path |
|---|---|
| Dashboard local copy | `/sessions/.../mnt/pepcenter/pep-dashboard.html` |
| ProductCard fix patch | `/sessions/.../mnt/pepcenter/0001-fix-repair-6-syntax-errors-in-ProductCard.jsx-that-b.patch` |

### Supabase

- **URL**: `https://whquibmxhuhhtlnotzop.supabase.co`
- **Anon key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndocXVpYm14aHVoaHRsbm90em9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0MTE3MjIsImV4cCI6MjA4Nzk4NzcyMn0.idZFxCwu9o_Tyk53h--KjYYq2gg8o_vd5tHNkeYIlys`
- **Tables**: `orders`, `analytics_events`

---

## Netlify Config

`netlify.toml` has three redirect rules in this order:
1. `/api/*` -> `/.netlify/functions/:splat` (serverless functions)
2. `/pep-dashboard.html` -> `/pep-dashboard.html` (static file exception)
3. `/*` -> `/index.html` (SPA catch-all)

Any new static HTML files need a redirect exception added BEFORE the `/*` catch-all, or Netlify will route them through the SPA.

---

## Admin Dashboard

- Standalone HTML file at `public/pep-dashboard.html`
- PIN-locked (PIN: 0314) â no one can see orders without the PIN
- 6 tabs: Fulfillment, Analytics, Products, Competitors, Ideas & Roadmap, SEO Health
- Uses Tailwind CSS (CDN), Chart.js, Supabase JS client
- ~47KB file

---

## Completed Work (reverse chronological)

- **Netlify redirect fix** â Added `/pep-dashboard.html` exception to `netlify.toml` so Netlify serves the dashboard as a static file (commit `1da7bad`)
- **Dashboard pushed to GitHub** â Uploaded `pep-dashboard.html` to `public/` folder (commit `ced45f2`)
- **Dashboard built** â Created the PEP.CENTER Command Center with fulfillment tracking, analytics, competitor research, product management, SEO health, and ideas/roadmap tabs
- **ProductCard.jsx fix** â Repaired 6 syntax errors that broke the build
- **Stripe payment integration** â Added Stripe checkout flow (commit `48a74d5`)

---

## Workflow Rules

### RULE 1: Commit early, commit often
- After building or changing ANY file, commit it to GitHub immediately
- Do NOT batch up large changes â commit each logical piece as you go
- This prevents losing work and avoids struggling with huge uploads

### RULE 2: No git credentials in sandbox
- The Cowork sandbox does NOT have git credentials
- To push files to GitHub, use the **GitHub web upload page** with the DataTransfer API trick:
  1. Navigate to the target folder on GitHub (e.g., `github.com/kaiwerner444-lab/pep/tree/master/pep-center-from-user/pep-center/public`)
  2. Click "Add file" > "Upload files"
  3. Base64-encode the file content, chunk it into ~4000 char pieces
  4. Inject chunks into `window._b64` via JS, then decode to create a File object
  5. Trigger DataTransfer on the file input to simulate a drag-and-drop upload
  6. Commit with a descriptive message
- For small text files (like `netlify.toml`), just use the GitHub web editor: click pencil icon, select all, type new content, commit

### RULE 3: Read this memory file first
- At the start of every session, read this file to understand project state
- Update this file when significant changes are made

### RULE 4: Save outputs to workspace
- All final deliverables go to the mounted workspace folder
- Use `computer://` links to share files with Kai

---

## Active GitHub Repos (kaiwerner444-lab)

| Repo | URL | Language | Description |
|---|---|---|---|
| **pep** | https://github.com/kaiwerner444-lab/pep | JavaScript | Main pep.center site (React+Vite SPA on Netlify). Active repo for pep.center. |
| **content-pipeline** | https://github.com/kaiwerner444-lab/content-pipeline | Python | OpenClaw automated social media content pipeline (KOS AI) |
| **pep-telegram-bot** | https://github.com/kaiwerner444-lab/pep-telegram-bot | Python | PEP Labs Telegram Bot â Claude AI assistant via Telegram |
| **whale-copy-trader** | https://github.com/kaiwerner444-lab/whale-copy-trader | Python | Polymarket whale scanner â copy trades on Polymarket + Kalshi |

### OpenClaw (content pipeline)
- GitHub: https://github.com/kaiwerner444-lab/content-pipeline
- Local workspace: `/sessions/.../mnt/openclaw/`
- Automated social media content pipeline for KOS AI
- Uses HeyGen, ElevenLabs, Late API
- Has its own `BOOT.md` with detailed instructions
- Separate from pep.center

---

*Last updated: March 16, 2026*
