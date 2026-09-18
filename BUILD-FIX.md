# Portfolio production build fix

## Resolved source error

The previous release imported `Github` from `lucide-react` in `src/components/github/RepositoryViewer.jsx`. The installed lucide-react release does not export that brand icon, so Vite/Rollup stopped during the production build.

The viewer now imports `Github` from the project's existing `src/components/BrandIcons.jsx`. The same component is already used by the other portfolio pages, so the appearance and original homepage layout are unchanged.

The repository-wide `npm run verify:source` check now also checks nested components for unsupported brand-icon imports.

## Windows instructions

Extract this ZIP into a clean folder. In PowerShell or Command Prompt, open that project's root folder and run:

```powershell
node -v
npm -v
npm ci
npm run verify:source
npm run verify:upgrade
npm run verify:github
npm run test:github
npm run build
npm run dev
```

If the build succeeds, Vite writes the production website to `dist/`. Deploy that directory according to your host's instructions. `npm run dev` launches the development server.

### npm / Node version warning

The message `npm v12.0.2 does not support Node.js v20.19.2` is a separate tooling warning, NOT the cause of the `Github` export failure. To eliminate it, use an npm-12-supported Node.js release (Node 22.22.2+, Node 24.15.0+, or later as indicated by your installed npm), or use npm 10 with Node 20:

```powershell
npm install -g npm@10
```

After changing Node or npm, open a new terminal and check both versions. You do not need to change the React application's styling or project data to fix this issue.

## Verification performed when packaging

- Static checks for local import paths and unsupported Lucide brand icons.
- Existing portfolio source, GitHub integration, and feature checks.
- Four GitHub repository service tests.
- Syntax parsing of all source, script, and test JS/JSX modules.
- ZIP integrity check.

A full `npm run build` could not be completed in the packaging environment because npm registry downloads failed with DNS `EAI_AGAIN`; please run the exact build command above on your machine. This is not a claim that every runtime/build issue has been eliminated.
