import { useEffect, useState } from 'react';

/**
 * Scans the DOM within `containerRef` for heading elements (default h2, h3)
 * and returns them as a flat list of { id, text, level }.
 *
 * Re-scans whenever `deps` changes (typically pass the route/page identity
 * so headings update when navigating between docs pages).
 */
export default function useHeadings(containerRef, { selector = 'h2[id], h3[id]', deps = [] } = {}) {
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    const container = containerRef?.current;
    if (!container) {
      setHeadings([]);
      return;
    }
    const nodes = Array.from(container.querySelectorAll(selector));
    setHeadings(
      nodes.map((node) => ({
        id: node.id,
        text: node.textContent,
        level: Number(node.tagName.replace('H', '')),
      })),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef, selector, ...deps]);

  return headings;
}
