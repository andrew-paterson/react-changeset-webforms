'use client';

import { useEffect } from 'react';

export default function TestsPage() {
  useEffect(() => {
    async function runTests() {
      await import('../../tests/test-helper.jsx');
    }
    runTests();
  }, []);

  return null;
}
