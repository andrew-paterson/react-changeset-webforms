'use client';

import { useEffect } from 'react';

export default function TestsPage() {
  useEffect(() => {
    if (window.__qunitStarted) return;
    window.__qunitStarted = true;

    async function runTests() {
      const { start } = await import('react-qunit');
      await import('../../tests/test-helper.jsx');

      // Wait for TestApp to finish rendering into #root before running tests,
      // so that visit() can find nav links in the DOM.
      await new Promise((resolve) => {
        const interval = setInterval(() => {
          if (document.querySelector('#root a[href]')) {
            clearInterval(interval);
            resolve();
          }
        }, 50);
      });

      start();
    }
    runTests();
  }, []);

  return null;
}
