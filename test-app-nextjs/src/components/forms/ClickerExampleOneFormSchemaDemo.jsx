'use client';

import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import ClickerExampleOneFormSchema from './ClickerExampleOneFormSchema.jsx';

export default function ClickerExampleOneFormSchemaDemo() {
  return (
    <DocsDemo>
      <DocsExample>
        <ClickerExampleOneFormSchema />
      </DocsExample>
      <DocsSnippet
        name="clicker-example-1.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
