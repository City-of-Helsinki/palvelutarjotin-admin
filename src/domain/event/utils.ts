import { isFuture } from 'date-fns';
import isFutureDate from 'date-fns/isFuture';
import isPastDate from 'date-fns/isPast';
import isToday from 'date-fns/isToday';
import omit from 'lodash/omit';

import { LINKEDEVENTS_CONTENT_TYPE, SUPPORT_LANGUAGES } from '../../constants';
import {
  CreateVenueDocument,
  CreateVenueMutation,
  EditVenueDocument,
  EditVenueMutation,
  EventFieldsFragment,
  EventQuery,
  Language as TranslationLanguage,
  OccurrenceFieldsFragment,
  PublishEventMutationInput,
  VenueDocument,
  VenueQuery,
} from '../../generated/graphql';
import { Language } from '../../types';
import getLinkedEventsInternalId from '../../utils/getLinkedEventsInternalId';
import getLocalisedString from '../../utils/getLocalizedString';
import apolloClient from '../app/apollo/apolloClient';
import { getVenueDescription } from '../venue/utils';
import { EVENT_PLACEHOLDER_IMAGES } from './constants';
import { EventFormFields } from './types';

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
export const getEventPayload = ({
  values,
  organisationId,
  selectedLanguage,
}: {
  values: EventFormFields;
  organisationId: string;
  selectedLanguage: Language;
}) => {
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
      contactEmail: values.contactEmail,
      contactPersonId: values.contactPersonId,
      contactPhoneNumber: values.contactPhoneNumber,
      duration: Number(values.duration),
      enrolmentEndDays: Number(values.enrolmentEndDays),
      enrolmentStart: values.enrolmentStart,
      neededOccurrences: Number(values.neededOccurrences),
    },
    organisationId,
  };
};

export const getExistingVenuePayload = ({
  venueData,
  selectedLanguage,
  formValues: {
    locationDescription,
    location: locationId,
    hasClothingStorage,
    hasSnackEatingPlace,
  },
}: {
  venueData: VenueQuery;
  selectedLanguage: Language;
  formValues: EventFormFields;
}) => {
  return {
    venue: {
      id: locationId,
      hasClothingStorage,
      hasSnackEatingPlace,
      translations: [
        ...(venueData?.venue?.translations
          .map((t) => omit(t, ['__typename']))
          .filter((t) => t.languageCode !== selectedLanguage.toUpperCase()) ||
          []),
        {
          languageCode: selectedLanguage.toUpperCase() as TranslationLanguage,
          description: locationDescription,
        },
      ],
    },
  };
};

export const getNewVenuePayload = ({
  formValues: {
    location: locationId,
    hasSnackEatingPlace,
    hasClothingStorage,
    locationDescription,
  },
  selectedLanguage,
}: {
  formValues: EventFormFields;
  selectedLanguage: Language;
}) => {
  return {
    venue: {
      id: locationId,
      hasClothingStorage,
      hasSnackEatingPlace,
      translations: [
        {
          languageCode: selectedLanguage.toUpperCase() as TranslationLanguage,
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

export const createOrUpdateVenue = ({
  formValues,
  selectedLanguage,
}: {
  formValues: EventFormFields;
  selectedLanguage: Language;
}) => {
  // get venueData from cache. It is fetched in the form when event location changes
  const venueData = apolloClient.readQuery<VenueQuery>({
    query: VenueDocument,
    variables: { id: formValues.location },
  });

  const venueDescription = getVenueDescription(venueData, selectedLanguage);
  const hasClothingStorage = venueData?.venue?.hasClothingStorage;
  const hasSnackEatingPlace = venueData?.venue?.hasSnackEatingPlace;

  const venueShouldBeUpdated = Boolean(
    venueData?.venue &&
      (formValues.locationDescription !== venueDescription ||
        formValues.hasClothingStorage !== hasClothingStorage ||
        formValues.hasSnackEatingPlace !== hasSnackEatingPlace)
  );
  const newVenueShouldBeCreated = Boolean(
    !venueData?.venue && formValues.locationDescription
  );

  if (venueShouldBeUpdated) {
    return apolloClient.mutate<EditVenueMutation>({
      variables: getExistingVenuePayload({
        formValues: formValues,
        selectedLanguage,
        venueData: venueData as VenueQuery,
      }),
      mutation: EditVenueDocument,
    });
  } else if (newVenueShouldBeCreated) {
    return apolloClient.mutate<CreateVenueMutation>({
      variables: getExistingVenuePayload({
        formValues: formValues,
        selectedLanguage,
        venueData: venueData as VenueQuery,
      }),
      mutation: CreateVenueDocument,
    });
  }
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
  !isPastEvent(eventData);

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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getEventFields = (
  event: EventFieldsFragment | undefined | null,
  locale: Language
) =>
  event
    ? {
        id: event.id,
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
    offers: [
      {
        isFree: true,
      },
    ],
    name: event.name,
    description: event.description,
    pEvent: {
      duration: event.pEvent.duration,
      neededOccurrences: event.pEvent.neededOccurrences,
    },
    shortDescription: event.shortDescription,
    organisationId,
  };
};
