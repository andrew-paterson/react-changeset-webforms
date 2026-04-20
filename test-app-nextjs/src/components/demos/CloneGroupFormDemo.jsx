'use client';

import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import CloneGroupForm from './CloneGroupForm.jsx';

export default function CloneGroupFormDemo() {
  return (
    <DocsDemo>
      <DocsExample>
        <CloneGroupForm />
      </DocsExample>
      <DocsSnippet
        name="clone-group-form.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
