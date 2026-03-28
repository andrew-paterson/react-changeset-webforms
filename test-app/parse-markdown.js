import prettier from 'prettier';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import { parse as htmlParse } from 'node-html-parser';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import json from 'highlight.js/lib/languages/json';
import xml from 'highlight.js/lib/languages/xml';
import diff from 'highlight.js/lib/languages/diff';
import shell from 'highlight.js/lib/languages/shell';
import typescript from 'highlight.js/lib/languages/typescript';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('js', javascript);
hljs.registerLanguage('css', css);
hljs.registerLanguage('json', json);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('diff', diff);
hljs.registerLanguage('shell', shell);
hljs.registerLanguage('sh', shell);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('ts', typescript);

// Custom block extension: pass through raw HTML component tags unchanged
const htmlComponent = {
  name: 'htmlComponent',
  level: 'block',
  start(src) {
    let match = src.match(/\n<[^/^\s>]/);
    return match && match.index;
  },
  tokenizer(src) {
    let openingRule = /^<([^/^\s>]+)\s?[\s\S]*?>/;
    let openingMatch = openingRule.exec(src);
    if (openingMatch) {
      let openingTag = openingMatch[1];
      let root = htmlParse(src);
      for (let el of root.childNodes) {
        if (el.rawTagName === openingTag) {
          let finalMatch = src.substring(el.range[0], el.range[1]);
          return { type: 'htmlComponent', raw: finalMatch, text: finalMatch, tokens: [] };
        }
      }
    }
  },
  renderer(token) {
    return `\n${token.text}\n`;
  },
};

marked.use({ extensions: [htmlComponent] });

marked.use(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, language) {
      return hljs.getLanguage(language) ? hljs.highlight(code, { language }).value : code;
    },
  }),
);

class DocsRenderer extends marked.Renderer {
  codespan() {
    return super.codespan.apply(this, arguments);
  }

  code() {
    let code = super.code.apply(this, arguments);
    return code.replace(/^<pre>/, '<pre class="docs-md__code">');
  }

  heading(text, level) {
    let id = text
      .toLowerCase()
      .replace(/<\/?.*?>/g, '')
      .replace(/[^\w]+/g, '-');
    let inner = level === 1 ? text : `<a href="#${id}" class="heading-anchor">${text}</a>`;
    return `<h${level} id="${id}" class="docs-md__h${level}">${inner}</h${level}>\n`;
  }

  list(text, ordered) {
    if (ordered) {
      return `<ol class="docs-list-decimal">${text}</ol>\n`;
    } else {
      return `<ul class="docs-list-disc">${text}</ul>\n`;
    }
  }

  table(header, body) {
    if (body) body = '<tbody>' + body + '</tbody>';
    return '<table class="docs-table-auto">\n' + '<thead>\n' + header + '</thead>\n' + body + '</table>\n';
  }

  tablerow(content) {
    return '<tr class="docs-table-row">\n' + content + '</tr>\n';
  }

  tablecell(content, flags) {
    let type = flags.header ? 'th' : 'td';
    let tag = flags.align ? `<${type} align="${flags.align}" class="docs-border docs-px-4 docs-py-2">` : `<${type} class="docs-border docs-px-4 docs-py-2">`;
    return tag + content + `</${type}>\n`;
  }

  hr() {
    return `<hr class="docs-md__hr">\n`;
  }

  blockquote(text) {
    return `<blockquote class="docs-md__blockquote">${text}</blockquote>\n`;
  }

  link(href, title, text) {
    let titleAttribute = title ? ` title="${title}"` : '';
    return `<a href="${href}"${titleAttribute} class="docs-md__a">${text}</a>`;
  }
}

function compileMarkdown(source) {
  return marked.parse(source, { renderer: new DocsRenderer() });
}

