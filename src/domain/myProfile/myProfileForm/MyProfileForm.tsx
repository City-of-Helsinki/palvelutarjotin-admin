import {
  Field,
  Formik,
  FormikErrors,
  FormikTouched,
  useFormikContext,
} from 'formik';
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
import {
  OrganisationType,
  useOrganisationsQuery,
} from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import { userSelector } from '../../auth/selectors';
import styles from './myProfileForm.module.scss';
import { getMyProfileValidationSchema } from './ValidationSchema';

export type MyProfileEditFormFields = {
  emailAddress: string;
  name: string;
  phoneNumber: string;
};

export type MyProfileCreateFormFields = MyProfileEditFormFields & {
  isPrivacyPolicyAccepted: boolean;
  isTermsOfServiceRead: boolean;
  organisations: string[];
  organisationProposals: string;
};

const defaultCreateInitialValues: MyProfileCreateFormFields = {
  emailAddress: '',
  isPrivacyPolicyAccepted: false,
  isTermsOfServiceRead: false,
  name: '',
  organisations: [],
  organisationProposals: '',
  phoneNumber: '',
};

type FormType = 'create' | 'edit';
type FormFields<T> = T extends 'create'
  ? MyProfileCreateFormFields
  : MyProfileEditFormFields;

interface Props<T extends FormType> {
  buttonText: string;
  initialValues?: FormFields<T>;
  onSubmit: (values: FormFields<T>) => Promise<void>;
  type: T;
  showCheckboxes?: boolean;
}

function MyProfileForm<T extends FormType>({
  buttonText,
  initialValues = defaultCreateInitialValues,
  onSubmit,
  showCheckboxes = false,
  type,
}: Props<T>) {
  const { t } = useTranslation();
  const locale = useLocale();
  const user = useSelector(userSelector);

  const getCreateFields = (
    errors: FormikErrors<MyProfileCreateFormFields>,
    touched: FormikTouched<MyProfileCreateFormFields>
  ) => {
    return (
      <>
        <FormGroup>
          <OrganisationsField
            name="organisations"
            label={t('myProfileForm.labelOrganisations')}
            helper={t('myProfileForm.helperOrganisations')}
            placeholder={t('myProfileForm.placeholderOrganisations')}
          />
          <p className={styles.separator}>
            {t('myProfileForm.textOrganisationSeparator')}
          </p>
          <Field
            name="organisationProposals"
            labelText={t('myProfileForm.labelOrganisationProposals')}
            helperText={t('myProfileForm.helperOrganisationProposals')}
            placeholder={t('myProfileForm.placeholderOrganisationProposals')}
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
              {errors.isTermsOfServiceRead && touched.isTermsOfServiceRead && (
                <ErrorMessage>{t(errors.isTermsOfServiceRead)}</ErrorMessage>
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
      </>
    );
  };

  const handleOnSubmit = (values: FormFields<T>) => {
    onSubmit({
      ...values,
      emailAddress: user?.profile.email || '',
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validateOnChange
      onSubmit={handleOnSubmit}
      validationSchema={getMyProfileValidationSchema(type)}
    >
      {({ errors, handleSubmit, touched }) => {
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

            {type === 'create' &&
              getCreateFields(
                errors as FormikErrors<MyProfileCreateFormFields>,
                touched as FormikTouched<MyProfileCreateFormFields>
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
}

const OrganisationsField: React.FC<{
  name: string;
  label: string;
  helper: string;
  placeholder: string;
}> = ({ name, label, helper, placeholder }) => {
  const { values, setFieldValue } = useFormikContext<
    MyProfileCreateFormFields
  >();
  const { organisationProposals } = values;
  const { data: organisationsData } = useOrganisationsQuery({
    variables: { type: OrganisationType.Provider.toLowerCase() },
  });
  const organisationOptions =
    organisationsData?.organisations?.edges.map((edge) => ({
      label: edge?.node?.name || '',
      value: edge?.node?.id || '',
    })) || [];

  React.useEffect(() => {
    if (!!organisationProposals) {
      setFieldValue(name, []);
    }
  }, [name, organisationProposals, setFieldValue]);

  return (
    <Field
      name={name}
      label={label}
      helper={helper}
      placeholder={placeholder}
      component={MultiDropdownField}
      options={organisationOptions}
      disabled={!!organisationProposals}
    />
  );
};

export default MyProfileForm;
