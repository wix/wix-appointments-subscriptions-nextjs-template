'use client';
import { PropsWithChildren } from 'react';
import { Tooltip } from 'flowbite-react';
import type { availabilityCalendar } from '@wix/bookings';
import testIds from '@app/utils/test-ids';

export type SlotViewModel = {
  formattedTime: string;
  slotAvailability: availabilityCalendar.SlotAvailability;
};

const SlotTooltip = ({
  bookable,
  bookingPolicyViolations,
  children,
}: PropsWithChildren<
  Pick<
    availabilityCalendar.SlotAvailability,
    'bookable' | 'bookingPolicyViolations'
  >
>) =>
  bookable ? (
    <div className="w-fit">{children}</div>
  ) : (
    <Tooltip
      content={
        bookingPolicyViolations?.tooLateToBook
          ? 'This slot cannot be booked anymore'
          : bookingPolicyViolations?.tooLateToBook
          ? 'It is too early to book this slot'
          : 'This slot cannot be booked'
      }
    >
      {children}
    </Tooltip>
  );

const CalendarSlots = ({
  slots,
  onTimeSelected,
  selectedTime,
}: {
  slots: SlotViewModel[];
  selectedTime: string;
  onTimeSelected: (selectedTime: string) => void;
}) => (
  <>
    {slots.map(
      (
        {
          formattedTime,
          slotAvailability: { bookable, bookingPolicyViolations },
        },
        index
      ) => (
        <button
          data-testid={testIds.CALENDAR.SLOT_CTA}
          key={index}
          className={`px-3 py-1.5 w-full border-2 flex justify-center ${
            bookable
              ? formattedTime === selectedTime
                ? 'border-gray-700 bg-gray-100'
                : 'hover:border-gray-700 border-gray-500'
              : 'text-gray-200'
          }`}
          disabled={!bookable}
          aria-label={'Select ' + formattedTime}
          onClick={() => onTimeSelected(formattedTime)}
        >
          <SlotTooltip
            bookable={bookable}
            bookingPolicyViolations={bookingPolicyViolations}
          >
            <span className="text-sm">{formattedTime}</span>
          </SlotTooltip>
        </button>
      )
    )}
  </>
);

export default CalendarSlots;
