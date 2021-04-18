import { Field } from 'formik';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import CheckboxField from '../../../common/components/form/fields/CheckboxField';
import TextAreaInputField from '../../../common/components/form/fields/TextAreaInputField';
import FormGroup from '../../../common/components/form/FormGroup';
import { VenueDocument, VenueQuery } from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import { Language } from '../../../types';
import apolloClient from '../../app/apollo/apolloClient';
import { getVenueDescription } from '../utils';
import styles from './venueDataFields.module.scss';

const VenueDataFields: React.FC<{
  locationId: string;
  selectedLanguage: Language;
  setFieldValue: (
    field: string,
    value: string | boolean,
    shouldValidate?: boolean | undefined
  ) => void;
}> = ({ locationId, selectedLanguage, setFieldValue }) => {
  const { t } = useTranslation();
  const locale = useLocale();
  React.useEffect(() => {
    const getVenueInfo = async () => {
      if (locationId) {
        try {
          const { data } = await apolloClient.query<VenueQuery>({
            query: VenueDocument,
            variables: { id: locationId },
          });

          const description = getVenueDescription(data.venue);
          setFieldValue(
            `locationDescription.${selectedLanguage}`,
            description[selectedLanguage] ?? ''
          );
          ([
            'hasSnackEatingPlace',
            'hasClothingStorage',
            'outdoorActivity',
            'hasToiletNearby',
            'hasAreaForGroupWork',
            'hasIndoorPlayingArea',
            'hasOutdoorPlayingArea',
          ] as const).forEach((v) => {
            setFieldValue(v, data.venue?.[v] || false);
          });
        } catch (err) {
          // clear description when error happens
          setFieldValue(`locationDescription.${selectedLanguage}`, '');
        }
      }
    };
    getVenueInfo();
  }, [locationId, setFieldValue, selectedLanguage, locale]);

  return (
    <FormGroup>
      <Field
        helperText={t('venue.venueDataFields.helperLocationDescription')}
        labelText={t('venue.venueDataFields.labelLocationDescription')}
        name={`locationDescription.${selectedLanguage}`}
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
        <Field
          component={CheckboxField}
          name="outdoorActivity"
          labelText={t('venue.venueDataFields.labelOutdoorActivity')}
        />
        <Field
          component={CheckboxField}
          name="hasToiletNearby"
          labelText={t('venue.venueDataFields.labelHasToiletNearby')}
        />
        <Field
          component={CheckboxField}
          name="hasAreaForGroupWork"
          labelText={t('venue.venueDataFields.labelHasAreaForGroupWork')}
        />
        <Field
          component={CheckboxField}
          name="hasIndoorPlayingArea"
          labelText={t('venue.venueDataFields.labelHasIndoorPlayingArea')}
        />
        <Field
          component={CheckboxField}
          name="hasOutdoorPlayingArea"
          labelText={t('venue.venueDataFields.labelHasOutdoorPlayingArea')}
        />
      </div>
    </FormGroup>
  );
};

export default VenueDataFields;
