import { isFuture, isToday } from 'date-fns';

export const isTodayOrLater = (date: Date) => {
  return isToday(date) || isFuture(date);
};

export const isInFuture = (date: Date) => {
  return isFuture(date);
};

export const isValidTime = (time: string) =>
  /^(([01][0-9])|(2[0-3]))(:|\.)[0-5][0-9]$/.test(time);
