import type { PlacesQuery } from '../../generated/graphql';

// Places query with variables {dataSource: "tprek", pageSize: 20, showAllPlaces: true, text: "annantalo"}
export const MOCK_ANNANTALO_PLACES_QUERY_RESPONSE: PlacesQuery = {
  places: {
    meta: {
      count: 2,
      next: null,
      previous: null,
      __typename: 'Meta',
    },
    data: [
      {
        id: 'tprek:7254',
        internalId:
          'https://linkedevents.api.test.hel.ninja/v1/place/tprek:7254/',
        name: {
          en: 'Annantalo Arts Centre',
          fi: 'Annantalo',
          sv: 'Annegården',
          __typename: 'LocalisedObject',
        },
        streetAddress: {
          en: 'Annankatu 30',
          fi: 'Annankatu 30',
          sv: 'Annegatan 30',
          __typename: 'LocalisedObject',
        },
        addressLocality: {
          en: 'Helsinki',
          fi: 'Helsinki',
          sv: 'Helsingfors',
          __typename: 'LocalisedObject',
        },
        telephone: {
          en: null,
          fi: '+358 9 333 333333',
          sv: null,
          __typename: 'LocalisedObject',
        },
        __typename: 'Place',
      },
      {
        id: 'tprek:74808',
        internalId:
          'https://linkedevents.api.test.hel.ninja/v1/place/tprek:74808/',
        name: {
          en: 'Pancake Cafe at Annantalo',
          fi: 'Pannukakku-kahvila Annantalossa',
          sv: 'Pannkakscafé på Annegården',
          __typename: 'LocalisedObject',
        },
        streetAddress: {
          en: 'Annankatu 30',
          fi: 'Annankatu 30',
          sv: 'Annegatan 30',
          __typename: 'LocalisedObject',
        },
        addressLocality: {
          en: 'Helsinki',
          fi: 'Helsinki',
          sv: 'Helsingfors',
          __typename: 'LocalisedObject',
        },
        telephone: {
          en: null,
          fi: '+358 40 555 55555',
          sv: null,
          __typename: 'LocalisedObject',
        },
        __typename: 'Place',
      },
    ],
    __typename: 'PlaceListResponse',
  },
};
