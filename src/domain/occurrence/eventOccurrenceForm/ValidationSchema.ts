import formatDate from 'date-fns/format';
import isBefore from 'date-fns/isBefore';
import isFuture from 'date-fns/isFuture';
import isValidDate from 'date-fns/isValid';
import parseDate from 'date-fns/parse';
import * as Yup from 'yup';

import { DATE_FORMAT } from '../../../common/components/datepicker/contants';
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

const validateMaxEnrolmentDate = (date: string, schema: Yup.StringSchema) => {
  const parsedDate = parseDate(date, DATE_FORMAT, new Date());
  if (isValidDate(parsedDate)) {
    return schema.test(
      'isBeforeOccurrenceDate',
      () => ({
        key: VALIDATION_MESSAGE_KEYS.DATE_MAX,
        max: formatDate(parsedDate, DATE_FORMAT),
      }),
      (value: string) => {
        return isBefore(parseDate(value, DATE_FORMAT, new Date()), parsedDate);
      }
    );
  }
  return schema;
};

export default Yup.object().shape({
  date: Yup.string()
    .required(VALIDATION_MESSAGE_KEYS.DATE_REQUIRED)
    .test('isValidDateString', VALIDATION_MESSAGE_KEYS.DATE, (value: string) =>
      isValidDate(parseDate(value, DATE_FORMAT, new Date()))
    )
    .test(
      'isInTheFuture',
      VALIDATION_MESSAGE_KEYS.DATE_FUTURE,
      (value: string) => isFuture(parseDate(value, DATE_FORMAT, new Date()))
    ),
  labelEnrolmentStarts: Yup.string()
    .required(VALIDATION_MESSAGE_KEYS.DATE_REQUIRED)
    .test('isValidDateString', VALIDATION_MESSAGE_KEYS.DATE, (value: string) =>
      isValidDate(parseDate(value, DATE_FORMAT, new Date()))
    )
    .test(
      'isInTheFuture',
      VALIDATION_MESSAGE_KEYS.DATE_FUTURE,
      (value: string) => isFuture(parseDate(value, DATE_FORMAT, new Date()))
    )
    .when(['date'], validateMaxEnrolmentDate),
  startsAt: Yup.date().required(VALIDATION_MESSAGE_KEYS.TIME_REQUIRED),
  endsAt: Yup.date().required(VALIDATION_MESSAGE_KEYS.TIME_REQUIRED),
  location: Yup.string().required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED),
  locationDescription: Yup.string(),
  eventLanguage: Yup.string().required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED),
  spotsInTotal: Yup.number().required(VALIDATION_MESSAGE_KEYS.NUMBER_REQUIRED),
  minGroupSize: Yup.number()
    .required(VALIDATION_MESSAGE_KEYS.NUMBER_REQUIRED)
    .min(1, addMinValidationMessage)
    .when(['maxGroupSize'], (maxGroupSize: number, schema: Yup.NumberSchema) =>
      maxGroupSize ? schema.max(maxGroupSize, addMaxValidationMessage) : schema
    ),
  maxGroupSize: Yup.number()
    .required(VALIDATION_MESSAGE_KEYS.NUMBER_REQUIRED)
    .min(1, addMinValidationMessage)
    .when(['spotsInTotal'], (spotsInTotal: number, schema: Yup.NumberSchema) =>
      spotsInTotal ? schema.max(spotsInTotal, addMaxValidationMessage) : schema
    ),
  hasPackedLunchEatingPlace: Yup.boolean(),
  hasOuterwearStorage: Yup.boolean(),
});
