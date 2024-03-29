import { gql } from 'graphql-tag';

export const QUERY_EVENT = gql`
  fragment metaFields on Meta {
    count
    next
    previous
  }
  query Events(
    $division: [String]
    $end: String
    $include: [String]
    $inLanguage: String
    $isFree: Boolean
    $keyword: [String]
    $keywordAnd: [String]
    $keywordNot: [String]
    $language: String
    $location: String
    $page: Int
    $pageSize: Int
    $publisher: ID
    $sort: String
    $start: String
    $superEvent: ID
    $superEventType: [String]
    $text: String
    $translation: String
    $showAll: Boolean
    $publicationStatus: String
  ) {
    events(
      division: $division
      end: $end
      include: $include
      inLanguage: $inLanguage
      isFree: $isFree
      keyword: $keyword
      keywordAnd: $keywordAnd
      keywordNot: $keywordNot
      language: $language
      location: $location
      page: $page
      pageSize: $pageSize
      publisher: $publisher
      sort: $sort
      start: $start
      superEvent: $superEvent
      superEventType: $superEventType
      text: $text
      translation: $translation
      showAll: $showAll
      publicationStatus: $publicationStatus
    ) {
      meta {
        ...metaFields
      }
      data {
        ...eventFields
      }
    }
  }
`;
