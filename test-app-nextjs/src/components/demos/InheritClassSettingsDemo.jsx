'use client';

import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import InheritClassSettings from './InheritClassSettings.jsx';

export default function InheritClassSettingsDemo() {
  return (
    <DocsDemo>
      <DocsExample>
        <InheritClassSettings />
      </DocsExample>
      <DocsSnippet
        name="inherit-class-settings.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
