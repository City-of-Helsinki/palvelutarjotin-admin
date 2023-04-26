import gql from 'graphql-tag';

export const QUERY_EVENT_QUEUE_ENROLMENT = gql`
  fragment eventQueueEnrolmentFields on EventQueueEnrolmentNode {
    id
    notificationType
    enrolmentTime
    status
    person {
      ...personFields
    }
    studyGroup {
      ...studyGroupFields
    }
  }
`;
