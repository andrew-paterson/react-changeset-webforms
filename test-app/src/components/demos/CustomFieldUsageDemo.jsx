import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import CustomFieldUsage from './CustomFieldUsage.jsx';

export default function CustomFieldUsageDemo() {
  return (
    <DocsDemo>
      <DocsExample>
        <CustomFieldUsage />
      </DocsExample>
      <DocsSnippet
        name="custom-fields-usage.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
