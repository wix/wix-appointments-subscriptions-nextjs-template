'use client';
import { ServiceInfoViewModel } from '@app/model/service/service.mapper';
import { WixBookingsClientProvider } from '@app/components/Provider/WixBookingsClientProvider';
import { useEffect, useMemo, useState } from 'react';
import { useAvailability } from '@app/hooks/useAvailability';
import {
  addMonths,
  endOfDay,
  startOfDay,
  startOfMonth,
  isSameDay,
  format,
  formatISO,
} from 'date-fns';
import { Suspense } from 'react';
import { DayPicker } from 'react-day-picker';
import {
  useFormattedTimezone,
  useUserTimezone,
} from '@app/hooks/useFormattedTimezone';
import { Spinner } from 'flowbite-react';
import CalendarSlots, {
  SlotViewModel,
} from '@app/components/Calendar/CalendarSections/CalendarSlots';
import CalendarSidebar from '@app/components/Calendar/CalendarSections/CalendarSidebar';
import { availabilityCalendar } from '@wix/bookings';
import testIds from '@app/utils/test-ids';

type CalendarDateRange = { from: string; to: string };

const getCalendarMonthRangeForDate = (date: Date): CalendarDateRange => {
  return {
    from: formatISO(startOfMonth(date)),
    to: formatISO(startOfMonth(addMonths(date, 3))),
  };
};

const formatSlot = (slotAvailability: availabilityCalendar.SlotAvailability) =>
  format(new Date(slotAvailability.slot!.startDate!), TIME_FORMAT);

const TIME_FORMAT = 'hh:mm a';

export function CalendarView({ service }: { service: ServiceInfoViewModel }) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const [selectedTime, setSelectedTime] = useState<string>('');
  const [dateRange, setDateRange] = useState<CalendarDateRange>(
    getCalendarMonthRangeForDate(selectedDate!)
  );
  const { data: rangeData, isLoading: isRangeDataLoading } = useAvailability({
    serviceId: service.id!,
    ...dateRange,
    slotsPerDay: 1,
    limit: 42, // 6 weeks
  });
  const { data: dayData, isLoading: isDayDataLoading } = useAvailability({
    serviceId: service.id!,
    from: formatISO(startOfDay(selectedDate)),
    to: formatISO(endOfDay(selectedDate)),
  });
  const timezone = useUserTimezone();
  const timezoneStr = useFormattedTimezone(timezone);
  useEffect(() => {
    // re-fetching existing range is cached
    setDateRange(getCalendarMonthRangeForDate(selectedDate!));
    setSelectedTime('');
  }, [selectedDate]);

  const slotsMap: { [key: string]: SlotViewModel[] } = useMemo(() => {
    return (
      dayData?.availabilityEntries
        ?.sort(
          (dayDataA, dayDataB) =>
            new Date(dayDataA.slot?.startDate ?? 0).getTime() -
            new Date(dayDataB.slot?.startDate ?? 0).getTime()
        )
        .map((slotData) => ({
          formattedTime: format(
            new Date(slotData.slot!.startDate!),
            TIME_FORMAT
          ),
          slotAvailability: slotData,
        }))
        .reduce<{ [key: string]: SlotViewModel[] }>((acc, curr) => {
          const slotsArr = acc[curr.formattedTime] ?? [];
          // prefer bookable slots
          slotsArr[curr.slotAvailability.bookable ? 'unshift' : 'push'](curr);
          acc[curr.formattedTime] = slotsArr;
          return acc;
        }, {}) ?? {}
    );
  }, [dayData]);
  const showLoader = useMemo(
    () =>
      isDayDataLoading ||
      (!dayData?.availabilityEntries?.length && isRangeDataLoading),
    [isDayDataLoading, isRangeDataLoading, dayData]
  );
  const nextAvailableDate = useMemo(
    () =>
      rangeData?.availabilityEntries
        ?.filter(({ bookable }) => bookable)
        .map(({ slot }) => new Date(slot!.startDate!))
        .find((dateWithSlots) => dateWithSlots > selectedDate),
    [selectedDate, rangeData]
  );

  return (
    <div className="flex flex-wrap">
      <div className="m-6 max-w-full flex-grow">
        <div className="border-b pb-2 flex flex-wrap gap-4 items-baseline justify-between">
          <h2 className="text-lg">Select a Date and Time</h2>
          <span className="text-gray-500 text-xs">Timezone: {timezoneStr}</span>
        </div>
        <div className="flex flex-wrap gap-x-6">
          <section className="mt-2">
            <DayPicker
              modifiers={{
                daysWithSlots: (date: Date | number) =>
                  !!rangeData?.availabilityEntries?.some(({ slot }) =>
                    isSameDay(date, new Date(slot!.startDate!))
                  ),
              }}
              modifiersClassNames={{
                daysWithSlots:
                  'relative inline-block before:block before:absolute ' +
                  'before:-skew-y-3 before:bg-gray-700 before:dot-md-center ' +
                  testIds.CALENDAR.DAY_WITH_SLOT_CLASSNAME,
              }}
              mode="single"
              selected={selectedDate}
              onSelect={(date?: Date) => date && setSelectedDate(date)}
              onMonthChange={setSelectedDate}
              showOutsideDays
              fixedWeeks
              month={startOfMonth(selectedDate)}
            />
          </section>
          <section className="flex-1 w-60 min-w-fit max-w-full">
            <div className="mt-4">{format(selectedDate, 'EEEE, d MMMM')}</div>
            {showLoader ? (
              <div className="w-full h-36 flex items-center justify-center">
                <Spinner color="gray" />
              </div>
            ) : dayData?.availabilityEntries?.length ? (
              <div className="grid grid-cols-auto-sm gap-2 pt-4">
                <CalendarSlots
                  slots={Object.keys(slotsMap)
                    // use the first slot since non-bookable ones are at the end
                    .map((slotTime) => slotsMap[slotTime][0])}
                  selectedTime={selectedTime}
                  onTimeSelected={setSelectedTime}
                />
              </div>
            ) : !!nextAvailableDate ? (
              <div className="pt-4">
                <button
                  data-testid={testIds.CALENDAR.NEXT_AVAILABLE_SLOT_CTA}
                  className="btn-main w-full"
                  onClick={() => setSelectedDate(nextAvailableDate)}
                >
                  Check Next Availability
                </button>
              </div>
            ) : (
              <div className="pt-4">No availability</div>
            )}
          </section>
        </div>
      </div>
      <section className="m-6 w-56 flex-grow">
        <CalendarSidebar
          service={service}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          timezone={timezone}
          slotsForTime={slotsMap[selectedTime] ?? []}
        />
      </section>
    </div>
  );
}

export default function Calendar({
  service,
}: {
  service: ServiceInfoViewModel;
}) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-36 flex items-center justify-center">
          <Spinner color="gray" />
        </div>
      }
    >
      <WixBookingsClientProvider>
        <CalendarView service={service} />
      </WixBookingsClientProvider>
    </Suspense>
  );
}
