> **Current release:** The `/resume` screen now uses the restored classic white HTML source and the matching A4 PDF. Project dialogs open on Overview. Repository thumbnails have been removed; see `CHANGELOG-RESUME-APPEARANCE.md`. Earlier implementation details below are retained for historical context.

# GitHub-inspired portfolio — implementation notes

## 1. Architecture and content

The application retains React 19, React Router 7, Vite 7, the original CSS and source assets. `src/App.jsx` now chooses the GitHub-inspired page for `/` while continuing to serve the original experience via `/creative` and the existing Resume via `/resume`.

| Component/file                                                            | Role                                                                                                                             |
| ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `src/pages/GitHubPortfolio.jsx`                                           | New responsive homepage, project filters, navigation, GitHub API fallback, accessible native project dialog and contact CTA.     |
| `src/pages/github-portfolio.css`                                          | Isolated `gh-` design system: GitHub-style dark colors, cards, layout, breakpoints and dialog/assistant overrides.               |
| `src/constants/profile.jsx`                                               | Original name, email, bio and profile details.                                                                                   |
| `src/constants/navigation.jsx`                                            | Original external social profile URLs.                                                                                           |
| `src/constants/projects.js`                                               | Original 14 projects, real provided screenshots, tech lists and URLs.                                                            |
| `src/constants/projectDetails.js`                                         | The 14 original projects plus the Resume-sourced `uvMart` record, featured project IDs and project feature descriptions.         |
| `src/pages/Portfolio.jsx`                                                 | Preserved creative portfolio on `/creative`.                                                                                     |
| `src/pages/Resume.jsx`, `src/pages/resume-theme.css` and `public/resume/` | Blue/navy refreshed HTML Resume, white print stylesheet, preserved original source PDF.                                          |
| `src/components/github/RepositoryViewer.jsx`                              | Full-screen public repository browser, lazy directory tree, source and README viewers.                                           |
| `src/services/githubRepository.js`                                        | Public GitHub REST API fetches, URL validation, safe UTF-8 file decoding, readable-file filtering and in-session response cache. |
| `src/components/PortfolioAssistant.jsx`                                   | Preserved local Q&A; dark-theme scoped styling on new page.                                                                      |

The project has **no API keys** or new paid dependencies. Fonts fall back to system fonts in the GitHub-inspired theme. Existing original dependencies remain in the lockfile.

## 2. New-page features

- Real profile picture sourced from `src/assets/optimized/uvPhoto.webp`, not an AI-generated image.
- Desktop two-column profile with an overlapping circular avatar; responsive tablet and mobile layouts.
- Keyboard `/` focuses the global search. Typing searches projects, skills and page sections; Up/Down navigate live matches, Enter opens a matching project or scrolls to the chosen section, and Escape closes suggestions. The repositories section keeps its own filters.
- Filters: All, Full stack, Frontend, Backend and Learning, along with name sort and keyword search. Filters work on the 15 supplied portfolio projects.
- Four pinned projects use the original `FEATURE_IDS`. No invented star/fork counts.
- Project cards and repository rows open a **full-screen** native `<dialog>` with Overview, Source code, and README tabs. Its URL query parameter supports sharing; Escape and the close button close it, and previous/next navigates the original projects.
- GitHub API is optional. Only its **actual** `public_repos` and `followers` numbers appear after a successful response; no bogus placeholder numbers are displayed when offline or rate limited.
- Portfolio statistics are derived from project records: showcased project count, number of supplied source links and number of supplied demos. The coverage bars count technologies listed in the project data.
- The Source code tab fetches **real public source files on demand** from the selected project’s original GitHub URL. Folders expand lazily, supported files get escaped/syntax-tinted read-only previews with line numbers, Copy, and Open on GitHub. Unsupported/large/binary files are not previewed. README shows its actual content as safe plain text. Missing/private repositories and rate limits show honest status messages. No browser access tokens are used.
- **No repository PNG screenshot gallery is included**, as requested. Existing original images remain untouched in the original portfolio/repository cards and Overview tab.
- Original local assistant is still available at bottom right; the creative portfolio and Resume are one click away.
- Reduced-motion preferences disable nonessential transitions.

