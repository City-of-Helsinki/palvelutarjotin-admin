import gql from 'graphql-tag';

export const QUERY_KEYWORD = gql`
  fragment personFields on PersonNode {
    id
    emailAddress
    name
    phoneNumber
  }

  fragment myProfileFields on PersonNode {
    ...personFields
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
      ...myProfileFields
    }
  }
`;
