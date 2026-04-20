'use client';

import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import AppWideFieldSettingsOverridden from './AppWideFieldSettingsOverridden.jsx';

export default function AppWideFieldSettingsOverriddenDemo() {
  return (
    <DocsDemo>
      <DocsExample>
        <AppWideFieldSettingsOverridden />
      </DocsExample>
      <DocsSnippet
        name="attr-functions.jsx"
        label="Component jsx"
      />
      <DocsSnippet
        name="app-wide-classes.js"
        label="App wide classes"
        language="javascript"
      />
    </DocsDemo>
  );
}
