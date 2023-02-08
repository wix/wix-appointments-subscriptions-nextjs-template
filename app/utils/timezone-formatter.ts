export function formatTimezone({
  date,
  timezone,
  locale,
  // eslint-disable-next-line no-template-curly-in-string
  template = '${timezoneName} (${offset})',
}: {
  date: Date;
  timezone: string;
  locale: string;
  template?: string;
}): string {
  const offset =
    Intl.DateTimeFormat(locale, {
      year: 'numeric',
      timeZoneName: 'short',
      timeZone: timezone,
    })
      .formatToParts(date)
      .find((part) => part.type === 'timeZoneName')?.value ?? '';
  const timezoneName =
    Intl.DateTimeFormat(locale, {
      year: 'numeric',
      timeZoneName: 'long',
      timeZone: timezone,
    })
      .formatToParts(date)
      .find((part) => part.type === 'timeZoneName')?.value ?? '';
  return Function(
    'timezoneName',
    'offset',
    `return \`${template}\`;`
  )(timezoneName, offset);
}
