import isSameDay from 'date-fns/isSameDay';
import parseDate from 'date-fns/parse';

import { LINKEDEVENTS_CONTENT_TYPE } from '../../constants';
import {
  EventFieldsFragment,
  Language,
  OccurrenceFieldsFragment,
  PalvelutarjotinEventTranslationsInput,
  SeatType,
  useEventQuery,
} from '../../generated/graphql';
import getLinkedEventsInternalId from '../../utils/getLinkedEventsInternalId';
import omitTypenames from '../../utils/omitTypename';
import { DATE_FORMAT, TIME_FORMAT } from '../../utils/time/format';
import { parseDateTimeString } from '../../utils/time/utils';
import {
  BOOKABLE_TO_SCHOOL_LOCATION_ID,
  VIRTUAL_EVENT_LOCATION_ID,
} from '../event/constants';
import { PUBLICATION_STATUS } from '../events/constants';
import { EnrolmentType } from './constants';
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
  isBookable,
}: {
  values: OccurrenceSectionFormFields;
  pEventId: string;
  isVirtual: boolean;
  isBookable: boolean;
}) => {
  return {
    startTime: getDateFromDateAndTimeString(values.startDate, values.startTime),
    endTime: values.isMultidayOccurrence
      ? getDateFromDateAndTimeString(values.endDate, values.endTime)
      : getDateFromDateAndTimeString(values.startDate, values.endTime),
    languages: values.languages.map((lang) => ({ id: lang as Language })),
    pEventId,
    placeId: getPlaceId({ values, isVirtual, isBookable }),
    amountOfSeats: Number(values.amountOfSeats) || 0,
    minGroupSize: Number(values.minGroupSize) || null,
    maxGroupSize: Number(values.maxGroupSize) || null,
    seatType: values.oneGroupFills
      ? SeatType.EnrolmentCount
      : SeatType.ChildrenCount,
  };
};

export const getDateFromDateAndTimeString = (
  dateString: string,
  timeString: string
) => {
  const date = parseDate(dateString, DATE_FORMAT, new Date());
  return parseDate(timeString, TIME_FORMAT, date);
};

export const getPlaceId = ({
  isBookable,
  isVirtual,
  values,
}: {
  isVirtual: boolean;
  isBookable: boolean;
  values: OccurrenceSectionFormFields;
}) => {
  if (isVirtual) {
    return VIRTUAL_EVENT_LOCATION_ID;
  } else if (isBookable) {
    return BOOKABLE_TO_SCHOOL_LOCATION_ID;
  }
  return values.occurrenceLocation;
};

export const isMultidayOccurrence = (
  occurrence: OccurrenceFieldsFragment
): boolean => {
  if (occurrence.startTime && occurrence.endTime) {
    return !isSameDay(
      new Date(occurrence.startTime),
      new Date(occurrence.endTime)
    );
  }

  return false;
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
    autoAcceptanceMessage,
    enrolmentEndDays,
    location,
    enrolmentStartDate,
    enrolmentStartTime,
    isVirtual,
    isBookable,
    neededOccurrences,
    externalEnrolmentUrl,
    enrolmentType,
  } = formValues;
  const eventData = omitTypenames(event);
  const pEventEnrolmentFields = {
    [EnrolmentType.Internal]: {
      enrolmentStart: parseDateTimeString(
        `${enrolmentStartDate} ${enrolmentStartTime}`
      ),
      enrolmentEndDays: Number(enrolmentEndDays) || 0,
      neededOccurrences: Number(neededOccurrences) || 0,
      autoAcceptance,
      translations:
        autoAcceptance && autoAcceptanceMessage
          ? [
              {
                languageCode: Language.Fi,
                autoAcceptanceMessage,
              } as PalvelutarjotinEventTranslationsInput,
            ]
          : [],
      externalEnrolmentUrl: null,
    },
    [EnrolmentType.External]: {
      enrolmentEndDays: null,
      enrolmentStart: null,
      neededOccurrences: 0,
      autoAcceptance: false,
      translations: [],
      externalEnrolmentUrl,
    },
    [EnrolmentType.Unenrollable]: {
      enrolmentEndDays: null,
      enrolmentStart: null,
      neededOccurrences: 0,
      autoAcceptance: false,
      translations: [],
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
        isVirtual
          ? VIRTUAL_EVENT_LOCATION_ID
          : isBookable
            ? BOOKABLE_TO_SCHOOL_LOCATION_ID
            : location
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