## 3. Routes

| URL                                | Page                              |
| ---------------------------------- | --------------------------------- |
| `/`                                | GitHub-inspired overview          |
| `/#projects`                       | Pinned project section            |
| `/#repositories`                   | Searchable portfolio project list |
| `/#skills`, `/#about`, `/#contact` | Specific profile sections         |
| `/?project=converse2k25`           | Example direct project deep link  |
| `/creative`                        | Original site                     |
| `/creative?project=converse2k25`   | Original project-details dialog   |
| `/resume`                          | Resume                            |

## 4. Editing identity and project information

**Current identity is intentionally Utsav Vachhani**, matching the uploaded ZIP, screenshot and source Resume. Before adapting the site for another owner, update `src/constants/profile.jsx`, `src/constants/navigation.jsx`, `src/constants/milestones.js`, `src/constants/projects.js`, `src/constants/projectDetails.js`, `src/constants/chat.js`, the old creative/resume pages, portrait, favicon, index metadata, and replace the PDF. Update `utsavvachhani` used for the GitHub API and README display in the new page as well. Do not simply change the homepage display name while retaining another person's projects and contact details.

Add a project to `src/constants/projects.js` with its actual title, unique ID, description, verified tech list and optional `image`, `repo` and `live`. Add capabilities in `src/constants/projectDetails.js` only when known. No source/demo link should be made up. Pin existing project IDs by changing `FEATURE_IDS`.

## 5. QA / publishing

```bash
npm ci
npm run verify:source
npm run verify:github
npm run lint
npm run build
npm run preview
```

Verify mobile widths (~375px, 768px), desktop (~1440px), project modal keyboard navigation, search/filter, email links, image loading and `/creative` + `/resume`. Build from a domain-root URL. The GitHub API request is public and optional, can be rate-limited, and will not prevent the site from rendering.

The original source verification script checks import paths, original projects, project data, modal/chat, and PDF. The new script checks entry-point routing, GitHub-style sections, original-content preservation and the original PDF header.

**Environment validation at delivery:** Static source and CSS parsing and both offline source-verification scripts were executed successfully. Dependency installation, Vite production compilation and interactive browser QA need to be run on a machine with npm registry access; npm package download was not available in the authoring environment. These unrun checks are not represented as passing.

## V3 update — how live code works

- Open any project card, then switch between **Overview**, **Source code**, and **README** in the full-screen dialog (projects with a GitHub link open on the code tab automatically).
- The code viewer uses the public GitHub REST API at `api.github.com` and each repository URL already provided in the uploaded ZIP. It requests repository metadata, one directory at a time, and only the selected code file. A repository that was deleted, renamed, made private, or rate-limited will **not** show invented code: it displays an error with a GitHub link or Retry option.
- Public unauthenticated GitHub API calls can be rate-limited (normally around 60 requests per hour per public IP). No tokens are bundled and no code is executed. Only public text files up to 220 KB are previewable. Large or binary files must be viewed on GitHub.
- The header search now offers keyboard-accessible suggestions for existing projects, technologies and navigation sections while preserving the same homepage layout. The original repository search/filter is preserved.
- `/resume` uses a scoped navy/blue design; the download button intentionally continues to download the **original PDF**, while printing `/resume` uses a white, print-friendly style. Update/export the PDF separately if you want the downloaded PDF to match the new webpage colors.
- **No PNG gallery was created.** All existing homepage project thumbnails and the existing overview visual are preserved as-is.

### V3 tests

```bash
npm ci
npm run verify:source
npm run verify:github
npm run verify:upgrade
npm run test:github
npm run lint
npm run build
```

`verify:upgrade` checks the requested UI wiring and preservation; `test:github` tests public URL validation, API response handling, directory sorting, UTF-8 source decoding, large/binary-file handling, and rate limit fallback with mocked requests. A full browser review and production build still require npm dependencies; the package registry was unreachable in the ZIP authoring environment, so neither of these is claimed as completed.
