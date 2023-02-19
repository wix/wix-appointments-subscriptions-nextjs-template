import { useQuery } from '@tanstack/react-query';
import { useClientAuthSession } from '@app/hooks/useClientAuthSession';
import { getServices } from '@model/service/service-api';

// example usage client components
export const useServices = ({ limit }: { limit?: number }) => {
  const wixSession = useClientAuthSession();
  return useQuery(['services', limit, wixSession], () =>
    getServices({}, wixSession)
  );
};
