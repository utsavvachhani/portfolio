import test from 'node:test';
import assert from 'node:assert/strict';
import { parseGitHubRepo, githubFileUrl, getRepository, getDirectory, getFile, isPreviewableFile, pickInitialFile } from '../src/services/githubRepository.js';

test('accepts only a public GitHub owner/repository URL', () => {
  assert.deepEqual(parseGitHubRepo('https://github.com/utsavvachhani/converse2k25'), { owner: 'utsavvachhani', repo: 'converse2k25' });
  assert.deepEqual(parseGitHubRepo('https://github.com/a/b.git'), { owner: 'a', repo: 'b' });
  for (const url of ['https://evil.com/a/b','http://github.com/a/b','https://github.com/a/b/tree/main','javascript:alert(1)',null]) assert.equal(parseGitHubRepo(url), null);
  assert.match(githubFileUrl({ owner:'a',repo:'b' },'src/My App.jsx','main'), /src\/My%20App\.jsx$/);
});

test('retrieves actual metadata, directory data and UTF-8 source through public JSON endpoint', async () => {
  const original = globalThis.fetch;
  const requested = [];
  globalThis.fetch = async (url, options) => {
    requested.push([url, options]);
    if (url.endsWith('/contents/src/hello.js')) return new Response(JSON.stringify({ type:'file',size:35, encoding:'base64', content: Buffer.from('const greeting = "नमस्ते";\n').toString('base64') }), { status:200 });
    if (url.endsWith('/contents')) return new Response(JSON.stringify([{name:'README.md',path:'README.md',type:'file',size:20},{name:'src',path:'src',type:'dir',size:0},{name:'app.jsx',path:'app.jsx',type:'file',size:10}]), {status:200});
    return new Response(JSON.stringify({default_branch:'main',private:false}),{status:200});
  };
  try {
    const id = {owner:'test-owner',repo:'test-repo'};
    assert.equal((await getRepository(id)).default_branch,'main');
    const files = await getDirectory(id);
    assert.equal(files[0].name,'src');
    assert.equal(pickInitialFile(files).name,'app.jsx');
    assert.equal(await getFile(id,'src/hello.js'),'const greeting = "नमस्ते";\n');
    assert(requested.every(([url,options]) => url.startsWith('https://api.github.com/repos/') && !('Authorization' in options.headers)));
  } finally { globalThis.fetch = original; }
});

test('prevents binary previews, large files and missing repository links', async () => {
  assert.equal(isPreviewableFile({name:'photo.png',type:'file',size:120}),false);
  assert.equal(isPreviewableFile({name:'index.ts',type:'file',size:230000}),false);
  assert.equal(isPreviewableFile({name:'index.ts',type:'file',size:200}),true);
  await assert.rejects(getRepository(null),/No public GitHub repository/);
  const original = globalThis.fetch;
  globalThis.fetch = async () => new Response(JSON.stringify({type:'file',size:5,encoding:'base64',content:Buffer.from([1,0,2]).toString('base64')}),{status:200});
  try { await assert.rejects(getFile({owner:'test-owner',repo:'binary-test'},'src/index.js'),/Binary files/); } finally { globalThis.fetch=original; }
});

test('reports rate limits and unavailable repositories instead of showing invented source', async () => {
  const original = globalThis.fetch;
  globalThis.fetch = async () => new Response('{}',{status:403});
  try { await assert.rejects(getRepository({owner:'owner-test',repo:'rate-limit-test'}),/rate-limiting/); } finally { globalThis.fetch=original; }
});
