'use client';

import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import ValidationClassSettings from './ValidationClassSettings.jsx';

export default function ValidationClassSettingsDemo() {
  return (
    <DocsDemo>
      <DocsExample>
        <ValidationClassSettings />
      </DocsExample>
      <DocsSnippet
        name="validation-class-settings.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
