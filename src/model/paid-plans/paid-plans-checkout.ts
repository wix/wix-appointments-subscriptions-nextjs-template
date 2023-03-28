import type { plans } from '@wix/pricing-plans';

export const getCheckoutUrl = ({
  plan,
  checkoutData,
}: {
  plan: plans.PublicPlan;
  checkoutData?: string;
}) => {
  return `./api/pricing-plans-checkout?planId=${plan._id}&checkoutData=${
    checkoutData ?? ''
  }`;
};
