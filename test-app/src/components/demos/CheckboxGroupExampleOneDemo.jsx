import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import CheckboxGroupExampleOne from './CheckboxGroupExampleOne.jsx';

export default function CheckboxGroupExampleOneDemo() {
  return (
    <DocsDemo>
      <DocsExample>
        <CheckboxGroupExampleOne />
      </DocsExample>
      <DocsSnippet
        name="checkbox-group-example-one.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
