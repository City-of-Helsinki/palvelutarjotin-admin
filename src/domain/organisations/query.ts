import { gql } from '@apollo/client';

export const QUERY_ORGANISATIONS = gql`
  fragment pageInfoFields on PageInfo {
    hasNextPage
    hasPreviousPage
    startCursor
    endCursor
  }

  query Organisations(
    $after: String
    $before: String
    $first: Int
    $last: Int
    $type: String
  ) {
    organisations(
      after: $after
      before: $before
      first: $first
      last: $last
      type: $type
    ) {
      pageInfo {
        ...pageInfoFields
      }
      edges {
        node {
          ...organisationNodeFields
        }
      }
    }
  }
`;
