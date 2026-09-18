import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const read = (path) => readFileSync(resolve(root, path), 'utf8');
const exists = (path) => existsSync(resolve(root, path));
const app = read('src/App.jsx');
const github = read('src/pages/GitHubPortfolio.jsx');
const css = read('src/pages/github-portfolio.css');
const details = read('src/constants/projectDetails.js');
const originals = read('src/constants/projects.js');

for (const file of ['src/pages/Portfolio.jsx', 'src/pages/Resume.jsx', 'src/components/PortfolioAssistant.jsx', 'src/assets/optimized/uvPhoto.webp', 'public/resume/utsav-vachhani-resume.pdf']) {
  assert(exists(file), `Original material missing: ${file}`);
}
for (const route of ['/', '/creative', '/resume']) assert(app.includes(`path="${route}"`), `Missing route: ${route}`);
for (const section of ['overview', 'repositories', 'projects', 'skills', 'about', 'contact']) assert(github.includes(`id="${section}"`), `Missing homepage section: ${section}`);
for (const feature of ['fetch(`https://api.github.com/users/', 'Number(!FEATURE_IDS.includes(', 'useSearchParams()', 'modal.showModal()', 'onCancel=', 'aria-haspopup="dialog"', 'mailto:', 'aria-pressed=', 'navigator.clipboard.writeText', 'prefers-reduced-motion']) {
  assert(github.includes(feature) || css.includes(feature), `Missing new feature: ${feature}`);
}
for (const selector of ['.gh-header', '.gh-sidebar', '.gh-readme', '.gh-pinned-grid', '.gh-stats-grid', '.gh-repo', '.gh-modal', '@media (max-width: 670px)']) assert(css.includes(selector), `Missing style: ${selector}`);
const originalsCount = [...originals.matchAll(/^\s+id:\s*['"][^'"]+['"]/gm)].length;
assert.equal(originalsCount, 14, 'Original projects changed');
assert(details.includes("id: 'uvmart'"), 'Résumé project omitted');
assert(readFileSync(resolve(root, 'public/resume/utsav-vachhani-resume.pdf')).subarray(0,4).toString() === '%PDF', 'Original résumé PDF is invalid');
console.log('PASS: GitHub homepage, original creative site, résumé, navigation and modal files present.');
console.log(`PASS: ${originalsCount} original projects + uvMart retained; sections, responsive styles and real PDF verified.`);
console.log('PASS: source code includes search/filter, optional real GitHub API stats and accessible project dialogs.');
