import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import HiddenFieldsExampleFour from './HiddenFieldsExampleFour.jsx';

export default function HiddenFieldsExampleFourDemo() {
  return (
    <DocsDemo>
      <DocsExample>
        <HiddenFieldsExampleFour />
      </DocsExample>
      <DocsSnippet
        name="omitted-fields-example-4.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
