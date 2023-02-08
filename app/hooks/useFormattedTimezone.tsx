import { formatTimezone } from '@app/utils/timezone-formatter';

export const useFormattedTimezone = (
  timezone: string = Intl.DateTimeFormat().resolvedOptions().timeZone
) => formatTimezone({ date: new Date(), timezone, locale: 'en' });

export const useUserTimezone = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone;
