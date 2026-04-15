import { useCallback } from 'react';

/**
 * useMergedRef
 *
 * Returns a single callback ref that forwards the DOM node to all provided
 * refs. Accepts both `useRef`-style objects ({ current }) and callback refs.
 *
 * Usage:
 *   const merged = useMergedRef(forwardedRef, internalRef);
 *   return <div ref={merged} />;
 */
export default function useMergedRef(...refs) {
  return useCallback(
    (node) => {
      refs.forEach((ref) => {
        if (!ref) return;
        if (typeof ref === 'function') ref(node);
        else ref.current = node;
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refs,
  );
}
