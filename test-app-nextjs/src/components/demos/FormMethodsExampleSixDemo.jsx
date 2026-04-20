'use client';

import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import FormMethodsExampleSix from './FormMethodsExampleSix.jsx';

export default function FormMethodsExampleSixDemo() {
  return (
    <DocsDemo>
      <DocsExample data-test-id="example-6">
        <FormMethodsExampleSix />
      </DocsExample>
      <DocsSnippet
        name="form-methods-example-six.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
