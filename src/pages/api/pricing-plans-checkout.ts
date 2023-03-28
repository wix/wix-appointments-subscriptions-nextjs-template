import { NextApiRequest, NextApiResponse } from 'next';
import { wixClient } from '@model/auth/create-client';
import { createRedirectCallbacks } from '@model/redirects/redirect.utils';

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
  const { checkoutData, planId } = req.query as {
    checkoutData: string;
    planId: string;
  };
  const { redirectSession } = await wixClient?.redirects.createRedirectSession({
    paidPlansCheckout: {
      planId,
      checkoutData,
    },
    callbacks: createRedirectCallbacks({ baseUrl }),
  })!;
  res.redirect(302, redirectSession!.fullUrl!);
}
