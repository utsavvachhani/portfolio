# Utsav Vachhani — GitHub-style developer portfolio

An updated version of the **portfolio in the provided ZIP**, using the supplied Utsav Vachhani identity, portrait, résumé, real project records and existing assets. The GitHub-inspired profile is now the default homepage; the original creative design is retained at `/creative` rather than replaced.

## Start locally

Use Node.js **22.12+** (or a supported recent Node 20 version) and a compatible npm version.

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173`.

```bash
npm run verify:source
npm run verify:github
npm run lint
npm run build
npm run preview
```

`npm run preview` runs the built production frontend. Deploy the `dist` directory. The existing `vercel.json` provides SPA rewrites when deployed at the domain root. A GitHub Pages repository subpath requires adjusting `vite.config.js` base and the router; do not deploy under a subpath unchanged.

## What is merged?

- `/` — NEW GitHub-style, responsive developer profile, sidebar, README, socials, skill badges, pinned projects, accurate portfolio statistics, searchable/filterable repositories, full-screen overview-first project dialogs, profile light/dark switcher, biography, timeline and contact links.
- `/creative` — ORIGINAL animated creative portfolio: original sections, animations, galleries, filterable work, contact form and assistant.
- `/resume` — restored classic white résumé preview, all 15 projects, print control, and downloadable **A4 PDF generated from the same standalone HTML source** (`public/resume/resume.html`).
- `/?project=project-id` — deep-linkable full-screen GitHub-style project dialog opening on Overview, with a source-code tab and next/previous controls. Repository rows contain no thumbnails.
- The original project files, images, source URLs, social links, achievements context and CV are included. Original project details and the locally scripted portfolio assistant are reused.

### Important accuracy choices

The uploaded project belongs to **Utsav Vachhani**. The preceding conceptual design image used a different placeholder name, so this implementation deliberately preserves the actual ZIP owner's identity instead of misattributing projects or reusing a generated portrait. GitHub stars, streaks, contributions, followers and repo totals were **not fabricated**. The optional public GitHub API loads followers and public repository totals when available; if not, these remain hidden. Portfolio counts are calculated from the supplied project records. Technology-coverage bars describe the included projects, not GitHub contribution history.

No backend contact API was supplied. The new contact action opens an email client, and the original contact form also uses mailto. The assistant is a local predefined-answer widget, not an AI API.

**Deployment checklist:** Run all commands above with network access for npm packages, inspect desktop/tablet/mobile layouts in your browser, and confirm external GitHub/demo links and personal details are current before publishing.

More setup and architecture: [README-GITHUB.md](README-GITHUB.md). Original release documentation is preserved in [README-REDESIGN.md](README-REDESIGN.md) and [README-ORIGINAL.md](README-ORIGINAL.md).

## Current release notes

See `CHANGELOG-RESUME-APPEARANCE.md` for the latest requested changes. Edit only `public/resume/resume.html` for the résumé; after editing run `npm run resume:pdf` to regenerate the matching PDF. `npm run verify:resume` checks the résumé and the related UI source.
