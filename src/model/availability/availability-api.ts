import { WixSession } from '../auth/auth';
import { availabilityCalendar } from '@wix/bookings';

export const getServiceAvailability = (
  {
    serviceId,
    from,
    to,
    timezone,
    slotsPerDay,
  }: {
    serviceId: string;
    from: string;
    to: string;
    timezone?: string;
    slotsPerDay?: number;
  },
  wixSession: WixSession
): Promise<availabilityCalendar.QueryAvailabilityResponse> =>
  queryAvailability({
    input: {
      slotsPerDay,
      timezone,
      query: {
        filter: {
          serviceId: [serviceId],
          startDate: from,
          endDate: to,
        },
      },
    },
    wixSession,
  });

const queryAvailability = ({
  input,
  wixSession,
}: {
  input: availabilityCalendar.QueryAvailabilityRequest;
  wixSession: WixSession;
}) =>
  wixSession!.wixClient!.availabilityCalendar.queryAvailability(input.query!, {
    timezone: input.timezone,
    slotsPerDay: input.slotsPerDay,
  });
