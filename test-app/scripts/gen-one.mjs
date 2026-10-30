import { parseMarkdown, toPascalCase } from 'react-docs-utils/vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const mdDir = path.resolve(__dirname, '../src/pages/docs');
const pagesDir = path.resolve(__dirname, '../src/pages');

const base = process.argv[2];
const mdPath = path.join(mdDir, `${base}.md`);
const componentName = toPascalCase(base);
const pagePath = path.join(pagesDir, `${componentName}.jsx`);

const fresh = await parseMarkdown(mdPath);
fs.writeFileSync(`/tmp/${componentName}.generated.jsx`, fresh);
console.log(`Written /tmp/${componentName}.generated.jsx`);
console.log(`Compare against: ${pagePath}`);
