/** Read-only access to PUBLIC GitHub repositories. No client-side credentials. */
const API = 'https://api.github.com';
const cache = new Map();
const MAX_FILE_BYTES = 220_000;

export function parseGitHubRepo(url) {
  if (typeof url !== 'string') return null;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:' || parsed.hostname.toLowerCase() !== 'github.com') return null;
    const parts = parsed.pathname.replace(/\/$/, '').split('/').filter(Boolean);
    if (parts.length !== 2 || !parts.every((part) => /^[\w.-]+$/.test(part))) return null;
    const repo = parts[1].replace(/\.git$/, '');
    return repo ? { owner: parts[0], repo } : null;
  } catch { return null; }
}

export function githubFileUrl(identity, path, branch) {
  if (!identity || !path) return '';
  return `https://github.com/${encodeURIComponent(identity.owner)}/${encodeURIComponent(identity.repo)}/blob/${encodeURIComponent(branch)}/${path.split('/').map(encodeURIComponent).join('/')}`;
}

async function request(path, signal) {
  // Deduplicate successful responses only. Aborted/failed requests are never cached.
  if (cache.has(path)) return cache.get(path);
  const response = await fetch(`${API}${path}`, {
    headers: { Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' },
    signal,
  });
  if (!response.ok) {
    if (response.status === 403 || response.status === 429) throw new Error('GitHub is temporarily rate-limiting requests. Try again later, or open the repository on GitHub.');
    if (response.status === 404) throw new Error('This public repository or file was not found on GitHub. It may have moved or become private.');
    throw new Error(`GitHub could not load this resource (HTTP ${response.status}).`);
  }
  const data = await response.json();
  cache.set(path, data);
  return data;
}

function repoPath(identity) {
  return `/repos/${encodeURIComponent(identity.owner)}/${encodeURIComponent(identity.repo)}`;
}

export async function getRepository(identity, signal) {
  if (!identity) throw new Error('No public GitHub repository was linked to this project.');
  return request(repoPath(identity), signal);
}

export async function getDirectory(identity, directory = '', signal) {
  if (!identity) throw new Error('No repository was provided.');
  const suffix = directory ? `/${directory.split('/').map(encodeURIComponent).join('/')}` : '';
  const result = await request(`${repoPath(identity)}/contents${suffix}`, signal);
  if (!Array.isArray(result)) throw new Error('This path is not a directory.');
  return result.filter((entry) => entry.type === 'dir' || entry.type === 'file')
    .sort((a, b) => (a.type === b.type ? a.name.localeCompare(b.name) : a.type === 'dir' ? -1 : 1));
}

export async function getFile(identity, path, signal) {
  if (!identity || !path) throw new Error('No source file selected.');
  const suffix = path.split('/').map(encodeURIComponent).join('/');
  const result = await request(`${repoPath(identity)}/contents/${suffix}`, signal);
  if (result.type !== 'file') throw new Error('This item is not a readable source file.');
  if (result.size > MAX_FILE_BYTES) throw new Error('This file is too large to preview safely. Open it on GitHub instead.');
  if (result.encoding !== 'base64' || typeof result.content !== 'string') throw new Error('GitHub did not return previewable text for this file.');
  const bytes = Uint8Array.from(atob(result.content.replace(/\s/g, '')), (char) => char.charCodeAt(0));
  if (bytes.some((byte) => byte === 0)) throw new Error('Binary files cannot be previewed as source code.');
  return new TextDecoder('utf-8', { fatal: false }).decode(bytes);
}

export function isPreviewableFile(entry) {
  if (!entry || entry.type !== 'file' || entry.size > MAX_FILE_BYTES) return false;
  return /^(?:README(?:\.[\w-]+)?|Dockerfile|Makefile|\.gitignore|\.env\.example)$/i.test(entry.name)
    || /\.(?:js|jsx|ts|tsx|mjs|cjs|json|md|mdx|py|java|c|h|cpp|hpp|cs|go|rs|rb|php|html|htm|css|scss|sass|sql|yaml|yml|toml|sh|bash|txt|xml|svg|prisma|dart|vue|svelte|graphql|gql)$/i.test(entry.name);
}

export function pickInitialFile(entries) {
  return entries.find((entry) => entry.type === 'file' && /^(?:app|index|main|server)\.[jt]sx?$/i.test(entry.name))
    || entries.find((entry) => isPreviewableFile(entry) && !/^readme/i.test(entry.name))
    || entries.find(isPreviewableFile) || null;
}
