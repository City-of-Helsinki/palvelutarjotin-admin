import * as Yup from 'yup';

import { VALIDATION_MESSAGE_KEYS } from '../../app/i18n/constants';

export default Yup.object().shape(
  {
    isPrivacyPolicyAccepted: Yup.bool().oneOf(
      [true],
      'myProfileForm.validation.isPrivacyPolicyAccepted'
    ),
    isTermsOfServiceRead: Yup.bool().oneOf(
      [true],
      'myProfileForm.validation.isTermsOfServiceRead'
    ),
    name: Yup.string().required(VALIDATION_MESSAGE_KEYS.TIME_REQUIRED),
    organisations: Yup.array().when(
      ['organisationProposals'],
      (organisationProposals: string, schema: Yup.ArraySchema<string>) => {
        if (!organisationProposals) {
          return schema
            .required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED)
            .min(1);
        }
        return schema;
      }
    ),
    organisationProposals: Yup.string().when(
      ['organisations'],
      (organisations: string[], schema: Yup.StringSchema) => {
        if (!organisations?.length) {
          return schema.required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED);
        }
        return schema;
      }
    ),
    phoneNumber: Yup.string().required(VALIDATION_MESSAGE_KEYS.TIME_REQUIRED),
  },
  [['organisations', 'organisationProposals']]
);
