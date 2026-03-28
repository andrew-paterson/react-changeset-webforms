import React from 'react';
import DocsExample from './DocsExample.jsx';
import DocsSnippet from './DocsSnippet.jsx';

export default function DocsDemo({ children }) {
  const childArray = React.Children.toArray(children);
  const examples = childArray.filter((child) => child.type === DocsExample);
  const snippets = childArray.filter((child) => child.type === DocsSnippet);

  return (
    <div className="docs-rounded docs-border docs-border-grey-lighter docs-my-8">
      <div className="example">{examples}</div>
      <div className="snippets">{snippets}</div>
    </div>
  );
}
