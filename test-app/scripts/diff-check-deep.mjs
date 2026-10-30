import { parseMarkdown, toPascalCase } from 'react-docs-utils/vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const mdDir = path.resolve(__dirname, '../src/pages/docs');
const pagesDir = path.resolve(__dirname, '../src/pages');

// Extract normalized "words" ignoring all whitespace/JSX-whitespace-markers
// so we can compare pure textual/tag content regardless of prettier
// line-wrapping or {' '} insertion.
function deepNormalize(str) {
  return str
    .replace(/\{'\s*'\}/g, ' ') // JSX explicit space markers
    .replace(/\s+/g, ' ')
    .replace(/>\s+</g, '><') // remove whitespace between tags introduced by wrapping
    .replace(/<(\w+)([^>]*)>\s+/g, '<$1$2>') // trim after opening tag
    .replace(/\s+<\/(\w+)>/g, '</$1>') // trim before closing tag
    .trim();
}

const mdFiles = fs.readdirSync(mdDir).filter((f) => f.endsWith('.md'));

for (const file of mdFiles) {
  const base = path.basename(file, '.md');
  const componentName = toPascalCase(base);
  const pagePath = path.join(pagesDir, `${componentName}.jsx`);
  if (!fs.existsSync(pagePath)) {
    console.log(`MISSING      : ${componentName}`);
    continue;
  }
  const current = fs.readFileSync(pagePath, 'utf-8');
  const fresh = await parseMarkdown(path.join(mdDir, file));
  const exact = current.trim() === fresh.trim();
  const deep = deepNormalize(current) === deepNormalize(fresh);
  let status;
  if (exact) status = 'MATCH        ';
  else if (deep) status = 'FORMAT-ONLY  ';
  else status = 'REAL-DIFFERS ';
  console.log(`${status}: ${componentName}`);
}
