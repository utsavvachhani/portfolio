import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
const path = (name) => resolve(import.meta.dirname, "..", name);
const html = readFileSync(path("public/resume/resume.html"), "utf8");
const pdf = readFileSync(path("public/resume/utsav-vachhani-resume.pdf"));
const projects = readFileSync(path("src/constants/projects.js"), "utf8");
const portfolio = readFileSync(path("src/pages/GitHubPortfolio.jsx"), "utf8");
const resume = readFileSync(path("src/pages/Resume.jsx"), "utf8");
const appearance = readFileSync(
  path("src/pages/github-appearance.css"),
  "utf8",
);
const projectNames = [...projects.matchAll(/^\s+title: "([^"]+)",/gm)].map(
  (match) => match[1],
);
assert.equal(
  projectNames.length,
  14,
  "Original project inventory must remain unchanged",
);
for (const title of projectNames) {
  const escaped = title.replaceAll("&", "&amp;");
  assert(html.includes(escaped), `HTML Resume is missing ${title}`);
}
assert(html.includes("uvMart"), "Original fifth Resume-only project missing");
assert.equal(
  (html.match(/<article class="project">/g) || []).length,
  15,
  "All fifteen projects must be on the resume",
);
assert(html.includes("@page { size: A4;"), "Standard A4 print size missing");
assert(pdf.subarray(0, 4).toString() === "%PDF", "Download must be a real PDF");
assert(
  resume.includes("src={HTML}") &&
    resume.includes('src="/resume/resume.html"') === false &&
    resume.includes("href={PDF}"),
  "HTML preview and matching PDF must be served from one resume folder",
);
assert(
  resume.includes("contentWindow?.print()"),
  "Print must use HTML iframe and exclude application navbar",
);
assert(
  portfolio.includes("useState('overview')"),
  "Project modal must start on Overview",
);
assert(
  !portfolio.includes("gh-repo-thumbnail"),
  "No image thumbnails allowed in Repository list",
);
assert(
  portfolio.includes("setTheme") && portfolio.includes("localStorage.setItem"),
  "Persisted appearance selection missing",
);
assert(appearance.includes('[data-theme="light"]'), "Light palette missing");
console.log(
  `PASS: ${projectNames.length + 1} projects in one standalone HTML Resume source.`,
);
console.log(
  "PASS: A4 printable HTML, matching downloadable PDF, original projects, overview-first modal, thumbnail exclusion, and light/dark dropdown.",
);
