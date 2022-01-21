import isBefore from 'date-fns/isBefore';
import isValidDate from 'date-fns/isValid';
import parseDate from 'date-fns/parse';

import { DATE_FORMAT, DATETIME_FORMAT, TIME_FORMAT } from './format';

export const parseTimeString = (time: string) => {
  return parseDate(time, TIME_FORMAT, new Date());
};

export const parseDateString = (time: string) => {
  return parseDate(time, DATE_FORMAT, new Date());
};

export const parseDateTimeString = (time: string) => {
  return parseDate(time, DATETIME_FORMAT, new Date());
};

export const isValidTimeString = (time: string) => {
  return isValidDate(parseTimeString(time));
};

export const isValidDateString = (time: string) => {
  return isValidDate(parseDateString(time));
};

export const isValidDateTimeString = (time: string) => {
  return isValidDate(parseDateTimeString(time));
};

export const isTimeStringBefore = (a: string, b: string) => {
  const timeA = parseTimeString(a);
  const timeB = parseTimeString(b);
  return isBefore(timeA, timeB);
};
