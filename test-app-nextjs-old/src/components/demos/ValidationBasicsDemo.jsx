'use client';

import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import ValidationBasics from './ValidationBasics.jsx';

export default function ValidationBasicsDemo() {
  return (
    <DocsDemo>
      <DocsExample>
        <ValidationBasics />
      </DocsExample>
      <DocsSnippet
        name="validation-basics.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
