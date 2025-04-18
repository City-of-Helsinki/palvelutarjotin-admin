import * as Yup from 'yup';

import { VALIDATION_MESSAGE_KEYS } from '../../app/i18n/constants';

export const getMyProfileValidationSchema = (type: 'create' | 'edit') => {
  const commonFormSchema = {
    name: Yup.string().required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED),
    emailAddress: Yup.string()
      .required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED)
      .email(VALIDATION_MESSAGE_KEYS.EMAIL),
    phoneNumber: Yup.string().required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED),
    locations: Yup.array(),
  };

  if (type === 'edit') {
    return Yup.object().shape(commonFormSchema);
  }

  return Yup.object().shape(
    {
      ...commonFormSchema,
      isPrivacyPolicyAccepted: Yup.bool().oneOf(
        [true],
        'myProfileForm.validation.isPrivacyPolicyAccepted'
      ),
      isTermsOfServiceRead: Yup.bool().oneOf(
        [true],
        'myProfileForm.validation.isTermsOfServiceRead'
      ),
      organisations: Yup.array()
        .of(Yup.string())
        .when('organisationProposals', {
          is: (organisationProposals: string) => !organisationProposals,
          then: (schema) =>
            schema
              .required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED)
              .min(1, VALIDATION_MESSAGE_KEYS.STRING_REQUIRED),
          otherwise: (schema) => schema,
        }),
      organisationProposals: Yup.string().when(
        ['organisations'],
        (organisations: string[], schema: Yup.StringSchema) => {
          if (!organisations?.length) {
            return schema.required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED);
          }
          return schema;
        }
      ),
    },
    [['organisations', 'organisationProposals']]
  );
};
