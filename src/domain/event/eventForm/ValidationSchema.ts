import reduce from 'lodash/reduce';
import * as Yup from 'yup';

import { Language } from '../../../types';
import { VALIDATION_MESSAGE_KEYS } from '../../app/i18n/constants';

const createMultiLanguageValidation = (
  languages: string[],
  rule: Yup.AnySchema
) => {
  return Yup.object().shape(
    reduce(languages, (acc, lang) => ({ ...acc, [lang]: rule }), {})
  );
};

// TODO: Validate also provideContactInfo.phone field. Sync validation with backend
const createValidationSchemaYup = (selectedLanguages: Language[]) =>
  Yup.object().shape({
    name: createMultiLanguageValidation(
      selectedLanguages,
      Yup.string().required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED)
    ),
    shortDescription: createMultiLanguageValidation(
      selectedLanguages,
      Yup.string()
        .required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED)
        .max(160, (param) => ({
          max: param.max,
          key: VALIDATION_MESSAGE_KEYS.STRING_MAX,
        }))
    ),
    description: createMultiLanguageValidation(
      selectedLanguages,
      Yup.string()
        .required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED)
        .max(5000, (param) => ({
          max: param.max,
          key: VALIDATION_MESSAGE_KEYS.STRING_MAX,
        }))
    ),
    infoUrl: createMultiLanguageValidation(selectedLanguages, Yup.string()),
    audience: Yup.array()
      .required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED)
      .min(1, VALIDATION_MESSAGE_KEYS.STRING_REQUIRED),
    categories: Yup.array()
      .required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED)
      .min(1, VALIDATION_MESSAGE_KEYS.STRING_REQUIRED),
    additionalCriteria: Yup.array()
      .required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED)
      .min(1, VALIDATION_MESSAGE_KEYS.STRING_REQUIRED),
    keywords: Yup.array().min(0),
    image: Yup.string(),
    imagePhotographerName: Yup.string().when(
      'image',
      ([image], schema: Yup.StringSchema) => {
        if (image)
          return schema.required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED);
        return schema;
      }
    ),
    imageAltText: Yup.string().when(
      'image',
      ([image], schema: Yup.StringSchema) => {
        if (image)
          return schema.required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED);
        return schema;
      }
    ),
    contactPersonId: Yup.string().required(
      VALIDATION_MESSAGE_KEYS.STRING_REQUIRED
    ),
    contactEmail: Yup.string().email(VALIDATION_MESSAGE_KEYS.EMAIL),
    price: Yup.string().when('isFree', ([isFree], schema: Yup.StringSchema) => {
      if (!isFree)
        return schema.required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED);
      return schema;
    }),
    priceDescription: Yup.object().when('isFree', ([isFree], schema) => {
      if (!isFree)
        return createMultiLanguageValidation(
          selectedLanguages,
          Yup.string().required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED)
        );
      return schema;
    }),
  });

export default createValidationSchemaYup;
