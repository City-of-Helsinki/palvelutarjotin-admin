import omit from 'lodash/omit';

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
} from '../../generated/graphql';
import { Language } from '../../types';
import { getLocalisedObject } from '../../utils/translateUtils';
import apolloClient from '../app/apollo/apolloClient';
import { VenueDataFields } from './types';

const VENUE_AMENITIES = [
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
): LocalisedObject =>
  getLocalisedObject(
    venue?.translations.reduce<LocalisedObject>(
      (result, { languageCode, description }) => ({
        ...result,
        ...(languageCode && { [languageCode.toLowerCase()]: description }),
      }),
      {}
    )
  );

export const getVenuePayload = ({
  locationId,
  venueData,
  language,
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
  language: Language;
  locationId: string;
  venueData: VenueQuery;
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

export const createOrUpdateVenue = async ({
  venueFormData,
  language,
  locationId,
}: {
  venueFormData: VenueDataFields;
  language: Language;
  locationId: string;
}) => {
  try {
    const { data: existingVenueData } = await apolloClient.query<VenueQuery>({
      query: VenueDocument,
      variables: { id: locationId },
    });

    const venueDescription = getVenueDescription(existingVenueData?.venue);
    const venueShouldBeUpdated = Boolean(
      existingVenueData?.venue &&
        (venueFormData.locationDescription?.[language] !== venueDescription ||
          hasAmenitiesChanged(existingVenueData?.venue || {}, venueFormData))
    );

    const newVenueShouldBeCreated = Boolean(
      (!existingVenueData?.venue && venueFormData.locationDescription) ||
        hasAmenitiesChanged(existingVenueData?.venue || {}, venueFormData)
    );

    const variables = getVenuePayload({
      formValues: venueFormData,
      language,
      locationId,
      venueData: existingVenueData,
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
