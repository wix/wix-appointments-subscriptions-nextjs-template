import { useQuery } from '@tanstack/react-query';
import { useClientAuthSession } from '@app/hooks/useClientAuthSession';
import { getCurrentMember } from '@app/model/members/members-api';

// example usage client components
export const useCurrentMember = ({
  limit,
}: {
  limit?: number;
} = {}) => {
  const wixSession = useClientAuthSession();
  return useQuery(['my-member', wixSession], () =>
    getCurrentMember(wixSession)
  );
};
