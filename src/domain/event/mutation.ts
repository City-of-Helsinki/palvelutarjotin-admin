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

  mutation EditVenue($venue: UpdateVenueMutationInput!) {
    updateVenue(input: $venue) {
      venue {
        id
        hasClothingStorage
        hasSnackEatingPlace
        translations {
          languageCode
          description
        }
      }
    }
  }

  mutation CreateVenue($venue: AddVenueMutationInput!) {
    addVenue(input: $venue) {
      venue {
        id
        hasClothingStorage
        hasSnackEatingPlace
        translations {
          languageCode
          description
        }
      }
    }
  }
`;
