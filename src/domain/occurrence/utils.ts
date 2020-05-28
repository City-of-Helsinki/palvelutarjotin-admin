import { setHours, setMinutes } from 'date-fns';

import { OccurrenceFormFields } from './eventOccurrenceForm/EventOccurrenceForm';
/**
 * Get payload to create/edit occurrence
 * @param {object} values
 * @return {object}
 */
export const getOccurrencePayload = (
  values: OccurrenceFormFields,
  organisationId = '',
  pEventId = ''
) => {
  const getMinutes = (time: string) => Number(/:(.*)/.exec(time)?.[1]);
  const getHours = (time: string) => Number(/(.*):/.exec(time)?.[1]);

  return {
    startTime: values.date
      ? setHours(
          setMinutes(values.date, getMinutes(values.startsAt)),
          getHours(values.startsAt)
        )
      : new Date(),
    endTime: values.date
      ? setHours(
          setMinutes(values.date, getMinutes(values.endsAt)),
          getHours(values.endsAt)
        )
      : new Date(),
    organisationId,
    pEventId,
    placeId: values.location,
    minGroupSize: Number(values.minGroupSize) || 0,
    maxGroupSize: Number(values.maxGroupSize) || 0,
  };
};
