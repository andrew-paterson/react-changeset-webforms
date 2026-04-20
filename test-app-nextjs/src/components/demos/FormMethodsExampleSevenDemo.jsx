'use client';

import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import FormMethodsExampleSeven from './FormMethodsExampleSeven.jsx';

export default function FormMethodsExampleSevenDemo() {
  return (
    <DocsDemo>
      <DocsExample data-test-id="example-7">
        <FormMethodsExampleSeven />
      </DocsExample>
      <DocsSnippet
        name="form-methods-example-seven.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
