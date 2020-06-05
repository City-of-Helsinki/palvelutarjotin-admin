import gql from 'graphql-tag';

export const QUERY_KEYWORD = gql`
  fragment personFields on PersonNode {
    id
    name
    phoneNumber
    organisations {
      edges {
        node {
          id
          name
          phoneNumber
          type
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
