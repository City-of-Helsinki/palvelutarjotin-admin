import gql from 'graphql-tag';

export const QUERY_KEYWORD = gql`
  query MyProfile {
    myProfile {
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
  }
`;
