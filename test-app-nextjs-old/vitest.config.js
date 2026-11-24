import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['src/tests/integration/setup.js'],
    include: ['src/tests/integration/**/*-test.{js,jsx,ts,tsx}'],
  },
});
