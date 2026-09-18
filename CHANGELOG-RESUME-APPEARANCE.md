# September 2026: requested updates

## Verified against previous build-fixed ZIP

- `/` retains its original GitHub-like home structure, sections, project records and creative route.
- Repositories contain no thumbnail images; project overview still has one original, matched project visual (not a PNG screenshot gallery).
- The full-screen project dialog always opens on **Overview** first. Its **Source code** tab and Overview's **View source code** button open the existing GitHub file explorer.
- Profile avatar now opens a small appearance dropdown (Light / Dark); the choice is saved in `localStorage` and can also be changed in the mobile menu.
- `/resume` restores the original white/olive résumé look regardless of homepage theme.
- `public/resume/resume.html` is the single editable résumé HTML file, including all 15 showcased projects. `/resume` uses this exact file for preview and iframe printing. The included PDF was generated from it at standard A4 sizing.
- Existing public PDF path is preserved so all previous download links continue to work.

## Test procedure

Run `npm run verify:source && npm run verify:github && npm run verify:upgrade && npm run test:github`, then `npm ci && npm run build` on a network-connected development machine. Check responsive modes on `/`, `/resume`, project viewer, and theme selector. Run `npm run resume:pdf` after changing `resume.html`.
