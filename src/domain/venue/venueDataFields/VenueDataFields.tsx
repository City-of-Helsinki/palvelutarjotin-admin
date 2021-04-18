import { Field } from 'formik';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import CheckboxField from '../../../common/components/form/fields/CheckboxField';
import TextAreaInputField from '../../../common/components/form/fields/TextAreaInputField';
import FormGroup from '../../../common/components/form/FormGroup';
import { VenueDocument, VenueQuery } from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import { Language } from '../../../types';
import sortFavorably from '../../../utils/sortFavorably';
import apolloClient from '../../app/apollo/apolloClient';
import styles from './venueDataFields.module.scss';

const VenueDataFields: React.FC<{
  locationId: string;
  selectedLanguages: Language[];
  setFieldValue: (
    field: string,
    value: string | boolean,
    shouldValidate?: boolean | undefined
  ) => void;
}> = ({ locationId, selectedLanguages, setFieldValue }) => {
  const { t } = useTranslation();
  const multipleDescriptionFields = selectedLanguages.length > 1;
  const locale = useLocale();
  const sortedLanguages = sortFavorably(selectedLanguages, [locale]);

  React.useEffect(() => {
    const getVenueInfo = async () => {
      if (locationId) {
        try {
          const { data } = await apolloClient.query<VenueQuery>({
            query: VenueDocument,
            variables: { id: locationId },
          });

          // Inititalize all venue description translation fields
          // (doesn't matter if they are not visible/rendered)
          data.venue?.translations.forEach((t) =>
            setFieldValue(
              `locationDescription.${t.languageCode.toLowerCase() as Language}`,
              t.description || ''
            )
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
          setFieldValue('locationDescription.fi', '');
        }
      }
    };
    getVenueInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationId, setFieldValue]);

  return (
    <FormGroup>
      <div className={styles.locationDescriptionFieldsContainer}>
        {sortedLanguages.map((lang, langIndex) => {
          const showHelperText = langIndex === 0;
          const labelText = multipleDescriptionFields
            ? `${t(
                'venue.venueDataFields.labelLocationDescription'
              )} (${lang.toUpperCase()})`
            : t('venue.venueDataFields.labelLocationDescription');

          return (
            <Field
              key={lang}
              helperText={
                // Do not show description if multiple fields are rendered
                showHelperText
                  ? t('venue.venueDataFields.helperLocationDescription')
                  : null
              }
              labelText={labelText}
              name={`locationDescription.${lang}`}
              placeholder={t(
                'venue.venueDataFields.placeholderLocationDescription'
              )}
              component={TextAreaInputField}
              rows={5}
            />
          );
        })}
      </div>
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
