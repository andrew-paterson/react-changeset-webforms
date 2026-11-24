import path from 'path';

// Tailwind 1.x takes the config path as its option; cwd is the app root.
const configPath = path.resolve(
  process.cwd(),
  '../react-docs-utils/src/styles/tailwind.config.cjs',
);

export default { plugins: { tailwindcss: configPath } };
