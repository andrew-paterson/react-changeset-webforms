'use client';

import { DocsSnippet, DocsDemo, DocsExample } from '../../docs-utils';
import OnFieldValueChange from './OnFieldValueChange.jsx';

export default function OnFieldValueChangeDemo() {
  return (
    <DocsDemo>
      <DocsExample>
        <OnFieldValueChange />
      </DocsExample>
      <DocsSnippet
        name="after-field-edit-action-form.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
