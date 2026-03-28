import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import ForcingValidation from './ForcingValidation.jsx';

export default function ForcingValidationDemo() {
  return (
    <DocsDemo>
      <DocsExample>
        <ForcingValidation />
      </DocsExample>
      <DocsSnippet
        name="forcing-validation.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
