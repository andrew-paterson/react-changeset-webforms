import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import ClickerExampleTwoFormSchema from './ClickerExampleTwoFormSchema.jsx';

export default function ClickerExampleTwoFormSchemaDemo() {
  return (
    <DocsDemo>
      <DocsExample>
        <ClickerExampleTwoFormSchema />
      </DocsExample>
      <DocsSnippet
        name="custom-component-clicker.jsx"
        label="Component jsx"
      />
      <DocsSnippet
        name="custom-clicker-component.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
