export function formatInTimeZone(date: Date, _tz: string, _fmt: string) {
  return date.toISOString();
}
export function zonedTimeToUtc(dateStr: string, _tz: string) {
  return new Date(dateStr);
}
