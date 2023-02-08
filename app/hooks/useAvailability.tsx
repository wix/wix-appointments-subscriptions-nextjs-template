import { useQuery } from '@tanstack/react-query';
import { getServiceAvailability } from '@model/availability/availability-api';
import { useClientAuthSession } from '@app/hooks/useClientAuthSession';

export const useAvailability = ({
  serviceId,
  from,
  to,
  timezone = Intl.DateTimeFormat().resolvedOptions().timeZone,
  slotsPerDay,
}: {
  serviceId: string;
  from: string;
  to: string;
  timezone?: string;
  slotsPerDay?: number;
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
    ],
    () =>
      getServiceAvailability(
        { serviceId, from, to, timezone, slotsPerDay },
        wixSession
      )
  );
};
