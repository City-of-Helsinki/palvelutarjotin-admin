import gql from 'graphql-tag';

export const QUERY_OCCURRENCE = gql`
  query Occurrence($id: ID!) {
    occurrence(id: $id) {
      id
      pEvent {
        id
      }
      minGroupSize
      maxGroupSize
      startTime
      endTime
      placeId
    }
  }
`;
