import formatDate from 'date-fns/format';
import isFuture from 'date-fns/isFuture';
import isValidDate from 'date-fns/isValid';
import parseDate from 'date-fns/parse';
import * as Yup from 'yup';

import { DATETIME_FORMAT } from '../../common/components/datepicker/contants';
import { isValidTime } from '../../utils/dateUtils';
import { VALIDATION_MESSAGE_KEYS } from '../app/i18n/constants';

const ValidationSchema = Yup.object().shape({
  // infoUrl: Yup.string(),
  enrolmentEndDays: Yup.number()
    .required(VALIDATION_MESSAGE_KEYS.NUMBER_REQUIRED)
    .min(0, (param) => ({
      min: param.min,
      key: VALIDATION_MESSAGE_KEYS.NUMBER_MIN,
    })),
  enrolmentStart: Yup.date()
    .typeError(VALIDATION_MESSAGE_KEYS.DATE)
    .required(VALIDATION_MESSAGE_KEYS.DATE_REQUIRED)
    .test('isInTheFuture', VALIDATION_MESSAGE_KEYS.DATE_IN_THE_FUTURE, isFuture)
    .when(
      ['occurrenceDate', 'occurrenceStartsAt'],
      (
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
            (enrolmentStart: Date) => enrolmentStart < occurrenceStart
          );
        }
        return schema;
      }
    ),
  externalEnrolment: Yup.boolean(),
  externalEnrolmentUrl: Yup.string().when('externalEnrolment', {
    is: true,
    then: Yup.string()
      .url(VALIDATION_MESSAGE_KEYS.URL)
      .required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED),
    otherwise: Yup.string(),
  }),
  neededOccurrences: Yup.number()
    .required(VALIDATION_MESSAGE_KEYS.NUMBER_REQUIRED)
    .min(1, (param) => ({
      min: param.min,
      key: VALIDATION_MESSAGE_KEYS.NUMBER_MIN,
    })),
  location: Yup.string().when('isVirtual', {
    is: false,
    then: Yup.string().required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED),
    otherwise: Yup.string(),
  }),
  isVirtual: Yup.boolean(),
  // TODO make this reauired to be true when more than one 1 needed occurrence
  autoAcceptance: Yup.boolean().when('neededOccurrences', {
    is: (val: number) => val > 1,
    then: Yup.bool().oneOf([true]),
    otherwise: Yup.boolean(),
  }),
});

export default ValidationSchema;
