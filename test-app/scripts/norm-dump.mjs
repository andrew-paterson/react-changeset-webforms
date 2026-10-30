import { toPascalCase } from 'react-docs-utils/vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pagesDir = path.resolve(__dirname, '../src/pages');

function norm(s) {
  return s
    .replace(/\{'\s*'\}/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/>\s+</g, '><')
    .trim();
}

const bases = process.argv.slice(2);
for (const base of bases) {
  const componentName = toPascalCase(base);
  const genPath = `/tmp/${componentName}.generated.jsx`;
  const curPath = path.join(pagesDir, `${componentName}.jsx`);
  const gen = norm(fs.readFileSync(genPath, 'utf-8')).replace(/></g, '>\n<');
  const cur = norm(fs.readFileSync(curPath, 'utf-8')).replace(/></g, '>\n<');
  fs.writeFileSync(`/tmp/${componentName}.gen.norm.txt`, gen);
  fs.writeFileSync(`/tmp/${componentName}.cur.norm.txt`, cur);
  console.log(`--- ${componentName} ---`);
}
