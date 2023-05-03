import { useQuery } from '@tanstack/react-query';
import { getServiceAvailability } from '@app/model/availability/availability-api';
import { useClientAuthSession } from '@app/hooks/useClientAuthSession';

export const useAvailability = ({
  serviceId,
  from,
  to,
  timezone = Intl.DateTimeFormat().resolvedOptions().timeZone,
  slotsPerDay,
  limit,
}: {
  serviceId: string;
  from: string;
  to: string;
  timezone?: string;
  slotsPerDay?: number;
  limit?: number;
}) => {
  const wixSession = useClientAuthSession();
  return useQuery(
    [
      'calendar-availability',
      serviceId,
      from,
      to,
      wixSession,
      timezone,
      slotsPerDay,
      limit,
    ],
    () =>
      getServiceAvailability(wixSession, {
        serviceId,
        from,
        to,
        timezone,
        slotsPerDay,
        limit,
      })
  );
};
