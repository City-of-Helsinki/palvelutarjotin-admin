import { Field, Formik } from 'formik';
import { Button } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import ErrorMessage from '../../../common/components/form/ErrorMessage';
import CheckboxField from '../../../common/components/form/fields/CheckboxField';
import DropdownMultiselectField from '../../../common/components/form/fields/DropdownMultiselectField';
import TextInputField from '../../../common/components/form/fields/TextInputField';
import FormGroup from '../../../common/components/form/FormGroup';
import HelperText from '../../../common/components/form/HelperText';
import TextTitle from '../../../common/components/textTitle/TextTitle';
import { useOrganisationsQuery } from '../../../generated/graphql';
import { userSelector } from '../../auth/selectors';
import styles from './myProfileForm.module.scss';
import ValidationSchema from './ValidationSchema';

export type MyProfileFormFields = {
  emailAddress: string;
  isPrivacyPolicyAccepted: boolean;
  isTermsOfServiceRead: boolean;
  name: string;
  organisations: string[];
  phoneNumber: string;
};

const defaultInitialValues = {
  emailAddress: '',
  isPrivacyPolicyAccepted: false,
  isTermsOfServiceRead: false,
  name: '',
  organisations: [],
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
      {({ errors, handleSubmit, touched }) => {
        return (
          <form onSubmit={handleSubmit}>
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
                labelText={t('myProfileForm.labelOrganisations')}
                name="organisations"
                helperText={t('myProfileForm.helperOrganisations')}
                buttonText={t('myProfileForm.placeholderOrganisations')}
                component={DropdownMultiselectField}
                options={organisationOptions}
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
                          __html: t('myProfileForm.checkboxPrivacyPolicy'),
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
