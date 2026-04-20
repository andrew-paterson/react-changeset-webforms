'use client';

import { DocsSnippet, DocsDemo, DocsExample } from '../../docs-utils';
import AfterFieldValidationForm from './AfterFieldValidationForm.jsx';

export default function AfterFieldValidationFormDemo() {
  return (
    <DocsDemo>
      <DocsExample>
        <AfterFieldValidationForm />
      </DocsExample>
      <DocsSnippet
        name="after-field-validation-form.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
