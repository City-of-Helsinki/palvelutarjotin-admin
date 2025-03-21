import { InMemoryCache } from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';

import { HARDCODED_CMS_LANGUAGE_QUERY_RESPONSE } from '../../domain/languages/constants';
export const queryPolicies = {
  languages: 'cache-only',
  language: 'cache-only',
  menu: 'cache-and-network',
} as const;

export function isConfiguredQueryPolicy(
  policy?: string
): policy is keyof typeof queryPolicies {
  if (!policy) {
    return false;
  }
  return policy in queryPolicies;
}
export const createCMSApolloCache = () =>
  new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          // Hardcode the languages query response, so we don't need to ever fetch it from the CMS.
          languages: {
            read() {
              return HARDCODED_CMS_LANGUAGE_QUERY_RESPONSE['data']['languages'];
            },
          },
          // Hardcode the language query response, so we don't need to ever fetch it from the CMS.
          language: {
            read(id: string) {
              return HARDCODED_CMS_LANGUAGE_QUERY_RESPONSE['data'][
                'languages'
              ].find((language) => language.id === id);
            },
          },
        },
      },
      Page: {
        fields: {
          children: relayStylePagination(['where', ['search']]),
        },
      },
    },
  });
