import {
  type EventsQuery,
  Language,
  OccurrencesOccurrenceSeatTypeChoices,
  OrganisationsOrganisationTypeChoices,
} from '../../generated/graphql';

export const MOCK_EVENTS_QUERY_RESPONSE: EventsQuery = {
  events: {
    meta: {
      count: 1,
      next: null,
      previous: null,
      __typename: 'Meta',
    },
    data: [
      {
        id: 'kultus:aglkkgn5ue',
        internalId:
          'https://linkedevents.api.test.hel.ninja/v1/event/kultus:aglkkgn5ue/',
        name: {
          en: '',
          fi: 'Testitapahtuman nimi',
          sv: '',
          __typename: 'LocalisedObject',
        },
        shortDescription: {
          en: '',
          fi: 'Lyhyt kuvaus',
          sv: '',
          __typename: 'LocalisedObject',
        },
        description: {
          en: '',
          fi: '<p>Pitempi kuvaus</p>\n',
          sv: '',
          __typename: 'LocalisedObject',
        },
        images: [],
        infoUrl: {
          en: '',
          fi: 'https://example.org/testi/',
          sv: '',
          __typename: 'LocalisedObject',
        },
        pEvent: {
          id: 'UGFsdmVsdXRhcmpvdGluRXZlbnROb2RlOjE1MjQ=',
          nextOccurrenceDatetime: '2025-05-26T09:00:00+00:00',
          autoAcceptance: false,
          autoAcceptanceMessage: null,
          contactPerson: {
            id: 'UGVyc29uTm9kZTpjZjNkN2NlYS0xNGQxLTQzNmQtOTNmZS0zOTI4Mzc2ZTQ2YTE=',
            emailAddress: 'admin@example.com',
            name: 'Admin',
            phoneNumber: '',
            language: Language.Fi,
            placeIds: [],
            __typename: 'PersonNode',
          },
          contactEmail: 'admin@example.com',
          contactPhoneNumber: '+358-50-123456789',
          enrolmentEndDays: 0,
          enrolmentStart: '2025-05-06T10:20:00+00:00',
          externalEnrolmentUrl: null,
          isQueueingAllowed: true,
          neededOccurrences: 1,
          mandatoryAdditionalInformation: false,
          organisation: {
            id: 'T3JnYW5pc2F0aW9uTm9kZTox',
            name: 'Kulttuurin ja vapaa-ajan toimiala',
            persons: {
              edges: [
                {
                  node: {
                    id: 'UGVyc29uTm9kZTpjZjNkN2NlYS0xNGQxLTQzNmQtOTNmZS0zOTI4Mzc2ZTQ2YTE=',
                    emailAddress: 'admin@example.com',
                    name: 'Admin',
                    phoneNumber: '',
                    language: Language.Fi,
                    placeIds: [],
                    __typename: 'PersonNode',
                  },
                  __typename: 'PersonNodeEdge',
                },
              ],
              __typename: 'PersonNodeConnection',
            },
            phoneNumber: '',
            publisherId: 'ahjo:u480400',
            type: OrganisationsOrganisationTypeChoices.Provider,
            __typename: 'OrganisationNode',
          },
          occurrences: {
            edges: [
              {
                node: {
                  id: 'T2NjdXJyZW5jZU5vZGU6MzE0Ng==',
                  pEvent: {
                    id: 'UGFsdmVsdXRhcmpvdGluRXZlbnROb2RlOjE1MjQ=',
                    __typename: 'PalvelutarjotinEventNode',
                  },
                  amountOfSeats: 25,
                  minGroupSize: 1,
                  maxGroupSize: 10,
                  seatsTaken: 20,
                  seatsApproved: 0,
                  seatType: OccurrencesOccurrenceSeatTypeChoices.ChildrenCount,
                  remainingSeats: 5,
                  languages: {
                    edges: [
                      {
                        node: {
                          id: 'sv',
                          name: 'Swedish',
                          __typename: 'LanguageNode',
                        },
                        __typename: 'LanguageNodeEdge',
                      },
                    ],
                    __typename: 'LanguageNodeConnection',
                  },
                  startTime: '2025-05-11T09:30:00+00:00',
                  endTime: '2025-05-11T10:30:00+00:00',
                  placeId: 'tprek:15417',
                  cancelled: false,
                  __typename: 'OccurrenceNode',
                },
                __typename: 'OccurrenceNodeEdge',
              },
            ],
            __typename: 'OccurrenceNodeConnection',
          },
          translations: [],
          __typename: 'PalvelutarjotinEventNode',
        },
        inLanguage: [
          {
            id: null,
            internalId:
              'https://linkedevents.api.test.hel.ninja/v1/language/fi/',
            name: null,
            __typename: 'InLanguage',
          },
          {
            id: null,
            internalId:
              'https://linkedevents.api.test.hel.ninja/v1/language/sv/',
            name: null,
            __typename: 'InLanguage',
          },
        ],
        audience: [
          {
            id: null,
            name: null,
            internalId:
              'https://linkedevents.api.test.hel.ninja/v1/keyword/kultus:40/',
            __typename: 'Keyword',
          },
        ],
        keywords: [
          {
            id: null,
            name: null,
            internalId:
              'https://linkedevents.api.test.hel.ninja/v1/keyword/kultus:17/',
            __typename: 'Keyword',
          },
        ],
        location: {
          id: null,
          internalId:
            'https://linkedevents.api.test.hel.ninja/v1/place/tprek:15417/',
          name: null,
          streetAddress: null,
          addressLocality: null,
          telephone: null,
          __typename: 'Place',
        },
        venue: null,
        startTime: '2025-05-11T09:30:00Z',
        publicationStatus: 'public',
        datePublished: null,
        endTime: '2025-05-30T10:00:00Z',
        offers: [
          {
            isFree: false,
            description: {
              en: '',
              fi: 'Vain korttimaksu',
              sv: '',
              __typename: 'LocalisedObject',
            },
            price: {
              en: '10',
              fi: '10',
              sv: '10',
              __typename: 'LocalisedObject',
            },
            infoUrl: null,
            __typename: 'Offer',
          },
        ],
        __typename: 'Event',
      },
    ],
    __typename: 'EventListResponse',
  },
};
