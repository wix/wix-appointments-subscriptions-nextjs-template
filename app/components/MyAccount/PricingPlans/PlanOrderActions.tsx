'use client';
import { useState } from 'react';
import { useClientAuthSession } from '@app/hooks/useClientAuthSession';
import { WixBookingsClientProvider } from '@app/components/Provider/WixBookingsClientProvider';
import type { orders } from '@wix/pricing-plans';
import { cancelPlanOrder } from '@app/model/paid-plans/paid-plans-api';

export type PlanOrderActionsProps = {
  planOrder: Pick<orders.Order, '_id'>;
};

function PlanOrderActionsView({ planOrder }: PlanOrderActionsProps) {
  const [error, setError] = useState<string | null>(null);
  const wixSession = useClientAuthSession();
  const onCancel = () =>
    cancelPlanOrder(wixSession, planOrder!._id!)
      .then(() => {
        window.location.reload();
      })
      .catch((e) => {
        console.error(e);
        setError('Failed to cancel pricing plan');
      });
  return error ? (
    <span className="text-red-600">{error}</span>
  ) : (
    <div className="text-highlight flex gap-2 underline text-sm">
      <button onClick={onCancel}>Cancel Plan Order</button>
    </div>
  );
}

export default function PlanOrderActions(props: PlanOrderActionsProps) {
  return (
    <WixBookingsClientProvider>
      <PlanOrderActionsView {...props} />
    </WixBookingsClientProvider>
  );
}
