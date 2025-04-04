import { format as formatDate } from 'date-fns';

import type { Language } from '../../types';
import { en, fi, sv } from '../date-fns/locale';

const locales = { en, fi, sv };

// Check recommended formats: https://hds.hel.fi/guidelines/data-formats

export const DATE_FORMAT = 'd.M.yyyy';
export const TIME_FORMAT = 'HH:mm';
export const DATETIME_FORMAT = `${DATE_FORMAT} ${TIME_FORMAT}`;

export function formatIntoTime(date: Date): string {
  return formatDate(date, TIME_FORMAT);
}

export function formatIntoDateTime(date: Date): string {
  return formatDate(date, DATETIME_FORMAT);
}

export function formatIntoDate(date: Date): string {
  return formatDate(date, DATE_FORMAT);
}

export function formatDateRange(start: Date, end: Date) {
  return `${formatIntoDate(start)} – ${formatIntoDate(end)}`;
}

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
  });
}
