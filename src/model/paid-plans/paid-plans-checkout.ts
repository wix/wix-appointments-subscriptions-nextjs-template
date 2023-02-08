import { PublicPlan } from '@model/paid-plans/types';

const checkoutUrlBase = new URL(
  decodeURIComponent(process.env.NEXT_PUBLIC_PAID_PLANS_CHECKOUT_URL!)
);

export const getCheckoutUrl = ({
  plan,
  navigateToSectionProps,
  maxStartDate,
}: {
  plan: PublicPlan;
  navigateToSectionProps?: string;
  maxStartDate?: string;
}) => {
  const url = new URL(checkoutUrlBase);
  const data = btoa(
    JSON.stringify({
      integrationData: {
        maxStartDate,
        navigateToSectionProps: navigateToSectionProps
          ? JSON.parse(atob(navigateToSectionProps))
          : undefined,
      },
      planId: plan.id,
    })
  );
  url.pathname += data;
  return url.toString();
};
