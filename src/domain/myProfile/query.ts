import gql from 'graphql-tag';

export const QUERY_KEYWORD = gql`
  fragment personFields on PersonNode {
    id
    emailAddress
    name
    phoneNumber
    organisations {
      edges {
        node {
          ...organisationNodeFields
        }
      }
    }
  }
  query MyProfile {
    myProfile {
      ...personFields
    }
  }
`;
