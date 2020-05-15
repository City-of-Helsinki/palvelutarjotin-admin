import gql from 'graphql-tag';

export const QUERY_EVENT = gql`
  query Event($id: ID!, $include: [String]) {
    event(id: $id, include: $include) {
      id
      internalId
      name {
        en
        fi
        sv
      }
      shortDescription {
        en
        fi
        sv
      }
      description {
        en
        fi
        sv
      }
      infoUrl {
        en
        fi
        sv
      }
      pEvent {
        duration
        neededOccurrences
      }
      inLanguage {
        name {
          en
          fi
          sv
        }
      }
      keywords {
        name {
          en
          fi
          sv
        }
      }
      location {
        id
        name {
          en
          fi
          sv
        }
        streetAddress {
          en
          fi
          sv
        }
      }
    }
  }
`;
