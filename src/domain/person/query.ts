import gql from 'graphql-tag';

export const QUERY_PLACE = gql`
  fragment personFields on PersonNode {
    id
    emailAddress
    name
    phoneNumber
  }

  query Person($id: ID!) {
    person(id: $id) {
      ...personFields
    }
  }
`;
