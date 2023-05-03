import { WixSession } from '../auth/auth';
import { plans, orders } from '@wix/pricing-plans';
import { safeCall } from '@app/model/utils';

export const safeGetPaidPlans = (
  wixSession: WixSession,
  options?: { limit?: number; planIds?: string[] }
) => {
  return safeCall(
    () => getPaidPlans(wixSession, options).then((res) => res.items),
    [],
    'Get Public Plans'
  );
};

export const getMyPlanOrders = (wixSession: WixSession) =>
  safeCall(
    () =>
      wixSession!
        .wixClient!.orders.memberListOrders()
        .then((res) => res.orders),
    [],
    'Get My Plan Orders'
  );

export const getPaidPlans = (
  wixSession: WixSession,
  { limit = 100, planIds = undefined as string[] | undefined } = {}
): Promise<plans.PlansQueryResult> => {
  let queryBuilder = wixSession!.wixClient!.plans.queryPublicPlans();
  if (planIds?.length) {
    queryBuilder = queryBuilder.in('_id', planIds);
  }
  return queryBuilder.limit(limit).find();
};

export const cancelPlanOrder = (wixSession: WixSession, planOrderId: string) =>
  wixSession!.wixClient!.orders.requestCancellation(
    planOrderId,
    orders.CancellationEffectiveAt.IMMEDIATELY
  );
