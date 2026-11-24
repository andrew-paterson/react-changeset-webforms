'use client';

import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import SingleCheckboxExampleOne from './SingleCheckboxExampleOne.jsx';

export default function SingleCheckboxExampleOneDemo() {
  return (
    <DocsDemo>
      <DocsExample>
        <SingleCheckboxExampleOne />
      </DocsExample>
      <DocsSnippet
        name="single-checkbox-example-one.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
