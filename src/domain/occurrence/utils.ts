import {
  Language,
  OccurrenceFieldsFragment,
  useEventQuery,
} from '../../generated/graphql';
import { OccurrenceFormFields } from './types';
/**
 * Get payload to create/edit occurrence
 * @param {object} values
 * @return {object}
 */
export const getOccurrencePayload = ({
  values,
  pEventId,
}: {
  values: OccurrenceFormFields;
  pEventId: string;
}) => {
  return {
    startTime: values.startTime,
    endTime: values.endTime,
    languages: values.languages.map((lang) => ({ id: lang as Language })),
    pEventId,
    placeId: values.location,
    amountOfSeats: Number(values.amountOfSeats) || 0,
    minGroupSize: Number(values.minGroupSize) || 0,
    maxGroupSize: Number(values.maxGroupSize) || 0,
    // seatType: values.oneGroupFills
    //   ? SeatType.EnrolmentCount
    //   : SeatType.ChildrenCount,
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
      include: ['keywords', 'location'],
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
