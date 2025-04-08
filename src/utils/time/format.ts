import { tz } from '@date-fns/tz';
import { format as formatDate } from 'date-fns';

import type { Language } from '../../types';
import { en, fi, sv } from '../date-fns/locale';

const locales = { en, fi, sv };

// Check recommended formats: https://hds.hel.fi/guidelines/data-formats

export const DATE_FORMAT = 'd.M.yyyy';
export const TIME_FORMAT = 'HH:mm';
export const DATETIME_FORMAT = `${DATE_FORMAT} ${TIME_FORMAT}`;
export const TIMEZONE = 'Europe/Helsinki';

/**
 * Formats a Date object into a time string in the specified timezone.
 */
export function formatIntoTime(date: Date): string {
  return formatDate(date, TIME_FORMAT, {
    in: tz(TIMEZONE),
  });
}

/**
 * Formats a Date object into a datetime string in the specified timezone.
 */
export function formatIntoDateTime(date: Date): string {
  return formatDate(date, DATETIME_FORMAT, {
    in: tz(TIMEZONE),
  });
}

/**
 * Formats a Date object into a date string in the specified timezone.
 */
export function formatIntoDate(date: Date): string {
  return formatDate(date, DATE_FORMAT, {
    in: tz(TIMEZONE),
  });
}

/**
 * Formats a start and end Date object into a date range string in the specified timezone.
 */
export function formatDateRange(start: Date, end: Date): string {
  return `${formatIntoDate(start)} – ${formatIntoDate(end)}`;
}

/**
 * Formats a Date object into a localized date string based on the provided format and locale.
 * If the date is null, an empty string is returned.
 */
export function formatLocalizedDate(
  date: Date | null,
  format = DATE_FORMAT,
  locale: Language = 'fi'
): string {
  if (!date) {
    return '';
  }
  return formatDate(date, format, {
    locale: locales[locale],
    in: tz(TIMEZONE),
  });
}
