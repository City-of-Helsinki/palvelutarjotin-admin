import addDays from 'date-fns/addDays';
import isBefore from 'date-fns/isBefore';
import isValidDate from 'date-fns/isValid';
import parseDate from 'date-fns/parse';
import * as Yup from 'yup';
import { MessageParams } from 'yup/lib/types';

import { isInFuture } from '../../../utils/dateUtils';
import { DATE_FORMAT, formatIntoDateTime } from '../../../utils/time/format';
import {
  isTimeStringBefore,
  isValidDateString,
  isValidTimeString,
  parseDateString,
  parseDateTimeString,
} from '../../../utils/time/utils';
import { VALIDATION_MESSAGE_KEYS } from '../../app/i18n/constants';
import { EnrolmentType } from '../constants';

const addMinValidationMessage = (
  param: {
    min: number;
  } & Partial<MessageParams>
) => ({
  min: param.min,
  key: VALIDATION_MESSAGE_KEYS.NUMBER_MIN,
});

const addMaxValidationMessage = (
  param: {
    max: number;
  } & Partial<MessageParams>
) => ({
  max: param.max,
  key: VALIDATION_MESSAGE_KEYS.NUMBER_MAX,
});

const isValidDateValidation = (value?: string) => {
  if (!value) return false;
  const parsedDate = parseDate(value, DATE_FORMAT, new Date());
  return isValidDate(parsedDate);
};

const getTimeValidation = () => {
  return Yup.string()
    .required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED)
    .test(
      'isValidTime',
      VALIDATION_MESSAGE_KEYS.TIME_INVALID,
      (time?: string) => (time ? isValidTimeString(time) : false)
    );
};

const isAfterEnrolmentStartTime = (
  enrolmentEndDays?: number,
  enrolmentStart?: Date | null
) =>
  ((startTime: string, schema: Yup.StringSchema) => {
    if (
      isValidTimeString(startTime) &&
      enrolmentEndDays != null &&
      enrolmentStart
    ) {
      const minDate =
        enrolmentEndDays > 0
          ? addDays(enrolmentStart, enrolmentEndDays)
          : enrolmentStart;
      return schema.test(
        'isAfterEnrolmentStart',
        () => ({
          key: VALIDATION_MESSAGE_KEYS.DATE_MIN,
          min: formatIntoDateTime(minDate),
        }),
        (startDate?: string) => {
          if (startDate) {
            const startDateString = startDate + ' ' + startTime;
            const startDateObject = parseDateTimeString(startDateString);
            return isBefore(minDate, startDateObject);
          }
          return false;
        }
      );
    }
    return schema;
  }) as any;

const validateIsInFuture = (value?: string) => {
  if (!value) return false;
  const parsedDate = parseDate(value, DATE_FORMAT, new Date());
  return isInFuture(parsedDate);
};

const getValidationSchema = ({
  isVirtual,
  isBookable,
  enrolmentEndDays,
  enrolmentStart,
  enrolmentType,
}: {
  isVirtual?: boolean;
  isBookable?: boolean;
  enrolmentEndDays?: number;
  enrolmentStart?: Date | null;
  enrolmentType: EnrolmentType;
}) =>
  Yup.object().shape({
    occurrenceLocation:
      isVirtual || isBookable
        ? Yup.string()
        : Yup.string().required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED),
    startDate: Yup.string()
      .required(VALIDATION_MESSAGE_KEYS.DATE_REQUIRED)
      .test(
        'isValidDate',
        VALIDATION_MESSAGE_KEYS.DATE_INVALID,
        isValidDateValidation
      )
      .test(
        'isInFuture',
        VALIDATION_MESSAGE_KEYS.DATE_IN_THE_FUTURE,
        validateIsInFuture
      )
      .when(
        'startTime',
        isAfterEnrolmentStartTime(enrolmentEndDays, enrolmentStart)
      ),
    startTime: getTimeValidation(),
    endDate: Yup.string()
      .when('isMultidayOccurrence', {
        is: true,
        then: Yup.string()
          .required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED)
          .test(
            'isValidDate',
            VALIDATION_MESSAGE_KEYS.DATE_INVALID,
            isValidDateValidation
          ),
        otherwise: Yup.string(),
      })
      .when('startDate', ((startDate: string, schema: Yup.StringSchema) => {
        if (isValidDateString(startDate)) {
          return schema.test(
            'isAfterStartDate',
            'eventOccurrenceForm.validation.errorEndDateBeforeStartDate',
            (endDate?: string) => {
              // if endDate is not set or is invalid, ignore this check by returning true (passing)
              if (!endDate || !isValidDateString(endDate)) return true;

              return (
                !!endDate &&
                isValidDateString(endDate) &&
                isBefore(parseDateString(startDate), parseDateString(endDate))
              );
            }
          );
        }
        return schema;
      }) as any),
    endTime: getTimeValidation().when(['startTime', 'isMultidayOccurrence'], ((
      startTime: string,
      isMultidayOccurrence: boolean,
      schema: Yup.StringSchema
    ) => {
      if (startTime && !isMultidayOccurrence) {
        return schema.test(
          'isAfterStartTime',
          'eventOccurrenceForm.validation.errorEndTimeBeforeStartTime',
          (endTime?: string) => {
            if (!endTime) return true;
            if (isValidTimeString(startTime) && isValidTimeString(endTime)) {
              return isTimeStringBefore(startTime, endTime);
            }
            return true;
          }
        );
      }
      return schema;
    }) as any),
    languages: Yup.array()
      .required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED)
      .min(1, VALIDATION_MESSAGE_KEYS.STRING_REQUIRED),
    amountOfSeats:
      enrolmentType === EnrolmentType.Internal
        ? Yup.number()
            .required(VALIDATION_MESSAGE_KEYS.NUMBER_REQUIRED)
            .min(1, addMinValidationMessage)
        : Yup.number(),
    minGroupSize: Yup.number()
      .min(1, addMinValidationMessage)
      .when(
        ['maxGroupSize'],
        (maxGroupSize: number, schema: Yup.NumberSchema) =>
          maxGroupSize
            ? schema.max(maxGroupSize, addMaxValidationMessage)
            : schema
      ),
    maxGroupSize: Yup.number()
      .min(1, addMinValidationMessage)
      .when(['amountOfSeats', 'oneGroupFills'], ((
        amountOfSeats: number,
        oneGroupFills: boolean,
        schema: Yup.NumberSchema
      ) =>
        amountOfSeats && !oneGroupFills
          ? schema.max(amountOfSeats, addMaxValidationMessage)
          : schema) as any),
  });

export default getValidationSchema;
