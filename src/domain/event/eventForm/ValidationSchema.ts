import reduce from 'lodash/reduce';
import * as Yup from 'yup';

import { Language } from '../../../types';
import { VALIDATION_MESSAGE_KEYS } from '../../app/i18n/constants';

const priceValidation = Yup.string()
  // Price field is a string field which should contain positive numbers
  .matches(/^\d+(\.\d+)?$/, VALIDATION_MESSAGE_KEYS.STRING_POSITIVENUMBER)
  // Price should be required when event is not free
  .required(VALIDATION_MESSAGE_KEYS.NUMBER_REQUIRED);

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
      is: (image: string) => image,
      then: Yup.string().required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED),
      otherwise: Yup.string(),
    }),
    imageAltText: Yup.string().when('image', {
      is: (image: string) => image,
      then: Yup.string().required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED),
      otherwise: Yup.string(),
    }),
    contactPersonId: Yup.string().required(
      VALIDATION_MESSAGE_KEYS.STRING_REQUIRED
    ),
    contactEmail: Yup.string().email(VALIDATION_MESSAGE_KEYS.EMAIL),
    price: Yup.string().when('isFree', {
      is: false,
      then: priceValidation,
    }),
    priceDescription: Yup.object().when('isFree', {
      is: false,
      then: createMultiLanguageValidation(
        selectedLanguages,
        Yup.string().required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED)
      ),
    }),
  });

export default createValidationSchemaYup;
