import { format, format as formatDateStr } from 'date-fns';
import { enGB as en, fi, sv } from 'date-fns/locale';

import { Language } from '../../types';

const locales = { en, fi, sv };

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

  return formatDateStr(date, format, {
    locale: locales[locale],
  });
}
