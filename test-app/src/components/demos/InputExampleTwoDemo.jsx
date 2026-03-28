import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import InputExampleTwo from './InputExampleTwo.jsx';

export default function InputExampleTwoDemo() {
  return (
    <DocsDemo>
      <DocsExample>
        <InputExampleTwo />
      </DocsExample>
      <DocsSnippet
        name="input-example-2.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
