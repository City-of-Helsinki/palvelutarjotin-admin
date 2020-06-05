import { isFuture } from 'date-fns';
import isFutureDate from 'date-fns/isFuture';
import isPastDate from 'date-fns/isPast';
import forEach from 'lodash/forEach';
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
  VenueDocument,
  VenueQuery,
} from '../../generated/graphql';
import { Language } from '../../types';
import getLinkedEventsInternalId from '../../utils/getLinkedEventsInternalId';
import apolloClient from '../app/apollo/apolloClient';
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
      duration: Number(values.duration),
      neededOccurrences: Number(values.neededOccurrences),
    },
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

export const getVenueDescription = (
  venueData: VenueQuery | null,
  selectedLanguage: Language
): string =>
  venueData?.venue?.translations.find(
    (t) => t.languageCode === selectedLanguage.toUpperCase()
  )?.description || '';

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
  // get venueData from cache. It is fetched in the form when evnet location changes
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
    ? isPastDate(new Date(eventData?.event?.startTime))
    : false;

export const isFutureEvent = (eventData: EventQuery | undefined) =>
  eventData?.event?.startTime
    ? isFutureDate(new Date(eventData?.event?.startTime))
    : false;

export const isEditableEvent = (eventData: EventQuery | undefined) =>
  isFutureEvent(eventData);

export const hasOccurrences = (event: EventFieldsFragment): boolean => {
  return Boolean(event.pEvent?.occurrences.edges.length);
};

export const hasComingOccurrences = (event: EventFieldsFragment): boolean => {
  let hasComingItems = false;

  forEach(event.pEvent?.occurrences.edges, (edge) => {
    if (edge?.node?.startTime && isFuture(new Date(edge?.node?.startTime))) {
      hasComingItems = true;
      return false;
    }
  });

  return hasComingItems;
};
