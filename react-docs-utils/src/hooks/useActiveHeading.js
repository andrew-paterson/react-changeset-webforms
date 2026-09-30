import { useEffect, useState } from 'react';

/**
 * Tracks which heading id is currently "active" (closest to the top of the
 * viewport) using IntersectionObserver. Used for scroll-spy highlighting in
 * OnThisPage.
 */
export default function useActiveHeading(headings) {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    if (!headings.length) {
      setActiveId(null);
      return;
    }

    const elements = headings.map((h) => document.getElementById(h.id)).filter(Boolean);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '0px 0px -70% 0px', threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  return activeId;
}
