import * as Yup from 'yup';

import { VALIDATION_MESSAGE_KEYS } from '../../app/i18n/constants';

export default Yup.object().shape({
  isPrivacyPolicyAccepted: Yup.bool().oneOf(
    [true],
    'myProfileForm.validation.isPrivacyPolicyAccepted'
  ),
  isTermsOfServiceRead: Yup.bool().oneOf(
    [true],
    'myProfileForm.validation.isTermsOfServiceRead'
  ),
  name: Yup.string().required(VALIDATION_MESSAGE_KEYS.TIME_REQUIRED),
  organisations: Yup.array()
    .required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED)
    .min(1),
  phoneNumber: Yup.string().required(VALIDATION_MESSAGE_KEYS.TIME_REQUIRED),
});
