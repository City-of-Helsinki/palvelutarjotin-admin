import { tz } from '@date-fns/tz';
import { format as formatDateStr } from 'date-fns';

import {
  DATE_FORMAT,
  DATETIME_FORMAT,
  TIME_FORMAT,
  TIMEZONE,
} from '../../constants';
import { Language } from '../../types';
import { locales } from '../dateUtils';

/**
 * Formats a Date object into a time string in the specified timezone.
 */
export function formatIntoTime(date: Date): string {
  return formatDateStr(date, TIME_FORMAT, {
    in: tz(TIMEZONE),
  });
}

/**
 * Formats a Date object into a datetime string in the specified timezone.
 */
export function formatIntoDateTime(date: Date): string {
  return formatDateStr(date, DATETIME_FORMAT, {
    in: tz(TIMEZONE),
  });
}

/**
 * Formats a Date object into a date string in the specified timezone.
 */
export function formatIntoDate(date: Date): string {
  return formatDateStr(date, DATE_FORMAT, {
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
  return formatDateStr(date, format, {
    locale: locales[locale],
    in: tz(TIMEZONE),
  });
}
