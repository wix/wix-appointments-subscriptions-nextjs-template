import type { plans } from '@wix/pricing-plans';

export const getCheckoutUrl = ({
  plan,
  checkoutData,
  maxStartDate,
}: {
  plan: plans.PublicPlan;
  checkoutData?: string;
  maxStartDate?: string;
}) => {
  return `./api/pricing-plans-checkout?planId=${plan._id}&checkoutData=${
    checkoutData ?? ''
  }&maxStartDate=${maxStartDate ?? ''}`;
};
