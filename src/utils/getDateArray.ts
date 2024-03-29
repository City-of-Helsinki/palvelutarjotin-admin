import { DateArray } from 'ics';

import { formatLocalizedDate } from './time/format';

/**
 * Return date as a array of numbers. Used to convert date to a format that createEvent (ics) supports
 */
const getDateArray = (date: string): DateArray => {
  const dateArray = formatLocalizedDate(new Date(date), 'yyyy-M-d-H-m')
    .split('-')
    .map((e) => Number(e));
  return [dateArray[0], dateArray[1], dateArray[2], dateArray[3], dateArray[4]];
};

export default getDateArray;
