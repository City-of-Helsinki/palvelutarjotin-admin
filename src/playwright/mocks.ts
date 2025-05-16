import type {
  EventQuery,
  EventsQuery,
  PlacesQuery,
} from '../generated/graphql';
import {
  CreateEventMutation,
  KeywordSetQuery,
  KeywordsQuery,
  Language,
  OccurrencesOccurrenceSeatTypeChoices,
  OrganisationsOrganisationTypeChoices,
} from '../generated/graphql';

export const MOCK_ADDITIONAL_CRITERIA_KEYWORD_SET_QUERY_RESPONSE: KeywordSetQuery =
  {
    keywordSet: {
      keywords: [
        {
          id: 'kultus:4',
          name: {
            en: 'Library visit',
            fi: 'Kirjastovierailu',
            sv: 'Biblioteksbesök',
            __typename: 'LocalisedObject',
          },
          internalId:
            'https://linkedevents.api.test.hel.ninja/v1/keyword/kultus:4/',
          __typename: 'Keyword',
        },
        {
          id: 'kultus:5',
          name: {
            en: 'Concert',
            fi: 'Konsertti',
            sv: 'Konsert',
            __typename: 'LocalisedObject',
          },
          internalId:
            'https://linkedevents.api.test.hel.ninja/v1/keyword/kultus:5/',
          __typename: 'Keyword',
        },
      ],
      name: {
        en: 'Kultus Additional criteria',
        fi: 'Kultus Lisätarkennukset',
        sv: 'Kultus Ytterligare kriterier',
        __typename: 'LocalisedObject',
      },
      internalId:
        'https://linkedevents.api.test.hel.ninja/v1/keyword_set/kultus:additional_criteria/',
      __typename: 'KeywordSet',
    },
  };

export const MOCK_CATEGORY_KEYWORD_SET_QUERY_RESPONSE: KeywordSetQuery = {
  keywordSet: {
    keywords: [
      {
        id: 'kultus:17',
        name: {
          en: 'Music',
          fi: 'Musiikki',
          sv: 'Musik',
          __typename: 'LocalisedObject',
        },
        internalId:
          'https://linkedevents.api.test.hel.ninja/v1/keyword/kultus:17/',
        __typename: 'Keyword',
      },
      {
        id: 'kultus:18',
        name: {
          en: 'Literature',
          fi: 'Sanataide ja kirjallisuus',
          sv: 'Ordkonst och litteratur',
          __typename: 'LocalisedObject',
        },
        internalId:
          'https://linkedevents.api.test.hel.ninja/v1/keyword/kultus:18/',
        __typename: 'Keyword',
      },
    ],
    name: {
      en: 'Kultus Categories',
      fi: 'Kultus Kategoriat',
      sv: 'Kultus Kategorier',
      __typename: 'LocalisedObject',
    },
    internalId:
      'https://linkedevents.api.test.hel.ninja/v1/keyword_set/kultus:categories/',
    __typename: 'KeywordSet',
  },
};

export const MOCK_TARGET_GROUP_KEYWORD_SET_QUERY_RESPONSE: KeywordSetQuery = {
  keywordSet: {
    keywords: [
      {
        id: 'kultus:40',
        name: {
          en: '0-2 years',
          fi: '0-2 vuotiaat',
          sv: '0-2 år',
          __typename: 'LocalisedObject',
        },
        internalId:
          'https://linkedevents.api.test.hel.ninja/v1/keyword/kultus:40/',
        __typename: 'Keyword',
      },
      {
        id: 'kultus:58',
        name: {
          en: 'Upper secondary and vocational education',
          fi: 'lukio ja ammatillinen opetus',
          sv: 'Gymnasium och yrkesutbildning',
          __typename: 'LocalisedObject',
        },
        internalId:
          'https://linkedevents.api.test.hel.ninja/v1/keyword/kultus:58/',
        __typename: 'Keyword',
      },
    ],
    name: {
      en: 'Kultus Target groups',
      fi: 'Kultus Kohderyhmät',
      sv: 'Kultus Målgrupper',
      __typename: 'LocalisedObject',
    },
    internalId:
      'https://linkedevents.api.test.hel.ninja/v1/keyword_set/kultus:target_groups/',
    __typename: 'KeywordSet',
  },
};

