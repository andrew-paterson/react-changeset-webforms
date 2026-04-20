'use client';

import { LiveProvider, LiveEditor } from 'react-live';
import snippets from '../../snippets.js';

const editorStyle = {
  fontFamily:
    '"Fira Code", "Fira Mono", "Cascadia Code", Menlo, Consolas, monospace',
  fontSize: '0.875rem',
  lineHeight: '1.5',
};

export default function DocsSnippet({ name, label, language }) {
  const snippet = snippets.find((s) => s.name === name)?.text || '';
  return (
    <>
      <LiveProvider code={snippet}>
        <LiveEditor disabled style={editorStyle} language={language || 'jsx'} />
      </LiveProvider>
    </>
  );
}
