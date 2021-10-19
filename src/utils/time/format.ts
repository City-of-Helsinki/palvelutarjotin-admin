import { format } from 'date-fns';

// Check recommended formats: https://hds.hel.fi/guidelines/data-formats

export const DATE_FORMAT = 'd.M.yyyy';
export const TIME_FORMAT = 'HH:mm';
export const DATETIME_FORMAT = `${DATE_FORMAT} ${TIME_FORMAT}`;

export function formatIntoTime(date: Date): string {
  return format(date, TIME_FORMAT);
}

export function formatIntoDateTime(date: Date): string {
  return format(date, DATETIME_FORMAT);
}

export function formatIntoDate(date: Date): string {
  return format(date, DATE_FORMAT);
}
