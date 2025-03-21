import { onError } from '@apollo/client/link/error';
import * as Sentry from '@sentry/browser';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import { ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import {
  ApolloClient,
  ApolloLink,
  NormalizedCacheObject,
} from '@apollo/client';
import fetch from 'cross-fetch';
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';
import { useRef } from 'react';

import i18n from '../i18n/i18nInit';
import { getKultusAdminApiTokenFromStorage } from '../../auth/kultusAdminApiUtils';
import { createApolloCache } from './cache';
import AppConfig from '../AppConfig';

export let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

/**
 * Creates a new Apollo Client instance.
 *
 * This function sets up an Apollo Client with error handling, an HTTP link, and a custom cache.
 * It's used internally by `initializeApolloClient`.
 *
 * @returns A new Apollo Client instance.
 */
function createApolloClient(): ApolloClient<NormalizedCacheObject> {
  const httpLink = createUploadLink({
    uri: AppConfig.kukkuuApiGraphqlEndpoint,
    fetch,
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

  return new ApolloClient({
    connectToDevTools: true,
    link: ApolloLink.from([errorLink, authLink, httpLink]),

    cache: createApolloCache(),
  });
}

/**
 * Initializes and returns an Apollo Client instance.
 *
 * This function creates or reuses an Apollo Client instance, hydrating it with the provided
 * `initialState` if available. It handles both server-side and client-side initialization.
 *
 * @param initialState Optional initial cache state to hydrate the Apollo Client.
 * @returns An Apollo Client instance.
 */
export function initializeApolloClient(
  initialState: NormalizedCacheObject | null = null
): ApolloClient<NormalizedCacheObject> {
  const _apolloClient = apolloClient ?? createApolloClient();

  // Initial state hydration
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the initialState from getStaticProps/getServerSideProps
    // in the existing cache
    const data = merge(existingCache, initialState, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (existingArray, newArray) => {
        const mergedArray = [...existingArray]; // Start with existingArray

        for (const newItem of newArray) {
          if (!existingArray.some((destItem) => isEqual(newItem, destItem))) {
            mergedArray.push(newItem); // Append unique source items
          }
        }

        return mergedArray;
      },
    });
    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }

  // Create the Apollo Client once in the client
  if (!apolloClient) {
    apolloClient = _apolloClient;
  }

  return _apolloClient;
}

/**
 * Provides an Apollo Client instance for use within React components.
 *
 * This hook initializes or reuses an Apollo Client instance and ensures it persists
 * across re-renders. It's designed to be used in client-side components.
 *
 * @param options Optional object containing `initialApolloState` for cache hydration.
 * @returns An Apollo Client instance.
 */
export function useApolloClient(
  {
    initialApolloState,
  }:
    | {
        initialApolloState: NormalizedCacheObject | null;
      }
    | undefined = { initialApolloState: null }
): ApolloClient<NormalizedCacheObject> {
  const storeRef = useRef<ApolloClient<NormalizedCacheObject>>();
  if (!storeRef.current) {
    storeRef.current = initializeApolloClient(initialApolloState);
  }
  return storeRef.current;
}

/**
 * Reset the global variable for Apollo Client.
 * NOTE: Helps in unit tests when running multiple tests simultaneously.
 */
export function resetApolloClient() {
  apolloClient = undefined;
}

export const clearApolloCache = async () => {
  if (apolloClient) {
    apolloClient.stop();
    await Promise.all([apolloClient.resetStore(), apolloClient.clearStore()]);
  } else {
    // eslint-disable-next-line no-console
    console.warn('Cannot clear apollo cache', 'No apolloClient initialized');
  }
};

/**
 * Invalidate given event's cache
 * @param eventId The ID of the event to invalidate
 */
export const invalidateEventCache = (eventId: string) => {
  if (apolloClient) {
    apolloClient.cache.evict({ id: `Event:${eventId}` });
  } else {
    // eslint-disable-next-line no-console
    console.warn(
      'Cannot invalidate event cache',
      'No apolloClient initialized'
    );
  }
};
