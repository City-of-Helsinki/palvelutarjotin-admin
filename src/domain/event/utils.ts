import { isFuture } from 'date-fns';
import isFutureDate from 'date-fns/isFuture';
import isPastDate from 'date-fns/isPast';
import isToday from 'date-fns/isToday';
import isTomorrow from 'date-fns/isTomorrow';
import { TFunction } from 'i18next';
import omit from 'lodash/omit';

import { LINKEDEVENTS_CONTENT_TYPE, SUPPORT_LANGUAGES } from '../../constants';
import {
  EventFieldsFragment,
  EventQuery,
  Keyword,
  Language as TranslationLanguage,
  OccurrenceFieldsFragment,
  PublishEventMutationInput,
  VenueQuery,
} from '../../generated/graphql';
import { Language } from '../../types';
import formatDate from '../../utils/formatDate';
import getLinkedEventsInternalId from '../../utils/getLinkedEventsInternalId';
import getLocalisedString from '../../utils/getLocalizedString';
import getTimeFormat from '../../utils/getTimeFormat';
import { PUBLICATION_STATUS } from '../events/constants';
import { VenueDataFields } from '../venue/types';
import { EVENT_PLACEHOLDER_IMAGES } from './constants';
import { CreateEventFormFields, EventFormFields } from './types';

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

