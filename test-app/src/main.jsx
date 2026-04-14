import { createRoot } from 'react-dom/client';
import { ChangesetWebformsProvider } from 'react-changeset-webforms/src/context/ChangesetWebformsContext.jsx';
import appDefaults from './utils/app-defaults.js';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <ChangesetWebformsProvider config={appDefaults}>
    <App />
  </ChangesetWebformsProvider>,
);
