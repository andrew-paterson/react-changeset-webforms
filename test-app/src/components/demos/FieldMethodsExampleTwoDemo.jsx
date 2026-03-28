import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import FieldMethodsExampleTwo from './FieldMethodsExampleTwo.jsx';

export default function FieldMethodsExampleTwoDemo() {
  return (
    <DocsDemo>
      <DocsExample>
        <FieldMethodsExampleTwo />
      </DocsExample>
      <DocsSnippet
        name="field-methods-example-two.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
