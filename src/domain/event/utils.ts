import { isFuture } from 'date-fns';
import isFutureDate from 'date-fns/isFuture';
import isPastDate from 'date-fns/isPast';
import isToday from 'date-fns/isToday';
import isTomorrow from 'date-fns/isTomorrow';
import { TFunction } from 'i18next';

import { LINKEDEVENTS_CONTENT_TYPE, SUPPORT_LANGUAGES } from '../../constants';
import {
  EventFieldsFragment,
  EventQuery,
  Keyword,
  OccurrenceFieldsFragment,
  PublishEventMutationInput,
} from '../../generated/graphql';
import { Language } from '../../types';
import formatDate from '../../utils/formatDate';
import getLinkedEventsInternalId from '../../utils/getLinkedEventsInternalId';
import getLocalisedString from '../../utils/getLocalizedString';
import getTimeFormat from '../../utils/getTimeFormat';
import { getLocalisedObject } from '../../utils/translateUtils';
import { PUBLICATION_STATUS } from '../events/constants';
import { getVenueDescription } from '../venue/utils';
import {
  EVENT_PLACEHOLDER_IMAGES,
  VIRTUAL_EVENT_LOCATION_ID,
} from './constants';
import { createEventInitialValues } from './eventForm/EventForm';
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
  values,
  organisationId,
}: {
  values: EventFormFields;
  organisationId: string;
}) => {
  const { keywords, additionalCriteria, categories } = values;
  return {
    name: getLocalisedObject(values.name),
    // start_date and offers are mandatory on LinkedEvents to use dummy data
    startTime: new Date().toISOString(),
    offers: [
      {
        isFree: values.isFree,
        price: getLocalisedObject(values.price),
        description: getLocalisedObject(values.priceDescription),
      },
    ],
    shortDescription: getLocalisedObject(values.shortDescription),
    description: getLocalisedObject(values.description),
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
    infoUrl: getLocalisedObject(values.infoUrl),
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
        // If event is virtual, we use location id for internet events
        values.isVirtual ? VIRTUAL_EVENT_LOCATION_ID : values.location
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
      mandatoryAdditionalInformation: values.mandatoryAdditionalInformation,
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
        mandatoryAdditionalInformation:
          event.pEvent?.mandatoryAdditionalInformation,
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
 * @param event
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
    eventData.event?.additionalCriteria.map((item) => item.id || '') || [],
  categories: eventData.event?.categories.map((item) => item.id || '') || [],
  audience: eventData.event?.audience.map((item) => item.id || '') || [],
  contactEmail: eventData.event?.pEvent?.contactEmail || '',
  contactPersonId: eventData.event?.pEvent?.contactPerson?.id || '',
  contactPhoneNumber: eventData.event?.pEvent?.contactPhoneNumber || '',
  description: getLocalisedObject(eventData.event?.description),
  enrolmentEndDays: eventData.event?.pEvent?.enrolmentEndDays?.toString() || '',
  enrolmentStart: eventData.event?.pEvent?.enrolmentStart
    ? new Date(eventData.event?.pEvent?.enrolmentStart)
    : null,
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
    getRealKeywords(eventData)?.map((keyword) => keyword.id || '') || [],
  location: getLocationId(eventData.event?.location?.id),
  name: getLocalisedObject(eventData.event?.name),
  neededOccurrences:
    eventData.event?.pEvent?.neededOccurrences.toString() || '',
  price: getLocalisedObject(eventData.event?.offers?.[0]?.price),
  shortDescription: getLocalisedObject(eventData.event?.shortDescription),
  locationDescription: getLocalisedObject(
    getVenueDescription(eventData.event?.venue)
  ),
  hasClothingStorage: eventData?.event?.venue?.hasClothingStorage || false,
  hasSnackEatingPlace: eventData?.event?.venue?.hasSnackEatingPlace || false,
  outdoorActivity: eventData?.event?.venue?.outdoorActivity || false,
  hasToiletNearby: eventData?.event?.venue?.hasToiletNearby || false,
  hasAreaForGroupWork: eventData?.event?.venue?.hasAreaForGroupWork || false,
  hasIndoorPlayingArea: eventData?.event?.venue?.hasIndoorPlayingArea || false,
  hasOutdoorPlayingArea:
    eventData?.event?.venue?.hasOutdoorPlayingArea || false,
  autoAcceptance: eventData.event?.pEvent.autoAcceptance,
  mandatoryAdditionalInformation:
    eventData.event?.pEvent?.mandatoryAdditionalInformation || false,
  isVirtual: eventData.event?.location?.id === VIRTUAL_EVENT_LOCATION_ID,
});
