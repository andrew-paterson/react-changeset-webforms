import { readFileSync, readdirSync } from 'fs';
import { resolve, relative } from 'path';

const BEGIN = /^\s*\/\/\s*BEGIN-SNIPPET\s+(.+?)\s*$/;
const END = /^\s*\/\/\s*END-SNIPPET\s*$/;

export function walkDir(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = resolve(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkDir(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

function extractSnippetsFromFile(filePath, outputPath) {
  if (outputPath && resolve(filePath) === resolve(outputPath)) return [];

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
    console.warn(
      `Warning: unclosed BEGIN-SNIPPET "${snippetName}" in ${relative(process.cwd(), filePath)}`,
    );
  }

  return snippets;
}

/**
 * Scans `dirs` (absolute paths) for `// BEGIN-SNIPPET name` / `// END-SNIPPET`
 * blocks and returns a flat array of { name, text }. Pure function — no
 * disk writes, safe to call on every request/build.
 */
export function extractSnippets(dirs, { outputPath } = {}) {
  const files = dirs.flatMap((dir) => walkDir(resolve(dir))).sort();
  return files.flatMap((filePath) =>
    extractSnippetsFromFile(filePath, outputPath),
  );
}
