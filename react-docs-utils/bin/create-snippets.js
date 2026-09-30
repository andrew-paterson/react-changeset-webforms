#!/usr/bin/env node
/**
 * CLI wrapper around `extractSnippets` for one-off / CI usage where an
 * on-disk `snippets.js` file is preferred over the in-memory Vite plugin
 * (e.g. non-Vite build tooling).
 *
 * Usage:
 *   react-docs-utils-create-snippets ./src ../some-addon/src -o ./src/snippets.js
 */
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve, relative, dirname } from 'path';
import { extractSnippets } from '../src/vite/snippet-extraction.js';

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

export function createSnippets({ dirs, output }) {
  const outputPath = resolve(output);
  const snippets = extractSnippets(dirs, { outputPath });

  const entries = snippets
    .map(
      ({ name, text }) =>
        `  {\n    name: ${JSON.stringify(name)},\n    text: ${JSON.stringify(text)},\n  }`,
    )
    .join(',\n');

  const fileContents = `const snippets = [\n${entries}${snippets.length ? ',\n' : ''}];\n\nexport default snippets;\n`;

  const dir = dirname(outputPath);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(outputPath, fileContents, 'utf8');
  console.log(
    `Wrote ${snippets.length} snippet(s) to ${relative(process.cwd(), outputPath)}`,
  );
}

if (import.meta.url === `file://${process.argv[1]}`) {
  createSnippets(parseArgs(process.argv));
}
