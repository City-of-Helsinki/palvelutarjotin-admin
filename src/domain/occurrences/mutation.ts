import gql from 'graphql-tag';

export const MUTATION_EVENT = gql`
  mutation DeleteOccurrence($input: DeleteOccurrenceMutationInput!) {
    deleteOccurrence(input: $input) {
      clientMutationId
    }
  }
`;
