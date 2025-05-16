import { type EditVenueMutation, Language } from '../../generated/graphql';

// EditVenue mutation response on event creation page 2 to page 3 transition
// i.e. when the user clicks "Go to publishing" button on page 2:
export const MOCK_EDIT_VENUE_MUTATION_RESPONSE: EditVenueMutation = {
  updateVenue: {
    venue: {
      id: 'tprek:7254',
      hasClothingStorage: true,
      hasSnackEatingPlace: false,
      outdoorActivity: false,
      hasToiletNearby: true,
      hasAreaForGroupWork: true,
      hasIndoorPlayingArea: true,
      hasOutdoorPlayingArea: false,
      translations: [
        {
          languageCode: Language.Fi,
          description: 'Annantalo on taidekeskus Helsingissä.',
          __typename: 'VenueTranslationType',
        },
        {
          languageCode: Language.Sv,
          description: 'Annegården är ett konstcentrum i Helsingfors.',
          __typename: 'VenueTranslationType',
        },
        {
          languageCode: Language.En,
          description: 'Annantalo is an arts centre in Helsinki.',
          __typename: 'VenueTranslationType',
        },
      ],
      __typename: 'VenueNode',
    },
    __typename: 'UpdateVenueMutationPayload',
  },
};
