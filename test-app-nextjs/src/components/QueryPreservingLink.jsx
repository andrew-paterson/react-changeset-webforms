'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function QueryPreservingLinkInner({ href, to, ...rest }) {
  const searchParams = useSearchParams();
  const search = searchParams.toString() ? `?${searchParams.toString()}` : '';
  const dest = href || to;
  const fullHref = typeof dest === 'string' ? `${dest}${search}` : dest;
  return <Link href={fullHref} {...rest} />;
}

export default function QueryPreservingLink({ href, to, children, ...rest }) {
  const dest = href || to;
  return (
    <Suspense fallback={<Link href={dest} {...rest}>{children}</Link>}>
      <QueryPreservingLinkInner href={href} to={to} {...rest}>{children}</QueryPreservingLinkInner>
    </Suspense>
  );
}
