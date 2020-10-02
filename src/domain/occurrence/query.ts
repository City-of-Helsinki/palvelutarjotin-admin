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
    autoAcceptance
    seatsTaken
    languages {
      id
      name
    }
    startTime
    endTime
    placeId
    seatsTaken
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
