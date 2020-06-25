import gql from 'graphql-tag';

export const QUERY_EVENT = gql`
  fragment pEventFields on PalvelutarjotinEventNode {
    id
    contactEmail
    contactPhoneNumber
    duration
    enrolmentEndDays
    enrolmentStart
    neededOccurrences
    organisation {
      ...organisationNodeFields
    }
    occurrences {
      edges {
        node {
          ...occurrenceFields
        }
      }
    }
  }

  fragment localisedFields on LocalisedObject {
    en
    fi
    sv
  }

  fragment eventFields on Event {
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
    location {
      ...placeFields
    }
    venue {
      ...venueFields
    }
    startTime
  }

  query Event($id: ID!, $include: [String]) {
    event(id: $id, include: $include) {
      ...eventFields
    }
  }
`;
