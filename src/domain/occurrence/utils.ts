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
import { EnrolmentType } from './enrolmentInfoFormPart/EnrolmentInfoFormPart';
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
  isVirtual,
}: {
  values: OccurrenceSectionFormFields;
  pEventId: string;
  isVirtual: boolean;
}) => {
  return {
    startTime: values.startTime,
    endTime: values.endTime,
    languages: values.languages.map((lang) => ({ id: lang as Language })),
    pEventId,
    placeId: isVirtual ? VIRTUAL_EVENT_LOCATION_ID : values.occurrenceLocation,
    amountOfSeats: Number(values.amountOfSeats) || 0,
    minGroupSize: Number(values.minGroupSize) || null,
    maxGroupSize: Number(values.maxGroupSize) || null,
    seatType: values.oneGroupFills
      ? SeatType.EnrolmentCount
      : SeatType.ChildrenCount,
  };
};

export const getEnrolmentType = (event: EventFieldsFragment): EnrolmentType => {
  if (event.pEvent.externalEnrolmentUrl) {
    return EnrolmentType.External;
  }
  if (event.pEvent.enrolmentStart) {
    return EnrolmentType.Internal;
  }
  return EnrolmentType.Unenrollable;
};

<<<<<<< HEAD
export const getFormEnrolmentType = (
  event: EventFieldsFragment
): EnrolmentType => {
  if (event.pEvent.externalEnrolmentUrl) {
    return EnrolmentType.External;
  }
  if (event.pEvent.enrolmentStart || !event.location?.id) {
    return EnrolmentType.Internal;
  }
  return EnrolmentType.Unenrollable;
};
=======
>>>>>>> cb70104 (feat(enrolment-type): events enrolment info differs on different enrolment type)

export const getEventQueryVariables = (id: string) => ({
  id,
  include: ['location', 'keywords', 'audience', 'in_language'],
});

// Reused query, helps with refetching
export const useBaseEventQuery: typeof useEventQuery = ({
  variables,
  ...options
} = {}) => {
  return useEventQuery({
    variables: getEventQueryVariables(variables?.id ?? ''),
    ...options,
  });
};

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
    externalEnrolmentUrl,
    enrolmentType,
  } = formValues;
  const eventData = omitTypenames(event);

  const pEventEnrolmentFields = {
    [EnrolmentType.Internal]: {
      enrolmentStart,
      enrolmentEndDays: Number(enrolmentEndDays) || 0,
      neededOccurrences: Number(neededOccurrences) || 0,
      autoAcceptance,
      externalEnrolmentUrl: null,
    },
    [EnrolmentType.External]: {
      enrolmentEndDays: null,
      enrolmentStart: null,
      neededOccurrences: 0,
      autoAcceptance: false,
      externalEnrolmentUrl,
    },
    [EnrolmentType.Unenrollable]: {
      enrolmentEndDays: null,
      enrolmentStart: null,
      neededOccurrences: 0,
      autoAcceptance: false,
      externalEnrolmentUrl: null,
    },
  };

  return {
    name: eventData.name,
    // start_date and offers are mandatory on LinkedEvents to use dummy data
    startTime: eventData.startTime || '',
    // endTime needed
    // eslint-disable-next-line max-len
    // see ticket: https://helsinkisolutionoffice.atlassian.net/secure/RapidBoard.jspa?rapidView=40&projectKey=PT&modal=detail&selectedIssue=PT-437&assignee=557058%3A7f7be94a-c144-45ca-950c-6091dd896255
    endTime: eventData.endTime,
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
      mandatoryAdditionalInformation:
        eventData.pEvent.mandatoryAdditionalInformation,
      ...pEventEnrolmentFields[enrolmentType],
    },
  };
};
