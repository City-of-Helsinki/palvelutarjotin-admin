import { isBefore, isValid, parse } from 'date-fns';

import { DATE_FORMAT, DATETIME_FORMAT, TIME_FORMAT } from '../../constants';

export const parseTimeString = (time: string) =>
  parse(time, TIME_FORMAT, new Date());

export const parseDateString = (time: string) =>
  parse(time, DATE_FORMAT, new Date());

export const parseDateTimeString = (time: string) =>
  parse(time, DATETIME_FORMAT, new Date());

export const isValidTimeString = (time: string) =>
  !time ? true : isValid(parseTimeString(time));

export const isValidDateString = (time: string) =>
  !time ? true : isValid(parseDateString(time));

export const isValidDateTimeString = (time: string) =>
  !time ? true : isValid(parseDateTimeString(time));

export const isTimeStringBefore = (a: string, b: string) => {
  const timeA = parseTimeString(a);
  const timeB = parseTimeString(b);
  return isBefore(timeA, timeB);
};
