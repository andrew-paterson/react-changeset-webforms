'use client';

import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import LoginForm from './LoginForm.jsx';

export default function LoginFormDemo() {
  return (
    <DocsDemo>
      <DocsExample>
        <LoginForm />
      </DocsExample>
      <DocsSnippet
        name="login-form.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
