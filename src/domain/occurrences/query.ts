import { gql } from '@apollo/client';

export const QUERY_OCCURRENCES = gql`
  query Occurrences($after: String, $before: String, $first: Int, $last: Int) {
    occurrences(after: $after, before: $before, first: $first, last: $last) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          ...occurrenceFields
        }
        cursor
      }
    }
  }
`;
