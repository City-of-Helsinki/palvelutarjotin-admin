import { gql } from '@apollo/client';

export const MUTATION_EVENT = gql`
  mutation CreateEvent($event: AddEventMutationInput!) {
    addEventMutation(event: $event) {
      response {
        statusCode
        body {
          id
          internalId
          name {
            ...localisedFields
          }
          shortDescription {
            ...localisedFields
          }
          description {
            ...localisedFields
          }
          images {
            ...imageFields
          }
          offers {
            ...offerFields
          }
          pEvent {
            id
            neededOccurrences
            autoAcceptance
            autoAcceptanceMessage
          }
          infoUrl {
            ...localisedFields
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
            ...localisedFields
          }
          shortDescription {
            ...localisedFields
          }
          description {
            ...localisedFields
          }
          images {
            ...imageFields
          }
          infoUrl {
            ...localisedFields
          }
          pEvent {
            ...pEventFields
          }
          inLanguage {
            id
            internalId
            name {
              ...localisedFields
            }
          }
          audience {
            ...keywordFields
          }
          keywords {
            ...keywordFields
          }
          startTime
          publicationStatus
          datePublished
          endTime
          offers {
            ...offerFields
          }
        }
      }
    }
  }
`;