// Keywords query with {pageSize: 20, text: "musiikki"} filter
export const MOCK_KEYWORDS_QUERY_RESPONSE: KeywordsQuery = {
  keywords: {
    meta: {
      count: 2,
      next: null,
      previous: null,
      __typename: 'Meta',
    },
    data: [
      {
        id: 'yso:p18434',
        name: {
          en: 'art music',
          fi: 'taidemusiikki',
          sv: 'konstmusik',
          __typename: 'LocalisedObject',
        },
        internalId:
          'https://linkedevents.api.test.hel.ninja/v1/keyword/yso:p18434/',
        __typename: 'Keyword',
      },
      {
        id: 'kultus:17',
        name: {
          en: 'Music',
          fi: 'Musiikki',
          sv: 'Musik',
          __typename: 'LocalisedObject',
        },
        internalId:
          'https://linkedevents.api.test.hel.ninja/v1/keyword/kultus:17/',
        __typename: 'Keyword',
      },
    ],
    __typename: 'KeywordListResponse',
  },
};

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
          fi: '<p>Pitkä kuvaus</p>\n',
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
            phoneNumber: '123123',
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

export const MOCK_EVENT_QUERY_RESPONSE: EventQuery = {
  event: {
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
      fi: '<p>Pitkä kuvaus</p>\n',
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
        phoneNumber: '123123',
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
        id: 'fi',
        internalId: 'https://linkedevents.api.test.hel.ninja/v1/language/fi/',
        name: {
          en: 'Finnish',
          fi: 'Suomi',
          sv: 'Finska',
          __typename: 'LocalisedObject',
        },
        __typename: 'InLanguage',
      },
      {
        id: 'sv',
        internalId: 'https://linkedevents.api.test.hel.ninja/v1/language/sv/',
        name: {
          en: 'Swedish',
          fi: 'Ruotsi',
          sv: 'Svenska',
          __typename: 'LocalisedObject',
        },
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
        id: 'kultus:17',
        name: {
          en: 'Music',
          fi: 'Musiikki',
          sv: 'Musik',
          __typename: 'LocalisedObject',
        },
        internalId:
          'https://linkedevents.api.test.hel.ninja/v1/keyword/kultus:17/',
        __typename: 'Keyword',
      },
    ],
    location: {
      id: 'tprek:15417',
      internalId:
        'https://linkedevents.api.test.hel.ninja/v1/place/tprek:15417/',
      name: {
        en: 'Sello Library',
        fi: 'Sellon kirjasto',
        sv: 'Sellobiblioteket',
        __typename: 'LocalisedObject',
      },
      streetAddress: {
        en: 'Leppävaarankatu 9',
        fi: 'Leppävaarankatu 9',
        sv: 'Albergagatan 9',
        __typename: 'LocalisedObject',
      },
      addressLocality: {
        en: 'Espoo',
        fi: 'Espoo',
        sv: 'Esbo',
        __typename: 'LocalisedObject',
      },
      telephone: {
        en: null,
        fi: '+358 9 8165 7603',
        sv: null,
        __typename: 'LocalisedObject',
      },
      __typename: 'Place',
    },
    venue: {
      id: 'tprek:15417',
      hasClothingStorage: true,
      hasSnackEatingPlace: false,
      outdoorActivity: true,
      hasToiletNearby: false,
      hasAreaForGroupWork: false,
      hasIndoorPlayingArea: true,
      hasOutdoorPlayingArea: true,
      translations: [
        {
          languageCode: Language.Fi,
          description: 'Sello FI',
          __typename: 'VenueTranslationType',
        },
        {
          languageCode: Language.Sv,
          description: 'Sello SV',
          __typename: 'VenueTranslationType',
        },
        {
          languageCode: Language.En,
          description: 'Sello EN',
          __typename: 'VenueTranslationType',
        },
      ],
      __typename: 'VenueNode',
    },
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
    additionalCriteria: [
      {
        id: 'kultus:5',
        name: {
          en: 'Concert',
          fi: 'Konsertti',
          sv: 'Konsert',
          __typename: 'LocalisedObject',
        },
        internalId:
          'https://linkedevents.api.test.hel.ninja/v1/keyword/kultus:5/',
        __typename: 'Keyword',
      },
    ],
    categories: [
      {
        id: 'kultus:17',
        name: {
          en: 'Music',
          fi: 'Musiikki',
          sv: 'Musik',
          __typename: 'LocalisedObject',
        },
        internalId:
          'https://linkedevents.api.test.hel.ninja/v1/keyword/kultus:17/',
        __typename: 'Keyword',
      },
    ],
  },
};

