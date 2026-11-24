'use client';

import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import FieldSpecificClassSettings from './FieldSpecificClassSettings.jsx';

export default function FieldSpecificClassSettingsDemo() {
  return (
    <DocsDemo>
      <DocsExample>
        <FieldSpecificClassSettings />
      </DocsExample>
      <DocsSnippet
        name="field-specific-class-settings.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
