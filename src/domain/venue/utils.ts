import { ApolloClient } from '@apollo/client';

import { VenueDataFields } from './types';
import {
  CreateVenueDocument,
  CreateVenueMutation,
  EditVenueDocument,
  EditVenueMutation,
  Language as TranslationLanguage,
  LocalisedObject,
  VenueDocument,
  VenueNode,
  VenueQuery,
  VenueTranslationsInput,
  VenueTranslationType,
} from '../../generated/graphql';
import { Language } from '../../types';

export const VENUE_AMENITIES = [
  'hasClothingStorage',
  'hasSnackEatingPlace',
  'hasToiletNearby',
  'hasAreaForGroupWork',
  'hasIndoorPlayingArea',
  'hasOutdoorPlayingArea',
  'outdoorActivity',
] as const;

export const getVenueDescription = (
  venue: VenueNode | undefined | null
): LocalisedObject | undefined =>
  venue?.translations?.reduce<LocalisedObject>(
    (result, { languageCode, description }) => ({
      ...result,
      [languageCode.toLowerCase()]: description,
    }),
    {}
  );

export const getVenueDescriptions = (
  venueData: VenueQuery | undefined | null
): Pick<VenueTranslationType, 'languageCode' | 'description'>[] =>
  venueData?.venue?.translations.map((t) => ({
    description: t.description,
    languageCode: t.languageCode,
  })) ?? [];

export const getVenuePayload = ({
  locationId,
  formValues: {
    locationDescription,
    hasClothingStorage,
    hasSnackEatingPlace,
    outdoorActivity,
    hasToiletNearby,
    hasAreaForGroupWork,
    hasIndoorPlayingArea,
    hasOutdoorPlayingArea,
  },
}: {
  formValues: VenueDataFields;
  locationId: string;
}) => {
  return {
    venue: {
      id: locationId,
      hasClothingStorage,
      hasSnackEatingPlace,
      outdoorActivity,
      hasToiletNearby,
      hasAreaForGroupWork,
      hasIndoorPlayingArea,
      hasOutdoorPlayingArea,
      translations: Object.keys(locationDescription).reduce((acc, lang) => {
        return [
          ...acc,
          {
            languageCode: lang.toUpperCase() as TranslationLanguage,
            description: locationDescription[lang as Language],
          },
        ] as VenueTranslationsInput[];
      }, [] as VenueTranslationsInput[]),
    },
  };
};

export const hasAmenity = (venue: VenueNode | null | undefined) => {
  if (!venue) return false;
  return VENUE_AMENITIES.some((field) => venue[field]);
};

export const hasAmenitiesChanged = (
  a: Partial<VenueDataFields>,
  b: Partial<VenueDataFields>
) => {
  return VENUE_AMENITIES.some((field) => a[field] !== b[field]);
};

// TODO: FIX synonym problem with locationDescription and venueDescription (they are the same thing)
const hasDescriptionsChanged = (
  existingVenueDescriptions: Pick<
    VenueTranslationType,
    'languageCode' | 'description'
  >[],
  formDescriptions: LocalisedObject
): boolean => {
  return Object.entries(formDescriptions).some(([lang, formDescription]) => {
    return (
      existingVenueDescriptions.find(
        (description) =>
          description.languageCode.toLowerCase() === lang.toLowerCase()
      )?.description !== formDescription
    );
  });
};

export const createOrUpdateVenue = async ({
  venueFormData,
  locationId,
  apolloClient,
}: {
  venueFormData: VenueDataFields;
  locationId: string;
  apolloClient: ApolloClient<object>;
}) => {
  try {
    const { data: existingVenueData } = await apolloClient.query<VenueQuery>({
      query: VenueDocument,
      variables: { id: locationId },
    });

    const venueDescription = getVenueDescriptions(existingVenueData);

    const venueShouldBeUpdated = Boolean(
      existingVenueData?.venue &&
        (hasDescriptionsChanged(
          venueDescription,
          venueFormData.locationDescription
        ) ||
          hasAmenitiesChanged(existingVenueData?.venue || {}, venueFormData))
    );

    const newVenueShouldBeCreated = Boolean(
      (!existingVenueData?.venue && venueFormData.locationDescription) ||
        hasAmenitiesChanged(existingVenueData?.venue || {}, venueFormData)
    );

    const variables = getVenuePayload({
      formValues: venueFormData,
      locationId,
    });

    if (venueShouldBeUpdated) {
      return apolloClient.mutate<EditVenueMutation>({
        variables,
        mutation: EditVenueDocument,
      });
    } else if (newVenueShouldBeCreated) {
      return apolloClient.mutate<CreateVenueMutation>({
        variables,
        mutation: CreateVenueDocument,
      });
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
};
