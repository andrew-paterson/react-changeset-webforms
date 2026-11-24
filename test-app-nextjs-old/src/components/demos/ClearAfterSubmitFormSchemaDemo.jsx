'use client';

import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import ClearAfterSubmitFormSchema from './ClearAfterSubmitFormSchema.jsx';

export default function ClearAfterSubmitFormSchemaDemo() {
  return (
    <DocsDemo>
      <DocsExample>
        <ClearAfterSubmitFormSchema />
      </DocsExample>
      <DocsSnippet
        name="clear-after-submit-form-schema.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
