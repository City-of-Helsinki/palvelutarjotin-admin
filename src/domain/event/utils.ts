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
  OccurrenceFieldsFragment,
  PublishEventMutationInput,
} from '../../generated/graphql';
import { Language } from '../../types';
import getLinkedEventsInternalId from '../../utils/getLinkedEventsInternalId';
import getLocalisedString from '../../utils/getLocalizedString';
import {
  formatDateRange,
  formatIntoTime,
  formatLocalizedDate,
} from '../../utils/time/format';
import { getLocalisedObject } from '../../utils/translateUtils';
import { PUBLICATION_STATUS } from '../events/constants';
import { getEnrolmentType, isMultidayOccurrence } from '../occurrence/utils';
import {
  EVENT_PLACEHOLDER_IMAGES,
  VIRTUAL_EVENT_LOCATION_ID,
} from './constants';
import { createEventInitialValues } from './eventForm/EventForm';
import { CreateEventFormFields } from './types';

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

export const getNextOccurrenceDateStr = (
  event: EventFieldsFragment,
  locale: Language,
  t: TFunction
): string | null => {
  const nextOccurrenceNode = event.pEvent.occurrences?.edges.find(
    (occurrence) => {
      const occurrenceStartTime = occurrence?.node?.startTime;
      return occurrenceStartTime && isFutureDate(new Date(occurrenceStartTime));
    }
  );
  const nextOccurrence = nextOccurrenceNode?.node;

  if (nextOccurrence?.startTime) {
    if (isMultidayOccurrence(nextOccurrence)) {
      return formatDateRange(
        new Date(nextOccurrence.startTime),
        new Date(nextOccurrence.endTime)
      );
    }

    return getStartTimeStr(new Date(nextOccurrence.startTime), locale, t);
  }

  return null;
};

export const getEventStartTimeStr = (
  event: EventFieldsFragment,
  locale: Language,
  t: TFunction
): string | null => {
  const nextOccurrenceTime = event.pEvent.nextOccurrenceDatetime;
  const startTime = nextOccurrenceTime ? new Date(nextOccurrenceTime) : null;

  if (!startTime) return null;

  return getStartTimeStr(startTime, locale, t);
};

