import gql from 'graphql-tag';

export const QUERY_TEMPLATE_CONTEXT = gql`
  query enrolmentTemplateContext($enrolmentId: ID!) {
    enrolment(id: $enrolmentId) {
      id
      studyGroup {
        id
        name
        person {
          id
          emailAddress
        }
      }
      occurrence {
        id
        startTime
        pEvent {
          id
          linkedEventId
        }
      }
    }
  }
`;

export const QUERY_EVENT_NAME = gql`
  query eventName($id: ID!) {
    event(id: $id) {
      id
      name {
        ...localisedFields
      }
    }
  }
`;
