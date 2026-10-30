// One-off: rewrites Ember component syntax in src/pages/docs/*.md to React JSX
// and adds the matching import lines at the top of each file. Idempotent.
// Usage: node scripts/migrate-md-components.mjs [file.md ...]
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../src/pages/docs',
);
const files =
  process.argv.length > 2
    ? process.argv.slice(2)
    : fs.readdirSync(dir).filter((f) => f.endsWith('.md'));

const IMPORT_BLOCK = /^(?:import .+\n)+\n?/;

function transformProse(text, found) {
  return text
    .replace(/\{\{docs-snippet\s+([^}]*?)\s*\}\}/g, (_m, attrs) => {
      found.snippet = true;
      return `<DocsSnippet ${attrs} />`;
    })
    .replace(/<DocsSnippet\s+([^>]*?)\s*\/?>/g, (_m, attrs) => {
      found.snippet = true;
      return `<DocsSnippet ${attrs.replace(/(^|\s)@/g, '$1')} />`;
    })
    .replace(/<Demos::([A-Za-z]+)\s*\/?>/g, (_m, name) => {
      found.demos.add(name);
      return `<${name}Demo />`;
    })
    .replace(/<Forms::([A-Za-z]+)\s*\/?>/g, (_m, name) => {
      found.forms.add(name);
      return `<${name} />`;
    })
    .replace(
      /<LinkTo @route="([^"]+)">([\s\S]*?)<\/LinkTo>/g,
      (_m, route, label) => {
        found.link = true;
        return `<Link to="/${route.replace(/\./g, '/')}">${label}</Link>`;
      },
    );
}

for (const file of files) {
  const full = path.resolve(dir, file);
  const source = fs.readFileSync(full, 'utf-8').replace(IMPORT_BLOCK, '');
  const found = {
    demos: new Set(),
    forms: new Set(),
    snippet: false,
    link: false,
  };

  let inFence = false;
  const body = source
    .split('\n')
    .map((line) => {
      if (/^\s*(```|~~~)/.test(line)) {
        inFence = !inFence;
        return line;
      }
      if (inFence) return line;
      // Leave inline code spans untouched
      return line
        .split(/(`[^`]*`)/)
        .map((part, i) => (i % 2 ? part : transformProse(part, found)))
        .join('');
    })
    .join('\n');

  const imports = [
    ...[...found.demos]
      .sort()
      .map((n) => `import ${n}Demo from '../components/demos/${n}Demo.jsx';`),
    ...[...found.forms]
      .sort()
      .map((n) => `import ${n} from '../components/forms/${n}.jsx';`),
    ...(found.snippet
      ? [`import { DocsSnippet } from '../components/docs-utils';`]
      : []),
    ...(found.link ? [`import { Link } from 'react-router-dom';`] : []),
  ];

  fs.writeFileSync(
    full,
    (imports.length ? imports.join('\n') + '\n\n' : '') + body,
  );
  console.log(`${file}: ${imports.length} imports`);
}
