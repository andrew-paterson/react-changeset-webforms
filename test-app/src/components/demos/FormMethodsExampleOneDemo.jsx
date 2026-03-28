import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import FormMethodsExampleOne from './FormMethodsExampleOne.jsx';

export default function FormMethodsExampleOneDemo() {
  return (
    <DocsDemo>
      <DocsExample>
        <FormMethodsExampleOne />
      </DocsExample>
      <DocsSnippet
        name="form-methods-example-one.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
