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
      images {
        id
        internalId
        license
        name
        url
        cropping
        photographerName
        altText
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
        id
        internalId
        name {
          en
          fi
          sv
        }
      }
      audience {
        id
        internalId
        name {
          en
          fi
          sv
        }
      }
      keywords {
        id
        internalId
        name {
          en
          fi
          sv
        }
      }
      location {
        id
        internalId
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
