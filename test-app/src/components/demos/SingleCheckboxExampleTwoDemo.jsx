import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import SingleCheckboxExampleTwo from './SingleCheckboxExampleTwo.jsx';

export default function SingleCheckboxExampleTwoDemo() {
  return (
    <DocsDemo>
      <DocsExample>
        <SingleCheckboxExampleTwo />
      </DocsExample>
      <DocsSnippet
        name="single-checkbox-example-two.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
