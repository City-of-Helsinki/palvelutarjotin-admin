import { gql } from '@apollo/client';

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
