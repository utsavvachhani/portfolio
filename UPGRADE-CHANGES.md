> **Historical notes only:** This document describes the previous code-viewer update. For the latest behaviour, read `CHANGELOG-RESUME-APPEARANCE.md`. The project now opens on Overview, repository rows have no images, the Resume is classic white, and the downloadable A4 PDF matches its HTML source.

# Portfolio upgrade — live GitHub code viewer

This is an upgrade of the **uploaded `utsav-github-style-portfolio.zip`**. The existing GitHub-themed home page layout, project rows/thumbnails, creative portfolio, existing project data, profile, assistant, assets, and original PDF were retained.

## What changed

1. **Full-screen project viewer:** Open any pinned/repository project. The dialog takes the full viewport and has **Overview / Source code / README** tabs. Source code opens first when the project already contains a GitHub URL. Escape or × closes; previous/next navigation and shareable `/?project=...` URL work as before.
2. **Actual source code:** Public GitHub REST API loads the specific project's original repository. A tree expands directories on demand and displays the selected real file with line numbers, basic syntax colors, Copy and Open on GitHub. README is loaded from the public repository on request, rendered as safe text. No fake files or metrics.
3. **Search repaired:** Header search returns live suggestions for portfolio projects, tech skills and sections. Click a result or use Arrow Up/Down and Enter. `/` focuses the search. Repository keyword filtering remains unchanged.
4. **Resume colors:** `/resume` now uses dark navy, blue and cyan, more defined cards and borders; printing automatically switches to a clean white page. The existing Download PDF action deliberately preserves the old original PDF document.
5. **PNG screenshot gallery: NOT added.** As requested, current project imagery on the original homepage and Overview is unchanged.

## Configure a project

To show real code, put a public repository root URL into that project's `repo` field in `src/constants/projects.js` or `src/constants/projectDetails.js`:

```js
repo: "https://github.com/OWNER/REPOSITORY";
```

Private repositories cannot be loaded by the public-only frontend. Projects without a public repository still open their Overview tab; the code tab explains why no source is available. For older broken/renamed GitHub URLs, correct the supplied repo field; no URL is guessed.

## Run

```bash
npm ci
npm run verify:source
npm run verify:github
npm run verify:upgrade
npm run test:github
npm run lint
npm run build
npm run dev
```

Open `http://localhost:5173/`, select any project and visit `/resume`. The app requires a network connection to GitHub for live code. GitHub may impose API limits; errors are handled with honest status messages. No GitHub token is embedded in the browser.

## Validation performed during ZIP creation

Static route/source verification and four mocked-GitHub service tests passed. npm dependency installation was unavailable here, so an actual production build and interactive browser QA are **not claimed as completed**. Run `npm ci && npm run build` on your development machine to verify compilation before deployment.

## Build fix (September 18, 2026)

- Fixed `RepositoryViewer.jsx` importing `Github` from `lucide-react@1.29.0`, which does not export that brand icon. It now imports the existing locally implemented icon from `src/components/BrandIcons.jsx`, matching the other portfolio pages.
- Expanded the static source check so this missing-brand-export problem is caught in all source components, not just top-level pages.
- The npm 12 / Node.js 20 version warning is independent of this build error: use Node.js 22.22.2+ or 24.15.0+ with npm 12, or use a supported npm version with Node.js 20.

After extracting, run `npm ci`, `npm run verify:source`, `npm run verify:upgrade`, `npm run verify:github`, `npm run test:github`, then `npm run build`.
