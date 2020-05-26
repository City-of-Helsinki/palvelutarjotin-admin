import { Language } from '../types';
import formatDate from './formatDate';
import getTimeFormat from './getTimeFormat';

/**
 * Format and localize time range
 */
export default (
  start: Date,
  end: Date | null | undefined,
  locale: Language
) => {
  const timeFormat = getTimeFormat(locale);

  if (!end) {
    return formatDate(start, timeFormat, locale);
  } else {
    return `${formatDate(start, timeFormat, locale)} – ${formatDate(
      end,
      timeFormat,
      locale
    )}`;
  }
};
