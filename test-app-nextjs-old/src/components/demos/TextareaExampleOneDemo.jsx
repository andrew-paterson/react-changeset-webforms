'use client';

import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import TextareaExampleOne from './TextareaExampleOne.jsx';

export default function TextareaExampleOneDemo() {
  return (
    <DocsDemo>
      <DocsExample>
        <TextareaExampleOne />
      </DocsExample>
      <DocsSnippet
        name="textarea-example-one.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
