import gql from 'graphql-tag';

export const QUERY_KEYWORD = gql`
  query Keyword($id: ID!) {
    keyword(id: $id) {
      id
      name {
        fi
        sv
        en
      }
      internalId
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
        id
        name {
          fi
          sv
          en
        }
        internalId
      }
    }
  }
`;
