import { PropsWithChildren } from 'react';

export default function PlanSelect({
  checkoutUrl,
  children,
}: PropsWithChildren<{
  checkoutUrl: string;
}>) {
  return (
    <a className="w-full" href={checkoutUrl}>
      {children}
    </a>
  );
}
