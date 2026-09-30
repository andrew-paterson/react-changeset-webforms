import { parseMarkdown, toPascalCase } from '../parse-markdown.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const mdDir = path.resolve(__dirname, '../markdown/docs');
const pagesDir = path.resolve(__dirname, '../src/pages');

function normalize(str) {
  return str.replace(/\s+/g, ' ').trim();
}

const mdFiles = fs.readdirSync(mdDir).filter((f) => f.endsWith('.md'));

for (const file of mdFiles) {
  const base = path.basename(file, '.md');
  const componentName = toPascalCase(base);
  const pagePath = path.join(pagesDir, `${componentName}.jsx`);
  if (!fs.existsSync(pagePath)) {
    console.log(`MISSING : ${componentName} (no page file)`);
    continue;
  }
  const current = fs.readFileSync(pagePath, 'utf-8');
  const fresh = await parseMarkdown(path.join(mdDir, file));
  const exact = current.trim() === fresh.trim();
  const semantic = normalize(current) === normalize(fresh);
  let status;
  if (exact) status = 'MATCH        ';
  else if (semantic) status = 'FORMAT-ONLY  ';
  else status = 'REAL-DIFFERS ';
  console.log(`${status}: ${componentName}`);
}
