import { Field, useFormikContext } from 'formik';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import PlaceSelectorField from '../../../common/components/form/fields/PlaceSelectorField';
import useLocale from '../../../hooks/useLocale';
import { Language } from '../../../types';
import VirtualEventCheckboxField from '../../event/eventForm/VirtualEventCheckboxField';
import PlaceInfo from '../../place/placeInfo/PlaceInfo';
import { VENUE_AMENITIES } from '../../venue/utils';
import VenueDataFields from '../../venue/venueDataFields/VenueDataFields';
import styles from '../occurrencePage.module.scss';
import { TimeAndLocationFormFields } from '../types';

const LocationFormPart: React.FC<{ selectedLanguages: Language[] }> = ({
  selectedLanguages,
}) => {
  const { t } = useTranslation();
  const locale = useLocale();

  const {
    values,
    values: { location, locationDescription },
    setFieldValue,
  } = useFormikContext<TimeAndLocationFormFields>();

  React.useEffect(() => {
    // Empty venue descriptions and amenities from form when location is not defined
    if (!location) {
      console.log(values);
      Object.keys(locationDescription).forEach((key) => {
        setFieldValue(`locationDescription.${key as Language}`, '');
      });

      VENUE_AMENITIES.forEach((v) => {
        setFieldValue(v, false);
      });
    }
  }, [location, locationDescription, setFieldValue, values]);

  return (
    <div className={styles.formSection}>
      <div className={styles.formSectionInnerContainer}>
        <div>
          <h2>{t('eventForm.location.title')}</h2>
          <div className={styles.locationSection}>
            <Field
              labelText={t('eventForm.location.labelEventIsHeldVirtual')}
              name="isVirtual"
              component={VirtualEventCheckboxField}
            />
          </div>
          <div className={styles.locationSection}>
            <Field
              helperText={t('eventForm.location.helperLocation')}
              labelText={t('eventForm.location.labelLocation')}
              name="location"
              required
              disabled={values.isVirtual}
              placeholder={t('eventForm.location.placeholderLocation')}
              component={PlaceSelectorField}
            />
          </div>
          {location && (
            <div className={styles.locationSection}>
              <div className={styles.placeInfoContainer}>
                <PlaceInfo id={location} language={locale} />
              </div>
              <VenueDataFields
                locationId={location}
                selectedLanguages={selectedLanguages}
                setFieldValue={setFieldValue}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationFormPart;
