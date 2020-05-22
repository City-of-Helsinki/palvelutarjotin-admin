import gql from 'graphql-tag';

export const QUERY_IMAGE = gql`
  query Image($id: ID!) {
    image(id: $id) {
      id
      internalId
      license
      name
      url
      cropping
      photographerName
      altText
    }
  }
`;
