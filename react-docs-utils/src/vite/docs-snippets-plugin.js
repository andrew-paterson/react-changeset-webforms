import { resolve } from 'path';
import { extractSnippets } from './snippet-extraction.js';

const VIRTUAL_ID = 'virtual:docs-snippets';
const RESOLVED_VIRTUAL_ID = '\0' + VIRTUAL_ID;

/**
 * Vite plugin that exposes extracted `// BEGIN-SNIPPET` blocks as an
 * in-memory virtual module — no `snippets.js` file is ever written to disk.
 *
 * In dev mode, watches `dirs` and automatically triggers a full reload
 * whenever a snippet-containing source file changes, so edits show up in
 * the browser without restarting the dev server.
 *
 * Usage (vite.config.js):
 *   import { docsSnippetsPlugin } from 'react-docs-utils/vite';
 *
 *   export default defineConfig({
 *     plugins: [
 *       react(),
 *       docsSnippetsPlugin({ dirs: ['./src', '../some-addon/src'] }),
 *     ],
 *   });
 *
 * Consume it with:
 *   import snippets from 'virtual:docs-snippets';
 *   // or via <SnippetsProvider snippets={snippets}>
 */
export function docsSnippetsPlugin({
  dirs = ['./src'],
  virtualId = VIRTUAL_ID,
} = {}) {
  const resolvedId = '\0' + virtualId;
  const absoluteDirs = dirs.map((d) => resolve(d));

  return {
    name: 'react-docs-utils:docs-snippets',

    resolveId(id) {
      if (id === virtualId) return resolvedId;
    },

    load(id) {
      if (id === resolvedId) {
        const snippets = extractSnippets(absoluteDirs);
        return `export default ${JSON.stringify(snippets)};`;
      }
    },

    configureServer(server) {
      absoluteDirs.forEach((dir) => server.watcher.add(dir));

      const isRelevant = (file) =>
        absoluteDirs.some((dir) => resolve(file).startsWith(dir));

      const handleChange = (file) => {
        if (!isRelevant(file)) return;
        const mod = server.moduleGraph.getModuleById(resolvedId);
        if (mod) server.moduleGraph.invalidateModule(mod);
        server.ws.send({ type: 'full-reload' });
      };

      server.watcher.on('change', handleChange);
      server.watcher.on('add', handleChange);
      server.watcher.on('unlink', handleChange);
    },
  };
}
