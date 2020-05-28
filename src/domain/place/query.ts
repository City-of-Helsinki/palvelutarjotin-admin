import gql from 'graphql-tag';

export const QUERY_PLACE = gql`
  fragment placeFields on Place {
    id
    internalId
    name {
      ...localisedFields
    }
    streetAddress {
      ...localisedFields
    }
    addressLocality {
      ...localisedFields
    }
    telephone {
      ...localisedFields
    }
  }

  query Place($id: ID!) {
    place(id: $id) {
      ...placeFields
    }
  }
  query Places(
    $dataSource: String
    $divisions: [String]
    $page: Int
    $pageSize: Int
    $showAllPlaces: Boolean
    $sort: String
    $text: String
  ) {
    places(
      dataSource: $dataSource
      divisions: $divisions
      page: $page
      pageSize: $pageSize
      showAllPlaces: $showAllPlaces
      sort: $sort
      text: $text
    ) {
      meta {
        count
        next
        previous
      }
      data {
        ...placeFields
      }
    }
  }
`;
