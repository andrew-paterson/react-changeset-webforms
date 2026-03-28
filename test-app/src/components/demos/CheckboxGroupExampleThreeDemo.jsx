import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import CheckboxGroupExampleThree from './CheckboxGroupExampleThree.jsx';

export default function CheckboxGroupExampleThreeDemo() {
  return (
    <DocsDemo>
      <DocsExample>
        <CheckboxGroupExampleThree />
      </DocsExample>
      <DocsSnippet
        name="checkbox-group-example-3.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
