import qgl from 'graphql-tag';

export const MUTATION_EVENT_QUEUE_ENROLMENT = qgl`
  mutation EnrolEventQueueMutation($input: EnrolEventQueueMutationInput!) {
    enrolEventQueue(input: $input) {
      eventQueueEnrolment { 
        ...eventQueueEnrolmentFields
      }
    }
  }
`;

export const MUTATION_EVENT_QUEUE_UNENROLMENT = qgl`
  mutation UnenrolEventQueueMutation($input: UnenrolEventQueueMutationInput!) {
    unenrolEventQueue(input: $input) {
      pEvent{
        linkedEventId
      }
      studyGroup{  
        unitName
      }
    }
  }
`;
