import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getBotResponse } from '../src/constants/chat.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = (file) => readFileSync(join(root, file), 'utf8');
const allSource = [];
function walk(relative) {
  for (const item of readdirSync(join(root, relative), { withFileTypes: true })) {
    const next = join(relative, item.name);
    if (item.isDirectory()) walk(next);
    else if (/\.(?:js|jsx)$/.test(item.name)) allSource.push(next);
  }
}
walk('src');
let importsChecked = 0;
for (const file of allSource) {
  const source = read(file);
  const importer = resolve(root, dirname(file));
  for (const match of source.matchAll(/\b(?:import|export)\s+(?:[^'";]*?\s+from\s+)?['"](\.[^'"]+)['"]/g)) {
    const base = resolve(importer, match[1]);
    assert(['', '.js', '.jsx', '.json'].some((ext) => existsSync(base + ext) || existsSync(join(base, 'index' + (ext || '.js')))), `Broken import: ${file}: ${match[1]}`);
    importsChecked++;
  }
  if (file.endsWith('Portfolio.jsx') || file.endsWith('Resume.jsx')) {
    const lucide = source.match(/import\s+\{[^}]*\}\s+from\s+['"]lucide-react['"]/g) || [];
    assert(lucide.every((line) => !/\b(?:Github|Instagram|Linkedin)\b/.test(line)), `${file} imports unavailable brand icon from lucide-react`);
  }
}
const portfolio = read('src/pages/Portfolio.jsx');
const dialog = read('src/components/ProjectDetailDialog.jsx');
const details = read('src/constants/projectDetails.js');
const assistant = read('src/components/PortfolioAssistant.jsx');
const resume = read('src/pages/Resume.jsx');
const projects = read('src/constants/projects.js');
const projectRecords = projects.split('export const PROJECTS = [')[1];
const sourceIds = [...projectRecords.matchAll(/^\s+id:\s*['"]([^'"]+)['"]/gm)].map((match) => match[1]);
assert.equal(sourceIds.length, 14, 'Expected all fourteen original projects');
assert.equal(new Set(sourceIds).size, sourceIds.length, 'Duplicate project ids');
for (const id of sourceIds) assert(details.includes(`${id}:`) || details.includes(`'${id}':`), `Missing project features for ${id}`);
assert(details.includes("id: 'uvmart'"), 'Resume-supplied uvMart project missing');
for (const id of ['home', 'about', 'projects', 'skills', 'journey', 'contact']) assert(portfolio.includes(`id="${id}"`), `Missing section ${id}`);
for (const feature of ['node.showModal()', 'setSearchParams', 'aria-haspopup="dialog"']) assert(portfolio.includes(feature) || dialog.includes(feature), `Missing modal feature ${feature}`);
for (const feature of ['showModal()', 'onCancel=', 'gallery-thumbnails', 'onTouchStart=', 'onKeyDown=', 'challenge-grid', 'onClose(neighbor']) assert(dialog.includes(feature), `Missing dialog feature ${feature}`);
for (const feature of ['SUGGESTIONS.map', 'Clear conversation', 'event.shiftKey', 'getBotResponse', 'assistant-loading']) assert(assistant.includes(feature), `Missing assistant feature ${feature}`);
assert(resume.includes('/resume/utsav-vachhani-resume.pdf'), 'Resume download link missing');
assert(existsSync(join(root, 'public/resume/utsav-vachhani-resume.pdf')), 'Actual resume PDF missing');
assert(readFileSync(join(root, 'public/resume/utsav-vachhani-resume.pdf')).subarray(0, 4).toString() === '%PDF', 'Invalid PDF header');
for (const file of allSource.filter((file) => file.endsWith('projects.js'))) {
  for (const match of read(file).matchAll(/from\s+['"](\.\.\/assets\/[^'"]+)['"]/g)) assert(existsSync(resolve(root, dirname(file), match[1])), `Missing image ${match[1]}`);
}
assert(/Web Development Intern/.test(getBotResponse('Show me your experience.').botText), 'Experience suggestion has no matching answer');
assert(/Converse2K25/.test(getBotResponse('Tell me about your projects.').botText), 'Projects suggestion has no answer');
assert(/Technical Core/.test(getBotResponse('What technologies do you use?').botText), 'Skills suggestion has no answer');
assert(/vachhaniutsav2@gmail.com/.test(getBotResponse('How can I contact you?').botText), 'Contact suggestion has no answer');
console.log(`PASS: ${allSource.length} JS/JSX files scanned; ${importsChecked} local imports resolved.`);
console.log(`PASS: ${sourceIds.length} original projects + uvMart, gallery/modal/chat controls, six section anchors and resume PDF checked.`);
console.log('PASS: all four new chatbot suggestion routes return relevant content.');
