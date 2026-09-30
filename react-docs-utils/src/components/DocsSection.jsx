import { createContext, useContext, useRef } from 'react';
import useHeadings from '../hooks/useHeadings.js';

const DocsSectionContext = createContext(null);

export function useDocsSectionHeadings() {
  return useContext(DocsSectionContext) || [];
}

/**
 * Wraps a docs page's content. Scans its own rendered headings (h2/h3 with
 * ids) and exposes them via context so a sibling <OnThisPage /> can render
 * an auto-generated sub-nav without any manual bookkeeping.
 *
 * Usage:
 *   <DocsSection deps={[location.pathname]}>
 *     <h1 id="my-page">My page</h1>
 *     <h2 id="usage">Usage</h2>
 *     ...
 *   </DocsSection>
 */
export default function DocsSection({ children, deps = [], className = 'docs-md', ...rest }) {
  const containerRef = useRef(null);
  const headings = useHeadings(containerRef, { deps });

  return (
    <DocsSectionContext.Provider value={headings}>
      <div
        ref={containerRef}
        className={className}
        {...rest}
      >
        {children}
      </div>
    </DocsSectionContext.Provider>
  );
}
