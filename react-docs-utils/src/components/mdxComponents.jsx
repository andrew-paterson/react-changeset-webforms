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
hljs.registerLanguage('jsx', javascript);
hljs.registerLanguage('css', css);
hljs.registerLanguage('json', json);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('handlebars', xml);
hljs.registerLanguage('diff', diff);
hljs.registerLanguage('shell', shell);
hljs.registerLanguage('bash', shell);
hljs.registerLanguage('typescript', typescript);

function textOf(node) {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textOf).join('');
  return textOf(node.props?.children);
}

// Same id scheme as the markdown pipeline, so existing #anchors keep working.
function slugify(text) {
  return text.toLowerCase().replace(/[^\w]+/g, '-');
}

function heading(level) {
  const Tag = `h${level}`;
  return function Heading({ children }) {
    const id = slugify(textOf(children));
    return (
      <Tag id={id} className={`docs-md__h${level}`}>
        {level === 1 ? (
          children
        ) : (
          <a href={`#${id}`} className="heading-anchor">
            {children}
          </a>
        )}
      </Tag>
    );
  };
}

function Pre({ children }) {
  const className = children?.props?.className || '';
  const language = /language-(\S+)/.exec(className)?.[1];
  const code = textOf(children?.props?.children).replace(/\n$/, '');
  const html = hljs.getLanguage(language)
    ? hljs.highlight(code, { language }).value
    : null;

  return (
    <pre className="docs-md__code">
      {html ? (
        <code
          className={`hljs language-${language}`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <code className={className}>{code}</code>
      )}
    </pre>
  );
}

/** Pass as the `components` prop of an MDX page to match the `docs-md` styling. */
const mdxComponents = {
  h1: heading(1),
  h2: heading(2),
  h3: heading(3),
  h4: heading(4),
  pre: Pre,
  a: ({ children, ...props }) => (
    <a {...props} className="docs-md__a">
      {children}
    </a>
  ),
  ul: (props) => <ul className="docs-list-disc" {...props} />,
  ol: (props) => <ol className="docs-list-decimal" {...props} />,
  hr: () => <hr className="docs-md__hr" />,
  blockquote: (props) => (
    <blockquote className="docs-md__blockquote" {...props} />
  ),
  table: (props) => <table className="docs-table-auto" {...props} />,
  tr: (props) => <tr className="docs-table-row" {...props} />,
  th: (props) => <th className="docs-border docs-px-4 docs-py-2" {...props} />,
  td: (props) => <td className="docs-border docs-px-4 docs-py-2" {...props} />,
};

export default mdxComponents;
