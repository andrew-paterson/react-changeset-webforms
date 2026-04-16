import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import FormMethodsExampleEight from './FormMethodsExampleEight.jsx';

export default function FormMethodsExampleEightDemo() {
  return (
    <DocsDemo>
      <DocsExample data-test-id="example-8">
        <FormMethodsExampleEight />
      </DocsExample>
      <DocsSnippet
        name="form-methods-example-eight.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
