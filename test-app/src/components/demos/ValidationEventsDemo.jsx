import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import ValidationEvents from './ValidationEvents.jsx';

export default function ValidationEventsDemo() {
  return (
    <DocsDemo>
      <DocsExample>
        <ValidationEvents />
      </DocsExample>
      <DocsSnippet
        name="validation-events.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
