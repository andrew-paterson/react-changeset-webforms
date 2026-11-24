'use client';

import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import SignupForm from './SignupForm.jsx';

export default function SignupFormDemo() {
  return (
    <DocsDemo>
      <DocsExample>
        <SignupForm />
      </DocsExample>
      <DocsSnippet
        name="signup-form.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
