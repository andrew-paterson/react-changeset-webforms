import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import {
  docsSnippetsPlugin,
  docsMarkdownPagesPlugin,
} from 'react-docs-utils/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    docsSnippetsPlugin({ dirs: ['./src', '../react-changeset-webforms/src'] }),
    docsMarkdownPagesPlugin({
      markdownDir: './markdown/docs',
      pagesDir: './src/pages',
    }),
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
