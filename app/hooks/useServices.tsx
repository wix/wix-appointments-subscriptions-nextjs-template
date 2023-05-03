import { useQuery } from '@tanstack/react-query';
import { useClientAuthSession } from '@app/hooks/useClientAuthSession';
import { getServices } from '@app/model/service/service-api';

// example usage client components
export const useServices = ({
  limit,
  categoryId,
}: {
  limit?: number;
  categoryId?: string;
} = {}) => {
  const wixSession = useClientAuthSession();
  return useQuery(['services', limit, wixSession], () =>
    getServices(wixSession, { limit, categoryId })
  );
};
