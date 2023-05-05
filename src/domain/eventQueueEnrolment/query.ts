import { gql } from 'graphql-tag';

export const QUERY_EVENT_QUEUE_ENROLMENT = gql`
  fragment eventQueueEnrolmentFields on EventQueueEnrolmentNode {
    id
    notificationType
    enrolmentTime
    status
    pEvent {
      id
    }
    person {
      ...personFields
    }
    studyGroup {
      ...studyGroupFields
    }
  }

  query eventQueueEnrolments(
    $pEventId: ID
    $orderBy: [String]
    $first: Int
    $after: String
  ) {
    eventQueueEnrolments(
      pEventId: $pEventId
      orderBy: $orderBy
      first: $first
      after: $after
    ) {
      count
      edges {
        cursor
        node {
          ...eventQueueEnrolmentFields
        }
      }
    }
  }
`;
