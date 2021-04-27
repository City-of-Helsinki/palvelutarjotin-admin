import { LINKEDEVENTS_CONTENT_TYPE } from '../../constants';
import {
  EventFieldsFragment,
  Language,
  OccurrenceFieldsFragment,
  SeatType,
  useEventQuery,
} from '../../generated/graphql';
import getLinkedEventsInternalId from '../../utils/getLinkedEventsInternalId';
import omitTypenames from '../../utils/omitTypename';
import { VIRTUAL_EVENT_LOCATION_ID } from '../event/constants';
import { PUBLICATION_STATUS } from '../events/constants';
import {
  OccurrenceSectionFormFields,
  TimeAndLocationFormFields,
} from './types';
/**
 * Get payload to create/edit occurrence
 * @param {object} values
 * @return {object}
 */
export const getOccurrencePayload = ({
  values,
  pEventId,
}: {
  values: OccurrenceSectionFormFields;
  pEventId: string;
}) => {
  return {
    startTime: values.startTime,
    endTime: values.endTime,
    languages: values.languages.map((lang) => ({ id: lang as Language })),
    pEventId,
    placeId: values.occurrenceLocation,
    amountOfSeats: Number(values.amountOfSeats) || 0,
    minGroupSize: Number(values.minGroupSize) || 0,
    maxGroupSize: Number(values.maxGroupSize) || 0,
    seatType: values.oneGroupFills
      ? SeatType.EnrolmentCount
      : SeatType.ChildrenCount,
  };
};

// Reused query, helps with refetching
export const useBaseEventQuery: typeof useEventQuery = ({
  variables,
  ...options
} = {}) =>
  useEventQuery({
    variables: {
      id: variables?.id ?? '',
      include: ['location', 'keywords', 'audience'],
    },
    ...options,
  });

export const getOccurrenceFields = (
  occurrence: OccurrenceFieldsFragment | undefined | null
) => {
  return occurrence
    ? {
        languages:
          occurrence.languages.edges.map((edge) => edge?.node?.id ?? '') ?? [],
      }
    : {};
};

export const getEditEventPayload = ({
  formValues,
  event,
}: {
  formValues: TimeAndLocationFormFields;
  event: EventFieldsFragment;
}) => {
  const {
    autoAcceptance,
    enrolmentEndDays,
    location,
    enrolmentStart,
    isVirtual,
    neededOccurrences,
  } = formValues;
  const eventData = omitTypenames(event);

  return {
    name: eventData.name,
    // start_date and offers are mandatory on LinkedEvents to use dummy data
    startTime: eventData.startTime || '',
    offers: eventData.offers,
    shortDescription: eventData.shortDescription,
    description: eventData.description,
    images: eventData.images.map((image) => ({ internalId: image.internalId })),
    infoUrl: eventData.infoUrl,
    audience: eventData.audience.map((keyword) => ({
      internalId: keyword.internalId,
    })),
    inLanguage: eventData.inLanguage.map((lang) => ({
      internalId: lang.internalId,
    })),
    keywords: eventData.keywords.map((keyword) => ({
      internalId: keyword.internalId,
    })),
    location: {
      internalId: getLinkedEventsInternalId(
        LINKEDEVENTS_CONTENT_TYPE.PLACE,
        // If event is virtual, we use location id for internet events
        isVirtual ? VIRTUAL_EVENT_LOCATION_ID : location
      ),
    },
    draft: eventData.publicationStatus === PUBLICATION_STATUS.DRAFT,
    organisationId: eventData.pEvent.organisation?.id || '',
    pEvent: {
      contactEmail: eventData.pEvent.contactEmail,
      contactPersonId: eventData.pEvent.contactPerson?.id,
      contactPhoneNumber: eventData.pEvent.contactPhoneNumber,
      enrolmentEndDays: Number(enrolmentEndDays) || 0,
      enrolmentStart,
      neededOccurrences: Number(neededOccurrences) || 0,
      autoAcceptance,
      mandatoryAdditionalInformation:
        eventData.pEvent.mandatoryAdditionalInformation,
    },
    // endTime needed
    // eslint-disable-next-line max-len
    // see ticket: https://helsinkisolutionoffice.atlassian.net/secure/RapidBoard.jspa?rapidView=40&projectKey=PT&modal=detail&selectedIssue=PT-437&assignee=557058%3A7f7be94a-c144-45ca-950c-6091dd896255
    endTime: eventData.endTime,
  };
};
