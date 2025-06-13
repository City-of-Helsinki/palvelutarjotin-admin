import type { KeywordsQuery } from '../../generated/graphql';

// Keywords query with {pageSize: 20, text: "musiikki"} filter
export const MOCK_MUSIIKKI_KEYWORDS_QUERY_RESPONSE: KeywordsQuery = {
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
