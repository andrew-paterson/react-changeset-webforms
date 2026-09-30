import path from 'path';
import { fileURLToPath } from 'url';
import { readdirSync } from 'fs';
import { parseMarkdown, toPascalCase } from '../parse-markdown.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MARKDOWN_DIR = path.resolve(__dirname, '../markdown/docs');
// Generated pages are resolved to a fake path *inside* src/pages/ (never
// actually written to disk) so that relative imports within the generated
// JSX — e.g. `../components/demos/FooDemo.jsx` — resolve against real files
// exactly as they would if the page were a normal file in that directory.
const PAGES_DIR = path.resolve(__dirname, '../src/pages');

const PAGES_VIRTUAL_ID = 'virtual:docs-pages';
const RESOLVED_PAGES_VIRTUAL_ID = '\0' + PAGES_VIRTUAL_ID;
const PAGE_PREFIX = 'virtual:docs-page/';
const GENERATED_MARKER = '.generated-from-markdown';

function listMarkdownFiles(include) {
  const files = readdirSync(MARKDOWN_DIR).filter((f) => f.endsWith('.md'));
  if (!include) return files;
  const includeSet = new Set(include);
  return files.filter((f) => includeSet.has(path.basename(f, '.md')));
}

function baseNameFromSpecifier(id) {
  // id is like "virtual:docs-page/basic-usage.jsx" -> "basic-usage"
  return id.slice(PAGE_PREFIX.length).replace(/\.jsx$/, '');
}

function fakePagePath(base) {
  return path.join(PAGES_DIR, `${base}${GENERATED_MARKER}.jsx`);
}

function baseNameFromFakePagePath(id) {
  return path.basename(id).replace(`${GENERATED_MARKER}.jsx`, '');
}

/**
 * Vite plugin: compiles `markdown/docs/*.md` into JSX in memory (via the
 * existing parse-markdown.js pipeline) and exposes each as a virtual module,
 * plus an aggregate `virtual:docs-pages` module exporting every generated
 * page component keyed by its markdown base name.
 *
 * Nothing is written to `src/pages` — the old `parse-markdown-dir.js` CLI
 * script is no longer required for these pages to be available.
 *
 * In dev mode, watches `markdown/docs` and triggers a full reload whenever
 * a `.md` file changes, is added, or removed.
 *
 * @param {object} [options]
 * @param {string[]} [options.include] - Base names (without .md) to include
 *   in the `virtual:docs-pages` aggregate. Defaults to every markdown file.
 *   Use this to exclude pages you deliberately keep on static/hand-edited
 *   imports, so the aggregate doesn't eagerly compile (and potentially
 *   error on) pages you're not actually consuming via the virtual module.
 */
export function docsMarkdownPagesPlugin({ include } = {}) {
  return {
    name: 'test-app:docs-markdown-pages',

    resolveId(id) {
      if (id === PAGES_VIRTUAL_ID) return RESOLVED_PAGES_VIRTUAL_ID;
      if (id.startsWith(PAGE_PREFIX)) {
        // Resolve to a fake absolute path inside src/pages/ so relative
        // imports in the generated JSX (e.g. `../components/...`) resolve
        // against real files. Deliberately NOT null-byte-prefixed: the id
        // must still end in `.jsx` and be picked up by @vitejs/plugin-react's
        // babel transform, which skips modules whose id already starts
        // with `\0`.
        return fakePagePath(baseNameFromSpecifier(id));
      }
    },

    async load(id) {
      if (id === RESOLVED_PAGES_VIRTUAL_ID) {
        const files = listMarkdownFiles(include);
        const imports = [];
        const entries = [];
        for (const file of files) {
          const base = path.basename(file, '.md');
          const componentName = toPascalCase(base);
          imports.push(
            `import ${componentName} from ${JSON.stringify(PAGE_PREFIX + base + '.jsx')};`,
          );
          entries.push(`  ${JSON.stringify(base)}: ${componentName}`);
        }
        return `${imports.join('\n')}\n\nexport default {\n${entries.join(',\n')}\n};\n`;
      }

      if (id.startsWith(PAGES_DIR) && id.endsWith(`${GENERATED_MARKER}.jsx`)) {
        const base = baseNameFromFakePagePath(id);
        const mdPath = path.join(MARKDOWN_DIR, `${base}.md`);
        return parseMarkdown(mdPath);
      }
    },

    configureServer(server) {
      server.watcher.add(MARKDOWN_DIR);

      const isMarkdownFile = (file) =>
        path.resolve(file).startsWith(MARKDOWN_DIR) && file.endsWith('.md');

      const handleChange = (file) => {
        if (!isMarkdownFile(file)) return;

        // Invalidate the specific page module (if it was already loaded)
        // and the aggregate module (in case the file list changed).
        const base = path.basename(file, '.md');
        const pageMod = server.moduleGraph.getModuleById(fakePagePath(base));
        if (pageMod) server.moduleGraph.invalidateModule(pageMod);

        const aggregateMod = server.moduleGraph.getModuleById(
          RESOLVED_PAGES_VIRTUAL_ID,
        );
        if (aggregateMod) server.moduleGraph.invalidateModule(aggregateMod);

        server.ws.send({ type: 'full-reload' });
      };

      server.watcher.on('change', handleChange);
      server.watcher.on('add', handleChange);
      server.watcher.on('unlink', handleChange);
    },
  };
}
