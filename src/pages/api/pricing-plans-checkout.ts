import { NextApiRequest, NextApiResponse } from 'next';
import { wixClient } from '@model/auth/create-client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // fallback if referrer is not available
  let baseUrl = `https://${req.headers.host}`;
  if (req.headers.referer) {
    // get referrer with no search and query params
    const baseUrlObj = new URL(req.headers.referer.split('?')[0]);
    baseUrlObj.pathname = '/';
    baseUrl = baseUrlObj.toString();
  }
  const { navigateToSectionProps, planId } = req.query as {
    navigateToSectionProps: string;
    planId: string;
    maxStartDate: string;
  };
  const { redirectSession } = await wixClient?.redirects.createRedirectSession({
    paidPlansCheckout: {
      planId,
      navigateToSectionProps,
    },
    callbacks: {
      postFlowUrl: baseUrl,
      plansListUrl: baseUrl + 'plans',
    },
  })!;
  res.redirect(302, redirectSession!.fullUrl!);
}
