# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## PepCenter Project

**Default project location:** `~/.openclaw/workspace/pep-center-from-user/pep-center/`

**Always make all website edits in this folder.**

**Do NOT use:** `peptides-store/` (deleted - was outdated Next.js version)

**Live site:** https://pep.center
**Git repo:** https://github.com/kaiwerner444-lab/pep

### Deployment
```bash
cd ~/.openclaw/workspace/pep-center-from-user/pep-center
npm run build
rm -f deploy.zip && zip -r deploy.zip dist/
netlify deploy --prod --dir=dist
```

### Stack
- React 19 + Vite
- Tailwind CSS
- Stripe Checkout
- Supabase (database)
- Netlify (hosting)

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

Add whatever helps you do your job. This is your cheat sheet.

## File Editing Rules
- NEVER use the edit tool. It is unreliable and fails frequently.
- ALWAYS read the file first with the read tool before making any changes.
- ALWAYS use the write tool to write the complete updated file.
- Never guess or assume file contents from memory.
