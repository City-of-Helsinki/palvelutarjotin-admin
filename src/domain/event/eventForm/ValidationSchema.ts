import isFuture from 'date-fns/isFuture';
import * as Yup from 'yup';

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
    duration: Yup.number()
      .required(VALIDATION_MESSAGE_KEYS.NUMBER_REQUIRED)
      .min(0, (param) => ({
        min: param.min,
        key: VALIDATION_MESSAGE_KEYS.NUMBER_MIN,
      })),
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
        'isInTheFuture',
        VALIDATION_MESSAGE_KEYS.DATE_FUTURE,
        (value: Date) => isFuture(value)
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
    ...schema,
  });

export default createValidationSchemaYup;
