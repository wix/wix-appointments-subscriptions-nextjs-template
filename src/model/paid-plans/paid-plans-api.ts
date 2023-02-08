import { QueryPublicPlansResponse } from '@model/paid-plans/types';
import { WixSession } from '../auth/auth';

const PAID_PLANS_API =
  'https://www.wixapis.com/pricing-plans/v2/plans/public/query';

export const getPaidPlans = (
  { limit = 100, planIds = undefined as string[] | undefined },
  wixSession: WixSession
): Promise<QueryPublicPlansResponse> =>
  fetchPublicPlans({
    input: {
      query: {
        filter: !!planIds?.length
          ? {
              id: {
                $hasSome: planIds,
              },
            }
          : null,
        paging: {
          offset: 0,
          limit,
        },
      },
    },
    wixSession,
  });

const fetchPublicPlans = ({
  input,
  wixSession,
}: {
  input: any;
  wixSession: WixSession;
}) => {
  return wixSession!.tokensPromise!.then((tokens) =>
    fetch(PAID_PLANS_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: tokens.accessToken,
      },
      body: JSON.stringify(input),
    }).then((res) => res.json())
  );
};
