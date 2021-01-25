import isBefore from 'date-fns/isBefore';
import parseDate from 'date-fns/parse';
import * as Yup from 'yup';

import { isTodayOrLater, isValidTime } from '../../../utils/dateUtils';
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
      VALIDATION_MESSAGE_KEYS.DATE_TODAY_OR_LATER,
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
    .min(1, addMinValidationMessage),
  minGroupSize: Yup.number()
    .min(1, addMinValidationMessage)
    .when(['maxGroupSize'], (maxGroupSize: number, schema: Yup.NumberSchema) =>
      maxGroupSize ? schema.max(maxGroupSize, addMaxValidationMessage) : schema
    ),
  maxGroupSize: Yup.number()
    .min(1, addMinValidationMessage)
    .when(
      ['amountOfSeats'],
      (amountOfSeats: number, schema: Yup.NumberSchema) =>
        amountOfSeats
          ? schema.max(amountOfSeats, addMaxValidationMessage)
          : schema
    ),
});
