import { SUPPORT_LANGUAGES } from '../../constants';
import { EventQuery } from '../../generated/graphql';
import { Language } from '../../types';
import { EVENT_PLACEHOLDER_IMAGES } from './constants';
/**
 * Get event placeholder image url
 * @param {string} id
 * @return {string}
 */
export const getEventPlaceholderImage = (id: string): string => {
  const numbers = id.match(/\d+/g);
  const sum = numbers
    ? numbers.reduce((prev: number, cur: string) => prev + Number(cur), 0)
    : 0;
  const index = sum % 4;

  return EVENT_PLACEHOLDER_IMAGES[index];
};

/**
 * Get first availanle language of an event
 * @param {object} eventData
 * @return {string}
 */
export const getFirstAvailableLanguage = (eventData: EventQuery): Language => {
  if (eventData.event?.name.en) return SUPPORT_LANGUAGES.EN;
  if (eventData.event?.name.fi) return SUPPORT_LANGUAGES.FI;
  if (eventData.event?.name.sv) return SUPPORT_LANGUAGES.SV;

  return SUPPORT_LANGUAGES.FI;
};
