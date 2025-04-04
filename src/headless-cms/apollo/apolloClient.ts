import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  NormalizedCacheObject,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import * as Sentry from '@sentry/browser';
import fetch from 'cross-fetch';
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';
import { useRef } from 'react';

import {
  createCMSApolloCache,
  isConfiguredQueryPolicy,
  queryPolicies,
} from './cache';
import AppConfig from '../../domain/app/AppConfig';
import { rewriteInternalURLs } from '../utils';
import {
  LogLevel as PersistorLogLevel,
  TimedApolloCachePersistor,
} from './persistor';

export let cmsApolloClient: ApolloClient<NormalizedCacheObject> | undefined;

/**
 * Creates a new Apollo Client instance specifically for CMS data.
 *
 * This function sets up an Apollo Client configured to fetch data from the CMS GraphQL endpoint.
 * It includes a custom Apollo Link to rewrite internal URLs and uses a custom cache.
 *
 * @returns A new Apollo Client instance for CMS data.
 */
function createCmsApolloClient(): ApolloClient<NormalizedCacheObject> {
  // Rewrite the URLs coming from events API to route them internally.
  const transformInternalURLs = new ApolloLink((operation, forward) => {
    return forward(operation).map((response) => {
      response.data = response.data
        ? rewriteInternalURLs(response.data)
        : response.data;
      return response;
    });
  });

  const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach((error) => {
        const { message, locations, path } = error;
        const errorMessage = `[GraphQL error]: ${JSON.stringify({
          OperationName: operation.operationName,
          Message: message,
          Location: locations,
          Path: path,
          // Response: response,
        })}`;
        // eslint-disable-next-line no-console
        console.error(errorMessage);
        Sentry.captureMessage(errorMessage);
      });
    }

    if (networkError) {
      // eslint-disable-next-line no-console
      console.error(
        `[GraphQL networkError]: ${JSON.stringify({
          Operation: operation.operationName,
          NetworkError: networkError,
        })}`
      );
      Sentry.captureMessage('Graphql Network error');
    }
  });

  const httpLink = new HttpLink({
    uri: AppConfig.cmsGraphqlEndpoint,
    fetch,
  });

  const cache = createCMSApolloCache();

  const apolloCachePersistor = new TimedApolloCachePersistor(cache, {
    logLevel: PersistorLogLevel.WARN,
    persistedCacheTimeToLiveMs: AppConfig.apolloPersistedCacheTimeToLiveMs,
  });

  // The cache is restored from localStorage if it exists and has not expired.
  // If the cache has expired, it is purged and the cache is restored from the network.
  // This is done to avoid flashing on the UI (menus, languages, etc).
  //
  // NOTE: The Cache Persistor `purge` and `restore` are async functions, so __we should await them__
  // to avoid racing conditions: __It might be that the cache is not restored when the first query is made.__
  // In these cases, the cache will be restored in the background, but a new query will be made to the network,
  // since we cannot await the async function to finish in a sync function and don't have the cache yet,
  // A React-Router and it's navigation components and tools helps to hide this issue, since the user can navigate
  // without rerendering the whole app again and then the Apollo cache is not cleared during the route changes.
  (async () => {
    if (apolloCachePersistor.hasPersistedCacheExpired()) {
      // eslint-disable-next-line no-console
      console.info('Persisted cache has expired.');
      await apolloCachePersistor.purge();
    } else {
      await apolloCachePersistor.restore();
      // eslint-disable-next-line no-console
      console.info('Persisted cache has been restored.');
    }
  })();

  return new ApolloClient({
    connectToDevTools: true,
    link: ApolloLink.from([errorLink, transformInternalURLs, httpLink]),
    cache,
    defaultOptions: {
      watchQuery: {
        nextFetchPolicy(
          currentFetchPolicy,
          {
            // Either "after-fetch" or "variables-changed", indicating why the
            // nextFetchPolicy function was invoked.
            reason,
            // The rest of the options (currentFetchPolicy === options.fetchPolicy).
            // The original value of options.fetchPolicy, before nextFetchPolicy was
            // applied for the first time.
            initialFetchPolicy,
            // The ObservableQuery associated with this client.watchQuery call.
            observable,
          }
        ) {
          // When variables change, the default behavior is to reset
          // options.fetchPolicy to context.initialFetchPolicy. If you omit this logic,
          // your nextFetchPolicy function can override this default behavior to
          // prevent options.fetchPolicy from changing in this case.
          if (reason === 'variables-changed') {
            return initialFetchPolicy;
          }
          // The languages are hardcoded in the cache, so we can always return cache-only,
          // because the languages never changes. Also, flashing on menus should be avoided,
          // so the menu query should first try from cache, but could still update cache
          // on background.
          if (isConfiguredQueryPolicy(observable.queryName)) {
            return queryPolicies[observable.queryName];
          }
          // Leave all other fetch policies unchanged.
          return currentFetchPolicy;
        },
      },
    },
  });
}

/**
 * Initializes and returns an Apollo Client instance for CMS data.
 *
 * This function creates or reuses an Apollo Client instance for CMS data, hydrating it with the provided
 * `initialState` if available. It handles both server-side and client-side initialization.
 *
 * @param initialState Optional initial cache state to hydrate the CMS Apollo Client.
 * @returns An Apollo Client instance for CMS data.
 */
export function initializeCMSApolloClient(
  initialState: NormalizedCacheObject | null = null
): ApolloClient<NormalizedCacheObject> {
  const _apolloClient = cmsApolloClient ?? createCmsApolloClient();

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
  if (!cmsApolloClient) {
    cmsApolloClient = _apolloClient;
  }

  return _apolloClient;
}

/**
 * Provides a CMS Apollo Client instance for use within React components.
 *
 * This hook initializes or reuses a CMS Apollo Client instance and ensures it persists
 * across re-renders. It's designed to be used in client-side components.
 *
 * @param options Optional object containing `initialCMSApolloState` for cache hydration.
 * @returns A CMS Apollo Client instance.
 */
export function useCMSApolloClient(
  {
    initialCMSApolloState,
  }:
    | {
        initialCMSApolloState: NormalizedCacheObject | null;
      }
    | undefined = { initialCMSApolloState: null }
): ApolloClient<NormalizedCacheObject> {
  const storeRef = useRef<ApolloClient<NormalizedCacheObject>>();
  if (!storeRef.current) {
    storeRef.current = initializeCMSApolloClient(initialCMSApolloState);
  }
  return storeRef.current;
}

/**
 * Reset the global variable for Apollo Client.
 * NOTE: Helps in unit tests when running multiple tests simultaneously.
 */
export function resetApolloClient() {
  cmsApolloClient = undefined;
}
