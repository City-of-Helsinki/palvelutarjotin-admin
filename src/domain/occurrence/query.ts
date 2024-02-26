import { gql } from 'graphql-tag';

export const QUERY_OCCURRENCE = gql`
  fragment languageFields on LanguageNode {
    id
    name
  }

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
    seatType
    remainingSeats
    languages {
      edges {
        node {
          ...languageFields
        }
      }
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
