import { LINKEDEVENTS_CONTENT_TYPE, SUPPORT_LANGUAGES } from '../../constants';
import { EventQuery } from '../../generated/graphql';
import { Language } from '../../types';
import getLinkedEventsInternalId from '../../utils/getLinkedEventsInternalId';
import { EVENT_PLACEHOLDER_IMAGES } from './constants';
import { EventFormFields } from './eventForm/EventForm';
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
 * Get event language from url
 * @param {string} search
 * @return {string}
 */
export const getEventLanguageFromUrl = (search: string): Language | null => {
  const searchParams = new URLSearchParams(search);
  const language = searchParams.get('language');
  switch (language) {
    case SUPPORT_LANGUAGES.EN:
      return 'en';
    case SUPPORT_LANGUAGES.FI:
      return 'fi';
    case SUPPORT_LANGUAGES.SV:
      return 'sv';
    default:
      return null;
  }
};

/**
 * Get first availanle language of an event
 * @param {object} eventData
 * @return {string}
 */
export const getFirstAvailableLanguage = (eventData: EventQuery): Language => {
  if (eventData.event?.name.fi) return SUPPORT_LANGUAGES.FI;
  if (eventData.event?.name.sv) return SUPPORT_LANGUAGES.SV;
  if (eventData.event?.name.en) return SUPPORT_LANGUAGES.EN;

  return SUPPORT_LANGUAGES.FI;
};

/**
 * Get payload to create/edit event
 * @param {object} values
 * @return {object}
 */
export const getEventPayload = (
  values: EventFormFields,
  selectedLanguage: Language
) => {
  return {
    name: { [selectedLanguage]: values.name },
    // start_date and offers are mandatory on LinkedEvents to use dummy data
    startTime: new Date().toISOString(),
    offers: [
      {
        isFree: true,
      },
    ],
    shortDescription: {
      [selectedLanguage]: values.shortDescription,
    },
    description: { [selectedLanguage]: values.description },
    infoUrl: { [selectedLanguage]: values.infoUrl },
    audience: values.audience.map((keyword) => ({
      internalId: getLinkedEventsInternalId(
        LINKEDEVENTS_CONTENT_TYPE.KEYWORD,
        keyword
      ),
    })),
    inLanguage: values.inLanguage.map((language) => ({
      internalId: getLinkedEventsInternalId(
        LINKEDEVENTS_CONTENT_TYPE.LANGUAGE,
        language
      ),
    })),
    keywords: values.keywords.map((keyword) => ({
      internalId: getLinkedEventsInternalId(
        LINKEDEVENTS_CONTENT_TYPE.KEYWORD,
        keyword
      ),
    })),
    location: {
      internalId: getLinkedEventsInternalId(
        LINKEDEVENTS_CONTENT_TYPE.PLACE,
        values.location
      ),
    },
    pEvent: {
      duration: Number(values.duration),
      neededOccurrences: Number(values.neededOccurrences),
    },
  };
};
