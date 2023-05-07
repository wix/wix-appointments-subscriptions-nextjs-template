import MyAccountSection from '@app/components/MyAccount/MyAccountSection';
import { useServerAuthSession } from '@app/hooks/useServerAuthSession';
import {
  getMyBookingHistory,
  getMyUpcomingBookings,
} from '@app/model/bookings/bookings-api';
import { useFormattedTimezone } from '@app/hooks/useFormattedTimezone';
import BookingActions from '@app/components/MyAccount/Bookings/BookingActions';
import { format } from 'date-fns';
import { getCurrentMember } from '@app/model/members/members-api';

const DATE_TIME_FORMAT = 'MMM dd, yyyy, h:mm a';

const formatDateAndTime = (date: Date) =>
  format(new Date(date), DATE_TIME_FORMAT);

enum SelectedView {
  UPCOMING = 'UPCOMING',
  HISTORY = 'HISTORY',
}

export default async function MyBookingsPage({
  searchParams,
}: {
  searchParams?: { [_: string]: string };
}) {
  const selectedTab = searchParams?.view || SelectedView.UPCOMING;
  const wixSession = useServerAuthSession();
  const [bookings, { member }] = await Promise.all([
    selectedTab === SelectedView.UPCOMING
      ? getMyUpcomingBookings(wixSession)
      : getMyBookingHistory(wixSession),
    getCurrentMember(wixSession),
  ]);

  const timezoneStr = useFormattedTimezone();

  return (
    <MyAccountSection member={member}>
      <h2 className="text-turquoise-200 text-4xl">Manage Your Bookings</h2>
      <div className="text-sm py-2">
        <p className="pt-2">
          View, cancel your bookings and easily book again.
        </p>
        <p className="pt-2">Timezone: {timezoneStr}</p>
      </div>
      <nav className="text-center sm:text-left text-turquoise-200 my-2 border-b border-black border-opacity-[0.04]">
        {[
          { name: 'Upcoming', value: SelectedView.UPCOMING },
          { name: 'History', value: SelectedView.HISTORY },
        ].map(({ name, value }) => (
          <a
            key={value}
            className={`w-20 sm:w-28 inline-block text-center py-4 border-b-[3px] border-opacity-60 ${
              value === selectedTab
                ? 'border-turquoise-200'
                : 'border-transparent'
            }`}
            href={`?view=${value}`}
          >
            {name}
          </a>
        ))}
      </nav>
      {bookings.extendedBookings?.length ? (
        bookings.extendedBookings?.map(({ booking, allowedActions }, index) => (
          <div
            key={booking!._id}
            className="flex flex-wrap gap-5 py-6 border-b border-black border-opacity-30 hover:border-opacity-80 text-sm items-center"
          >
            <div>{formatDateAndTime(booking!.startDate!)}</div>
            <div>{booking?.bookedEntity?.title}</div>
            <div className="text-xs">{booking?.status}</div>
            <div className="ml-auto">
              <BookingActions
                booking={{
                  _id: booking?._id,
                  revision: booking?.revision,
                  status: booking?.status,
                }}
                serviceId={booking?.bookedEntity?.slot?.serviceId}
                allowedActions={allowedActions}
                showCancelOption={selectedTab === SelectedView.UPCOMING}
              />
            </div>
          </div>
        ))
      ) : (
        <div className="py-12 text-center">
          <div className="mb-3">
            {"You've got nothing booked for the selected view."}
          </div>
          <a href="/services" className="text-sm text-turquoise-200 underline">
            Check Out Our Services
          </a>
        </div>
      )}
    </MyAccountSection>
  );
}
