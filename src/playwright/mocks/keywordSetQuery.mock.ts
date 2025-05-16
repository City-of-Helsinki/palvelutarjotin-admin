import type { KeywordSetQuery } from '../../generated/graphql';

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
