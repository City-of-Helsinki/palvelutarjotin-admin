import {
  defaultDataIdFromObject,
  InMemoryCache,
  StoreObject,
} from '@apollo/client';

function excludeArgs(excludedArgs: string[]) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (args: Record<string, any> | null) {
    const excludedArgsSet = new Set(excludedArgs);
    return args
      ? Object.keys(args).filter((key: string) => !excludedArgsSet.has(key))
      : false;
  };
}
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
