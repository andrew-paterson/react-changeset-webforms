import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, relative } from 'path';

const SRC_DIR = new URL('./src', import.meta.url).pathname;
const OUTPUT_FILE = join(SRC_DIR, 'snippets.js');

const BEGIN = /^\s*\/\/\s*BEGIN-SNIPPET\s+(.+?)"?\s*$/;
const END = /^\s*\/\/\s*END-SNIPPET\s*$/;

function walkDir(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkDir(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

const snippets = [];

const files = walkDir(SRC_DIR).sort();

for (const filePath of files.sort()) {
  // Skip the output file itself
  if (filePath === OUTPUT_FILE) continue;

  let content;
  try {
    content = readFileSync(filePath, 'utf8');
  } catch {
    continue;
  }

  const lines = content.split('\n');
  let inSnippet = false;
  let snippetName = null;
  let snippetLines = [];

  for (const line of lines) {
    if (!inSnippet) {
      const beginMatch = line.match(BEGIN);
      if (beginMatch) {
        inSnippet = true;
        snippetName = beginMatch[1].trim();
        snippetLines = [];
      }
    } else {
      if (END.test(line)) {
        snippets.push({ name: snippetName, text: snippetLines.join('\n') });
        inSnippet = false;
        snippetName = null;
        snippetLines = [];
      } else {
        snippetLines.push(line);
      }
    }
  }

  if (inSnippet) {
    console.warn(`Warning: unclosed BEGIN-SNIPPET "${snippetName}" in ${relative(SRC_DIR, filePath)}`);
  }
}

const entries = snippets.map(({ name, text }) => `  {\n    name: ${JSON.stringify(name)},\n    text: ${JSON.stringify(text)},\n  }`).join(',\n');

const output = `const snippets = [\n${entries},\n];\n\nexport default snippets;\n`;

writeFileSync(OUTPUT_FILE, output, 'utf8');
console.log(`Written ${snippets.length} snippet(s) to ${OUTPUT_FILE}`);
