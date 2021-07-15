import { gql } from '@apollo/client';

export const QUERY_OCCURRENCES = gql`
  query Occurrences(
    $after: String,
    $before: String,
    $first: Int,
    $last: Int,
    $cancelled: Boolean,
    $pEvent: ID,
    $orderBy: [String]
  ) {
    occurrences(
      after: $after,
      before: $before,
      first: $first,
      last: $last,
      cancelled: $cancelled,
      pEvent: $pEvent,
      orderBy: $orderBy
    ) {
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
