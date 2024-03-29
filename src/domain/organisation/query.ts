import { gql } from 'graphql-tag';

export const QUERY_ORGANISATION = gql`
  fragment organisationNodeFields on OrganisationNode {
    id
    name
    persons {
      edges {
        node {
          ...personFields
        }
      }
    }
    phoneNumber
    publisherId
    type
  }

  query Organisation($id: ID!) {
    organisation(id: $id) {
      ...organisationNodeFields
    }
  }
`;
