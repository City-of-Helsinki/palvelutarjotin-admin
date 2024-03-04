/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';

const apolloClient = new ApolloClient({
  uri: import.meta.env.VITE_APP_CMS_URI,
  cache: new InMemoryCache({
    typePolicies: {
      Page: {
        fields: {
          children: relayStylePagination(['where', ['search']]),
        },
      },
    },
  }),
  headers: {
    authorization: '',
  },
});
export default apolloClient;
