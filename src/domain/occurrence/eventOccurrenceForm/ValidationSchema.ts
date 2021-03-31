import { addDays } from 'date-fns';
import isBefore from 'date-fns/isBefore';
import parseDate from 'date-fns/parse';
import * as Yup from 'yup';

import { PEventFieldsFragment } from '../../../generated/graphql';
import { isTodayOrLater, isValidTime } from '../../../utils/dateUtils';
import formatDate from '../../../utils/formatDate';
import { VALIDATION_MESSAGE_KEYS } from '../../app/i18n/constants';

const addMinValidationMessage = (
  param: {
    min: number;
  } & Partial<Yup.TestMessageParams>
) => ({
  min: param.min,
  key: VALIDATION_MESSAGE_KEYS.NUMBER_MIN,
});

const addMaxValidationMessage = (
  param: {
    max: number;
  } & Partial<Yup.TestMessageParams>
) => ({
  max: param.max,
  key: VALIDATION_MESSAGE_KEYS.NUMBER_MAX,
});

const ValidationSchema = Yup.object().shape({
  date: Yup.date()
    .typeError(VALIDATION_MESSAGE_KEYS.DATE)
    .required(VALIDATION_MESSAGE_KEYS.DATE_REQUIRED)
    .test(
      'isTodayOrInTheFuture',
      VALIDATION_MESSAGE_KEYS.DATE_IN_THE_FUTURE,
      isTodayOrLater
    ),
  startsAt: Yup.string()
    .required(VALIDATION_MESSAGE_KEYS.TIME_REQUIRED)
    .test('isValidTime', VALIDATION_MESSAGE_KEYS.TIME, (value: string) =>
      isValidTime(value)
    ),
  endsAt: Yup.string()
    .required(VALIDATION_MESSAGE_KEYS.TIME_REQUIRED)
    .test('isValidTime', VALIDATION_MESSAGE_KEYS.TIME, (value: string) =>
      isValidTime(value)
    )
    // test that startsAt is before endsAt time
    .when(['startsAt'], (startsAt: string, schema: Yup.StringSchema) => {
      if (isValidTime(startsAt)) {
        return schema.test(
          'isBeforeStartTime',
          () => ({
            key: VALIDATION_MESSAGE_KEYS.TIME_MAX,
            min: startsAt,
          }),
          (endsAt: string) => {
            return isValidTime(endsAt)
              ? isBefore(
                  parseDate(startsAt, 'HH:mm', new Date()),
                  parseDate(endsAt, 'HH:mm', new Date())
                )
              : true;
          }
        );
      }
      return schema;
    }),
  amountOfSeats: Yup.number()
    .required(VALIDATION_MESSAGE_KEYS.NUMBER_REQUIRED)
    .when(
      'oneGroupFills',
      (oneGroupFills: boolean, schema: Yup.NumberSchema) => {
        if (oneGroupFills) {
          return schema;
        }
        return schema.min(1, addMinValidationMessage);
      }
    )
    .min(1, addMinValidationMessage),
  minGroupSize: Yup.number()
    .min(1, addMinValidationMessage)
    .when(['maxGroupSize'], (maxGroupSize: number, schema: Yup.NumberSchema) =>
      maxGroupSize ? schema.max(maxGroupSize, addMaxValidationMessage) : schema
    ),
  maxGroupSize: Yup.number()
    .min(1, addMinValidationMessage)
    .when(
      ['amountOfSeats', 'oneGroupFills'],
      (
        amountOfSeats: number,
        oneGroupFills: boolean,
        schema: Yup.NumberSchema
      ) =>
        amountOfSeats && !oneGroupFills
          ? schema.max(amountOfSeats, addMaxValidationMessage)
          : schema
    ),
  oneGroupFills: Yup.boolean(),
});

/**
 * Occurrence date cannot be before the actual enrolment starts
 * and before the occurrence starts, there should be empty days at least for
 * an amount of the enrolmentEndDays field's value.
 */
const testEnrolmentEndDays = (
  enrolmentStart: Date,
  enrolmentEndDays: number,
  schema: Yup.DateSchema<Date>
) => {
  const minDate =
    enrolmentEndDays > 0
      ? addDays(enrolmentStart, enrolmentEndDays)
      : enrolmentStart;
  minDate.setHours(0, 0, 0, 0);
  return schema.min(minDate, () => ({
    key: VALIDATION_MESSAGE_KEYS.DATE_MIN,
    min: formatDate(minDate),
  }));
};

/**
 * The date field validation needs an enrolment start date
 * and the number of days before the enrolment ends
 * from the occurrence's event.
 *
 * NOTE: Since the 2 parameters are not properties of an occurrence, but an event,
 * it is not wanted to add them part of an occurrence domain,
 * so this function is an answer to that.
 */
export const getValidationSchema = (
  pEvent: PEventFieldsFragment | undefined
) => {
  const schema = ValidationSchema;
  const dateField = ValidationSchema.fields.date as Yup.DateSchema;
  const { enrolmentStart, enrolmentEndDays } = pEvent ?? {};

  // They should never be empty when creating an occurrence,
  // but TS forces us to be sure about it.
  if (!enrolmentStart || !enrolmentEndDays) {
    return schema;
  }

  return schema.shape({
    date: testEnrolmentEndDays(
      new Date(enrolmentStart),
      enrolmentEndDays,
      dateField
    ),
  });
};

export default ValidationSchema;
