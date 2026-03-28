import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import OverrideClassSettings from './OverrideClassSettings.jsx';

export default function OverrideClassSettingsDemo() {
  return (
    <DocsDemo>
      <DocsExample>
        <OverrideClassSettings />
      </DocsExample>
      <DocsSnippet
        name="override-class-settings.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
