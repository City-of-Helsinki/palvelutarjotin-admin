import gql from 'graphql-tag';

export const MUTATION_EVENT = gql`
  mutation DeleteOccurrence($input: DeleteOccurrenceMutationInput!) {
    deleteOccurrence(input: $input) {
      clientMutationId
    }
  }

  mutation CancelOccurrence($input: CancelOccurrenceMutationInput!) {
    cancelOccurrence(input: $input) {
      clientMutationId
    }
  }
`;
