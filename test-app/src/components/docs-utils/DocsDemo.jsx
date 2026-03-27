import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

export default function DocsDemo({ snippet, scope }) {
  return (
    <LiveProvider
      code={snippet}
      scope={scope}
    >
      <LiveEditor /> {/* editable code box */}
      <LiveError /> {/* shows syntax/runtime errors */}
      <LivePreview /> {/* live rendered output */}
    </LiveProvider>
  );
}
