'use client';

import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import AttrFunctions from './AttrFunctions.jsx';

export default function AttrFunctionsDemo() {
  return (
    <DocsDemo>
      <DocsExample>
        <AttrFunctions />
      </DocsExample>
      <DocsSnippet
        name="attr-functions.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
