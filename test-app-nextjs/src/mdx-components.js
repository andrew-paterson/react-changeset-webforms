import { mdxComponents } from 'react-docs-utils';

export function useMDXComponents(components) {
  return { ...mdxComponents, ...components };
}