export const MOCK_CREATE_EVENT_MUTATION_RESPONSE_ON_PAGE_1_SAVE: CreateEventMutation =
  {
    addEventMutation: {
      response: {
        statusCode: 201,
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
            fi: '<p>Pitkä kuvaus</p>\n',
            sv: '',
            __typename: 'LocalisedObject',
          },
          images: [],
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
          pEvent: {
            id: 'UGFsdmVsdXRhcmpvdGluRXZlbnROb2RlOjE1NjY=',
            neededOccurrences: 1,
            autoAcceptance: false,
            autoAcceptanceMessage: null,
            __typename: 'PalvelutarjotinEventNode',
          },
          infoUrl: {
            en: '',
            fi: 'https://example.org/testi/',
            sv: '',
            __typename: 'LocalisedObject',
          },
          __typename: 'Event',
        },
        __typename: 'EventMutationResponse',
      },
      __typename: 'AddEventMutation',
    },
  };

export const MOCK_EVENT_QUERY_RESPONSE_AFTER_PAGE_1_SAVE: EventQuery = {
  event: {
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
      fi: '<p>Pitkä kuvaus</p>\n',
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
      nextOccurrenceDatetime: null,
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
      enrolmentEndDays: null,
      enrolmentStart: null,
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
        phoneNumber: '123123',
        publisherId: 'ahjo:u480400',
        type: OrganisationsOrganisationTypeChoices.Provider,
        __typename: 'OrganisationNode',
      },
      occurrences: {
        edges: [],
        __typename: 'OccurrenceNodeConnection',
      },
      translations: [],
      __typename: 'PalvelutarjotinEventNode',
    },
    inLanguage: [],
    audience: [
      {
        id: 'kultus:40',
        name: {
          en: '0-2 years',
          fi: '0-2 vuotiaat',
          sv: '0-2 år',
          __typename: 'LocalisedObject',
        },
        internalId:
          'https://linkedevents.api.test.hel.ninja/v1/keyword/kultus:40/',
        __typename: 'Keyword',
      },
      {
        id: 'kultus:58',
        name: {
          en: 'Upper secondary and vocational education',
          fi: 'lukio ja ammatillinen opetus',
          sv: 'Gymnasium och yrkesutbildning',
          __typename: 'LocalisedObject',
        },
        internalId:
          'https://linkedevents.api.test.hel.ninja/v1/keyword/kultus:58/',
        __typename: 'Keyword',
      },
    ],
    keywords: [
      {
        id: 'kultus:17',
        name: {
          en: 'Music',
          fi: 'Musiikki',
          sv: 'Musik',
          __typename: 'LocalisedObject',
        },
        internalId:
          'https://linkedevents.api.test.hel.ninja/v1/keyword/kultus:17/',
        __typename: 'Keyword',
      },
      {
        id: 'kultus:5',
        name: {
          en: 'Concert',
          fi: 'Konsertti',
          sv: 'Konsert',
          __typename: 'LocalisedObject',
        },
        internalId:
          'https://linkedevents.api.test.hel.ninja/v1/keyword/kultus:5/',
        __typename: 'Keyword',
      },
      {
        id: 'yso:p1808',
        name: {
          en: 'music',
          fi: 'musiikki',
          sv: 'musik',
          __typename: 'LocalisedObject',
        },
        internalId:
          'https://linkedevents.api.test.hel.ninja/v1/keyword/yso:p1808/',
        __typename: 'Keyword',
      },
    ],
    location: null,
    venue: null,
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
    additionalCriteria: [
      {
        id: 'kultus:5',
        name: {
          en: 'Concert',
          fi: 'Konsertti',
          sv: 'Konsert',
          __typename: 'LocalisedObject',
        },
        internalId:
          'https://linkedevents.api.test.hel.ninja/v1/keyword/kultus:5/',
        __typename: 'Keyword',
      },
    ],
    categories: [
      {
        id: 'kultus:17',
        name: {
          en: 'Music',
          fi: 'Musiikki',
          sv: 'Musik',
          __typename: 'LocalisedObject',
        },
        internalId:
          'https://linkedevents.api.test.hel.ninja/v1/keyword/kultus:17/',
        __typename: 'Keyword',
      },
    ],
  },
};

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
          fi: '+358 9 987 65432',
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
          fi: '+358 40 123 45678',
          sv: null,
          __typename: 'LocalisedObject',
        },
        __typename: 'Place',
      },
    ],
    __typename: 'PlaceListResponse',
  },
};
