import addDays from 'date-fns/addDays';
import formatDate from 'date-fns/format';
import isBefore from 'date-fns/isBefore';
import isValidDate from 'date-fns/isValid';
import * as Yup from 'yup';

import { isInFuture } from '../../../utils/dateUtils';
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
      min: formatDate(minDate, 'dd.MM.yyyy'),
    }));
  }
  return schema;
};

const getValidationSchema = ({
  isVirtual,
  enrolmentEndDays,
  enrolmentStart,
}: {
  isVirtual?: boolean;
  enrolmentEndDays?: string | number;
  enrolmentStart?: Date | null;
}) =>
  Yup.object().shape({
    occurrenceLocation: isVirtual
      ? Yup.string()
      : Yup.string().required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED),
    startTime: getStartTimeValidation({ enrolmentStart, enrolmentEndDays }),
    endTime: Yup.date()
      .typeError(VALIDATION_MESSAGE_KEYS.DATE)
      .required(VALIDATION_MESSAGE_KEYS.DATE_REQUIRED)
      .when('startTime', (startTime: Date, schema: Yup.DateSchema) => {
        if (isValidDate(startTime)) {
          return schema.test(
            'isAfterStartTime',
            () => ({
              key: VALIDATION_MESSAGE_KEYS.TIME_MIN,
              min: formatDate(startTime, 'dd.MM.yyyy HH:mm'),
            }),
            (endTime: Date) => {
              return isBefore(startTime, endTime);
            }
          );
        }
      }),
    languages: Yup.array()
      .required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED)
      .min(1),
    amountOfSeats: Yup.number()
      .required(VALIDATION_MESSAGE_KEYS.NUMBER_REQUIRED)
      .min(1, addMinValidationMessage),
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
  });

export default getValidationSchema;
