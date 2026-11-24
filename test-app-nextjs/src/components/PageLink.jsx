'use client';

import Link from 'next/link';
import { Link as RouterLink, useInRouterContext } from 'react-router-dom';

// Docs pages are rendered by Next, and by a MemoryRouter in the QUnit /tests app.
export default function PageLink({ to, children, ...rest }) {
  const inRouter = useInRouterContext();
  return inRouter ? (
    <RouterLink to={to} {...rest}>
      {children}
    </RouterLink>
  ) : (
    <Link href={to} {...rest}>
      {children}
    </Link>
  );
}
