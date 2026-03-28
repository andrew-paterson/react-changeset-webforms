import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import FormMethodsExampleTwo from './FormMethodsExampleTwo.jsx';

export default function FormMethodsExampleTwoDemo() {
  return (
    <DocsDemo>
      <DocsExample>
        <FormMethodsExampleTwo />
      </DocsExample>
      <DocsSnippet
        name="form-methods-example-two.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
