import { useEffect, useRef } from 'react';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import xml from 'highlight.js/lib/languages/xml';
import json from 'highlight.js/lib/languages/json';
import diff from 'highlight.js/lib/languages/diff';
import shell from 'highlight.js/lib/languages/shell';
import typescript from 'highlight.js/lib/languages/typescript';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('js', javascript);
hljs.registerLanguage('css', css);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('json', json);
hljs.registerLanguage('diff', diff);
hljs.registerLanguage('shell', shell);
hljs.registerLanguage('sh', shell);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('ts', typescript);

/**
 * Highlights a single inline/block code element. For whole-file snippet
 * viewing with a language tab UI, prefer <DocsSnippet>.
 */
export default function DocsCodeHighlight({ language, children }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.removeAttribute('data-highlighted');
      hljs.highlightElement(ref.current);
    }
  }, [children]);

  return (
    <pre>
      <code
        ref={ref}
        className={language ? `language-${language}` : undefined}
      >
        {children}
      </code>
    </pre>
  );
}
