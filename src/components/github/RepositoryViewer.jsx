import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, Check, ChevronDown, ChevronRight, Clipboard, Code2, FileCode2, Folder, LoaderCircle, RefreshCw } from 'lucide-react';
import { Github } from '../BrandIcons.jsx';
import { getDirectory, getFile, getRepository, githubFileUrl, isPreviewableFile, parseGitHubRepo, pickInitialFile } from '../../services/githubRepository.js';

function useRemote(load, dependencies) {
  const [state, setState] = useState({ status: 'loading', value: null, error: '' });
  const [retry, setRetry] = useState(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const controller = new AbortController();
    let live = true;
    Promise.resolve().then(() => load(controller.signal)).then((value) => {
      if (live) setState({ status: 'ready', value, error: '' });
    }).catch((error) => {
      if (live && error.name !== 'AbortError') setState({ status: 'error', value: null, error: error.message });
    });
    return () => { live = false; controller.abort(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies, retry]);
  const reload = () => { setState({ status: 'loading', value: null, error: '' }); setRetry((value) => value + 1); };
  return { ...state, reload };
}

function Notice({ message, retry, loading = false }) {
  return <div className="gh-viewer-notice" role="status">{loading ? <LoaderCircle className="gh-spinning" size={22}/> : <Code2 size={22}/>}<span>{message}</span>{retry && <button type="button" onClick={retry}><RefreshCw size={14}/> Retry</button>}</div>;
}

function FolderNode({ identity, directory, depth, onChoose, selected }) {
  const [expanded, setExpanded] = useState(false);
  const contents = useRemote((signal) => expanded ? getDirectory(identity, directory, signal) : Promise.resolve([]), [identity.owner, identity.repo, directory, expanded]);
  const title = directory.split('/').pop();
  return <div className="gh-tree-node">
    <button type="button" className="gh-tree-item" style={{ paddingLeft: `${12 + depth * 14}px` }} onClick={() => setExpanded((value) => !value)} aria-expanded={expanded}>
      {expanded ? <ChevronDown size={14}/> : <ChevronRight size={14}/>}<Folder size={15}/><span>{title}</span>
    </button>
    {expanded && (contents.status === 'loading' ? <p className="gh-tree-state">Loading…</p> : contents.status === 'error' ? <div className="gh-tree-state">{contents.error}<button onClick={contents.reload} type="button">Retry</button></div> : contents.value.map((entry) => entry.type === 'dir'
      ? <FolderNode key={entry.path} identity={identity} directory={entry.path} depth={depth + 1} onChoose={onChoose} selected={selected}/>
      : <FileItem key={entry.path} entry={entry} depth={depth + 1} onChoose={onChoose} selected={selected}/>))}
  </div>;
}

function FileItem({ entry, depth, onChoose, selected }) {
  const supported = isPreviewableFile(entry);
  return <button type="button" disabled={!supported} title={supported ? entry.path : 'Binary or large file: open on GitHub to view'} className={`gh-tree-item gh-file-item ${selected === entry.path ? 'gh-tree-selected' : ''}`} style={{ paddingLeft: `${12 + depth * 14}px` }} onClick={() => onChoose(entry)} aria-current={selected === entry.path ? 'true' : undefined}><FileCode2 size={15}/><span>{entry.name}</span></button>;
}

const TOKEN_SPLIT = /(\/\/.*$|#[^\n]*$|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`[^`]*`|\b(?:import|export|default|const|let|var|function|return|if|else|for|while|class|async|await|try|catch|throw|new|public|private|from|interface|type|extends|def|self|true|false|null|undefined)\b|\b\d+(?:\.\d+)?\b)/gm;
const KEYWORDS = /^(?:import|export|default|const|let|var|function|return|if|else|for|while|class|async|await|try|catch|throw|new|public|private|from|interface|type|extends|def|self|true|false|null|undefined)$/;
function CodeLine({ text, number }) {
  const tokens = useMemo(() => text.split(TOKEN_SPLIT), [text]);
  return <div className="gh-code-line"><span className="gh-code-line-number" aria-hidden="true">{number}</span><span className="gh-code-line-content">{tokens.map((token, idx) => <span key={idx} className={KEYWORDS.test(token) ? 'gh-code-keyword' : /^(?:['"`])/.test(token) ? 'gh-code-string' : /^(?:\/\/|#)/.test(token) ? 'gh-code-comment' : /^\d/.test(token) ? 'gh-code-number' : undefined}>{token}</span>)}</span></div>;
}

function SourceFile({ identity, path, branch, isReadme = false }) {
  const source = useRemote((signal) => getFile(identity, path, signal), [identity.owner, identity.repo, path]);
  const [copied, setCopied] = useState(false);
  useEffect(() => { setCopied(false); }, [path]);
  const lines = useMemo(() => source.value?.split(/\r?\n/) || [], [source.value]);
  const link = githubFileUrl(identity, path, branch);
  const copy = async () => {
    try { await navigator.clipboard.writeText(source.value); setCopied(true); } catch { setCopied(false); }
  };
  return <section className="gh-code-panel" aria-label={isReadme ? 'GitHub README' : 'GitHub source code'}>
    <div className="gh-code-toolbar"><div><FileCode2 size={17}/><span title={path}>{path}</span>{source.status === 'ready' && <small>{lines.length} lines</small>}</div><div>{source.status === 'ready' && <button type="button" onClick={copy}>{copied ? <Check size={14}/> : <Clipboard size={14}/>} {copied ? 'Copied' : 'Copy'}</button>}<a href={link} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={14}/></a></div></div>
    {source.status === 'loading' ? <Notice loading message="Fetching the actual file from GitHub…"/> : source.status === 'error' ? <Notice message={source.error} retry={source.reload}/> : <div className="gh-code-scroll" tabIndex={0} aria-label="Scroll source code">{isReadme ? <pre className="gh-readme-text">{source.value}</pre> : <div className="gh-code-lines">{lines.map((line, index) => <CodeLine key={index} text={line} number={index + 1}/>)}</div>}</div>}
  </section>;
}

export default function RepositoryViewer({ project, readmeOnly = false }) {
  const identity = useMemo(() => parseGitHubRepo(project.repo), [project.repo]);
  const repo = useRemote((signal) => getRepository(identity, signal), [identity?.owner, identity?.repo]);
  const root = useRemote((signal) => identity && repo.status === 'ready' ? getDirectory(identity, '', signal) : Promise.resolve([]), [identity?.owner, identity?.repo, repo.status]);
  const [selected, setSelected] = useState(null);
  const initialFile = useMemo(() => pickInitialFile(root.value || []), [root.value]);
  const selectedFile = selected || initialFile;
  const readme = useMemo(() => (root.value || []).find((entry) => entry.type === 'file' && /^readme(?:\..+)?$/i.test(entry.name)), [root.value]);
  if (!identity) return <Notice message="This project has no public GitHub repository linked. The overview and provided project links remain available."/>;
  if (repo.status === 'loading') return <Notice loading message="Connecting to the public GitHub repository…"/>;
  if (repo.status === 'error') return <Notice message={repo.error} retry={repo.reload}/>;
  if (root.status === 'loading') return <Notice loading message="Loading GitHub repository files…"/>;
  if (root.status === 'error') return <Notice message={root.error} retry={root.reload}/>;
  if (readmeOnly) return <div className="gh-readme-view">{readme ? <SourceFile identity={identity} path={readme.path} branch={repo.value.default_branch} isReadme/> : <Notice message="No README was found in the root of this public repository."/>}</div>;
  return <div className="gh-repository-viewer">
    <aside className="gh-file-tree" aria-label="Repository file explorer"><div className="gh-file-tree-title"><Github size={17}/><strong>{identity.repo}</strong><span>{repo.value.default_branch}</span></div><div className="gh-tree-scroll">{root.value.length === 0 ? <p className="gh-tree-state">No files found.</p> : root.value.map((entry) => entry.type === 'dir' ? <FolderNode key={entry.path} identity={identity} directory={entry.path} depth={0} onChoose={setSelected} selected={selectedFile?.path}/> : <FileItem key={entry.path} entry={entry} depth={0} onChoose={setSelected} selected={selectedFile?.path}/>)}</div><a className="gh-tree-github" href={project.repo} target="_blank" rel="noopener noreferrer">Browse full repository <ArrowUpRight size={15}/></a></aside>
    <div className="gh-file-preview">{selectedFile ? <SourceFile identity={identity} path={selectedFile.path} branch={repo.value.default_branch}/> : <Notice message="No previewable source files were found in the repository root. Expand a folder to choose a code file."/>}</div>
  </div>;
}
