import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import CustomFormSubmission from './CustomFormSubmission.jsx';

export default function CustomFormSubmissionDemo() {
  return (
    <DocsDemo>
      <DocsExample>
        <CustomFormSubmission />
      </DocsExample>
      <DocsSnippet
        name="custom-form-submission.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
