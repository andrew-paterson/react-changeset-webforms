import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import RadioButtonGroupExampleOne from './RadioButtonGroupExampleOne.jsx';

export default function RadioButtonGroupExampleOneDemo() {
  return (
    <DocsDemo>
      <DocsExample data-test-id="radio-button-group-example-1">
        <RadioButtonGroupExampleOne />
      </DocsExample>
      <DocsSnippet
        name="radio-button-group-example-one.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
