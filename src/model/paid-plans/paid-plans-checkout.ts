import type { plans } from '@wix/pricing-plans';

export const getCheckoutUrl = ({
  plan,
  checkoutData,
}: {
  plan: plans.PublicPlan;
  checkoutData?: string;
}) => {
  const params = new URLSearchParams();
  params.set('planId', plan._id!);
  params.set('checkoutData', checkoutData ?? '');
  return `./api/pricing-plans-checkout?${params.toString()}`;
};
