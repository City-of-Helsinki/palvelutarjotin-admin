import gql from 'graphql-tag';

export const QUERY_EVENT = gql`
  fragment pEventFields on PalvelutarjotinEventNode {
    id
    nextOccurrenceDatetime
    autoAcceptance
    contactPerson {
      ...personFields
    }
    contactEmail
    contactPhoneNumber
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
    paymentInstruction
  }

  fragment localisedFields on LocalisedObject {
    en
    fi
    sv
  }

  fragment offerFields on Offer {
    isFree
    description {
      ...localisedFields
    }
    price {
      ...localisedFields
    }
    infoUrl {
      ...localisedFields
    }
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
    publicationStatus
    datePublished
    endTime
    offers {
      ...offerFields
    }
  }

  query Event($id: ID!, $include: [String]) {
    event(id: $id, include: $include) {
      ...eventFields
      additionalCriteria {
        id
        internalId
        name {
          ...localisedFields
        }
      }
      categories {
        id
        internalId
        name {
          ...localisedFields
        }
      }
    }
  }
`;
