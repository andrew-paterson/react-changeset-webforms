import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import StaticContentExampleTwo from './StaticContentExampleTwo.jsx';

export default function StaticContentExampleTwoDemo() {
  return (
    <DocsDemo>
      <DocsExample>
        <StaticContentExampleTwo />
      </DocsExample>
      <DocsSnippet
        name="static-content-example-two.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
