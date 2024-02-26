import { gql } from 'graphql-tag';

export const QUERY_KEYWORD = gql`
  fragment myProfileFields on PersonNode {
    ...personFields
    isStaff
    organisations {
      edges {
        node {
          ...organisationNodeFields
        }
      }
    }
    organisationproposalSet {
      edges {
        node {
          name
        }
      }
    }
    language
  }

  query MyProfile {
    myProfile {
      ...myProfileFields
    }
  }
`;
