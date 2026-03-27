import DocsSnippet from '../docs-utils/DocsSnippet';;

export default function IndexCopy() {
  return (
    <>
      <div class="docs-md">
      <h1 id="title" class="docs-md__h1">Title</h1>
    <p>Test</p>

<p><DocsSnippet snippet={`{"foo": "bars"}`} /></p>
<p>Test 2</p>
</div>
    </>
  );
}