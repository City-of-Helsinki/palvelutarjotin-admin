import {
  ApolloClient,
  ApolloLink,
  defaultDataIdFromObject,
  InMemoryCache,
  StoreObject,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import * as Sentry from '@sentry/browser';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import { ErrorMessage } from 'formik';
import { toast } from 'react-toastify';

import i18n from '../i18n/i18nInit';
import { getKultusAdminApiTokenFromStorage } from '../../auth/kultusAdminApiUtils';

const excludeArgs =
  (excludedArgs: string[]) =>
  (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    args: Record<string, any> | null
  ) =>
    args
      ? Object.keys(args).filter((key: string) => !excludedArgs.includes(key))
      : false;

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
          events: {
            // Only ignore page argument in caching to get fetchMore pagination working correctly
            // Other args are needed to separate different serch queries to separate caches
            // Docs: https://www.apollographql.com/docs/react/pagination/key-args/
            keyArgs: excludeArgs(['page']),
            merge(existing, incoming) {
              if (!incoming) return existing;
              return {
                data: [...(existing?.data ?? []), ...incoming.data],
                meta: incoming.meta,
              };
            },
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
  uri: import.meta.env.VITE_APP_API_URI,
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
          if (import.meta.env.DEV) {
            // eslint-disable-next-line no-console
            console.error(errorMessage);
          }
      }
    });

  if (networkError) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.error(`[Network error]: ${networkError}`);
    }
  }
});

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    const token = getKultusAdminApiTokenFromStorage();
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : null,
        'Accept-language': i18n.language,
      },
    };
  });
  return forward(operation);
});

const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: createApolloCache(),
});

export default apolloClient;
