'use client';

import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import FormMethodsExampleThree from './FormMethodsExampleThree.jsx';

export default function FormMethodsExampleThreeDemo() {
  return (
    <DocsDemo>
      <DocsExample data-test-id="example-3">
        <FormMethodsExampleThree />
      </DocsExample>
      <DocsSnippet
        name="form-methods-example-three.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
