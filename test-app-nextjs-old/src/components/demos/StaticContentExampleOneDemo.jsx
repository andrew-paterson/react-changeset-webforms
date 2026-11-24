'use client';

import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import StaticContentExampleOne from './StaticContentExampleOne.jsx';

export default function StaticContentExampleOneDemo() {
  return (
    <DocsDemo>
      <DocsExample>
        <StaticContentExampleOne />
      </DocsExample>
      <DocsSnippet
        name="static-content-example-one.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
