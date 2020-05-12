import gql from 'graphql-tag';

export const QUERY_PLACE = gql`
  query Place($id: ID!) {
    place(id: $id) {
      id
      internalId
      name {
        fi
        sv
        en
      }
      streetAddress {
        fi
        sv
        en
      }
      addressLocality {
        fi
        sv
        en
      }
      telephone {
        fi
        sv
        en
      }
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
        id
        internalId
        name {
          fi
          sv
          en
        }
        streetAddress {
          fi
          sv
          en
        }
        addressLocality {
          fi
          sv
          en
        }
        telephone {
          fi
          sv
          en
        }
      }
    }
  }
`;
