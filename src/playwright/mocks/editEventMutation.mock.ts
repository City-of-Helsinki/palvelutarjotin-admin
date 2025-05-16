import {
  type EditEventMutation,
  Language,
  OccurrencesOccurrenceSeatTypeChoices,
  OrganisationsOrganisationTypeChoices,
} from '../../generated/graphql';

// EditEvent mutation response on event creation page 2 to page 3 transition
// i.e. when the user clicks "Go to publishing" button on page 2:
export const MOCK_EDIT_EVENT_MUTATION_RESPONSE: EditEventMutation = {
  updateEventMutation: {
    response: {
      statusCode: 200,
      body: {
        id: 'kultus:agls75a3jm',
        internalId:
          'https://linkedevents.api.test.hel.ninja/v1/event/kultus:agls75a3jm/',
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
          id: 'UGFsdmVsdXRhcmpvdGluRXZlbnROb2RlOjE1NjY=',
          nextOccurrenceDatetime: '2200-06-21T05:00:00+00:00',
          autoAcceptance: true,
          autoAcceptanceMessage: 'Peruutukset 2pv ennen',
          contactPerson: {
            id: 'UGVyc29uTm9kZTpjZjNkN2NlYS0xNGQxLTQzNmQtOTNmZS0zOTI4Mzc2ZTQ2YTE=',
            emailAddress: 'admin@example.com',
            name: 'Test-admin',
            phoneNumber: '',
            language: Language.Fi,
            placeIds: [],
            __typename: 'PersonNode',
          },
          contactEmail: 'admin@example.com',
          contactPhoneNumber: '+358-50-123456789',
          enrolmentEndDays: 2,
          enrolmentStart: '2199-12-31T14:30:00+00:00',
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
                    name: 'Test-admin',
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
                  id: 'T2NjdXJyZW5jZU5vZGU6MzIzNQ==',
                  pEvent: {
                    id: 'UGFsdmVsdXRhcmpvdGluRXZlbnROb2RlOjE1NjY=',
                    __typename: 'PalvelutarjotinEventNode',
                  },
                  amountOfSeats: 80,
                  minGroupSize: 2,
                  maxGroupSize: 10,
                  seatsTaken: 0,
                  seatsApproved: 0,
                  seatType: OccurrencesOccurrenceSeatTypeChoices.ChildrenCount,
                  remainingSeats: 80,
                  languages: {
                    edges: [
                      {
                        node: {
                          id: 'en',
                          name: 'English',
                          __typename: 'LanguageNode',
                        },
                        __typename: 'LanguageNodeEdge',
                      },
                      {
                        node: {
                          id: 'fi',
                          name: 'Finnish',
                          __typename: 'LanguageNode',
                        },
                        __typename: 'LanguageNodeEdge',
                      },
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
                  startTime: '2200-06-21T05:00:00+00:00',
                  endTime: '2200-06-21T06:00:00+00:00',
                  placeId: 'tprek:7254',
                  cancelled: false,
                  __typename: 'OccurrenceNode',
                },
                __typename: 'OccurrenceNodeEdge',
              },
            ],
            __typename: 'OccurrenceNodeConnection',
          },
          translations: [
            {
              autoAcceptanceMessage: 'Peruutukset 2pv ennen',
              languageCode: Language.Fi,
              __typename: 'PalvelutarjotinEventTranslationType',
            },
          ],
          __typename: 'PalvelutarjotinEventNode',
        },
        inLanguage: [],
        audience: [
          {
            id: null,
            name: null,
            internalId:
              'https://linkedevents.api.test.hel.ninja/v1/keyword/kultus:40/',
            __typename: 'Keyword',
          },
          {
            id: null,
            name: null,
            internalId:
              'https://linkedevents.api.test.hel.ninja/v1/keyword/kultus:58/',
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
          {
            id: null,
            name: null,
            internalId:
              'https://linkedevents.api.test.hel.ninja/v1/keyword/kultus:5/',
            __typename: 'Keyword',
          },
          {
            id: null,
            name: null,
            internalId:
              'https://linkedevents.api.test.hel.ninja/v1/keyword/yso:p18434/',
            __typename: 'Keyword',
          },
        ],
        startTime: '2025-06-02T09:23:35.687000Z',
        publicationStatus: 'draft',
        datePublished: null,
        endTime: null,
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
      __typename: 'EventMutationResponse',
    },
    __typename: 'UpdateEventMutation',
  },
};
