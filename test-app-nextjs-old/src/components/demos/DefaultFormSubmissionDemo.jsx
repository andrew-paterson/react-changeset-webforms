'use client';

import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import DefaultFormSubmission from './DefaultFormSubmission.jsx';

export default function DefaultFormSubmissionDemo() {
  return (
    <DocsDemo>
      <DocsExample>
        <DefaultFormSubmission />
      </DocsExample>
      <DocsSnippet
        name="default-form-submission.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
