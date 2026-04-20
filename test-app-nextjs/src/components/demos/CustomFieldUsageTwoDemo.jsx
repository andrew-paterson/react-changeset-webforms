'use client';

import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import CustomFieldUsageTwo from './CustomFieldUsageTwo.jsx';

export default function CustomFieldUsageTwoDemo() {
  return (
    <DocsDemo>
      <DocsExample>
        <CustomFieldUsageTwo />
      </DocsExample>
      <DocsSnippet
        name="custom-fields-demo-2.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
