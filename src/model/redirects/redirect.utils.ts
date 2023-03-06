import { redirects } from '@wix/redirects-api';

export const createRedirectCallbacks = ({
  baseUrl,
  postFlowUrl = baseUrl,
}: {
  baseUrl: string;
  postFlowUrl?: string;
}): redirects.CallbackParams => ({
  postFlowUrl,
  plansListUrl: baseUrl + 'plans',
  bookingsServiceList: baseUrl + 'book-now',
});
