import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import HiddenFieldsExampleTwo from './HiddenFieldsExampleTwo.jsx';

export default function HiddenFieldsExampleTwoDemo() {
  return (
    <DocsDemo>
      <DocsExample>
        <HiddenFieldsExampleTwo />
      </DocsExample>
      <DocsSnippet
        name="omitted-fields-example-two.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
