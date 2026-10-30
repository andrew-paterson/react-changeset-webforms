import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const nextjsDir = path.resolve(__dirname, '../../test-app-nextjs/src/app/(docs)/docs');
const mdDir = path.resolve(__dirname, '../src/pages/docs');

// List of markdown files that need syncing
const filesToSync = [
  'action-handling', 'basic-usage', 'checkbox-group', 'clicker', 
  'clonable-form-fields', 'configuration-options', 'creating-custom-fields',
  'debug-mode', 'field-methods', 'field-settings', 'field-validation',
  'form-methods', 'form-settings', 'form-submission', 'hiding-and-showing-fields',
  'input', 'integrating-custom-validators', 'manipulating-element-class-names-and-attrs',
  'radio-button-group', 'single-checkbox', 'static-content-field', 'test-helpers', 'textarea'
];

// Convert React component names back to Ember-like format
// e.g., <CustomFieldUsageDemo /> → <Demos::CustomFieldUsage />
function convertDemoComponents(jsx) {
  // Match import statements for demo components
  const demoImports = new Map();
  const importRegex = /import\s+(\w+)\s+from\s+['"].*\/demos\/(\w+)\.jsx['"]/g;
  let match;
  while ((match = importRegex.exec(jsx)) !== null) {
    const componentName = match[1];
    const demoName = match[2].replace(/Demo$/, '');
    demoImports.set(componentName, demoName);
  }

  // Replace demo component usage with Ember-like syntax
  let result = jsx;
  for (const [reactName, emberName] of demoImports) {
    result = result.replace(new RegExp(`<${reactName}\\s*/?>`, 'g'), `<Demos::${emberName} />`);
  }

  return result;
}

// Extract the HTML content from inside <div className="docs-md">
function extractDocContent(jsx) {
  const startMarker = '<div className="docs-md">';
  const endMarker = '</div>';
  
  let startIdx = jsx.indexOf(startMarker);
  if (startIdx === -1) {
    console.warn('Could not find docs-md div');
    return '';
  }
  
  startIdx += startMarker.length;
  
  // Find the matching closing div (need to handle nesting)
  let depth = 1;
  let endIdx = startIdx;
  let i = startIdx;
  
  while (i < jsx.length && depth > 0) {
    if (jsx.substr(i, 5) === '<div ') depth++;
    if (jsx.substr(i, 6) === '</div>') depth--;
    if (depth > 0) i++;
    else endIdx = i;
  }

  return jsx.substring(startIdx, endIdx);
}

// Convert HTML back to markdown
// This is a simple converter that handles basic markdown elements
function htmlToMarkdown(html) {
  let md = html;

  // Remove React fragment and empty lines
  md = md.replace(/<>\s*|\s*</g, '<');
  md = md.replace(/\s+/g, ' ');

  // Convert headings
  md = md.replace(/<h1[^>]*>([^<]*)<\/h1>/g, '\n# $1\n');
  md = md.replace(/<h2[^>]*>([^<]*)<\/h2>/g, '\n## $1\n');
  md = md.replace(/<h3[^>]*>([^<]*)<\/h3>/g, '\n### $1\n');
  md = md.replace(/<h4[^>]*>([^<]*)<\/h4>/g, '\n#### $1\n');

  // Remove anchor tags inside headings (we'll preserve the text)
  md = md.replace(/<a[^>]*class="heading-anchor"[^>]*>.*?<\/a>/g, '');

  // Convert links
  md = md.replace(/<Link href="\/docs\/([^"]+)">(.*?)<\/Link>/g, '<LinkTo @route="docs.$1">$2</LinkTo>');
  md = md.replace(/<a href="([^"]*)"[^>]*>(.*?)<\/a>/g, '[$2]($1)');

  // Convert paragraphs
  md = md.replace(/<p>(.*?)<\/p>/g, '$1\n');

  // Convert code
  md = md.replace(/<code>(.*?)<\/code>/g, '`$1`');
  md = md.replace(/<pre[^>]*><code[^>]*>(.*?)<\/code><\/pre>/g, '\n```\n$1\n```\n');

  // Convert lists
  md = md.replace(/<ul[^>]*>(.*?)<\/ul>/g, (match, content) => {
    const items = content.match(/<li[^>]*>(.*?)<\/li>/g) || [];
    return '\n' + items.map(item => '- ' + item.replace(/<\/?li[^>]*>/g, '')).join('\n') + '\n';
  });

  md = md.replace(/<ol[^>]*>(.*?)<\/ol>/g, (match, content) => {
    const items = content.match(/<li[^>]*>(.*?)<\/li>/g) || [];
    return '\n' + items.map((item, i) => `${i + 1}. ` + item.replace(/<\/?li[^>]*>/g, '')).join('\n') + '\n';
  });

  // Remove remaining HTML tags
  md = md.replace(/<[^>]*>/g, '');

  // Clean up whitespace
  md = md.replace(/\n\n+/g, '\n\n');
  md = md.replace(/^ +| +$/gm, '');
  md = md.trim();

  return md;
}

// Main processing
console.log(`Syncing ${filesToSync.length} markdown files from next-js versions...\n`);

for (const base of filesToSync) {
  try {
    const jsxPath = path.join(nextjsDir, base, 'page.jsx');
    const mdPath = path.join(mdDir, `${base}.md`);
    
    const jsxContent = readFileSync(jsxPath, 'utf-8');
    
    // Extract content from JSX
    let htmlContent = extractDocContent(jsxContent);
    
    // Convert components back
    htmlContent = convertDemoComponents(jsxContent.substring(0, jsxContent.indexOf('return'))) + '\n' + htmlContent;
    
    // Convert imports back to Ember-style
    const importMatch = jsxContent.match(/import\s+(\w+)\s+from\s+['"].*\/demos\/(\w+)\.jsx['"]/g) || [];
    for (const imp of importMatch) {
      htmlContent = htmlContent.replace(new RegExp(`<${imp.split(' ')[1]}\\s*/?>`, 'g'), 
        `<Demos::${imp.split(' ')[1].replace(/Demo$/, '')} />`);
    }
    
    // Convert HTML to markdown (simple version)
    let markdown = htmlToMarkdown(htmlContent);
    
    // Restore Ember components
    markdown = markdown.replace(/<Demos::([A-Za-z]+)\s*\/>/g, '<Demos::$1 />');
    
    // Write to markdown file
    writeFileSync(mdPath, markdown, 'utf-8');
    console.log(`✓ Updated: ${base}`);
  } catch (e) {
    console.log(`✗ Error processing ${base}: ${e.message}`);
  }
}

console.log('\nDone!');
