# Utsav Vachhani — single-page portfolio redesign

## Run

```bash
npm ci
npm run dev
npm run build
npm run lint
```

This retains the original React 19/Vite 7 project and all original project asset files. The new experience is in `src/pages/Portfolio.jsx`, the separate Resume page is `src/pages/Resume.jsx`, and design tokens/layouts are in `src/index.css`. The existing project constants, personal information, social URLs, milestone content and skills data remain the data sources. The supplied PDF is copied **unchanged** to `public/resume/utsav-vachhani-resume.pdf`, so the Download PDF button serves the original rather than attempting a potentially inconsistent conversion.

## Routes

- `/` — complete single-page portfolio (`#home`, `#about`, `#projects`, `#skills`, `#journey`, `#contact`).
- `/resume` — accessible HTML Resume, original PDF download and print layout.
- Old `/about`, `/projects`, `/skills`, `/contact` routes redirect to the matching section.
- `/?project=project-id` — a directly linkable, native accessible project-details dialog.

## Functionality

All original portfolio projects are retained; the PDF-only uvMart entry was additionally included using the Resume's description and embedded GitHub link. There is no invented screenshot or live URL for projects that lack one. Card filters and search are client-side and do not fetch user data. Project details have native dialog focus management and Escape dismissal. The contact form opens the visitor's email app: it does **not** claim to send to an unavailable backend. External links open with `rel="noopener noreferrer"`. Canvas art only loads for fine-pointer, sufficiently wide, reduced-motion-disabled screens; the hero has a CSS and photo fallback. Project tilt, ticker and custom cursor are disabled for reduced-motion or touch users.

## Notes about source material

The PDF is the sole content source for `/resume`, including its original wording, links and dates. The broader portfolio retains the extra biography/milestones/skills from the ZIP. The PDF contains the original printed wording `quizze` and trailing `h` after one experience bullet; these are preserved for strict fidelity. Review and update the **source PDF** and HTML together if the Resume owner wishes to correct them.

Before deployment, verify the original GitHub/demo/social URLs are still live, since the supplied files were used without external link verification. No contact API exists in the source ZIP; add and secure one only if real in-site form submission is needed.

## Verification status (18 September 2026)

Offline validation passed for JSX/JavaScript parsing and internal import paths, all 14 original project IDs, feature coverage for all 15 displayed projects, section anchors, CSS parsing, screenshot paths, and byte-for-byte fidelity of the original one-page PDF including its hyperlinks.

**Important:** The npm registry could not be resolved (`EAI_AGAIN`) in this environment, so dependency installation, `npm run build`, `npm run lint`, and live browser interaction testing could **not** be completed here. Run these commands locally, review screenshots on real breakpoints and verify external links before calling the deployment production-ready. Deploy at the domain root on Vercel (the existing `vercel.json` provides SPA rewrites); GitHub Pages under a repository subpath requires additional base-path/router changes.

### Build compatibility fix

Brand icons are now local SVG React components (`src/components/BrandIcons.jsx`), rather than importing GitHub, Instagram or LinkedIn icons from `lucide-react` 1.x. This fixes the reported missing `Github` export in the portfolio and resume.

## September 18 final enhancement

This archive incorporates the UI enhancement request while retaining React, Vite, the original project records and resume PDF. Updated source:

- `src/pages/Portfolio.jsx` — responsive animated hero, three genuine hero actions, complete tech and description on every project card, source-backed four-column footer and section links.
- `src/components/ProjectDetailDialog.jsx` — full-viewport native HTML dialog, sticky close control, focus/ESC dismissal, vertical detail scroll, image slider and thumbnail controls (only when actual multiple images exist), pointer/swipe/keyboard gallery navigation, project-to-project controls, optional evidence-backed problem/solution entries.
- `src/constants/projectDetails.js` — feature and gallery fields kept separate from UI, preserves the original project data; adds the resume-supported uvMart listing.
- `src/components/PortfolioAssistant.jsx` and `src/constants/chat.js` — redesigned source-based Q&A, suggested questions, keyboard input, typing state, clear button, scroll tracking, experience response; no undisclosed third-party AI call.
- `src/index.css` — consistent final styles, full-height dialog, responsive footer, hero motion and accessible touch/reduced-motion behavior.

**Gallery data limitation:** The archive contains one matching visual per pictured project, and none for uvMart. The new gallery renders each unique, matching asset once rather than inventing additional screenshots. To add verified screenshots, edit the relevant record in `src/constants/projects.js` and set `images: [{ src: importedScreenshot, alt: 'Description', caption: 'Actual view' }, ...]` using imported local files. With 2+ images, arrows, thumbnails, swipe and keyboard navigation are enabled automatically.

**Challenges & Solutions data limitation:** No specific real challenges and solutions were documented in the supplied ZIP/PDF. The UI supports the optional array `challenges: [{ title: '...', challenge: '...', solution: '...' }]` on each project record. It renders this section only if both the actual challenge and its verified solution are provided. Do not publish invented outcomes.

**Source check:** Code syntax and local-import resolution can be checked without dependencies using the global TypeScript compiler; the PDF bytes have been compared with the uploaded original. The npm registry was unavailable in the editing environment, so **a production build, ESLint run and live browser interaction tests were not completed**. Before deployment, run `npm ci`, `npm run build`, `npm run lint` and exercise keyboard/modal/mobile behavior on your machine. The local Node.js v22.16.0 + npm v10.9.2 installed in the editing environment is not related to the Windows npm 12/Node 20 warning.
