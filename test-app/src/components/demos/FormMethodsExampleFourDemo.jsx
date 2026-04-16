import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import FormMethodsExampleFour from './FormMethodsExampleFour.jsx';

export default function FormMethodsExampleFourDemo() {
  return (
    <DocsDemo>
      <DocsExample data-test-id="form-methods-example-4">
        <FormMethodsExampleFour />
      </DocsExample>
      <DocsSnippet
        name="form-methods-example-four.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
