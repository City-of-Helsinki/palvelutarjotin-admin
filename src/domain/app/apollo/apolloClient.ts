import {
  ApolloClient,
  ApolloLink,
  defaultDataIdFromObject,
  InMemoryCache,
  StoreObject,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import * as Sentry from '@sentry/browser';
import { createUploadLink } from 'apollo-upload-client';
import { ErrorMessage } from 'formik';
import { toast } from 'react-toastify';

import { apiTokenSelector } from '../../auth/selectors';
import i18n from '../i18n/i18nInit';
import { store } from '../store';

export const createApolloCache = () =>
  new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          keyword(_, { args, toReference }) {
            return toReference({
              __typename: 'Keyword',
              id: args?.id,
            });
          },
          person(_, { args, toReference }) {
            return toReference({
              __typename: 'PersonNode',
              id: args?.id,
            });
          },
          place(_, { args, toReference }) {
            return toReference({
              __typename: 'Place',
              id: args?.id,
            });
          },
          venue(_, { args, toReference }) {
            return toReference({
              __typename: 'VenueNode',
              id: args?.id,
            });
          },
        },
      },
      Keyword: {
        keyFields: (object: Readonly<StoreObject>, { selectionSet }) => {
          // Hacky way to not store keywords without id to cache (then name is missing also)
          // This happends when queries are done without include: ['keywords']
          if (selectionSet) {
            return object.id ? `Keyword:${object.internalId}` : false;
          }

          // if selectionSet is not defined, it means that toReference function calls keyfields
          // then we want to return cache id normally.
          return defaultDataIdFromObject(object);
        },
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
  link: ApolloLink.from([errorLink, authLink, httpLink as any]),
  cache: createApolloCache(),
});

export default apolloClient;
