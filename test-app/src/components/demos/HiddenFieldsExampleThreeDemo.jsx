import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import HiddenFieldsExampleThree from './HiddenFieldsExampleThree.jsx';

export default function HiddenFieldsExampleThreeDemo() {
  return (
    <DocsDemo>
      <DocsExample>
        <HiddenFieldsExampleThree />
      </DocsExample>
      <DocsSnippet
        name="omitted-fields-example-three.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
