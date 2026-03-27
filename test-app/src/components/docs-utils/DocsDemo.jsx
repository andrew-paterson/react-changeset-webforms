import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

export default function DocsDemo({ snippet }) {
  return (
    <LiveProvider code={snippet}>
      <LiveEditor /> {/* editable code box */}
      <LiveError /> {/* shows syntax/runtime errors */}
      <LivePreview /> {/* live rendered output */}
    </LiveProvider>
  );
}
