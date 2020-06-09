import gql from 'graphql-tag';

export const QUERY_VENUE = gql`
  fragment venueFields on VenueNode {
    id
    hasClothingStorage
    hasSnackEatingPlace
    translations {
      languageCode
      description
    }
  }

  query Venue($id: ID!) {
    venue(id: $id) {
      ...venueFields
    }
  }
`;
