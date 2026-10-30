import { parseMarkdown, toPascalCase } from 'react-docs-utils/vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const mdDir = path.resolve(__dirname, '../markdown/docs');
const pagesDir = path.resolve(__dirname, '../src/pages');

const base = process.argv[2];
const componentName = toPascalCase(base);
const pagePath = path.join(pagesDir, `${componentName}.jsx`);
const current = fs.readFileSync(pagePath, 'utf-8');
const fresh = await parseMarkdown(path.join(mdDir, `${base}.md`));

// Tokenize on whitespace boundaries, one token per line, so `diff` ignores
// pure re-wrapping/formatting differences and only shows real word-level
// content changes.
const tokenize = (s) => s.trim().split(/\s+/).join('\n');

fs.writeFileSync('/tmp/current.words', tokenize(current));
fs.writeFileSync('/tmp/fresh.words', tokenize(fresh));
console.log(`Wrote /tmp/fresh.words and /tmp/current.words for ${componentName}`);
