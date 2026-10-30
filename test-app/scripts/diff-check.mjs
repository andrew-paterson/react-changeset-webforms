import { parseMarkdown, toPascalCase } from 'react-docs-utils/vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const mdDir = path.resolve(__dirname, '../src/pages/docs');
const pagesDir = path.resolve(__dirname, '../src/pages');

const mdFiles = fs.readdirSync(mdDir).filter((f) => f.endsWith('.md'));

for (const file of mdFiles) {
  const base = path.basename(file, '.md');
  const componentName = toPascalCase(base);
  const pagePath = path.join(pagesDir, `${componentName}.jsx`);
  if (!fs.existsSync(pagePath)) {
    console.log(`MISSING: ${componentName} (no page file)`);
    continue;
  }
  const current = fs.readFileSync(pagePath, 'utf-8');
  const fresh = await parseMarkdown(path.join(mdDir, file));
  console.log(
    `${current.trim() === fresh.trim() ? 'MATCH   ' : 'DIFFERS '}: ${componentName}`,
  );
}
