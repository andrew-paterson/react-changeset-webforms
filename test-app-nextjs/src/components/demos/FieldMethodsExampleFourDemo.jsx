'use client';

import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import FieldMethodsExampleFour from './FieldMethodsExampleFour.jsx';

export default function FieldMethodsExampleFourDemo() {
  return (
    <DocsDemo>
      <DocsExample data-test-id="example-4">
        <FieldMethodsExampleFour />
      </DocsExample>
      <DocsSnippet
        name="field-methods-example-four.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
