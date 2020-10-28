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
          pEvent {
            id
            neededOccurrences
            autoAcceptance
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

  mutation DeleteSingleEvent($eventId: String!) {
    deleteEventMutation(eventId: $eventId) {
      response {
        statusCode
        body {
          id
          internalId
        }
      }
    }
  }

  mutation publishSingleEvent($event: PublishEventMutationInput!) {
    publishEventMutation(event: $event) {
      response {
        statusCode
        body {
          id
          internalId
          publicationStatus
        }
        resultText
      }
    }
  }

  mutation EditEvent($event: UpdateEventMutationInput!) {
    updateEventMutation(event: $event) {
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
          pEvent {
            id
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
