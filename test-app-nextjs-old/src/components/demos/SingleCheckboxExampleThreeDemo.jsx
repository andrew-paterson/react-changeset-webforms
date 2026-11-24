'use client';

import { DocsSnippet, DocsDemo, DocsExample } from '../docs-utils';
import SingleCheckboxExampleThree from './SingleCheckboxExampleThree.jsx';

export default function SingleCheckboxExampleThreeDemo() {
  return (
    <DocsDemo>
      <DocsExample>
        <SingleCheckboxExampleThree />
      </DocsExample>
      <DocsSnippet
        name="single-checkbox-example-three.jsx"
        label="Component jsx"
      />
      <DocsSnippet
        name="component-for-single-checkbox-option.jsx"
        label="custom label component jsx"
      />
    </DocsDemo>
  );
}
