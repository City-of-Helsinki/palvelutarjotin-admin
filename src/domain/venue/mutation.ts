import gql from 'graphql-tag';

export const MUTATION_VENUE = gql`
  mutation CreateVenue($venue: AddVenueMutationInput!) {
    addVenue(input: $venue) {
      venue {
        ...venueFields
      }
    }
  }

  mutation EditVenue($venue: UpdateVenueMutationInput!) {
    updateVenue(input: $venue) {
      venue {
        ...venueFields
      }
    }
  }
`;
