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

export default Yup.object().shape({
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

export const testDateWithEnrolmentValidationSchema = (
  dateField: Yup.DateSchema,
  pEvent: PEventFieldsFragment | undefined,
  schema: Yup.ObjectSchema<object>
) => {
  const { enrolmentStart, enrolmentEndDays } = pEvent ?? {};

  if (!enrolmentStart || !enrolmentEndDays) {
    return schema;
  }

  function testEnrolmentEndDays(
    enrolmentStart: Date,
    enrolmentEndDays: number,
    schema: Yup.DateSchema<Date>
  ) {
    const minDate =
      enrolmentEndDays > 0
        ? addDays(enrolmentStart, enrolmentEndDays)
        : enrolmentStart;
    minDate.setHours(0, 0, 0, 0);
    return schema.min(minDate, () => ({
      key: VALIDATION_MESSAGE_KEYS.DATE_MIN,
      min: formatDate(minDate),
    }));
  }
  return schema.shape({
    date: testEnrolmentEndDays(
      new Date(enrolmentStart),
      enrolmentEndDays,
      dateField
    ),
  });
};
