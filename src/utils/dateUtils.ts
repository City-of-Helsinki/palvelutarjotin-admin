import { format as formatDateStr, isFuture, isToday } from 'date-fns';
import { enGB as en, fi } from 'date-fns/locale';
import get from 'lodash/get';

import sv from './date-fns/locale/sv';

const locales = { en, fi, sv };

export const formatDate = (
  date: Date | null | number,
  format = 'dd.MM.yyyy',
  locale = 'fi'
): string => {
  if (!date) {
    return '';
  }

  return formatDateStr(date, format, {
    locale: get(locales, locale),
  }).trim();
};

export const isTodayOrLater = (date: Date) => {
  return isToday(date) || isFuture(date);
};

export const isInFuture = (date?: Date) => {
  return date ? isFuture(date) : false;
};

export const isValidTime = (time: string) =>
  /^(([01][0-9])|(2[0-3]))(:|\.)[0-5][0-9]$/.test(time);
