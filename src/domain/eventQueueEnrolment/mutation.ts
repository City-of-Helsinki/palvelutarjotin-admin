import { gql } from 'graphql-tag';

export const MUTATION_EVENT_QUEUE_ENROLMENT = gql`
  mutation EnrolEventQueue($input: EnrolEventQueueMutationInput!) {
    enrolEventQueue(input: $input) {
      eventQueueEnrolment {
        ...eventQueueEnrolmentFields
      }
    }
  }
`;

export const MUTATION_EVENT_QUEUE_UNENROLMENT = gql`
  mutation UnenrolEventQueue($input: UnenrolEventQueueMutationInput!) {
    unenrolEventQueue(input: $input) {
      pEvent {
        linkedEventId
      }
      studyGroup {
        unitName
      }
    }
  }
`;

export const MUTATION_PICK_ENROLMENT_FROM_QUEUE = gql`
  mutation PickEnrolmentFromQueue(
    $input: PickEnrolmentFromQueueMutationInput!
  ) {
    pickEnrolmentFromQueue(input: $input) {
      enrolment {
        id
        studyGroup {
          unitName
        }
        occurrence {
          pEvent {
            linkedEventId
          }
        }
      }
    }
  }
`;
