import { gql } from '@apollo/client';

export const QUERY_ENROLMENT = gql`
  fragment studyGroupFields on StudyGroupNode {
    id
    groupSize
    amountOfAdult
    name
    groupName
    studyLevels {
      edges {
        node {
          ...studyLevelFields
        }
      }
    }
    extraNeeds
    person {
      ...personFields
    }
  }

  fragment enrolmentFields on EnrolmentNode {
    id
    notificationType
    enrolmentTime
    person {
      ...personFields
    }
    status
    studyGroup {
      ...studyGroupFields
    }
  }

  query Enrolment($id: ID!) {
    enrolment(id: $id) {
      ...enrolmentFields
      occurrence {
        id
        maxGroupSize
        minGroupSize
        pEvent {
          id
          organisation {
            id
          }
        }
      }
    }
  }

  query notificationTemplate(
    $templateType: NotificationTemplateType
    $context: JSONString!
    $language: Language!
  ) {
    notificationTemplate(
      templateType: $templateType
      context: $context
      language: $language
    ) {
      template {
        id
        type
        translations {
          languageCode
          subject
          bodyHtml
          bodyText
          preview
        }
        preview
      }
      customContextPreviewHtml
      customContextPreviewText
    }
  }
`;
