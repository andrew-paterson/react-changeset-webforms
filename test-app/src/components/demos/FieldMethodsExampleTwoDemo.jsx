import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import FieldMethodsExampleTwo from './FieldMethodsExampleTwo.jsx';

export default function FieldMethodsExampleTwoDemo() {
  return (
    <DocsDemo>
      <DocsExample>
        <FieldMethodsExampleTwo />
      </DocsExample>
      <DocsSnippet
        name="field-methods-example-2.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
