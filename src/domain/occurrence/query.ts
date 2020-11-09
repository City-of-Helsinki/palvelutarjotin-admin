import gql from 'graphql-tag';

export const QUERY_OCCURRENCE = gql`
  fragment occurrenceFields on OccurrenceNode {
    id
    pEvent {
      id
    }
    amountOfSeats
    minGroupSize
    maxGroupSize
    seatsTaken
    seatsApproved
    remainingSeats
    languages {
      id
      name
    }
    startTime
    endTime
    placeId
    cancelled
  }

  query Occurrence($id: ID!) {
    occurrence(id: $id) {
      ...occurrenceFields
      enrolments {
        edges {
          node {
            ...enrolmentFields
          }
        }
      }
    }
  }
`;
