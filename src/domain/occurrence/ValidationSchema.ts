import formatDate from 'date-fns/format';
import isFuture from 'date-fns/isFuture';
import isValidDate from 'date-fns/isValid';
import parseDate from 'date-fns/parse';
import * as Yup from 'yup';

import { isValidTime } from '../../utils/dateUtils';
import { DATETIME_FORMAT } from '../../utils/time/format';
import { VALIDATION_MESSAGE_KEYS } from '../app/i18n/constants';
import { EnrolmentType } from './constants';

const ValidationSchema = Yup.object().shape({
  // infoUrl: Yup.string(),
  enrolmentEndDays: Yup.number().when(
    ['enrolmentType'],
    (enrolmentType: EnrolmentType, schema: Yup.NumberSchema) => {
      if (enrolmentType !== EnrolmentType.Internal) {
        return schema;
      }
      return schema
        .required(VALIDATION_MESSAGE_KEYS.NUMBER_REQUIRED)
        .min(0, (param) => ({
          min: param.min,
          key: VALIDATION_MESSAGE_KEYS.NUMBER_MIN,
        }));
    }
  ),
  enrolmentStart: Yup.date()
    .when(
      ['enrolmentType'],
      (enrolmentType: EnrolmentType, schema: Yup.DateSchema) => {
        if (enrolmentType !== EnrolmentType.Internal) {
          return schema.nullable();
        }
        return schema
          .required(VALIDATION_MESSAGE_KEYS.DATE_REQUIRED)
          .typeError(VALIDATION_MESSAGE_KEYS.DATE)
          .test(
            'isInTheFuture',
            VALIDATION_MESSAGE_KEYS.DATE_IN_THE_FUTURE,
            isFuture as any
          );
      }
    )
    .when(['occurrenceDate', 'occurrenceStartsAt'], ((
      occurrenceDate: Date,
      occurrenceStartsAt: string,
      schema: Yup.DateSchema
    ) => {
      if (isValidDate(occurrenceDate)) {
        const isValid = isValidTime(occurrenceStartsAt);
        const occurrenceStart = isValid
          ? parseDate(occurrenceStartsAt, 'HH:mm', occurrenceDate)
          : occurrenceDate;
        return schema.test(
          'isBefore',
          () => ({
            key: VALIDATION_MESSAGE_KEYS.DATE_MAX,
            max: formatDate(occurrenceStart, DATETIME_FORMAT),
          }),
          ((enrolmentStart: Date) => enrolmentStart < occurrenceStart) as any
        );
      }
      return schema;
    }) as any),
  externalEnrolmentUrl: Yup.string().when(
    'enrolmentType',
    (enrolmentType: EnrolmentType, schema: Yup.StringSchema) => {
      if (enrolmentType === EnrolmentType.External) {
        return schema.required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED);
      }
      return schema;
    }
  ),
  neededOccurrences: Yup.number().when('enrolmentType', {
    is: EnrolmentType.Internal,
    then: Yup.number()
      .required(VALIDATION_MESSAGE_KEYS.NUMBER_REQUIRED)
      .min(1, (param) => ({
        min: param.min,
        key: VALIDATION_MESSAGE_KEYS.NUMBER_MIN,
      })),
    otherwise: Yup.number().nullable(),
  }),
  location: Yup.string().when(['isVirtual', 'isBookable'], {
    is: (isVirtual: boolean, isBookable: boolean) => isVirtual || isBookable,
    then: Yup.string(),
    otherwise: Yup.string().required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED),
  }),
  isVirtual: Yup.boolean(),
  isBookable: Yup.boolean(),
  // TODO make this reauired to be true when more than one 1 needed occurrence
  autoAcceptance: Yup.boolean().when('neededOccurrences', {
    is: (val: number) => val > 1,
    then: Yup.bool().oneOf([true]),
    otherwise: Yup.boolean(),
  }),
});

export default ValidationSchema;
