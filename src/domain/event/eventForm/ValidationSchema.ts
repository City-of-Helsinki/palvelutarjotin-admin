import * as Yup from 'yup';

import { VALIDATION_MESSAGE_KEYS } from '../../app/i18n/constants';

// TODO: Validate also provideContactInfo.phone field. Sync validation with backend
export default Yup.object().shape({
  duration: Yup.number().required(VALIDATION_MESSAGE_KEYS.NUMBER_REQUIRED),
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
  infoUrl: Yup.string().url(VALIDATION_MESSAGE_KEYS.URL),
  necessaryVisits: Yup.number()
    .min(1, (param) => ({
      min: param.min,
      key: VALIDATION_MESSAGE_KEYS.NUMBER_MIN,
    }))
    .required(VALIDATION_MESSAGE_KEYS.NUMBER_REQUIRED),
  place: Yup.string().required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED),
  providerContactInfo: Yup.object().shape({
    email: Yup.string().email(VALIDATION_MESSAGE_KEYS.EMAIL),
  }),
});
