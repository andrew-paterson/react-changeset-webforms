import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseMarkdown, toPascalCase } from './parse-markdown.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const markdownDir = './markdown/docs';
const pagesDir = './src/pages';

async function parseMarkdownDir() {
  const files = await fs.promises.readdir(path.resolve(__dirname, markdownDir));
  for (const file of files) {
    if (!file.endsWith('.md')) continue;
    try {
      const inputPath = path.resolve(__dirname, markdownDir, file);
      const componentName = toPascalCase(path.basename(file, '.md'));
      const outputPath = path.resolve(__dirname, pagesDir, `${componentName}.jsx`);
      const formatted = await parseMarkdown(inputPath);
      console.log(`Written: ${outputPath}`);

      fs.writeFileSync(outputPath, formatted, 'utf-8');
    } catch (err) {
      console.error(`Error processing ${file}`);
    }
  }
}

parseMarkdownDir();
