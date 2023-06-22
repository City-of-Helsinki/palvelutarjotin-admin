import { useApolloClient } from '@apollo/client';
import { Field, FormikErrors, useFormikContext } from 'formik';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import CheckboxField from '../../../common/components/form/fields/CheckboxField';
import TextAreaInputField from '../../../common/components/form/fields/TextAreaInputField';
import FormGroup from '../../../common/components/form/FormGroup';
import { VenueDocument, VenueQuery } from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import { Language } from '../../../types';
import sortFavorably from '../../../utils/sortFavorably';
import { TimeAndLocationFormFields } from '../../occurrence/types';
import { VENUE_AMENITIES } from '../utils';
import styles from './venueDataFields.module.scss';

const VenueDataFields: React.FC<{
  locationId: string;
  selectedLanguages: Language[];
  setFieldValue: (
    field: string,
    value: string | boolean,
    shouldValidate?: boolean | undefined
  ) => Promise<void | FormikErrors<TimeAndLocationFormFields>>;
}> = ({ locationId, selectedLanguages, setFieldValue }) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const sortedLanguages = sortFavorably(selectedLanguages, [locale]);
  const apolloClient = useApolloClient();
  const {
    values: { locationDescription },
  } = useFormikContext<TimeAndLocationFormFields>();

  React.useEffect(() => {
    const getVenueInfo = async () => {
      if (locationId) {
        try {
          const { data } = await apolloClient.query<VenueQuery>({
            query: VenueDocument,
            variables: { id: locationId },
          });

          if (data.venue) {
            // Inititalize all venue description translation fields
            // (doesn't matter if they are not visible/rendered)
            data.venue.translations.forEach((t) =>
              (async () =>
                setFieldValue(
                  `locationDescription.${
                    t.languageCode.toLowerCase() as Language
                  }`,
                  t.description || ''
                ))()
            );
          } else {
            // If venue data missing for location, empty all description fields.
            Object.keys(locationDescription).forEach((key) => {
              (async () =>
                setFieldValue(`locationDescription.${key as Language}`, ''))();
            });
          }

          VENUE_AMENITIES.forEach((v) => {
            (async () => setFieldValue(v, data.venue?.[v] || false))();
          });
        } catch (err) {
          // clear description when error happens
          // TODO: fix this to include all languages...
          (async () => setFieldValue('locationDescription.fi', ''))();
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
          const labelText = `${t(
            'venue.venueDataFields.labelLocationDescription'
          )} (${lang.toUpperCase()})`;

          return (
            <Field
              key={lang}
              helperText={
                // Do not show description if multiple fields are rendered
                showHelperText
                  ? t('venue.venueDataFields.helperLocationDescription')
                  : null
              }
              label={labelText}
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
          label={t('venue.venueDataFields.labelHasClothingStorage')}
        />
        <Field
          component={CheckboxField}
          name="hasSnackEatingPlace"
          label={t('venue.venueDataFields.labelHasSnackEatingPlace')}
        />
        <Field
          component={CheckboxField}
          name="outdoorActivity"
          label={t('venue.venueDataFields.labelOutdoorActivity')}
        />
        <Field
          component={CheckboxField}
          name="hasToiletNearby"
          label={t('venue.venueDataFields.labelHasToiletNearby')}
        />
        <Field
          component={CheckboxField}
          name="hasAreaForGroupWork"
          label={t('venue.venueDataFields.labelHasAreaForGroupWork')}
        />
        <Field
          component={CheckboxField}
          name="hasIndoorPlayingArea"
          label={t('venue.venueDataFields.labelHasIndoorPlayingArea')}
        />
        <Field
          component={CheckboxField}
          name="hasOutdoorPlayingArea"
          label={t('venue.venueDataFields.labelHasOutdoorPlayingArea')}
        />
      </div>
    </FormGroup>
  );
};

export default VenueDataFields;
