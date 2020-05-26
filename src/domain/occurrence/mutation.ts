import gql from 'graphql-tag';

export const MUTATION_EVENT = gql`
  mutation AddOccurrence($input: AddOccurrenceMutationInput!) {
    addOccurrence(input: $input) {
      occurrence {
        id
        pEvent {
          id
        }
        minGroupSize
        maxGroupSize
        startTime
        endTime
        organisation {
          id
        }
        placeId
      }
      clientMutationId
    }
  }
  mutation EditOccurrence($input: UpdateOccurrenceMutationInput!) {
    updateOccurrence(input: $input) {
      occurrence {
        id
        pEvent {
          id
        }
        minGroupSize
        maxGroupSize
        startTime
        endTime
        organisation {
          id
        }
        placeId
      }
      clientMutationId
    }
  }
`;
