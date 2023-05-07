'use client';
import { extendedBookings } from '@wix/bookings';
import { Tooltip } from 'flowbite-react';
import { MouseEventHandler, PropsWithChildren, useState } from 'react';
import { useClientAuthSession } from '@app/hooks/useClientAuthSession';
import { cancelBooking } from '@app/model/bookings/bookings-api';
import { WixBookingsClientProvider } from '@app/components/Provider/WixBookingsClientProvider';

export type BookingActionsProps = {
  booking: Pick<extendedBookings.Booking, '_id' | 'revision' | 'status'>;
  serviceId?: string;
  allowedActions?: extendedBookings.AllowedActions;
  showCancelOption: boolean;
};

function BookingActionsView({
  booking,
  serviceId,
  allowedActions,
  showCancelOption,
}: BookingActionsProps) {
  const [error, setError] = useState<string | null>(null);
  const wixSession = useClientAuthSession();
  const onCancel = () =>
    cancelBooking(wixSession, booking)
      .then(() => {
        window.location.reload();
      })
      .catch((e) => {
        console.error(e);
        setError('Failed to cancel booking');
      });
  const onBookAgain = () => {
    if (serviceId) {
      window.location.href = '/service/by-id/' + serviceId;
    }
  };
  return error ? (
    <span className="text-red-600">{error}</span>
  ) : (
    <div className="text-turquoise-200 flex gap-2 underline text-sm">
      {showCancelOption &&
      booking.status !== extendedBookings.BookingStatus.CANCELED ? (
        <ActionWithDisableTooltip
          action={!!allowedActions?.cancel}
          tooltipMsg="This Booking cannot be cancelled online anymore, please contact business"
          onAction={onCancel}
        >
          Cancel
        </ActionWithDisableTooltip>
      ) : null}
      <ActionWithDisableTooltip
        action={!!serviceId}
        tooltipMsg="This service is not bookable anymore"
        onAction={onBookAgain}
      >
        More Details
      </ActionWithDisableTooltip>
    </div>
  );
}

const ActionWithDisableTooltip = ({
  children,
  action,
  tooltipMsg,
  onAction,
}: {
  action: boolean;
  tooltipMsg: string;
  onAction: MouseEventHandler;
} & PropsWithChildren) =>
  action ? (
    <button onClick={onAction}>{children}</button>
  ) : (
    <Tooltip style="dark" content={tooltipMsg}>
      <span className="opacity-20">{children}</span>
    </Tooltip>
  );

export default function BookingActions(props: BookingActionsProps) {
  return (
    <WixBookingsClientProvider>
      <BookingActionsView {...props} />
    </WixBookingsClientProvider>
  );
}
