'use client';

import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import FormMethodsExampleFive from './FormMethodsExampleFive.jsx';

export default function FormMethodsExampleFiveDemo() {
  return (
    <DocsDemo>
      <DocsExample data-test-id="example-5">
        <FormMethodsExampleFive />
      </DocsExample>
      <DocsSnippet
        name="form-methods-example-five.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