// Decode HTML entities that marked emits in prose text, so the JSX output
// contains the actual characters rather than escape sequences.
function decodeEntities(html) {
  return html
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

// Convert kebab-case filename base to PascalCase component name.
// e.g. "basic-usage" -> "BasicUsage"
export function toPascalCase(str) {
  return str.replace(/(^\w|-\w)/g, (match) => match.replace('-', '').toUpperCase());
}

// Parse a markdown file at the given absolute path and return the formatted
// JSX string. Does not write anything to disk.
export async function parseMarkdown(inputPath) {
  const baseName = path.basename(inputPath, '.md');
  const componentName = toPascalCase(baseName);

  const source = fs.readFileSync(inputPath, 'utf-8');
  let html = decodeEntities(compileMarkdown(source));

  // ─── transform Ember-style invocations ─────────────────────────────────────

  const imports = [];

  // Remove @ sigils from named props: @name="foo" → name="foo"
  html = html.replace(/\s@([a-zA-Z])/g, ' $1');

  // Strip legacy Handlebars mustache invocations {{foo ...}} that have no React equivalent
  html = html.replace(/\{\{[^}]+\}\}/g, '');

  // Escape bare { and } inside <code> blocks so JSX doesn't treat them as expressions.
  // This covers both inline <code> and <pre><code> blocks.
  html = html.replace(/(<code[^>]*>)([\s\S]*?)(<\/code>)/g, (_match, open, content, close) => {
    const escaped = content.replace(/\{/g, '&#123;').replace(/\}/g, '&#125;');
    return open + escaped + close;
  });

  // <Demos::ComponentName /> → <ComponentNameDemo />
  // + import ComponentNameDemo from '../components/demos/ComponentNameDemo.jsx'
  const demoComponentNames = new Set();
  html = html.replace(/<Demos::([A-Za-z]+)\s*\/?>/g, (_match, name) => {
    demoComponentNames.add(name);
    return `<${name}Demo />`;
  });
  for (const name of demoComponentNames) {
    imports.push(`import ${name}Demo from '../components/demos/${name}Demo.jsx';`);
  }

  // <Forms::ComponentName /> → <ComponentName />
  // + import ComponentName from '../components/forms/ComponentName.jsx'
  const formComponentNames = new Set();
  html = html.replace(/<Forms::([A-Za-z]+)\s*\/?>/g, (_match, name) => {
    formComponentNames.add(name);
    return `<${name} />`;
  });
  for (const name of formComponentNames) {
    imports.push(`import ${name} from '../components/forms/${name}.jsx';`);
  }

  // <DocsSnippet ...> — add import if present
  if (html.includes('<DocsSnippet')) {
    imports.push(`import { DocsSnippet } from '../components/docs-utils';`);
  }

  // <LinkTo route="docs.route-name">Text</LinkTo>
  // → <Link to="/docs/route-name">Text</Link>  +  import { Link } from 'react-router-dom'
  const linkToRegex = /<LinkTo route="([^"]+)">(.*?)<\/LinkTo>/g;
  const hasLinkTo = linkToRegex.test(html);
  if (hasLinkTo) {
    imports.push(`import { Link } from 'react-router-dom';`);
    html = html.replace(/<LinkTo route="([^"]+)">(.*?)<\/LinkTo>/g, (_match, route, text) => {
      const to = '/' + route.replace(/\./g, '/');
      return `<Link to="${to}">${text}</Link>`;
    });
  }

  // ─── assemble JSX ──────────────────────────────────────────────────────────

  const importsBlock = imports.length ? imports.join('\n') + '\n\n' : '';

  const jsxContent = `${importsBlock}export default function ${componentName}() {
  return (
    <>
      <div className="docs-md">
        ${html.trim()}
      </div>
    </>
  );
}
`;

  // ─── format with prettier ──────────────────────────────────────────────────

  return prettier.format(jsxContent, { parser: 'babel', singleQuote: true });
}

// ─── CLI entry point ──────────────────────────────────────────────────────────

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const markdownDir = './markdown/docs';
  const pagesDir = './src/pages';

  const inputPath = path.resolve(__dirname, markdownDir, process.argv[2] ?? 'basic-usage.md');
  const baseName = path.basename(inputPath, '.md');
  const componentName = toPascalCase(baseName);
  const outputPath = path.resolve(__dirname, pagesDir, `${componentName}.jsx`);

  const formatted = await parseMarkdown(inputPath);
  fs.writeFileSync(outputPath, formatted, 'utf-8');
  console.log(`Written: ${outputPath}`);
}
