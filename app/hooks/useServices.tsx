import { useQuery } from '@tanstack/react-query';
import { useClientAuthSession } from '@app/hooks/useClientAuthSession';
import { GetServicesResponse } from '@model/service/service-api';

export const useServices = ({ limit }: { limit?: number }) => {
  const wixSession = useClientAuthSession();
  return useQuery(['services', limit, wixSession], () =>
    wixSession?.tokensPromise?.then((tokens) =>
      fetch('/api/services', {
        method: 'POST',
        body: JSON.stringify({
          query: { limit },
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: tokens.accessToken,
        },
      }).then((res) => res.json() as Promise<GetServicesResponse>)
    )
  );
};
