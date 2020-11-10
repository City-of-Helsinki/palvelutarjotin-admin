import { Field, FormikTouched } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';

import DropdownField, {
  Option,
} from '../../../common/components/form/fields/DropdownField';
import TextInputField from '../../../common/components/form/fields/TextInputField';
import FormGroup from '../../../common/components/form/FormGroup';
import { PersonDocument, PersonQuery } from '../../../generated/graphql';
import apolloClient from '../../app/apollo/apolloClient';

const ContactPersonInfoPart: React.FC<{
  contactPersonId: string;
  personOptions: Option[];
  setFieldValue: (
    field: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  touched: FormikTouched<any>;
}> = ({ contactPersonId, personOptions, setFieldValue }) => {
  const { t } = useTranslation();

  const setContactPersonId = async (name: string, value: string) => {
    setFieldValue(name, value);
    if (value && value !== contactPersonId) {
      try {
        const { data } = await apolloClient.query<PersonQuery>({
          query: PersonDocument,
          variables: { id: value },
        });
        setFieldValue('contactEmail', data.person?.emailAddress || '');
        setFieldValue('contactPhoneNumber', data.person?.phoneNumber || '');
      } catch (err) {
        // clear description when error happens
        setFieldValue('contactEmail', '');
        setFieldValue('contactPhoneNumber', '');
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
          labelText={t('eventForm.contactPerson.labelEmail')}
          name="contactEmail"
          component={TextInputField}
        />
      </FormGroup>
      <FormGroup>
        <Field
          labelText={t('eventForm.contactPerson.labelPhone')}
          name="contactPhoneNumber"
          component={TextInputField}
        />
      </FormGroup>
    </>
  );
};

export default ContactPersonInfoPart;
