import { format as formatDateStr } from 'date-fns';
import { enGB as en, fi, sv } from 'date-fns/locale';

import { Language } from '../types';
import { DATE_FORMAT } from './time/format';

const locales = { en, fi, sv };

/**
 * Format date string
 * @param date
 * @param format
 * @returns {string}
 */
export default function formatDate(
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
