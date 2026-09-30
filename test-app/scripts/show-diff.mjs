import { parseMarkdown, toPascalCase } from '../parse-markdown.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const mdDir = path.resolve(__dirname, '../markdown/docs');
const pagesDir = path.resolve(__dirname, '../src/pages');

const base = process.argv[2];
if (!base) {
  console.error('Usage: node show-diff.mjs <base-name>');
  process.exit(1);
}

const componentName = toPascalCase(base);
const pagePath = path.join(pagesDir, `${componentName}.jsx`);
const current = fs.readFileSync(pagePath, 'utf-8');
const fresh = await parseMarkdown(path.join(mdDir, `${base}.md`));

fs.writeFileSync('/tmp/current.jsx', current);
fs.writeFileSync('/tmp/fresh.jsx', fresh);
console.log(`Wrote /tmp/current.jsx and /tmp/fresh.jsx for ${componentName}`);
