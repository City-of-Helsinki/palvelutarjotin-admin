import isBefore from 'date-fns/isBefore';
import isValidDate from 'date-fns/isValid';
import parseDate from 'date-fns/parse';
import * as Yup from 'yup';

import { DATETIME_FORMAT } from '../../../common/components/datepicker/contants';
import { isTodayOrLater, isValidTime } from '../../../utils/dateUtils';
import formatDate from '../../../utils/formatDate';
import { VALIDATION_MESSAGE_KEYS } from '../../app/i18n/constants';

// TODO: Validate also provideContactInfo.phone field. Sync validation with backend
const createValidationSchemaYup = (
  schema?: Yup.ObjectSchemaDefinition<object>
) =>
  Yup.object().shape({
    name: Yup.string().required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED),
    shortDescription: Yup.string()
      .required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED)
      .max(160, (param) => ({
        max: param.max,
        key: VALIDATION_MESSAGE_KEYS.STRING_MAX,
      })),
    description: Yup.string()
      .required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED)
      .max(5000, (param) => ({
        max: param.max,
        key: VALIDATION_MESSAGE_KEYS.STRING_MAX,
      })),
    infoUrl: Yup.string(),
    enrolmentEndDays: Yup.number()
      .required(VALIDATION_MESSAGE_KEYS.NUMBER_REQUIRED)
      .min(0, (param) => ({
        min: param.min,
        key: VALIDATION_MESSAGE_KEYS.NUMBER_MIN,
      })),
    enrolmentStart: Yup.date()
      .typeError(VALIDATION_MESSAGE_KEYS.DATE)
      .required(VALIDATION_MESSAGE_KEYS.DATE_REQUIRED)
      .test(
        'isTodayOrInTheFuture',
        VALIDATION_MESSAGE_KEYS.DATE_TODAY_OR_LATER,
        isTodayOrLater
      )
      .when(
        ['occurrenceDate', 'occurrenceStartsAt'],
        (
          occurenceDate: Date,
          occurrenceStartsAt: string,
          schema: Yup.DateSchema
        ) => {
          if (isValidDate(occurenceDate)) {
            const isValid = isValidTime(occurrenceStartsAt);
            const occurenceStart = isValid
              ? parseDate(occurrenceStartsAt, 'HH:mm', occurenceDate)
              : occurenceDate;
            return schema.test(
              'isBefore',
              () => ({
                key: VALIDATION_MESSAGE_KEYS.DATE_MAX,
                max: formatDate(occurenceStart, DATETIME_FORMAT),
              }),
              (enrolmentStart: Date) => {
                return enrolmentStart < occurenceStart;
              }
            );
          }
          return schema;
        }
      ),
    neededOccurrences: Yup.number()
      .required(VALIDATION_MESSAGE_KEYS.NUMBER_REQUIRED)
      .min(1, (param) => ({
        min: param.min,
        key: VALIDATION_MESSAGE_KEYS.NUMBER_MIN,
      })),
    keywords: Yup.array()
      .required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED)
      .min(0),
    location: Yup.string().required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED),
    // providerContactInfo: Yup.object().shape({
    //   email: Yup.string().email(VALIDATION_MESSAGE_KEYS.EMAIL),
    //   name: Yup.string().required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED),
    // }),
    image: Yup.string(),
    imagePhotographerName: Yup.string().when('image', {
      is: (image) => image,
      then: Yup.string().required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED),
      otherwise: Yup.string(),
    }),
    imageAltText: Yup.string().when('image', {
      is: (image) => image,
      then: Yup.string().required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED),
      otherwise: Yup.string(),
    }),
    contactPersonId: Yup.string().required(
      VALIDATION_MESSAGE_KEYS.STRING_REQUIRED
    ),
    contactEmail: Yup.string().email(VALIDATION_MESSAGE_KEYS.EMAIL),
    autoAcceptance: Yup.boolean(),
    ...schema,
  });

export const createEventSchema = {
  occurrenceDate: Yup.date()
    .typeError(VALIDATION_MESSAGE_KEYS.DATE)
    .required(VALIDATION_MESSAGE_KEYS.DATE_REQUIRED)
    .test(
      'isTodayOrInTheFuture',
      VALIDATION_MESSAGE_KEYS.DATE_TODAY_OR_LATER,
      isTodayOrLater
    ),
  occurrenceStartsAt: Yup.string()
    .required(VALIDATION_MESSAGE_KEYS.TIME_REQUIRED)
    .test('isValidTime', VALIDATION_MESSAGE_KEYS.TIME, (value: string) =>
      isValidTime(value)
    ),
  occurrenceEndsAt: Yup.string()
    .required(VALIDATION_MESSAGE_KEYS.TIME_REQUIRED)
    .test('isValidTime', VALIDATION_MESSAGE_KEYS.TIME, (value: string) =>
      isValidTime(value)
    )
    // test that occurrenceStartsAt is before endsAt time
    .when(
      ['occurrenceStartsAt'],
      (startsAt: string, schema: Yup.StringSchema) => {
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
      }
    ),
};

export default createValidationSchemaYup;
