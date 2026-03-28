import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import FormWideClassSettings from './FormWideClassSettings.jsx';

export default function FormWideClassSettingsDemo() {
  return (
    <DocsDemo>
      <DocsExample>
        <FormWideClassSettings />
      </DocsExample>
      <DocsSnippet
        name="form-wide-class-settings.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
