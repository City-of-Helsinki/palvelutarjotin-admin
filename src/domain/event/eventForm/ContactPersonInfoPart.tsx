import { useApolloClient } from '@apollo/client';
import { Field, FormikErrors, FormikTouched } from 'formik';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import DropdownField, {
  Option,
} from '../../../common/components/form/fields/DropdownField';
import TextInputField from '../../../common/components/form/fields/TextInputField';
import FormGroup from '../../../common/components/form/FormGroup';
import { PersonDocument, PersonQuery } from '../../../generated/graphql';
import { isTestEnv } from '../../../utils/envUtils';

const ContactPersonInfoPart: React.FC<{
  contactPersonId: string;
  personOptions: Option[];
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<void | FormikErrors<any>>;
  touched: FormikTouched<any>;
}> = ({ contactPersonId, personOptions, setFieldValue }) => {
  const { t } = useTranslation();
  const apolloClient = useApolloClient();

  const setContactPersonId = async (name: string, value: string) => {
    await setFieldValue(name, value);
    if (value && value !== contactPersonId) {
      try {
        const { data } = await apolloClient.query<PersonQuery>({
          query: PersonDocument,
          variables: { id: value },
        });
        await setFieldValue('contactEmail', data.person?.emailAddress || '');
        await setFieldValue(
          'contactPhoneNumber',
          data.person?.phoneNumber || ''
        );
      } catch (err) {
        if (isTestEnv()) {
          // eslint-disable-next-line no-console
          console.log(err);
        }
        // clear description when error happens
        await setFieldValue('contactEmail', '');
        await setFieldValue('contactPhoneNumber', '');
      }
    }
  };

  return (
    <>
      <h2>{t('eventForm.contactPerson.title')}</h2>
      <FormGroup>
        <Field
          component={DropdownField}
          label={t('eventForm.contactPerson.labelName')}
          name="contactPersonId"
          required
          multiselect={false}
          options={personOptions}
          setFieldValue={setContactPersonId}
        />
      </FormGroup>
      <FormGroup>
        <Field
          label={t('eventForm.contactPerson.labelEmail')}
          name="contactEmail"
          component={TextInputField}
        />
      </FormGroup>
      <FormGroup>
        <Field
          label={t('eventForm.contactPerson.labelPhone')}
          name="contactPhoneNumber"
          component={TextInputField}
        />
      </FormGroup>
    </>
  );
};

export default ContactPersonInfoPart;
