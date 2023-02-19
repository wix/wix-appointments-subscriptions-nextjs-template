import type { plans } from '@wix/pricing-plans';

export const getCheckoutUrl = ({
  plan,
  navigateToSectionProps,
  maxStartDate,
}: {
  plan: plans.PublicPlan;
  navigateToSectionProps?: string;
  maxStartDate?: string;
}) => {
  return `./api/pricing-plans-checkout?planId=${
    plan._id
  }&navigateToSectionProps=${
    navigateToSectionProps ? JSON.parse(atob(navigateToSectionProps)) : ''
  }&maxStartDate=${maxStartDate ?? ''}`;
};