const getStartTimeStr = (startTime: Date, locale: Language, t: TFunction) => {
  const dateFormat = 'iiii d.M';
  if (isToday(startTime))
    return t('events.eventCard.startTime.today', {
      time: formatIntoTime(startTime),
    });

  if (isTomorrow(startTime))
    return t('events.eventCard.startTime.tomorrow', {
      time: formatIntoTime(startTime),
    });

  return t('events.eventCard.startTime.other', {
    date: formatLocalizedDate(startTime, dateFormat, locale),
    time: formatIntoTime(startTime),
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
export const getFirstAvailableLanguage = (
  eventData?: EventQuery | null
): Language => {
  if (eventData?.event?.name.fi) return SUPPORT_LANGUAGES.FI;
  if (eventData?.event?.name.sv) return SUPPORT_LANGUAGES.SV;
  if (eventData?.event?.name.en) return SUPPORT_LANGUAGES.EN;

  return SUPPORT_LANGUAGES.FI;
};

/**
 * Get payload to create/edit event
 * @param {object} values
 * @return {object}
 */
export const getEventPayload = ({
  formValues,
  organisationId,
}: {
  formValues: CreateEventFormFields;
  organisationId: string;
}) => {
  const { keywords, additionalCriteria, categories } = formValues;
  return {
    name: getLocalisedObject(formValues.name),
    // start_date and offers are mandatory on LinkedEvents to use dummy data
    startTime: new Date().toISOString(),
    offers: [
      {
        isFree: formValues.isFree,
        price: {
          fi: formValues.price.toString(),
          en: formValues.price.toString(),
          sv: formValues.price.toString(),
        },
        description: getLocalisedObject(formValues.priceDescription),
      },
    ],
    shortDescription: getLocalisedObject(formValues.shortDescription),
    description: getLocalisedObject(formValues.description),
    images: formValues.image
      ? [
          {
            internalId: getLinkedEventsInternalId(
              LINKEDEVENTS_CONTENT_TYPE.IMAGE,
              formValues.image
            ),
          },
        ]
      : [],
    infoUrl: getLocalisedObject(formValues.infoUrl),
    audience: formValues.audience.map((keyword) => ({
      internalId: keyword,
    })),
    inLanguage: formValues.inLanguage.map((language) => ({
      internalId: getLinkedEventsInternalId(
        LINKEDEVENTS_CONTENT_TYPE.LANGUAGE,
        language
      ),
    })),
    // keywords, additionalCriteria and categories all belond to keywords in linked events
    keywords: [...keywords, ...additionalCriteria, ...categories].map(
      (keyword) => ({
        internalId: keyword,
      })
    ),
    pEvent: {
      contactEmail: formValues.contactEmail,
      contactPersonId: formValues.contactPersonId,
      contactPhoneNumber: formValues.contactPhoneNumber,
      neededOccurrences: 1,
      mandatoryAdditionalInformation: formValues.mandatoryAdditionalInformation,
      isQueueingAllowed: formValues.isQueueingAllowed,
      translations: [],
    },
    organisationId,
  };
};

export const getEditEventPayload = ({
  formValues,
  existingEventValues,
  organisationId,
}: {
  formValues: CreateEventFormFields;
  existingEventValues: EventFieldsFragment;
  organisationId: string;
}) => {
  const { keywords, additionalCriteria, categories } = formValues;
  return {
    name: getLocalisedObject(formValues.name),
    // start_date and offers are mandatory on LinkedEvents to use dummy data
    startTime: new Date().toISOString(),
    offers: [
      {
        isFree: formValues.isFree,
        price: {
          fi: formValues.price.toString(),
          en: formValues.price.toString(),
          sv: formValues.price.toString(),
        },
        description: getLocalisedObject(formValues.priceDescription),
      },
    ],
    shortDescription: getLocalisedObject(formValues.shortDescription),
    description: getLocalisedObject(formValues.description),
    images: formValues.image
      ? [
          {
            internalId: getLinkedEventsInternalId(
              LINKEDEVENTS_CONTENT_TYPE.IMAGE,
              formValues.image
            ),
          },
        ]
      : [],
    infoUrl: getLocalisedObject(formValues.infoUrl),
    audience: formValues.audience.map((keyword) => ({
      internalId: keyword,
    })),
    inLanguage: formValues.inLanguage.map((language) => ({
      internalId: getLinkedEventsInternalId(
        LINKEDEVENTS_CONTENT_TYPE.LANGUAGE,
        language
      ),
    })),
    // keywords, additionalCriteria and categories all belond to keywords in linked events
    keywords: [...keywords, ...additionalCriteria, ...categories].map(
      (keyword) => ({
        internalId: keyword,
      })
    ),
    // Add location to payload if it has been already added previously
    ...(existingEventValues.location
      ? {
          location: { internalId: existingEventValues.location.internalId },
        }
      : null),
    pEvent: {
      contactEmail: formValues.contactEmail,
      contactPersonId: formValues.contactPersonId,
      contactPhoneNumber: formValues.contactPhoneNumber,
      ...(existingEventValues.pEvent.enrolmentEndDays
        ? {
            enrolmentEndDays:
              Number(existingEventValues.pEvent.enrolmentEndDays) ?? 0,
          }
        : null),
      ...(existingEventValues.pEvent.enrolmentStart
        ? {
            enrolmentStart: existingEventValues.pEvent.enrolmentStart,
          }
        : null),
      neededOccurrences:
        Number(existingEventValues.pEvent.neededOccurrences) ?? 1,
      externalEnrolmentUrl: existingEventValues.pEvent.externalEnrolmentUrl,
      autoAcceptance: existingEventValues.pEvent.autoAcceptance ?? false,
      translations: existingEventValues.pEvent.translations?.map(
        (translation) => omit(translation, '__typename')
      ),
      mandatoryAdditionalInformation: formValues.mandatoryAdditionalInformation,
      isQueueingAllowed: formValues.isQueueingAllowed,
    },
    organisationId,
  };
};

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
  return Boolean(event.pEvent?.occurrences?.edges.length);
};

export const hasComingOccurrences = (event: EventFieldsFragment): boolean => {
  return Boolean(
    event.pEvent?.occurrences?.edges.some(
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
        enrolmentType: getEnrolmentType(event),
        imageUrl:
          event.images?.[0]?.url || getEventPlaceholderImage(event.id || ''),
        imageAltText: event.images?.[0]?.altText,
        locationId: event.location?.id,
        photographerName: event.images?.[0]?.photographerName,
        organization: event.pEvent?.organisation?.name,
        contactPhoneNumber: event.pEvent?.contactPhoneNumber,
        contactEmail: event.pEvent?.contactEmail,
        contactPerson: event.pEvent?.contactPerson?.name,
        organisationId: event?.pEvent?.organisation?.id,
        neededOccurrences: event.pEvent?.neededOccurrences,
        mandatoryAdditionalInformation:
          event.pEvent?.mandatoryAdditionalInformation,
        isQueueingAllowed: event.pEvent?.isQueueingAllowed,
        occurrences:
          event.pEvent?.occurrences?.edges.map(
            (edge) => edge?.node as OccurrenceFieldsFragment
          ) || [],
        totalSeatsTakes: event.pEvent?.occurrences?.edges.reduce(
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
      internalId: event.location?.internalId,
    },
    keywords: event.keywords.map((k) => ({ internalId: k.internalId })),
    offers: event.offers,
    name: event.name,
    description: event.description,
    pEvent: {
      neededOccurrences: event.pEvent.neededOccurrences,
      mandatoryAdditionalInformation:
        event.pEvent.mandatoryAdditionalInformation,
    },
    shortDescription: event.shortDescription,
    organisationId,
  };
};

/**
 * Check is event free
 * @param event
 * @return {boolean}
 */
export const isEventFree = (event: EventFieldsFragment): boolean =>
  Boolean(event.offers.find((item) => item.isFree)?.isFree);

/**
 * Is queueing to the given event allowed?
 * @param event
 * @return {boolean} True if queueing to the given event is allowed, otherwise false.
 */
export const isQueueingAllowed = (event: EventFieldsFragment): boolean =>
  event.pEvent.isQueueingAllowed;

export const getRealKeywords = (
  eventData: EventQuery
): Keyword[] | undefined => {
  const { additionalCriteria, categories } = eventData.event || {};
  return eventData?.event?.keywords.filter((keyword) => {
    const keywordIsIncludedInCategories = categories?.find(
      (category) => category.internalId === keyword.internalId
    );
    const keywordIsIncludedInAdditionalCriteria = additionalCriteria?.find(
      (additionalCriteria) =>
        additionalCriteria.internalId === keyword.internalId
    );
    return !(
      keywordIsIncludedInCategories || keywordIsIncludedInAdditionalCriteria
    );
  });
};

export const getLocationId = (
  locationId: string | undefined | null
): string => {
  // If location id is virtual event location, we are not going to show it as location.
  // Only virtual location checkbox should be checked.
  if (locationId !== VIRTUAL_EVENT_LOCATION_ID) {
    return locationId ?? '';
  }
  return '';
};

export const getEventFormValues = (
  eventData: EventQuery
): CreateEventFormFields => ({
  ...createEventInitialValues,
  additionalCriteria:
    eventData.event?.additionalCriteria.map((item) => item.internalId || '') ||
    [],
  categories:
    eventData.event?.categories.map((item) => item.internalId || '') || [],
  audience:
    eventData.event?.audience.map((item) => item.internalId || '') || [],
  contactEmail: eventData.event?.pEvent?.contactEmail || '',
  contactPersonId: eventData.event?.pEvent?.contactPerson?.id || '',
  contactPhoneNumber: eventData.event?.pEvent?.contactPhoneNumber || '',
  description: getLocalisedObject(eventData.event?.description),
  image: eventData.event?.images[0]?.id || '',
  imageAltText: eventData.event?.images[0]?.altText || '',
  imagePhotographerName: eventData.event?.images[0]?.photographerName || '',
  infoUrl: getLocalisedObject(eventData.event?.infoUrl),
  inLanguage: eventData.event?.inLanguage.map((item) => item.id || '') || [],
  isFree: !!eventData.event?.offers?.[0]?.isFree,
  priceDescription: getLocalisedObject(
    eventData.event?.offers?.[0]?.description
  ),
  keywords:
    getRealKeywords(eventData)?.map((keyword) => keyword.internalId || '') ||
    [],
  name: getLocalisedObject(eventData.event?.name),
  price: eventData.event?.offers?.[0]?.price?.fi ?? '',
  shortDescription: getLocalisedObject(eventData.event?.shortDescription),
  mandatoryAdditionalInformation:
    eventData.event?.pEvent?.mandatoryAdditionalInformation ??
    createEventInitialValues.mandatoryAdditionalInformation,
  isQueueingAllowed:
    eventData.event?.pEvent?.isQueueingAllowed ??
    createEventInitialValues.isQueueingAllowed,
});

export const omitUnselectedLanguagesFromValues = (
  values: CreateEventFormFields,
  unselectedLanguages: Language[]
) => {
  return JSON.parse(JSON.stringify(values), (key: string, value: any) => {
    if (unselectedLanguages.includes(key as Language)) {
      return '';
    }
    return value;
  });
};
