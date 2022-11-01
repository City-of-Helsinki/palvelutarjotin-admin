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
import DropdownField, {
  Option,
} from '../../../common/components/form/fields/DropdownField';
import MultiDropdownField from '../../../common/components/form/fields/MultiDropdownField';
import PlaceSelectorField from '../../../common/components/form/fields/PlaceSelectorField';
import TextInputField from '../../../common/components/form/fields/TextInputField';
import FocusToFirstError from '../../../common/components/form/FocusToFirstError';
import FormGroup from '../../../common/components/form/FormGroup';
import HelperText from '../../../common/components/form/HelperText';
import TextTitle from '../../../common/components/textTitle/TextTitle';
import { PRIVACY_POLICY_LINKS, TERMS_OF_SERVICE_SLUGS } from '../../../constants';
import {
  Language,
  OrganisationType,
  useOrganisationsQuery,
} from '../../../generated/graphql';
import { LanguageCodeEnum } from '../../../generated/graphql-cms';
import useLocale from '../../../hooks/useLocale';
import { getCmsPath } from '../../app/routes/utils';
import { userSelector } from '../../auth/selectors';
import styles from './myProfileForm.module.scss';
import { getMyProfileValidationSchema } from './ValidationSchema';

export type MyProfileEditFormFields = {
  emailAddress: string;
  name: string;
  phoneNumber: string;
  language: Language;
  locations: string[];
};

export type MyProfileCreateFormFields = MyProfileEditFormFields & {
  isPrivacyPolicyAccepted: boolean;
  isTermsOfServiceRead: boolean;
  locations: string[];
  organisations: string[];
  organisationProposals: string;
};

export const defaultCreateInitialValues: MyProfileCreateFormFields = {
  emailAddress: '',
  isPrivacyPolicyAccepted: false,
  isTermsOfServiceRead: false,
  name: '',
  organisations: [],
  locations: [],
  organisationProposals: '',
  phoneNumber: '',
  language: Language.Fi,
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
  type,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialValues = defaultCreateInitialValues as any,
  onSubmit,
  showCheckboxes = false,
}: Props<T>) {
  const { t } = useTranslation();
  const locale = useLocale();
  const user = useSelector(userSelector);
  const validationSchema = React.useMemo(
    () => getMyProfileValidationSchema(type),
    [type]
  );
  const languages: Option[] = Object.values(LanguageCodeEnum)?.map(
    (language) => ({
      label: t(`common.languages.${language.toLowerCase()}`),
      value: language as string,
    })
  );

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
            label={t('myProfileForm.labelOrganisationProposals')}
            helperText={t('myProfileForm.helperOrganisationProposals')}
            placeholder={t('myProfileForm.placeholderOrganisationProposals')}
            component={TextInputField}
          />
        </FormGroup>
        {showCheckboxes && (
          <>
            <FormGroup>
              <Field
                label={
                  <span
                    dangerouslySetInnerHTML={{
                      __html: t('myProfileForm.checkboxTermsOfService', {
                        url: getCmsPath(`/${TERMS_OF_SERVICE_SLUGS[locale]}`)
                      }),
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
                label={
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
      emailAddress: values.emailAddress || user?.profile.email || '',
    });
  };

  const initialValuesWithPrefilledEmail = initialValues.emailAddress
    ? initialValues
    : {
        ...initialValues,
        emailAddress: user?.profile.email || '',
      };

  return (
    <Formik
      initialValues={initialValuesWithPrefilledEmail}
      validateOnChange
      onSubmit={handleOnSubmit}
      validationSchema={validationSchema}
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
                label={t('myProfileForm.labelName')}
                name="name"
                helperText={t('myProfileForm.helperName')}
                component={TextInputField}
              />
            </FormGroup>
            <FormGroup>
              <Field
                label={t('myProfileForm.labelContactEmail')}
                name="emailAddress"
                helperText={t('myProfileForm.helperContactEmail')}
                component={TextInputField}
              />
            </FormGroup>
            <FormGroup>
              <Field
                label={t('myProfileForm.labelPhoneNumber')}
                name="phoneNumber"
                helperText={t('myProfileForm.helperPhoneNumber')}
                component={TextInputField}
              />
            </FormGroup>

            <FormGroup>
              <Field
                labelText={t('myProfileForm.labelLocations')}
                name="locations"
                helperText={t('myProfileForm.helperLocations')}
                placeholder={t('myProfileForm.placeholderLocations')}
                component={PlaceSelectorField}
              />
            </FormGroup>

            <FormGroup>
              <Field
                name="language"
                label={t('myProfileForm.labelLanguage')}
                helper={t('myProfileForm.helperLanguage')}
                component={DropdownField}
                options={languages}
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
  const { values, setFieldValue } =
    useFormikContext<MyProfileCreateFormFields>();
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
