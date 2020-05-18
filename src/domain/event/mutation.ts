import gql from 'graphql-tag';

export const MUTATION_EVENT = gql`
  mutation CreateEvent($event: AddEventMutationInput!) {
    addEventMutation(event: $event) {
      response {
        statusCode
        body {
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
          pEvent {
            duration
            neededOccurrences
          }
          infoUrl {
            en
            fi
            sv
          }
        }
      }
    }
  }
`;
