import DocsDemo from './docs-utils/DocsDemo';
import DocsSnippet from './docs-utils/DocsDemo';
import AttrFunctions from './demos/AttrFunctions';
export default function CodeDemo() {
  return (
    <>
      {/* <DocsSnippet snippet={`{"foo": "bars"}`} />
      <div>Test</div>
      <DocsDemo snippet={`<button onClick={() => alert('Helzzlo!')}>Click me</button>`} /> */}
      <AttrFunctions />
    </>
  );
}
