import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';

const require = createRequire(import.meta.url);
const stylesDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../styles',
);

/**
 * Compiles `react-docs-utils/styles/addon.scss` like ember-cli-addon-docs:
 * sass first (resolving partials from the shared styles dir), then
 * Tailwind 1.x with the docs-prefixed config.
 */
export function docsStylesPlugin() {
  return {
    name: 'react-docs-utils:docs-styles',
    config() {
      return {
        css: {
          preprocessorOptions: { scss: { loadPaths: [stylesDir] } },
          postcss: {
            plugins: [
              require('tailwindcss')(path.join(stylesDir, 'tailwind.config.cjs')),
            ],
          },
        },
      };
    },
  };
}
