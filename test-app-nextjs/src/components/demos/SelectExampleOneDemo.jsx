'use client';

import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import SelectExampleOne from './SelectExampleOne.jsx';

export default function SelectExampleOneDemo() {
  return (
    <DocsDemo>
      <DocsExample data-test-id="select-example-one">
        <SelectExampleOne />
      </DocsExample>
      <DocsSnippet name="select-example-one.jsx" label="Component jsx" />
    </DocsDemo>
  );
}
