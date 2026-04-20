'use client';

import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import FieldMethodsExampleThree from './FieldMethodsExampleThree.jsx';

export default function FieldMethodsExampleThreeDemo() {
  return (
    <DocsDemo>
      <DocsExample data-test-id="example-3">
        <FieldMethodsExampleThree />
      </DocsExample>
      <DocsSnippet
        name="field-methods-example-three.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
