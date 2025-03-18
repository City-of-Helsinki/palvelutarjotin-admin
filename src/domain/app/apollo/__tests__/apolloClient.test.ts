import { ApolloClient } from '@apollo/client';

import { initializeApolloClient, resetApolloClient } from '../apolloClient';

describe('initializeApolloClient', () => {
  const initialState = {
    ROOT_QUERY: {
      __typename: 'Query',
      testField: 'testValue',
    },
  };

  beforeEach(() => {
    resetApolloClient();
  });

  it('should create a new Apollo Client instance if no instance exists', () => {
    const client = initializeApolloClient();
    expect(client).toBeInstanceOf(ApolloClient);
  });

  it('should return the existing Apollo Client instance if one exists', () => {
    const existingClient = initializeApolloClient();
    const client = initializeApolloClient();
    expect(client).toBe(existingClient);
    expect(client).toBeInstanceOf(ApolloClient);
  });

  it('should hydrate the cache with initial state if provided', () => {
    const client = initializeApolloClient();
    const restoreSpy = vitest.spyOn(client.cache, 'restore');
    const extractSpy = vitest.spyOn(client, 'extract');

    initializeApolloClient(initialState);

    expect(extractSpy).toHaveBeenCalled();
    expect(restoreSpy).toHaveBeenCalledWith(
      expect.objectContaining(initialState)
    );
  });

  it('should restore the cache with merged existing and initial states', () => {
    const initialState = {
      ROOT_QUERY: {
        __typename: 'Query',
        initialField: 'initialValue',
        existingEmbeddedField: {
          __typename: 'EmbeddedType',
          embeddedField: 'embeddedValue',
          newEmbeddedField: 'newValue',
        },
        arrayField: [
          { __typename: 'ArrayFieldType', value: 2 }, // existing, should not be duplicated
          { __typename: 'ArrayFieldType', value: 3 }, // new to the middle
          { __typename: 'ArrayFieldType', value: 5 }, // new to the end
        ],
      },
    };
    const existingState = {
      ROOT_QUERY: {
        __typename: 'Query',
        existingField: 'existingValue',
        existingEmbeddedField: {
          __typename: 'EmbeddedType',
          embeddedField: 'existingEmbeddedValue',
          staticEmbeddedField: 'staticEmbeddedValue',
        },
        arrayField: [
          { __typename: 'ArrayFieldType', value: 1 },
          { __typename: 'ArrayFieldType', value: 2 },
          { __typename: 'ArrayFieldType', value: 4 }, // Leave one in the middle
        ],
      },
    };

    const client = initializeApolloClient();
    client.cache.restore(existingState);
    const restoreSpy = vitest.spyOn(client.cache, 'restore');

    initializeApolloClient(initialState);

    expect(restoreSpy).toHaveBeenCalled();
    const mergedState = restoreSpy.mock.calls[0][0] as any;

    expect(mergedState.ROOT_QUERY!.initialField).toEqual('initialValue');
    expect(
      mergedState.ROOT_QUERY!.existingEmbeddedField!.embeddedField
    ).toEqual('embeddedValue');
    expect(
      mergedState.ROOT_QUERY!.existingEmbeddedField!.staticEmbeddedField
    ).toEqual('staticEmbeddedValue');
    expect(
      mergedState.ROOT_QUERY!.existingEmbeddedField!.newEmbeddedField
    ).toEqual('newValue');
    expect(mergedState.ROOT_QUERY!.existingField).toEqual('existingValue');
    // In array, the source array is initial state and then the new values are appended.
    expect(mergedState.ROOT_QUERY!.arrayField).toEqual([
      { __typename: 'ArrayFieldType', value: 1 },
      { __typename: 'ArrayFieldType', value: 2 },
      { __typename: 'ArrayFieldType', value: 4 },
      { __typename: 'ArrayFieldType', value: 3 },
      { __typename: 'ArrayFieldType', value: 5 },
    ]);
  });
});
