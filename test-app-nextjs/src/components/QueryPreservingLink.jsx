'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function QueryPreservingLink({ href, to, ...rest }) {
  const searchParams = useSearchParams();
  const search = searchParams.toString() ? `?${searchParams.toString()}` : '';
  const dest = href || to;
  const fullHref = typeof dest === 'string' ? `${dest}${search}` : dest;
  return <Link href={fullHref} {...rest} />;
}
