import { format as formatDateStr } from 'date-fns';
import { enGB as en, fi, sv } from 'date-fns/locale';
import get from 'lodash/get';

const locales = { en, fi, sv };

/**
 * Format date string
 * @param date
 * @param format
 * @returns {string}
 */
export default function formatDate(
  date: Date | null,
  format = 'dd.MM.yyyy',
  locale = 'fi'
): string {
  if (!date) {
    return '';
  }

  return formatDateStr(date, format, {
    locale: get(locales, locale),
  });
}
