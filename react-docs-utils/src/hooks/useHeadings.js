import { useEffect, useState } from 'react';

/**
 * Scans the DOM within `containerRef` for heading elements (default h2, h3)
 * and returns them as a flat list of { id, text, level }.
 *
 * Re-scans on every DOM mutation inside the container, so headings stay in
 * sync as pages render, change or navigate. `deps` forces an extra re-scan.
 */
export default function useHeadings(
  containerRef,
  { selector = 'h2[id], h3[id]', deps = [] } = {},
) {
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    const container = containerRef?.current;
    if (!container) {
      setHeadings([]);
      return;
    }

    const scan = () => {
      const next = Array.from(container.querySelectorAll(selector)).map(
        (node) => ({
          id: node.id,
          text: node.dataset.text || node.textContent.trim(),
          level: Number(node.tagName.replace('H', '')),
        }),
      );
      // Avoid re-rendering when a mutation didn't change the heading list.
      setHeadings((prev) =>
        JSON.stringify(prev) === JSON.stringify(next) ? prev : next,
      );
    };

    scan();
    if (typeof MutationObserver === 'undefined') return;

    const observer = new MutationObserver(scan);
    observer.observe(container, { subtree: true, childList: true });
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef, selector, ...deps]);

  return headings;
}
