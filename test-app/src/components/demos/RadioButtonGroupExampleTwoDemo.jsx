import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import RadioButtonGroupExampleTwo from './RadioButtonGroupExampleTwo.jsx';

export default function RadioButtonGroupExampleTwoDemo() {
  return (
    <DocsDemo>
      <DocsExample>
        <RadioButtonGroupExampleTwo />
      </DocsExample>
      <DocsSnippet
        name="radio-button-group-example-two.jsx"
        label="Component jsx"
      />
      <DocsSnippet
        name="component-for-all-radio-options.jsx"
        label="component-for-all-radio-options.jsx"
      />
      <DocsSnippet
        name="component-for-single-radio-option.jsx"
        label="component-for-single-radio-option.jsx"
      />
    </DocsDemo>
  );
}
