import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import FieldMethodsExampleFive from './FieldMethodsExampleFive.jsx';

export default function FieldMethodsExampleFiveDemo() {
  return (
    <DocsDemo>
      <DocsExample data-test-id="example-5">
        <FieldMethodsExampleFive />
      </DocsExample>
      <DocsSnippet
        name="field-methods-example-five.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
