import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import ShowClasses from './ShowClasses.jsx';

export default function ShowClassesDemo() {
  return (
    <DocsDemo>
      <DocsExample>
        <ShowClasses />
      </DocsExample>
      <DocsSnippet
        name="signup-form.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
