import {
  CreateVenueDocument,
  CreateVenueMutation,
  EditVenueDocument,
  EditVenueMutation,
  Language as TranslationLanguage,
  VenueDocument,
  VenueNode,
  VenueQuery,
  VenueTranslationsInput,
  VenueTranslationType,
} from '../../generated/graphql';
import { Language } from '../../types';
import apolloClient from '../app/apollo/apolloClient';
import { LocationDescriptions } from '../occurrence/types';
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
  venueData: VenueQuery | undefined | null,
  selectedLanguage: Language
): string =>
  venueData?.venue?.translations.find(
    (t) => t.languageCode === selectedLanguage.toUpperCase()
  )?.description || '';

export const getVenueDescriptions = (
  venueData: VenueQuery | undefined | null
): Pick<VenueTranslationType, 'languageCode' | 'description'>[] =>
  venueData?.venue?.translations.map((t) => ({
    description: t.description,
    languageCode: t.languageCode,
  })) ?? [];

export const getVenuePayload = ({
  locationId,
  venueData,
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

const hasDescriptionsChanged = (
  existingVenueDescriptions: Pick<
    VenueTranslationType,
    'languageCode' | 'description'
  >[],
  formDescriptions: LocationDescriptions
): boolean => {
  return existingVenueDescriptions.some(({ languageCode, description }) => {
    return (
      formDescriptions[languageCode.toLowerCase() as Language] !== description
    );
  });
};

export const createOrUpdateVenue = async ({
  venueFormData,
  locationId,
}: {
  venueFormData: VenueDataFields;
  locationId: string;
}) => {
  try {
    const { data: existingVenueData } = await apolloClient.query<VenueQuery>({
      query: VenueDocument,
      variables: { id: locationId },
    });

    const venueDescription = getVenueDescriptions(existingVenueData);

    // TODO: FIX synonym problem with locationDDescription and venueDescription (they are the same thing)
    hasDescriptionsChanged(
      getVenueDescriptions(existingVenueData),
      venueFormData.locationDescription
    );

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
