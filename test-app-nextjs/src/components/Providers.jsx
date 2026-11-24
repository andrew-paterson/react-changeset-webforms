'use client';

import { ChangesetWebformsProvider } from 'react-changeset-webforms/context/ChangesetWebformsContext.jsx';
import { SnippetsProvider } from 'react-docs-utils';
import appDefaults from '../utils/app-defaults.js';

export default function Providers({ snippets, children }) {
  return (
    <ChangesetWebformsProvider config={appDefaults}>
      <SnippetsProvider snippets={snippets}>{children}</SnippetsProvider>
    </ChangesetWebformsProvider>
  );
}
