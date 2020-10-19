import gql from 'graphql-tag';

export const QUERY_VENUE = gql`
  fragment venueFields on VenueNode {
    id
    hasClothingStorage
    hasSnackEatingPlace
    outdoorActivity
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
