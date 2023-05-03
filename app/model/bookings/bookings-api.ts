import { WixSession } from '@app/model/auth/auth';
import { formatISO } from 'date-fns';
import { extendedBookings } from '@wix/bookings';

export const getMyUpcomingBookings = (wixSession: WixSession) =>
  wixSession!.wixClient!.bookings.queryExtendedBookings(
    {
      filter: { startDate: { $gte: formatISO(Date.now()) } },
      sort: [
        {
          fieldName: 'startDate',
          order: extendedBookings.SortOrder.ASC,
        },
      ],
    },
    { withBookingAllowedActions: true }
  );

export const getMyBookingHistory = (wixSession: WixSession) =>
  wixSession!.wixClient!.bookings.queryExtendedBookings(
    {
      filter: { startDate: { $lt: formatISO(Date.now()) } },
      sort: [
        {
          fieldName: 'startDate',
          order: extendedBookings.SortOrder.DESC,
        },
      ],
    },
    { withBookingAllowedActions: true }
  );

export const cancelBooking = (
  wixSession: WixSession,
  { _id, revision }: Pick<extendedBookings.Booking, '_id' | 'revision'>
) =>
  wixSession!.wixClient!.bookingsActions.cancelBooking(_id!, {
    revision: revision!,
  });
