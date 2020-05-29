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
    languages {
      id
      name
    }
    startTime
    endTime
    organisation {
      id
    }
    placeId
  }

  query Occurrence($id: ID!) {
    occurrence(id: $id) {
      ...occurrenceFields
    }
  }
`;
