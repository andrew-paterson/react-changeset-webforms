'use client';

import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import FieldSettingsOverridden from './FieldSettingsOverridden.jsx';

export default function FieldSettingsOverriddenDemo() {
  return (
    <DocsDemo>
      <DocsExample>
        <FieldSettingsOverridden />
      </DocsExample>
      <DocsSnippet
        name="services/ember-changeset-webforms.js"
        label="App wide field options"
        language="javascript"
      />
      <DocsSnippet
        name="field-methods-example-two.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
