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

export const getExistingVenuePayload = ({
  formValues: { locationDescription, hasClothingStorage, hasSnackEatingPlace },
  language,
  locationId,
  venueData,
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
  formValues,
  language,
  locationId,
}: {
  formValues: VenueDataFields;
  language: Language;
  locationId: string;
}) => {
  try {
    const { data: venueData } = await apolloClient.query<VenueQuery>({
      query: VenueDocument,
      variables: { id: locationId },
    });

    const venueDescription = getVenueDescription(venueData, language);
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

    const variables = getExistingVenuePayload({
      formValues,
      language,
      locationId,
      venueData,
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
    console.error(e);
  }
};
