import { createRoot } from 'react-dom/client';
import { ChangesetWebformsProvider } from 'react-changeset-webforms/src/context/ChangesetWebformsContext.jsx';
import { SnippetsProvider } from 'react-docs-utils';
import appDefaults from './utils/app-defaults.js';
import snippets from 'virtual:docs-snippets';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <ChangesetWebformsProvider config={appDefaults}>
    <SnippetsProvider snippets={snippets}>
      <App />
    </SnippetsProvider>
  </ChangesetWebformsProvider>,
);
