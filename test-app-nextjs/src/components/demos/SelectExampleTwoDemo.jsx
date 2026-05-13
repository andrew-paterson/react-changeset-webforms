'use client';

import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import SelectExampleTwo from './SelectExampleTwo.jsx';

export default function SelectExampleTwoDemo() {
  return (
    <DocsDemo>
      <DocsExample data-test-id="select-example-two">
        <SelectExampleTwo />
      </DocsExample>
      <DocsSnippet name="select-example-two.jsx" label="Component jsx" />
    </DocsDemo>
  );
}
