import path from 'path';
import { fileURLToPath } from 'url';
import createMDX from '@next/mdx';

const stylesDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../react-docs-utils/src/styles',
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  transpilePackages: [
    'react-changeset-webforms',
    'react-docs-utils',
    'validated-changeset-webforms',
  ],
  sassOptions: { loadPaths: [stylesDir], silenceDeprecations: ['import'] },
};

const withMDX = createMDX({
  options: { remarkPlugins: ['remark-gfm'] },
});

export default withMDX(nextConfig);
