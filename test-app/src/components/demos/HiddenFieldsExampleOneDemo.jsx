import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import HiddenFieldsExampleOne from './HiddenFieldsExampleOne.jsx';

export default function HiddenFieldsExampleOneDemo() {
  return (
    <DocsDemo>
      <DocsExample>
        <HiddenFieldsExampleOne />
      </DocsExample>
      <DocsSnippet
        name="omitted-fields-example-1.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
