import { DocsSnippet, DocsDemo } from '../docs-utils';

export default function CustomFieldDemo() {
  return (
    <DocsDemo>
      <DocsSnippet
        name="custom-field-component.jsx"
        label="custom field component jsx"
      />
      <DocsSnippet
        name="phone-number-validator.js"
        label="custom validator"
        language="javascript"
      />
    </DocsDemo>
  );
}
