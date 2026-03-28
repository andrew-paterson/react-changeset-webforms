import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import CustomValidatorsForm from './CustomValidatorsForm.jsx';

export default function CustomValidatorsFormDemo() {
  return (
    <DocsDemo>
      <DocsExample>
        <CustomValidatorsForm />
      </DocsExample>
      <DocsSnippet
        name="uniqueness-validator.js"
        label="1. custom validator"
        language="javascript"
      />
      <DocsSnippet
        name="custom-form-submission.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
