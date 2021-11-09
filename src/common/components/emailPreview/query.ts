import { gql } from '@apollo/client';

export const QUERY_TEMPLATE_CONTEXT = gql`
  query enrolmentTemplateContext($enrolmentId: ID!) {
    enrolment(id: $enrolmentId) {
      id
      studyGroup {
        id
        unitId
        unitName
        unit {
          ... on ExternalPlace {
            name {
              ...localisedFields
            }
          }
          ... on Place {
            internalId
            id
            name {
              ...localisedFields
            }
          }
        }
        person {
          id
          emailAddress
        }
      }
      occurrence {
        id
        startTime
        linkedEvent {
          id
          name {
            ...localisedFields
          }
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
