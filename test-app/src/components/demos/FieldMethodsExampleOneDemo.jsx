import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import FieldMethodsExampleOne from './FieldMethodsExampleOne.jsx';

export default function FieldMethodsExampleOneDemo() {
  return (
    <DocsDemo>
      <DocsExample>
        <FieldMethodsExampleOne />
      </DocsExample>
      <DocsSnippet
        name="field-methods-example-1.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
