#!/usr/bin/env node
/**
 * Walks the given source directories, extracts code between
 *   // BEGIN-SNIPPET name
 *   ...
 *   // END-SNIPPET
 * comments, and writes them as a flat array to an output file:
 *   [{ name, text }, ...]
 *
 * Usage (from your app's package.json):
 *   "create-snippets": "react-docs-utils-create-snippets ./src ../some-addon/src -o ./src/snippets.js"
 *
 * Or invoke directly with node and edit the constants below.
 */
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, resolve, relative } from 'path';

const BEGIN = /^\s*\/\/\s*BEGIN-SNIPPET\s+(.+?)\s*$/;
const END = /^\s*\/\/\s*END-SNIPPET\s*$/;

function parseArgs(argv) {
  const args = argv.slice(2);
  const dirs = [];
  let output = './src/snippets.js';
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '-o' || args[i] === '--output') {
      output = args[++i];
    } else {
      dirs.push(args[i]);
    }
  }
  if (dirs.length === 0) dirs.push('./src');
  return { dirs, output };
}

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

function extractSnippets(filePath, outputFile) {
  if (resolve(filePath) === resolve(outputFile)) return [];

  let content;
  try {
    content = readFileSync(filePath, 'utf8');
  } catch {
    return [];
  }

  const lines = content.split('\n');
  const snippets = [];
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
    } else if (END.test(line)) {
      snippets.push({ name: snippetName, text: snippetLines.join('\n') });
      inSnippet = false;
      snippetName = null;
      snippetLines = [];
    } else {
      snippetLines.push(line);
    }
  }

  if (inSnippet) {
    console.warn(`Warning: unclosed BEGIN-SNIPPET "${snippetName}" in ${relative(process.cwd(), filePath)}`);
  }

  return snippets;
}

export function createSnippets({ dirs, output }) {
  const outputPath = resolve(output);
  const files = dirs.flatMap((dir) => walkDir(resolve(dir))).sort();

  const snippets = files.flatMap((filePath) => extractSnippets(filePath, outputPath));

  const entries = snippets.map(({ name, text }) => `  {\n    name: ${JSON.stringify(name)},\n    text: ${JSON.stringify(text)},\n  }`).join(',\n');

  const fileContents = `const snippets = [\n${entries}${snippets.length ? ',\n' : ''}];\n\nexport default snippets;\n`;

  writeFileSync(outputPath, fileContents, 'utf8');
  console.log(`Wrote ${snippets.length} snippet(s) to ${relative(process.cwd(), outputPath)}`);
}

// Run directly when invoked as a script (not just imported).
if (import.meta.url === `file://${process.argv[1]}`) {
  createSnippets(parseArgs(process.argv));
}
