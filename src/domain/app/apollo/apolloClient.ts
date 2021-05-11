import * as Sentry from '@sentry/browser';
import {
  defaultDataIdFromObject,
  IdGetterObj,
  InMemoryCache,
} from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { createUploadLink } from 'apollo-upload-client';
import { ErrorMessage } from 'formik';
import { toast } from 'react-toastify';

import { Keyword } from '../../../generated/graphql';
import { apiTokenSelector } from '../../auth/selectors';
import i18n from '../i18n/i18nInit';
import { store } from '../store';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isKeyword = (object: any): object is Keyword => {
  return object.__typename === 'Keyword';
};

export const apolloCache = new InMemoryCache({
  dataIdFromObject: (object: IdGetterObj & { getCacheKey?: boolean }) => {
    // Hacky way to not store keywords without id to cache
    // This happends when queries are done without include: ['keywords']
    if (isKeyword(object)) {
      // Also getCacheKey uses this so we need to also check if we are fetching from cache
      return object.id || object.getCacheKey
        ? `${object.__typename}:${object.internalId}`
        : null;
    }
    return defaultDataIdFromObject(object);
  },
  cacheRedirects: {
    Query: {
      keyword: (_, args, { getCacheKey }) =>
        getCacheKey({
          __typename: 'Keyword',
          internalId: args.id,
          getCacheKey: true,
        }),
      person: (_, args, { getCacheKey }) =>
        getCacheKey({ __typename: 'PersonNode', id: args.id }),
      place: (_, args, { getCacheKey }) =>
        getCacheKey({ __typename: 'Place', id: args.id }),
      venue: (_, args, { getCacheKey }) =>
        getCacheKey({ __typename: 'VenueNode', id: args.id }),
    },
  },
});

const httpLink = createUploadLink({
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
  cache: apolloCache,
});

export default apolloClient;
