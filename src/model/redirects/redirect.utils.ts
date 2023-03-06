import { redirects } from '@wix/redirects-api';

export const createRedirectCallbacks = ({
  baseUrl,
  postFlowUrl = baseUrl,
}: {
  baseUrl: string;
  postFlowUrl?: string;
}): redirects.CallbackParams => {
  const fixedBaseUrl = baseUrl.replace(/\/$/, '');
  return {
    postFlowUrl,
    plansListUrl: fixedBaseUrl + '/plans',
    bookingsServiceList: fixedBaseUrl + '/book-now',
  };
};
