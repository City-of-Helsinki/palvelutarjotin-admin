import { isFuture, isToday } from 'date-fns';

export const isTodayOrLater = (date: Date) => {
  return isToday(date) || isFuture(date);
};
