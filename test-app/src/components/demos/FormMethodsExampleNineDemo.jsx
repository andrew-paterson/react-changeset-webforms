import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import FormMethodsExampleNine from './FormMethodsExampleNine.jsx';

export default function FormMethodsExampleNineDemo() {
  return (
    <DocsDemo>
      <DocsExample data-test-id="example-9">
        <FormMethodsExampleNine />
      </DocsExample>
      <DocsSnippet
        name="form-methods-example-nine.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
