'use client';

import { ChangesetWebformsProvider } from 'react-changeset-webforms/context/ChangesetWebformsContext.jsx';
import appDefaults from '../utils/app-defaults.js';

export default function Providers({ children }) {
  return (
    <ChangesetWebformsProvider config={appDefaults}>
      {children}
    </ChangesetWebformsProvider>
  );
}
