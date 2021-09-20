import * as Yup from 'yup';

import { VALIDATION_MESSAGE_KEYS } from '../../app/i18n/constants';

export const getMyProfileValidationSchema = (type: 'create' | 'edit') => {
  const commonFormSchema = {
    name: Yup.string().required(VALIDATION_MESSAGE_KEYS.TIME_REQUIRED),
    phoneNumber: Yup.string().required(VALIDATION_MESSAGE_KEYS.TIME_REQUIRED),
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
      organisations: Yup.array().when(['organisationProposals'], ((
        organisationProposals: string,
        schema: Yup.AnySchema<string[]>
      ) => {
        if (!organisationProposals) {
          return schema
            .required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED)
            .min(1, VALIDATION_MESSAGE_KEYS.STRING_REQUIRED);
        }
        return schema;
      }) as any),
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
