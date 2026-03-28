import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import FieldMethodsExampleThree from './FieldMethodsExampleThree.jsx';

export default function FieldMethodsExampleThreeDemo() {
  return (
    <DocsDemo>
      <DocsExample>
        <FieldMethodsExampleThree />
      </DocsExample>
      <DocsSnippet
        name="field-methods-example-3.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