export const getEventStartTimeStr = (
  event: EventFieldsFragment,
  locale: Language,
  t: TFunction
): string | null => {
  const nextOccurrenceTime = event.pEvent.nextOccurrenceDatetime;
  const startTime = nextOccurrenceTime ? new Date(nextOccurrenceTime) : null;
  const timeFormat = getTimeFormat(locale);
  const dateFormat = 'iiii dd.MM';

  if (!startTime) return null;

  if (isToday(startTime))
    return t('events.eventCard.startTime.today', {
      time: formatDate(startTime, timeFormat, locale),
    });

  if (isTomorrow(startTime))
    return t('events.eventCard.startTime.tomorrow', {
      time: formatDate(startTime, timeFormat, locale),
    });

  return t('events.eventCard.startTime.other', {
    date: formatDate(startTime, dateFormat, locale),
    time: formatDate(startTime, timeFormat, locale),
  });
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
export const getEventPayload = ({
  values,
  organisationId,
  selectedLanguage,
}: {
  values: EventFormFields;
  organisationId: string;
  selectedLanguage: Language;
}) => {
  const { keywords, additionalCriteria, categories } = values;
  return {
    name: { [selectedLanguage]: values.name },
    // start_date and offers are mandatory on LinkedEvents to use dummy data
    startTime: new Date().toISOString(),
    offers: [
      {
        isFree: values.isFree,
        price: {
          [selectedLanguage]: values.price,
        },
      },
    ],
    shortDescription: {
      [selectedLanguage]: values.shortDescription,
    },
    description: { [selectedLanguage]: values.description },
    images: values.image
      ? [
          {
            internalId: getLinkedEventsInternalId(
              LINKEDEVENTS_CONTENT_TYPE.IMAGE,
              values.image
            ),
          },
        ]
      : [],
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
    // keywords, additionalCriteria and categories all belond to keywords in linked events
    keywords: [...keywords, ...additionalCriteria, ...categories].map(
      (keyword) => ({
        internalId: getLinkedEventsInternalId(
          LINKEDEVENTS_CONTENT_TYPE.KEYWORD,
          keyword
        ),
      })
    ),
    location: {
      internalId: getLinkedEventsInternalId(
        LINKEDEVENTS_CONTENT_TYPE.PLACE,
        values.location
      ),
    },
    pEvent: {
      contactEmail: values.contactEmail,
      contactPersonId: values.contactPersonId,
      contactPhoneNumber: values.contactPhoneNumber,
      enrolmentEndDays: Number(values.enrolmentEndDays),
      enrolmentStart: values.enrolmentStart,
      neededOccurrences: Number(values.neededOccurrences),
      autoAcceptance: values.autoAcceptance,
    },
    organisationId,
  };
};

export const getVenuePayload = ({
  venueData,
  language,
  locationId,
  formValues: {
    locationDescription,
    hasClothingStorage,
    hasSnackEatingPlace,
    outdoorActivity,
  },
}: {
  venueData: VenueQuery;
  language: Language;
  locationId: string;
  formValues: VenueDataFields;
}) => {
  return {
    venue: {
      id: locationId,
      hasClothingStorage,
      hasSnackEatingPlace,
      outdoorActivity,
      translations: [
        ...(venueData?.venue?.translations
          .map((t) => omit(t, ['__typename']))
          .filter((t) => t.languageCode !== language.toUpperCase()) || []),
        {
          languageCode: language.toUpperCase() as TranslationLanguage,
          description: locationDescription,
        },
      ],
    },
  };
};

export const getEventVenueDescription = (
  eventData: EventQuery | null,
  selectedLanguage: Language
): string =>
  eventData?.event?.venue?.translations.find(
    (t) => t.languageCode === selectedLanguage.toUpperCase()
  )?.description || '';

export const isPastEvent = (eventData: EventQuery | undefined) =>
  eventData?.event?.startTime
    ? isPastDate(new Date(eventData?.event?.startTime)) &&
      !isToday(new Date(eventData?.event?.startTime))
    : false;

export const isFutureEvent = (eventData: EventQuery | undefined) =>
  eventData?.event?.startTime
    ? isFutureDate(new Date(eventData?.event?.startTime))
    : false;

export const isEditableEvent = (eventData: EventQuery | undefined) =>
  eventData?.event?.publicationStatus === PUBLICATION_STATUS.DRAFT;

export const hasOccurrences = (event: EventFieldsFragment): boolean => {
  return Boolean(event.pEvent?.occurrences.edges.length);
};

export const hasComingOccurrences = (event: EventFieldsFragment): boolean => {
  return Boolean(
    event.pEvent?.occurrences.edges.some(
      (edge) =>
        edge?.node?.startTime && isFuture(new Date(edge?.node?.startTime))
    )
  );
};

export const getUpcomingOccurrences = (event?: EventFieldsFragment | null) => {
  if (event?.pEvent.occurrences) {
    return event.pEvent.occurrences.edges.filter((o) =>
      isFutureDate(new Date(o?.node?.startTime))
    );
  }

  return [];
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getEventFields = (
  event: EventFieldsFragment | undefined | null,
  locale: Language
) =>
  event
    ? {
        id: event.id,
        isEventFree: isEventFree(event),
        eventName: getLocalisedString(event.name, locale),
        shortDescription: getLocalisedString(event.shortDescription, locale),
        description: getLocalisedString(event.description, locale),
        infoUrl: getLocalisedString(event.infoUrl, locale),
        imageUrl:
          event.images?.[0]?.url || getEventPlaceholderImage(event.id || ''),
        imageAltText: event.images?.[0]?.altText,
        locationId: event.location?.id,
        photographerName: event.images?.[0]?.photographerName,
        organization: event.pEvent?.organisation?.name,
        contactPhoneNumber: event.pEvent?.contactPhoneNumber,
        contactEmail: event.pEvent?.contactEmail,
        contactPerson: event.pEvent?.contactPerson?.name,
        neededOccurrences: event.pEvent?.neededOccurrences,
        occurrences:
          event.pEvent?.occurrences.edges.map(
            (edge) => edge?.node as OccurrenceFieldsFragment
          ) || [],
        totalSeatsTakes: event.pEvent?.occurrences.edges.reduce(
          (acc, cur) => acc + (cur?.node?.seatsTaken || 0),
          0
        ),
        publicationStatus: event.publicationStatus,
      }
    : {};

export const getPublishEventPayload = ({
  event: e,
  organisationId,
}: {
  event: EventFieldsFragment;
  organisationId: string;
}): PublishEventMutationInput => {
  const omitTypename = (key: string, value: string) =>
    key === '__typename' ? undefined : value;
  // this could be typed correctly with deep omit
  // https://stackoverflow.com/questions/55539387/deep-omit-with-typescript
  const event: EventFieldsFragment = JSON.parse(
    JSON.stringify(e),
    omitTypename
  );

  return {
    id: event.id,
    location: {
      internalId: event.location.internalId,
    },
    keywords: event.keywords.map((k) => ({ internalId: k.internalId })),
    offers: event.offers,
    name: event.name,
    description: event.description,
    pEvent: {
      neededOccurrences: event.pEvent.neededOccurrences,
    },
    shortDescription: event.shortDescription,
    organisationId,
  };
};

export const firstOccurrencePrefilledValuesToQuery = (
  values: CreateEventFormFields
) => {
  const params = new URLSearchParams();
  if (values.occurrenceDate) {
    params.append('date', values.occurrenceDate.toISOString());
  }
  params.append('startsAt', values.occurrenceStartsAt);
  params.append('endsAt', values.occurrenceEndsAt);

  return params.toString();
};

/**
 * Check is event free
 * @param eventData
 * @return {boolean}
 */
export const isEventFree = (event: EventFieldsFragment): boolean =>
  Boolean(event.offers.find((item) => item.isFree)?.isFree);

export const getRealKeywords = (
  eventData: EventQuery
): Keyword[] | undefined => {
  const { additionalCriteria, categories } = eventData.event || {};
  return eventData?.event?.keywords.filter((keyword) => {
    const keywordIsIncludedInCategories = categories?.find(
      (category) => category.id === keyword.id
    );
    const keywordIsIncludedInAdditionalCriteria = additionalCriteria?.find(
      (additionalCriteria) => additionalCriteria.id === keyword.id
    );
    return !(
      keywordIsIncludedInCategories || keywordIsIncludedInAdditionalCriteria
    );
  });
};
