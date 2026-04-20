'use client';

import React from 'react';
import DocsExample from './DocsExample.jsx';
import DocsSnippet from './DocsSnippet.jsx';

export default function DocsDemo({ children }) {
  const childArray = React.Children.toArray(children);
  const examples = childArray.filter((child) => child.type === DocsExample);
  const snippetChildren = childArray.filter(
    (child) => child.type === DocsSnippet,
  );

  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <div className="docs-rounded docs-border docs-border-grey-lighter docs-my-8">
      <div className="example">{examples}</div>
      <div className="snippets">
        <nav
          className="docs-demo__snippets-nav docs-py-2 docs-px-4 docs-font-medium
        docs-bg-black docs-tracking-tight docs-border-b
        docs-border-grey-darkest"
        >
          {snippetChildren.map((snippet, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`docs-mr-4 docs-text-xs docs-no-underline outline-none
              hover:docs-text-grey-lighter
              ${index === activeIndex ? 'docs-text-grey-light' : 'docs-text-grey-dark'}`}
            >
              {snippet.props.label}
            </button>
          ))}
        </nav>
        <div className="docs-demo__snippet-wrapper docs-bg-code-base docs-rounded-b">
          <div
            className="docs-text-xs docs-px-2 docs-py-1 docs-bg-code-base
    docs-relative docs-subpixel-antialiased
    docs-rounded"
          >
            {snippetChildren[activeIndex]}
          </div>
        </div>
      </div>
    </div>
  );
}
