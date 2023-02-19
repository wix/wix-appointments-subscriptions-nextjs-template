import { WixSession } from '../auth/auth';
import type { plans } from '@wix/pricing-plans';

export const getPaidPlans = (
  { limit = 100, planIds = undefined as string[] | undefined },
  wixSession: WixSession
): Promise<plans.QueryPublicPlansResponse> =>
  wixSession!.wixClient!.plans.queryPublicPlans();
