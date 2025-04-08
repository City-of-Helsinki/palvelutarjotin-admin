import * as Yup from 'yup';
import { parse, addDays, isBefore, isValid } from 'date-fns';

import { isInFuture } from '../../../utils/dateUtils';
import { formatIntoDateTime } from '../../../utils/time/format';
import {
  isTimeStringBefore,
  isValidDateString,
  isValidTimeString,
  parseDateString,
  parseDateTimeString,
} from '../../../utils/time/utils';
import { VALIDATION_MESSAGE_KEYS } from '../../app/i18n/constants';
import { EnrolmentType } from '../constants';
import { DATE_FORMAT } from '../../../constants';

const addMinValidationMessage = (param: { min: number }) => ({
  min: param.min,
  key: VALIDATION_MESSAGE_KEYS.NUMBER_MIN,
});

const addMaxValidationMessage = (param: { max: number }) => ({
  max: param.max,
  key: VALIDATION_MESSAGE_KEYS.NUMBER_MAX,
});

const isValidDateValidation = (value?: string) => {
  if (!value) return false;
  const parsedDate = parse(value, DATE_FORMAT, new Date());
  return isValid(parsedDate);
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

const validateIsInFuture = (value?: string) => {
  if (!value) return false;
  const parsedDate = parse(value, DATE_FORMAT, new Date());
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
      .when('startTime', ([startTime], schema: Yup.StringSchema) => {
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
      }),
    startTime: getTimeValidation(),
    endDate: Yup.string()
      .when(
        ['isMultidayOccurrence'],
        ([isMultidayOccurrence], schema: Yup.StringSchema) => {
          return isMultidayOccurrence
            ? schema
                .required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED)
                .test(
                  'isValidDate',
                  VALIDATION_MESSAGE_KEYS.DATE_INVALID,
                  isValidDateValidation
                )
            : schema;
        }
      )
      .when('startDate', ([startDate], schema: Yup.StringSchema) => {
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
      }),
    endTime: getTimeValidation().when(
      ['startTime', 'isMultidayOccurrence'],
      ([startTime, isMultidayOccurrence], schema: Yup.StringSchema) => {
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
      }
    ),
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
      .when(['maxGroupSize'], ([maxGroupSize], schema: Yup.NumberSchema) =>
        maxGroupSize
          ? schema.max(maxGroupSize, addMaxValidationMessage)
          : schema
      ),
    maxGroupSize: Yup.number()
      .min(1, addMinValidationMessage)
      .when(
        ['amountOfSeats', 'oneGroupFills'],
        ([amountOfSeats, oneGroupFills], schema: Yup.NumberSchema) =>
          amountOfSeats && !oneGroupFills
            ? schema.max(amountOfSeats, addMaxValidationMessage)
            : schema
      ),
  });

export default getValidationSchema;
