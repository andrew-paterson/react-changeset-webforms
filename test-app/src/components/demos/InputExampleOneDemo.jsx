import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import InputExampleOne from './InputExampleOne.jsx';

export default function InputExampleOneDemo() {
  return (
    <DocsDemo>
      <DocsExample>
        <InputExampleOne />
      </DocsExample>
      <DocsSnippet
        name="input-example-1.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
