'use client';

import { DocsSnippet, DocsDemo, DocsExample } from '../../docs-utils';
import OnUserInteractionForm from './OnUserInteractionForm.jsx';

export default function OnUserInteractionFormDemo() {
  return (
    <DocsDemo>
      <DocsExample>
        <OnUserInteractionForm />
      </DocsExample>
      <DocsSnippet
        name="after-field-click-action-form.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
