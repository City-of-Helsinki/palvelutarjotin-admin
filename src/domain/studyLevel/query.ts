import { gql } from '@apollo/client';

export const QUERY_STUDY_LEVEL = gql`
  fragment studyLevelFields on StudyLevelNode {
    id
    label
    level
    translations {
      languageCode
      label
    }
  }

  query StudyLevels {
    studyLevels {
      edges {
        node {
          ...studyLevelFields
        }
      }
    }
  }

  query StudyLevel($id: ID!) {
    studyLevel(id: $id) {
      ...studyLevelFields
    }
  }
`;
