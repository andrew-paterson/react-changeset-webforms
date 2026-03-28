import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import HiddenFieldsExampleFive from './HiddenFieldsExampleFive.jsx';

export default function HiddenFieldsExampleFiveDemo() {
  return (
    <DocsDemo>
      <DocsExample>
        <HiddenFieldsExampleFive />
      </DocsExample>
      <DocsSnippet
        name="omitted-fields-example-5.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
