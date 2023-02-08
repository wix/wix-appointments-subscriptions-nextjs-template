'use client';

import { PropsWithChildren } from 'react';

export default function PlanSelect({
  checkoutUrl,
  children,
}: PropsWithChildren<{
  checkoutUrl: string;
}>) {
  const url = new URL(checkoutUrl);
  url.searchParams.set('origin', window.location.origin);
  return (
    <a className="w-full" href={url.toString()}>
      {children}
    </a>
  );
}
