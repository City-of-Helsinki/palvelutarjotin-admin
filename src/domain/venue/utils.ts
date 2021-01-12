import omit from 'lodash/omit';

import {
  CreateVenueDocument,
  CreateVenueMutation,
  EditVenueDocument,
  EditVenueMutation,
  Language as TranslationLanguage,
  VenueDocument,
  VenueQuery,
} from '../../generated/graphql';
import { Language } from '../../types';
import apolloClient from '../app/apollo/apolloClient';
import { VenueDataFields } from './types';

export const getVenueDescription = (
  venueData: VenueQuery | undefined | null,
  selectedLanguage: Language
): string =>
  venueData?.venue?.translations.find(
    (t) => t.languageCode === selectedLanguage.toUpperCase()
  )?.description || '';

export const getVenuePayload = ({
  locationId,
  venueData,
  language,
  formValues: {
    locationDescription,
    hasClothingStorage,
    hasSnackEatingPlace,
    outdoorActivity,
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

    const venueDescription = getVenueDescription(existingVenueData, language);
    const { hasClothingStorage, hasSnackEatingPlace, outdoorActivity } =
      existingVenueData?.venue || {};

    const venueShouldBeUpdated = Boolean(
      existingVenueData?.venue &&
        (venueFormData.locationDescription !== venueDescription ||
          venueFormData.hasClothingStorage !== hasClothingStorage ||
          venueFormData.hasSnackEatingPlace !== hasSnackEatingPlace ||
          venueFormData.outdoorActivity !== outdoorActivity)
    );
    const newVenueShouldBeCreated = Boolean(
      (!existingVenueData?.venue && venueFormData.locationDescription) ||
        venueFormData.hasClothingStorage !== hasClothingStorage ||
        venueFormData.hasSnackEatingPlace !== hasSnackEatingPlace ||
        venueFormData.outdoorActivity !== outdoorActivity
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
