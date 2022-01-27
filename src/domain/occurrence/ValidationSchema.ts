import isFuture from 'date-fns/isFuture';
import isValidDate from 'date-fns/isValid';
import parseDate from 'date-fns/parse';
import * as Yup from 'yup';

import { DATE_FORMAT } from '../../utils/time/format';
import { isValidTimeString, parseDateTimeString } from '../../utils/time/utils';
import { VALIDATION_MESSAGE_KEYS } from '../app/i18n/constants';
import { EnrolmentType } from './constants';

const isValidDateValidation = (value?: string) => {
  if (!value) return false;
  const parsedDate = parseDate(value, DATE_FORMAT, new Date());
  return isValidDate(parsedDate);
};

const getTimeValidation = () => {
  return Yup.string().when(
    ['enrolmentType'],
    (enrolmentType: EnrolmentType, schema: Yup.StringSchema) => {
      if (enrolmentType !== EnrolmentType.Internal) {
        return schema;
      }
      // if enrolment type is internal, then enrolment start time is required
      return schema
        .required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED)
        .test(
          'isValidTime',
          VALIDATION_MESSAGE_KEYS.TIME_INVALID,
          (time?: string) => (time ? isValidTimeString(time) : false)
        );
    }
  );
};

const ValidationSchema = Yup.object().shape({
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
  enrolmentStartDate: Yup.string().when(
    ['enrolmentType', 'enrolmentStartTime'],
    ((
      enrolmentType: EnrolmentType,
      enrolmentStartTime: string,
      schema: Yup.StringSchema
    ) => {
      if (enrolmentType !== EnrolmentType.Internal) {
        return schema;
      }
      schema = schema
        .required(VALIDATION_MESSAGE_KEYS.DATE_REQUIRED)
        .test(
          'isValidDate',
          VALIDATION_MESSAGE_KEYS.DATE_INVALID,
          isValidDateValidation
        );

      // if user has set start time, combine start date and time to test if it is in future
      if (isValidTimeString(enrolmentStartTime)) {
        schema = schema.test(
          'isInFuture',
          VALIDATION_MESSAGE_KEYS.DATE_IN_THE_FUTURE,
          (value?: string) => {
            return isFuture(
              parseDateTimeString(`${value} ${enrolmentStartTime}`)
            );
          }
        );
      }
      return schema;
    }) as any
  ),
  enrolmentStartTime: getTimeValidation(),
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
