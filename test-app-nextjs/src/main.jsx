// Renders a standalone MemoryRouter-based app into #root (inside
// #react-testing) so QUnit browser tests can use visit() while the browser
// URL stays at /tests — mirroring the Ember test-runner pattern.
import { createRoot } from 'react-dom/client';
import { ChangesetWebformsProvider } from 'react-changeset-webforms/src/context/ChangesetWebformsContext.jsx';
import appDefaults from './utils/app-defaults.js';
import TestApp from './test-support/TestApp.jsx';

const rootEl = document.getElementById('root');
if (rootEl) {
  createRoot(rootEl).render(
    <ChangesetWebformsProvider config={appDefaults}>
      <TestApp />
    </ChangesetWebformsProvider>,
  );
}
