'use client';

import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import ClearFormFormSchema from './ClearFormFormSchema.jsx';

export default function ClearFormFormSchemaDemo() {
  return (
    <DocsDemo>
      <DocsExample>
        <ClearFormFormSchema />
      </DocsExample>
      <DocsSnippet
        name="clear-form-form-schema.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
