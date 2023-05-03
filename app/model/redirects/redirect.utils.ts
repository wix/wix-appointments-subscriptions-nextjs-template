import { redirects } from '@wix/redirects';

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
    planListUrl: fixedBaseUrl + '/plans',
    bookingsServiceListUrl: fixedBaseUrl + '/book-now',
  };
};
