import { gql } from '@apollo/client';

export const MUTATION_EVENT = gql`
  mutation AddOccurrence($input: AddOccurrenceMutationInput!) {
    addOccurrence(input: $input) {
      occurrence {
        ...occurrenceFields
      }
    }
  }
  mutation EditOccurrence($input: UpdateOccurrenceMutationInput!) {
    updateOccurrence(input: $input) {
      occurrence {
        ...occurrenceFields
      }
    }
  }
`;
