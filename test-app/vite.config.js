import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { docsSnippetsPlugin } from 'react-docs-utils/vite';
import { docsMarkdownPagesPlugin } from './vite-plugins/docs-markdown-pages-plugin.js';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    docsSnippetsPlugin({ dirs: ['./src', '../react-changeset-webforms/src'] }),
    docsMarkdownPagesPlugin(),
  ],
  optimizeDeps: {
    // Exclude locally-linked packages from pre-bundling so that changes to
    // their source are picked up immediately without a cache bust.
    // exclude: ['validated-changeset-webforms', 'validated-changeset'],
  },
  root: './',
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.js'],
    globals: true,
    include: ['src/tests/**/*-test.{js,jsx,ts,tsx}'],
  },
});
