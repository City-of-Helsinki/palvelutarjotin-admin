import addDays from 'date-fns/addDays';
import formatDate from 'date-fns/format';
import isBefore from 'date-fns/isBefore';
import isValidDate from 'date-fns/isValid';
import * as Yup from 'yup';
import { MessageParams } from 'yup/lib/types';

import { isInFuture } from '../../../utils/dateUtils';
import { formatIntoDateTime } from '../../../utils/time/format';
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

const getStartTimeValidation = ({
  enrolmentEndDays,
  enrolmentStart,
}: {
  enrolmentEndDays?: string | number;
  enrolmentStart?: Date | null;
}) => {
  const schema = Yup.date()
    .typeError(VALIDATION_MESSAGE_KEYS.DATE)
    .required(VALIDATION_MESSAGE_KEYS.DATE_REQUIRED)
    .test('isInFuture', VALIDATION_MESSAGE_KEYS.DATE_IN_THE_FUTURE, isInFuture);

  if (enrolmentEndDays != null && enrolmentStart) {
    const minDate =
      enrolmentEndDays > 0
        ? addDays(enrolmentStart, enrolmentEndDays as number)
        : new Date(enrolmentStart);
    minDate.setHours(0, 0, 0, 0);
    return schema.min(minDate, () => ({
      key: VALIDATION_MESSAGE_KEYS.DATE_MIN,
      min: formatDate(minDate, 'd.M.yyyy'),
    }));
  }
  return schema;
};

const getValidationSchema = ({
  isVirtual,
  enrolmentEndDays,
  enrolmentStart,
  enrolmentType,
}: {
  isVirtual?: boolean;
  enrolmentEndDays?: string | number;
  enrolmentStart?: Date | null;
  enrolmentType: EnrolmentType;
}) =>
  Yup.object().shape({
    occurrenceLocation: isVirtual
      ? Yup.string()
      : Yup.string().required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED),
    startTime: getStartTimeValidation({ enrolmentStart, enrolmentEndDays }),
    endTime: Yup.date()
      .typeError(VALIDATION_MESSAGE_KEYS.DATE)
      .required(VALIDATION_MESSAGE_KEYS.DATE_REQUIRED)
      .when('startTime', ((startTime: Date, schema: Yup.DateSchema) => {
        if (isValidDate(startTime)) {
          return schema.test(
            'isAfterStartTime',
            () => ({
              key: VALIDATION_MESSAGE_KEYS.TIME_MIN,
              min: formatIntoDateTime(startTime),
            }),
            ((endTime: Date) => {
              return isBefore(startTime, endTime);
            }) as any
          );
        }
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
