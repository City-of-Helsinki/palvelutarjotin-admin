import { Field } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';

import TextAreaInputField from '../../../common/components/form/fields/TextAreaInputField';
import FormGroup from '../../../common/components/form/FormGroup';
import { VenueDocument, VenueQuery } from '../../../generated/graphql';
import { Language } from '../../../types';
import apolloClient from '../../app/apollo/apolloClient';

const VenueDataFields: React.FC<{
  locationId: string;
  selectedLanguage: Language;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
}> = ({ locationId, selectedLanguage, setFieldValue }) => {
  const { t } = useTranslation();

  React.useEffect(() => {
    const getVenueInfo = async () => {
      if (locationId) {
        try {
          const { data } = await apolloClient.query<VenueQuery>({
            query: VenueDocument,
            variables: { id: locationId },
            fetchPolicy: 'network-only',
          });
          const description = data.venue?.translations.find(
            (t) => (t.languageCode as string).toLowerCase() === selectedLanguage
          );
          setFieldValue('locationDescription', description?.description || '');
        } catch (err) {
          // clear description when error happens
          setFieldValue('locationDescription', '');
        }
      }
    };
    getVenueInfo();
  }, [locationId, setFieldValue, selectedLanguage]);

  return (
    <>
      <FormGroup>
        <Field
          helperText={t('eventForm.location.helperLocationDescription')}
          labelText={t('eventForm.location.labelLocationDescription')}
          name="locationDescription"
          placeholder={t('eventForm.location.placeholderLocationDescription')}
          component={TextAreaInputField}
          rows={5}
        />
      </FormGroup>
    </>
  );
};

export default VenueDataFields;
