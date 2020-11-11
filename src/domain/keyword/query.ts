import gql from 'graphql-tag';

export const QUERY_KEYWORD = gql`
  fragment keywordFields on Keyword {
    id
    name {
      ...localisedFields
    }
    internalId
  }

  query Keyword($id: ID!) {
    keyword(id: $id) {
      ...keywordFields
    }
  }

  query Keywords(
    $dataSource: String
    $page: Int
    $pageSize: Int
    $showAllKeywords: Boolean
    $sort: String
    $text: String
  ) {
    keywords(
      dataSource: $dataSource
      page: $page
      pageSize: $pageSize
      showAllKeywords: $showAllKeywords
      sort: $sort
      text: $text
    ) {
      meta {
        count
        next
        previous
      }
      data {
        ...keywordFields
      }
    }
  }

  query KeywordSet($setType: KeywordSetType!) {
    keywordSet(setType: $setType) {
      keywords {
        ...keywordFields
      }
      name {
        ...localisedFields
      }
      internalId
    }
  }
`;
