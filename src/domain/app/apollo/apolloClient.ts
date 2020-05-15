import * as Sentry from '@sentry/browser';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import { ErrorMessage } from 'formik';
import { toast } from 'react-toastify';

import { apiTokenSelector } from '../../auth/selectors';
import i18n from '../i18n/i18nInit';
import { store } from '../store';

const cache = new InMemoryCache({
  cacheRedirects: {
    Query: {
      keyword: (_, args, { getCacheKey }) =>
        getCacheKey({ __typename: 'Keyword', id: args.id }),
      place: (_, args, { getCacheKey }) =>
        getCacheKey({ __typename: 'Place', id: args.id }),
    },
  },
});

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_API_URI,
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ extensions, message, locations, path }) => {
      const errorMessage = `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`;

      Sentry.captureException(ErrorMessage);

      const code = extensions && extensions['code'];
      switch (code) {
        case 'PERMISSION_DENIED_ERROR':
          toast(i18n.t('apollo.graphQLErrors.permissionDeniedError'), {
            type: toast.TYPE.ERROR,
          });
          break;
        default:
          if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.error(errorMessage);
          }
      }
    });

  if (networkError) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error(`[Network error]: ${networkError}`);
    }
  }
});

const authLink = setContext((_, { headers }) => {
  const token = apiTokenSelector(store.getState());

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
      'Accept-language': i18n.language,
    },
  };
});

const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache,
});

export default apolloClient;
