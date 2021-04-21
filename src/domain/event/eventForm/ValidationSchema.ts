import * as Yup from 'yup';

import { SUPPORT_LANGUAGES } from '../../../constants';
import { VALIDATION_MESSAGE_KEYS } from '../../app/i18n/constants';

const priceValidation = Yup.string()
  // Price field is a string field which should contain positive numbers
  .matches(/^\d+(\.\d+)?$/, VALIDATION_MESSAGE_KEYS.STRING_POSITIVENUMBER)
  // Price should be required when event is not free
  .required(VALIDATION_MESSAGE_KEYS.NUMBER_REQUIRED);

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
    audience: Yup.array()
      .required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED)
      .min(0),
    categories: Yup.array()
      .required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED)
      .min(0),
    additionalCriteria: Yup.array()
      .required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED)
      .min(0),
    keywords: Yup.array().min(0),
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
    price: Yup.object().when('isFree', {
      is: false,
      then: Yup.object().shape({
        [SUPPORT_LANGUAGES.FI]: priceValidation,
        [SUPPORT_LANGUAGES.SV]: priceValidation,
        [SUPPORT_LANGUAGES.EN]: priceValidation,
      }),
    }),
    ...schema,
  });

export default createValidationSchemaYup;
