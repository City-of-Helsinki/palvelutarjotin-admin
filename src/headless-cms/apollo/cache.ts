import { InMemoryCache } from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';

export const createCMSApolloCache = () =>
  new InMemoryCache({
    typePolicies: {
      Page: {
        fields: {
          children: relayStylePagination(['where', ['search']]),
        },
      },
    },
  });
