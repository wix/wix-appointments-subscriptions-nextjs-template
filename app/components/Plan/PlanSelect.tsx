import { PropsWithChildren } from 'react';
import testIds from '@app/utils/test-ids';

export default function PlanSelect({
  checkoutUrl,
  children,
}: PropsWithChildren<{
  checkoutUrl: string;
}>) {
  return (
    <a
      className="w-full"
      href={checkoutUrl}
      data-testid={testIds.PLAN_ITEM.CHECKOUT_CTA}
    >
      {children}
    </a>
  );
}
