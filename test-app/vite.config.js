import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // Exclude locally-linked packages from pre-bundling so that changes to
    // their source are picked up immediately without a cache bust.
    exclude: ['validated-changeset-webforms', 'validated-changeset'],
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.js'],
    globals: true,
    include: ['src/tests/**/*-test.{js,jsx,ts,tsx}'],
  },
});
