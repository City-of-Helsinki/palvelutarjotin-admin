import gql from 'graphql-tag';

export const QUERY_ENROLMENT = gql`
  fragment studyGroupFields on StudyGroupNode {
    id
    groupSize
    amountOfAdult
    name
    groupName
    studyLevel
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
      }
    }
  }
`;
