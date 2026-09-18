# Classic white Resume: one HTML source

Edit `resume.html` in **this folder**. It contains the Resume content and its complete CSS; the React `/resume` page shows that same file in an automatically sized preview iframe. No separate Resume JSX content is maintained.

The included `utsav-vachhani-resume.pdf` was generated directly from `resume.html`. It uses the **A4 (210 × 297 mm)** paper size and contains all 15 projects in two pages. The Download A4 PDF button downloads this matching generated file; the Print / Save as PDF button prints the live HTML document itself without printing the navigation toolbar.

**After editing `resume.html`, update the PDF:** run `npm run resume:pdf`. The script uses WeasyPrint or a locally installed Chrome/Edge browser. On Windows, if no renderer is installed, open `resume.html` in Chrome and choose **Print → Save as PDF**, Paper size **A4**, turn off Headers and footers, and save it as `utsav-vachhani-resume.pdf` in this folder. Commit both HTML and PDF together. A static website cannot silently write an updated PDF to your server at click time, so an HTML edit without regenerating the PDF will leave the download outdated.

The `src/constants/projects.js` and `src/constants/projectDetails.js` files are the portfolio's project records. Fifteen project summaries have been incorporated into the standalone Resume HTML from these original records; refresh its project text when the portfolio records change.

The classic white Resume is intentionally **independent of the GitHub homepage light/dark toggle**, so its preview and printed PDF have a consistent professional appearance.
