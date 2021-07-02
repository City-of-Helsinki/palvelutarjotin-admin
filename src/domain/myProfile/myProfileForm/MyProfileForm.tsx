import { Field, Formik } from 'formik';
import { Button } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import ErrorMessage from '../../../common/components/form/ErrorMessage';
import CheckboxField from '../../../common/components/form/fields/CheckboxField';
import MultiDropdownField from '../../../common/components/form/fields/MultiDropdownField';
import TextInputField from '../../../common/components/form/fields/TextInputField';
import FocusToFirstError from '../../../common/components/form/FocusToFirstError';
import FormGroup from '../../../common/components/form/FormGroup';
import HelperText from '../../../common/components/form/HelperText';
import TextTitle from '../../../common/components/textTitle/TextTitle';
import { PRIVACY_POLICY_LINKS } from '../../../constants';
import { useOrganisationsQuery } from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import { userSelector } from '../../auth/selectors';
import styles from './myProfileForm.module.scss';
import ValidationSchema from './ValidationSchema';

export type MyProfileFormFields = {
  emailAddress: string;
  isPrivacyPolicyAccepted: boolean;
  isTermsOfServiceRead: boolean;
  name: string;
  organisations: string[];
  organisationProposals: string;
  phoneNumber: string;
};

const defaultInitialValues = {
  emailAddress: '',
  isPrivacyPolicyAccepted: false,
  isTermsOfServiceRead: false,
  name: '',
  organisations: [],
  organisationProposals: '',
  phoneNumber: '',
};

interface Props {
  buttonText: string;
  initialValues?: MyProfileFormFields;
  onSubmit: (values: MyProfileFormFields) => void;
  showCheckboxes?: boolean;
}

const MyProfileForm: React.FC<Props> = ({
  buttonText,
  initialValues = defaultInitialValues,
  onSubmit,
  showCheckboxes = false,
}) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const { data: organisationsData } = useOrganisationsQuery();
  const user = useSelector(userSelector);

  const organisationOptions =
    organisationsData?.organisations?.edges.map((edge) => ({
      label: edge?.node?.name || '',
      value: edge?.node?.id || '',
    })) || [];

  return (
    <Formik
      initialValues={initialValues}
      validateOnChange
      onSubmit={(values, e) => {
        onSubmit({ ...values, emailAddress: user?.profile.email || '' });
      }}
      validationSchema={ValidationSchema}
    >
      {({ errors, handleSubmit, touched, values }) => {
        return (
          <form onSubmit={handleSubmit}>
            <FocusToFirstError />
            <FormGroup>
              <TextTitle>{t('myProfileForm.labelEmail')}</TextTitle>
              <p>{user?.profile.email}</p>
              <HelperText>{t('myProfileForm.helperEmail')}</HelperText>
            </FormGroup>
            <FormGroup>
              <Field
                labelText={t('myProfileForm.labelName')}
                name="name"
                helperText={t('myProfileForm.helperName')}
                component={TextInputField}
              />
            </FormGroup>
            <FormGroup>
              <Field
                labelText={t('myProfileForm.labelPhoneNumber')}
                name="phoneNumber"
                helperText={t('myProfileForm.helperPhoneNumber')}
                component={TextInputField}
              />
            </FormGroup>
            <FormGroup>
              <Field
                name="organisations"
                label={t('myProfileForm.labelOrganisations')}
                helper={t('myProfileForm.helperOrganisations')}
                placeholder={t('myProfileForm.placeholderOrganisations')}
                component={MultiDropdownField}
                options={organisationOptions}
              />
              <p className={styles.separator}>
                {t('myProfileForm.textOrganisationSeparator')}
              </p>
              <Field
                name="organisationProposals"
                labelText={t('myProfileForm.labelOrganisationProposals')}
                helperText={t('myProfileForm.helperOrganisationProposals')}
                placeholder={t(
                  'myProfileForm.placeholderOrganisationProposals'
                )}
                component={TextInputField}
              />
            </FormGroup>
            {showCheckboxes && (
              <>
                <FormGroup>
                  <Field
                    labelText={
                      <span
                        dangerouslySetInnerHTML={{
                          __html: t('myProfileForm.checkboxTermsOfService'),
                        }}
                      />
                    }
                    name="isTermsOfServiceRead"
                    component={CheckboxField}
                  />
                  {errors.isTermsOfServiceRead &&
                    touched.isTermsOfServiceRead && (
                      <ErrorMessage>
                        {t(errors.isTermsOfServiceRead)}
                      </ErrorMessage>
                    )}
                </FormGroup>
                <FormGroup>
                  <Field
                    labelText={
                      <span
                        dangerouslySetInnerHTML={{
                          __html: t('myProfileForm.checkboxPrivacyPolicy', {
                            url: PRIVACY_POLICY_LINKS[locale],
                          }),
                        }}
                      />
                    }
                    name="isPrivacyPolicyAccepted"
                    component={CheckboxField}
                  />
                  {errors.isPrivacyPolicyAccepted &&
                    touched.isPrivacyPolicyAccepted && (
                      <ErrorMessage>
                        {t(errors.isPrivacyPolicyAccepted)}
                      </ErrorMessage>
                    )}
                </FormGroup>
              </>
            )}

            <div className={styles.buttonWrapper}>
              <Button fullWidth={true} type="submit">
                {buttonText}
              </Button>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default MyProfileForm;
