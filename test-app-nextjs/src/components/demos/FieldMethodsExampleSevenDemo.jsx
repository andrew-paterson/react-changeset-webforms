'use client';

import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import FieldMethodsExampleSeven from './FieldMethodsExampleSeven.jsx';

export default function FieldMethodsExampleSevenDemo() {
  return (
    <DocsDemo>
      <DocsExample data-test-id="example-7">
        <FieldMethodsExampleSeven />
      </DocsExample>
      <DocsSnippet
        name="field-methods-example-seven.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
