import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import CloneGroupFormWithData from './CloneGroupFormWithData.jsx';

export default function CloneGroupFormWithDataDemo() {
  return (
    <DocsDemo>
      <DocsExample>
        <CloneGroupFormWithData />
      </DocsExample>
      <DocsSnippet
        name="clone-group-form-string-field-label.jsx"
        label="Component jsx"
      />
      <DocsSnippet
        name="clone-group-form.js"
        label="component js"
        language="javascript"
      />
    </DocsDemo>
  );
}
