import { DocsSnippet, DocsDemo } from '../docs-utils';

export default function CustomFieldDemo() {
  return (
    <DocsDemo>
      <DocsSnippet
        name="custom-field-component.hbs"
        label="custom field template"
        language="htmlbars"
      />
      <DocsSnippet
        name="custom-field-component.js"
        label="custom field component js"
        language="javascript"
      />
      <DocsSnippet
        name="phone-number-validator.js"
        label="custom validator"
        language="javascript"
      />
    </DocsDemo>
  );
}
