'use client';

import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import RadioButtonGroupExampleThree from './RadioButtonGroupExampleThree.jsx';

export default function RadioButtonGroupExampleThreeDemo() {
  return (
    <DocsDemo>
      <DocsExample data-test-id="radio-button-group-example-3">
        <RadioButtonGroupExampleThree />
      </DocsExample>
      <DocsSnippet
        name="radio-button-group-example-three.jsx"
        label="Component jsx"
      />
    </DocsDemo>
  );
}
