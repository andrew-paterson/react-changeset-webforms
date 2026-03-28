import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import AttrFunctions from './AttrFunctions.jsx';

export default function AttrFunctionsDemo() {
  return (
    <DocsDemo>
      <DocsExample>
        <AttrFunctions />
      </DocsExample>
      <DocsSnippet
        name="attr-functions.jsx"
        label="Component jsx"
      />
      <DocsSnippet
        name="attr-functions.js"
        label="Component js"
        language="javascript"
      />
    </DocsDemo>
  );
}
