import path from 'path';
import { readdirSync } from 'fs';
import { parseMarkdown, toPascalCase } from './parse-markdown.js';

const PAGES_VIRTUAL_ID = 'virtual:docs-pages';
const RESOLVED_PAGES_VIRTUAL_ID = '\0' + PAGES_VIRTUAL_ID;
const PAGE_PREFIX = 'virtual:docs-page/';
const GENERATED_MARKER = '.generated-from-markdown';

function listMarkdownFiles(markdownDir, include) {
  const files = readdirSync(markdownDir).filter((f) => f.endsWith('.md'));
  if (!include) return files;
  const includeSet = new Set(include);
  return files.filter((f) => includeSet.has(path.basename(f, '.md')));
}

function baseNameFromSpecifier(id) {
  // id is like "virtual:docs-page/basic-usage.jsx" -> "basic-usage"
  return id.slice(PAGE_PREFIX.length).replace(/\.jsx$/, '');
}

function fakePagePath(pagesDir, base) {
  return path.join(pagesDir, `${base}${GENERATED_MARKER}.jsx`);
}

function baseNameFromFakePagePath(id) {
  return path.basename(id).replace(`${GENERATED_MARKER}.jsx`, '');
}

/**
 * Vite plugin: compiles markdown files in `markdownDir` into JSX in memory and exposes each as a virtual module,
 * plus an aggregate `virtual:docs-pages` module exporting every generated
 * page component keyed by its markdown base name.
 *
 * Nothing is written to disk. Generated pages resolve to a fake path inside
 * `pagesDir` so relative imports in the generated JSX resolve against real files.
 *
 * In dev mode, watches `markdownDir` and triggers a full reload whenever
 * a `.md` file changes, is added, or removed.
 *
 * @param {object} options
 * @param {string} options.markdownDir - Directory of `.md` files.
 * @param {string} options.pagesDir - Directory generated pages pretend to live in.
 * @param {string[]} [options.include] - Base names (without .md) to include
 *   in the `virtual:docs-pages` aggregate. Defaults to every markdown file.
 *   Use this to exclude pages you deliberately keep on static/hand-edited
 *   imports, so the aggregate doesn't eagerly compile (and potentially
 *   error on) pages you're not actually consuming via the virtual module.
 */
export function docsMarkdownPagesPlugin({
  markdownDir,
  pagesDir,
  include,
} = {}) {
  const MARKDOWN_DIR = path.resolve(markdownDir);
  const PAGES_DIR = path.resolve(pagesDir);
  const fakePath = (base) => fakePagePath(PAGES_DIR, base);

  return {
    name: 'react-docs-utils:docs-markdown-pages',

    resolveId(id) {
      if (id === PAGES_VIRTUAL_ID) return RESOLVED_PAGES_VIRTUAL_ID;
      if (id.startsWith(PAGE_PREFIX)) {
        // Resolve to a fake absolute path inside src/pages/ so relative
        // imports in the generated JSX (e.g. `../components/...`) resolve
        // against real files. Deliberately NOT null-byte-prefixed: the id
        // must still end in `.jsx` and be picked up by @vitejs/plugin-react's
        // babel transform, which skips modules whose id already starts
        // with `\0`.
        return fakePath(baseNameFromSpecifier(id));
      }
    },

    async load(id) {
      if (id === RESOLVED_PAGES_VIRTUAL_ID) {
        const files = listMarkdownFiles(MARKDOWN_DIR, include);
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
        const pageMod = server.moduleGraph.getModuleById(fakePath(base));
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
