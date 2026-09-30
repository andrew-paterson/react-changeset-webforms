import { LiveProvider, LiveEditor } from 'react-live';
import { useSnippet } from './SnippetsProvider.jsx';

const editorStyle = {
  fontFamily:
    '"Fira Code", "Fira Mono", "Cascadia Code", Menlo, Consolas, monospace',
  fontSize: '0.875rem',
  lineHeight: '1.5',
};

/**
 * Renders a read-only, syntax-highlighted code snippet looked up by name
 * from the nearest <SnippetsProvider>. Snippets are produced by the
 * create-snippets build script from `// BEGIN-SNIPPET name` / `// END-SNIPPET`
 * comments in your source.
 */
export default function DocsSnippet({ name, label, language }) {
  const code = useSnippet(name);
  return (
    <LiveProvider code={code}>
      <LiveEditor disabled style={editorStyle} language={language || 'jsx'} />
    </LiveProvider>
  );
}
