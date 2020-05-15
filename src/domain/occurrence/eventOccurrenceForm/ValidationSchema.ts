import * as Yup from 'yup';

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

export default Yup.object().shape({
  date: Yup.date().required(VALIDATION_MESSAGE_KEYS.DATE_REQUIRED),
  labelEnrolmentStarts: Yup.date().required(
    VALIDATION_MESSAGE_KEYS.DATE_REQUIRED
  ),
  startsAt: Yup.date().required(VALIDATION_MESSAGE_KEYS.TIME_REQUIRED),
  endsAt: Yup.date().required(VALIDATION_MESSAGE_KEYS.TIME_REQUIRED),
  location: Yup.string().required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED),
  locationDescription: Yup.string(),
  eventLanguage: Yup.string().required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED),
  spotsInTotal: Yup.number().required(VALIDATION_MESSAGE_KEYS.NUMBER_REQUIRED),
  minGroupSize: Yup.number()
    .required(VALIDATION_MESSAGE_KEYS.NUMBER_REQUIRED)
    .min(1, addMinValidationMessage)
    .when(['maxGroupSize'], (maxGroupSize: number, schema: Yup.NumberSchema) =>
      maxGroupSize ? schema.max(maxGroupSize, addMaxValidationMessage) : schema
    ),
  maxGroupSize: Yup.number()
    .required(VALIDATION_MESSAGE_KEYS.NUMBER_REQUIRED)
    .min(1, addMinValidationMessage)
    .when(['spotsInTotal'], (spotsInTotal: number, schema: Yup.NumberSchema) =>
      spotsInTotal ? schema.max(spotsInTotal, addMaxValidationMessage) : schema
    ),
  hasPackedLunchEatingPlace: Yup.boolean(),
  hasOuterwearStorage: Yup.boolean(),
});
