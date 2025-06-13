import { type VenueQuery, Language } from '../../generated/graphql';

// Venue query with variables {id: "tprek:7254"} i.e. Annantalo
export const MOCK_ANNANTALO_VENUE_QUERY_RESPONSE: VenueQuery = {
  venue: {
    id: 'tprek:7254',
    hasClothingStorage: true,
    hasSnackEatingPlace: false,
    outdoorActivity: false,
    hasToiletNearby: true,
    hasAreaForGroupWork: false,
    hasIndoorPlayingArea: true,
    hasOutdoorPlayingArea: false,
    translations: [
      {
        languageCode: Language.Fi,
        description: 'Suomenkielinen oletuskuvaus Annantalolle.',
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
};
