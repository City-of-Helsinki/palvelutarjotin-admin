import { gql } from 'graphql-tag';

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
    $type: OrganisationsOrganisationTypeChoices
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
