import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const projectsFile = resolve(root, "src/constants/projects.js");
const detailsFile = resolve(root, "src/constants/projectDetails.js");
const resumeHtmlFile = resolve(root, "public/resume/resume.html");
const exportPdfFile = resolve(root, "scripts/export-resume-pdf.mjs");

export function extractProjects() {
  const code = readFileSync(projectsFile, "utf8");
  const projectBlocks = [];
  const regex =
    /{\s*id:\s*['"]([^'"]+)['"][\s\S]*?techStack:\s*\[([\s\S]*?)\]\s*,?\s*}/g;
  let match;
  while ((match = regex.exec(code)) !== null) {
    const block = match[0];
    const id = match[1];
    const titleMatch = block.match(/title:\s*['"]([^'"]+)['"]/);
    const repoMatch = block.match(/repo:\s*['"]([^'"]+)['"]/);
    const liveMatch = block.match(/live:\s*['"]([^'"]+)['"]/);
    const descMatch = block.match(/description:\s*['"]([^'"]+)['"]/);
    const stackMatches = [...match[2].matchAll(/['"]([^'"]+)['"]/g)].map(
      (m) => m[1],
    );

    projectBlocks.push({
      id,
      title: titleMatch ? titleMatch[1] : id,
      repo: repoMatch ? repoMatch[1] : "",
      live: liveMatch ? liveMatch[1] : "",
      description: descMatch ? descMatch[1] : "",
      techStack: stackMatches,
    });
  }

  // Check if uvMart is in projectDetails
  if (existsSync(detailsFile)) {
    const detailsCode = readFileSync(detailsFile, "utf8");
    if (detailsCode.includes("'uvmart'") || detailsCode.includes('"uvmart"')) {
      const uvmartMatch = detailsCode.match(
        /{\s*id:\s*['"]uvmart['"][\s\S]*?techStack:\s*\[([\s\S]*?)\][\s\S]*?}/,
      );
      if (uvmartMatch) {
        const block = uvmartMatch[0];
        const titleMatch = block.match(/title:\s*['"]([^'"]+)['"]/);
        const repoMatch = block.match(/repo:\s*['"]([^'"]+)['"]/);
        const liveMatch = block.match(/live:\s*['"]([^'"]+)['"]/);
        const descMatch = block.match(/description:\s*['"]([^'"]+)['"]/);
        const stackMatches = [
          ...uvmartMatch[1].matchAll(/['"]([^'"]+)['"]/g),
        ].map((m) => m[1]);
        projectBlocks.push({
          id: "uvmart",
          title: titleMatch ? titleMatch[1] : "uvMart",
          repo: repoMatch
            ? repoMatch[1]
            : "https://github.com/utsavvachhani/uvMart",
          live: liveMatch ? liveMatch[1] : "",
          description: descMatch
            ? descMatch[1]
            : "E-commerce platform with basic product management and email notification features.",
          techStack: stackMatches.length
            ? stackMatches
            : ["MERN Stack", "Nodemailer"],
        });
      }
    }
  }

  return projectBlocks;
}

export function generateProjectsHtml(projects) {
  return projects
    .map((p) => {
      const links = [];
      if (p.repo) {
        links.push(
          `<a href="${p.repo}" rel="noopener noreferrer">GitHub ↗</a>`,
        );
      }
      if (p.live) {
        links.push(`<a href="${p.live}" rel="noopener noreferrer">Live ↗</a>`);
      }
      const linksHtml = links.join("");
      const stackText = p.techStack.join(", ");
      const escapedTitle = p.title.replaceAll("&", "&amp;");

      return `<article class="project">\n    <div class="project-title"><h3>${escapedTitle}</h3><div class="project-links">${linksHtml}</div></div>\n    <p class="tech"><strong>Stack:</strong> ${stackText}</p>\n    <p>${p.description}</p>\n  </article>`;
    })
    .join("\n");
}

export function syncResumeHtml() {
  const projects = extractProjects();
  const projectsHtml = generateProjectsHtml(projects);
  const html = readFileSync(resumeHtmlFile, "utf8");

  const updatedHtml = html
    .replace(
      /<div class="projects">[\s\S]*?<\/div><\/div><\/section>/,
      `<div class="projects">\n${projectsHtml}\n</div></div></section>`,
    )
    .replace(
      /<small style="font-size:9px;color:#7c886d;font-weight:400">All \d+ showcased projects<\/small>/,
      `<small style="font-size:9px;color:#7c886d;font-weight:400">All ${projects.length} showcased projects</small>`,
    );

  writeFileSync(resumeHtmlFile, updatedHtml, "utf8");
  console.log(`[resume-sync] Synced ${projects.length} projects to resume.html`);

  try {
    spawnSync("node", [exportPdfFile], { cwd: root, stdio: "inherit" });
  } catch (err) {
    console.error("[resume-sync] Failed to export PDF:", err.message);
  }
}

// Run directly if called as a script
if (process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) {
  syncResumeHtml();
}
