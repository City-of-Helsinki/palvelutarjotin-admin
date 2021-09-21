import { gql } from '@apollo/client';

export const QUERY_PLACE = gql`
  fragment personFields on PersonNode {
    id
    emailAddress
    name
    phoneNumber
    language
    placeIds
  }

  query Person($id: ID!) {
    person(id: $id) {
      ...personFields
    }
  }
`;
