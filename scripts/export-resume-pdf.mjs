/** Regenerate the downloadable A4 PDF from THE editable HTML source.
 * Usage: npm run resume:pdf
 * Requires WeasyPrint (preferred) or locally installed Chrome/Chromium.
 * No hosted API, access token or npm HTML-to-PDF dependency is involved.
 */
import { existsSync, renameSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(root, 'public/resume/resume.html');
const destination = resolve(root, 'public/resume/utsav-vachhani-resume.pdf');
const staged = resolve(root, 'public/resume/.resume-preview.pdf');
if (!existsSync(source)) throw new Error(`Missing source HTML: ${source}`);

function run(command, args) {
  const result = spawnSync(command, args, { cwd: root, encoding: 'utf8', timeout: 60000, shell: false });
  if (result.status !== 0 || !existsSync(staged)) return false;
  renameSync(staged, destination);
  console.log(`Updated A4 PDF from public/resume/resume.html: ${destination}`);
  return true;
}

// Fast, reliable renderer when available, tested with the included résumé.
if (run(process.env.WEASYPRINT_PATH || 'weasyprint', [source, staged])) process.exit(0);

const browserPaths = [
  process.env.RESUME_CHROME,
  process.platform === 'win32' ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' : '/usr/bin/chromium',
  process.platform === 'win32' ? 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe' : '/usr/bin/google-chrome',
  process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : undefined,
].filter(Boolean);
for (const browser of browserPaths) {
  if (!existsSync(browser)) continue;
  if (run(browser, ['--headless', '--disable-gpu', '--no-pdf-header-footer', '--print-to-pdf=' + staged, pathToFileURL(source).href])) process.exit(0);
}
console.error('PDF not updated: install WeasyPrint or Chrome, or open public/resume/resume.html in Chrome and use Print > Save as PDF (A4, no headers/footers).');
process.exitCode = 1;
