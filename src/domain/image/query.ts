import { gql } from '@apollo/client';

export const QUERY_IMAGE = gql`
  fragment imageFields on Image {
    id
    internalId
    license
    name
    url
    cropping
    photographerName
    altText
  }

  query Image($id: ID!) {
    image(id: $id) {
      ...imageFields
    }
  }
`;
