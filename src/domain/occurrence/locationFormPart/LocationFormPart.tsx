import { Field, useFormikContext } from 'formik';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import PlaceSelectorField from '../../../common/components/form/fields/PlaceSelectorField';
import useLocale from '../../../hooks/useLocale';
import { Language } from '../../../types';
import OrderableEventCheckboxField from '../../event/eventForm/OrderableEventCheckboxField';
import VirtualEventCheckboxField from '../../event/eventForm/VirtualEventCheckboxField';
import PlaceInfo from '../../place/placeInfo/PlaceInfo';
import { VENUE_AMENITIES } from '../../venue/utils';
import VenueDataFields from '../../venue/venueDataFields/VenueDataFields';
import styles from '../occurrencePage.module.scss';
import { LocationDescriptions, TimeAndLocationFormFields } from '../types';

const LocationFormPart: React.FC<{ selectedLanguages: Language[] }> = ({
  selectedLanguages,
}) => {
  const { t } = useTranslation();
  const locale = useLocale();

  const {
    values,
    values: { location, locationDescription, isVirtual, isBookable },
    setFieldValue,
  } = useFormikContext<TimeAndLocationFormFields>();

  React.useEffect(() => {
    // Empty venue descriptions and amenities from form when location is not defined
    if (!location) {
      Object.keys(locationDescription).forEach((key) => {
        // check if description is set to avoid unnecessary rerenders
        if (locationDescription[key as keyof LocationDescriptions]) {
          (async () =>
            await setFieldValue(
              `locationDescription.${key as Language}`,
              ''
            ))();
        }
      });

      VENUE_AMENITIES.forEach((amenity) => {
        // check if amenity is checked to avoid unnecessary rerenders
        if (values[amenity]) {
          (async () => await setFieldValue(amenity, false))();
        }
      });
    }
  }, [location, locationDescription, setFieldValue, values]);

  return (
    <div className={styles.formSection}>
      <div className={styles.formSectionInnerContainer}>
        <div>
          <h2>{t('eventForm.location.title')}</h2>
          <div className={styles.locationSection}>
            <div className={styles.locationCheckboxes}>
              <Field
                label={t('eventForm.location.labelEventIsHeldVirtual')}
                name="isVirtual"
                disabled={isBookable}
                component={VirtualEventCheckboxField}
              />
              <Field
                label={t('eventForm.location.labelBookableEvent')}
                name="isBookable"
                disabled={isVirtual}
                component={OrderableEventCheckboxField}
              />
            </div>
          </div>
          <div className={styles.locationSection}>
            <Field
              helperText={t('eventForm.location.helperLocation')}
              labelText={t('eventForm.location.labelLocation')}
              name="location"
              required
              disabled={isVirtual || isBookable}
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
