import { Field } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';

import CheckboxField from '../../../common/components/form/fields/CheckboxField';
import TextAreaInputField from '../../../common/components/form/fields/TextAreaInputField';
import FormGroup from '../../../common/components/form/FormGroup';
import { VenueDocument, VenueQuery } from '../../../generated/graphql';
import { Language } from '../../../types';
import apolloClient from '../../app/apollo/apolloClient';
import styles from './venueDataFields.module.scss';

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
          });

          const description = data.venue?.translations.find(
            (t) => (t.languageCode as string).toLowerCase() === selectedLanguage
          );

          setFieldValue('locationDescription', description?.description || '');
          setFieldValue(
            'hasSnackEatingPlace',
            data.venue?.hasSnackEatingPlace || false
          );
          setFieldValue(
            'hasClothingStorage',
            data.venue?.hasClothingStorage || false
          );
        } catch (err) {
          // clear description when error happens
          setFieldValue('locationDescription', '');
        }
      }
    };
    getVenueInfo();
  }, [locationId, setFieldValue, selectedLanguage]);

  return (
    <FormGroup>
      <Field
        helperText={t('venue.venueDataFields.helperLocationDescription')}
        labelText={t('venue.venueDataFields.labelLocationDescription')}
        name="locationDescription"
        placeholder={t('venue.venueDataFields.placeholderLocationDescription')}
        component={TextAreaInputField}
        rows={5}
      />
      <div className={styles.venueCheckboxFields}>
        <Field
          component={CheckboxField}
          name="hasClothingStorage"
          labelText={t('venue.venueDataFields.labelHasClothingStorage')}
        />
        <Field
          component={CheckboxField}
          name="hasSnackEatingPlace"
          labelText={t('venue.venueDataFields.labelHasSnackEatingPlace')}
        />
      </div>
    </FormGroup>
  );
};

export default VenueDataFields;
