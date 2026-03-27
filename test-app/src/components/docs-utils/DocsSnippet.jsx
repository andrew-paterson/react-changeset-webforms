import { LiveProvider, LiveEditor } from 'react-live';

export default function DocsSnippet({ snippet }) {
  return (
    <>
      <div>Foo</div>
      <LiveProvider code={snippet}>
        <LiveEditor disabled />
      </LiveProvider>
    </>
  );
}
