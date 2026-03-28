import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import CheckboxGroupExampleTwo from './CheckboxGroupExampleTwo.jsx';

export default function CheckboxGroupExampleTwoDemo() {
  return (
    <DocsDemo>
      <DocsExample>
        <CheckboxGroupExampleTwo />
      </DocsExample>
      <DocsSnippet
        name="checkbox-group-example-two.jsx"
        label="Component jsx"
      />
      <DocsSnippet
        name="component-for-all-checkbox-options.jsx"
        label="component-for-all-checkbox-options.jsx"
        language="htmlbars"
      />
      <DocsSnippet
        name="component-for-single-checkbox-option.jsx"
        label="component-for-single-checkbox-option.jsx"
        language="htmlbars"
      />
    </DocsDemo>
  );
}
