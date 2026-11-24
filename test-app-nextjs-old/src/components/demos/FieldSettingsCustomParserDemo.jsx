'use client';

import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import FieldMethodsExampleTwo from './FieldMethodsExampleTwo.jsx';

export default function FieldMethodsExampleTwoDemo() {
  return (
    <DocsDemo>
      <DocsExample>
        <FieldMethodsExampleTwo />
      </DocsExample>
      <DocsSnippet
        name="custom-parser-in-service.js"
        label="services/ember-changeset-webforms.js"
        language="javascript"
      />
      <DocsSnippet
        name="field-settings-custom-parser.js"
        label="component js"
        language="javascript"
      />
      <DocsSnippet
        name="field-methods-example-two.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
