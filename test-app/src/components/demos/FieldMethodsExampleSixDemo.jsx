import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import FieldMethodsExampleSix from './FieldMethodsExampleSix.jsx';

export default function FieldMethodsExampleSixDemo() {
  return (
    <DocsDemo>
      <DocsExample data-test-id="example-6">
        <FieldMethodsExampleSix />
      </DocsExample>
      <DocsSnippet
        name="field-methods-example-six.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
