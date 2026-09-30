import React, { useState } from 'react';
import DocsExample from './DocsExample.jsx';
import DocsSnippet from './DocsSnippet.jsx';

/**
 * Compound component: pass one or more <DocsExample> (live-rendered) and
 * one or more <DocsSnippet> (source view) as children. Snippet tabs let the
 * reader flip between multiple source files for the same example.
 */
export default function DocsDemo({ children }) {
  const childArray = React.Children.toArray(children);
  const examples = childArray.filter((child) => child.type === DocsExample);
  const snippets = childArray.filter((child) => child.type === DocsSnippet);

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="docs-demo">
      <div className="docs-demo__example">{examples}</div>
      {snippets.length > 0 && (
        <div className="docs-demo__snippets">
          <nav className="docs-demo__snippets-nav">
            {snippets.map((snippet, index) => (
              <button
                key={snippet.props.name || index}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`docs-demo__snippet-tab${index === activeIndex ? ' is-active' : ''}`}
              >
                {snippet.props.label || snippet.props.name}
              </button>
            ))}
          </nav>
          <div className="docs-demo__snippet-wrapper">
            {snippets[activeIndex]}
          </div>
        </div>
      )}
    </div>
  );
}
