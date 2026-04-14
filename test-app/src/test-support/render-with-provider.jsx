import { render } from '@testing-library/react';
import { ChangesetWebformsProvider } from 'react-changeset-webforms/src/context/ChangesetWebformsContext.jsx';
import appDefaults from '../utils/app-defaults.js';

/**
 * Renders a component wrapped in ChangesetWebformsProvider with appDefaults.
 */
export function renderWithProvider(ui) {
  return render(<ChangesetWebformsProvider config={appDefaults}>{ui}</ChangesetWebformsProvider>);
}
