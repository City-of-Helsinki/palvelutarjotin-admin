import { Field, Formik } from 'formik';
import { Button } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import CheckboxField from '../../../common/components/form/fields/CheckboxField';
import DropdownSelectField from '../../../common/components/form/fields/DropdownSelectField';
import NumberInputField from '../../../common/components/form/fields/NumberInputField';
import PlaceSelectorField from '../../../common/components/form/fields/PlaceSelectorField';
import TextAreaInputField from '../../../common/components/form/fields/TextAreaInputField';
import TextInputField from '../../../common/components/form/fields/TextInputField';
import FormGroup from '../../../common/components/form/FormGroup';
import PlaceInfo from '../../place/placeInfo/PlaceInfo';
import { EVENT_LANGUAGES } from '../../../constants';
import styles from './eventOccurrenceForm.module.scss';
import ValidationSchema from './ValidationSchema';

const EventOccurrenceForm: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{
        date: '',
        startsAt: '',
        endsAt: '',
        location: '',
        locationDescription: '',
        labelEnrolmentStarts: '',
        eventLanguage: '',
        spotsInTotal: 30,
        minGroupSize: 10,
        maxGroupSize: 30,
        hasPackedLunchEatingPlace: false,
        hasOuterwearStorage: false,
      }}
      validateOnChange
      onSubmit={(values) => {}}
      validationSchema={ValidationSchema}
    >
      {({ values: { location }, handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <p className={styles.eventOccurrenceFormTitle}>
              {t('createEventOccurrence.formTitle')}
            </p>

            <div className={styles.eventOccurrenceForm}>
              <div className={styles.occurrenceFormRow}>
                <FormGroup>
                  <Field
                    labelText={t('eventOccurrenceForm.labelDate')}
                    name="date"
                    component={TextInputField} // TODO: Use date picker when component implemented
                  />
                </FormGroup>
                <FormGroup>
                  <Field
                    labelText={t('eventOccurrenceForm.labelStartsAt')}
                    name="startsAt"
                    component={TextInputField} // TODO: Use time picker when component implemented
                  />
                </FormGroup>
                <FormGroup>
                  <Field
                    labelText={t('eventOccurrenceForm.labelEndsAt')}
                    name="endsAt"
                    component={TextInputField} // TODO: Use time picker when component implemented
                  />
                </FormGroup>
                <FormGroup>
                  <Field
                    labelText={t('eventOccurrenceForm.labelEnrolmentStarts')}
                    name="labelEnrolmentStarts"
                    component={TextInputField} // TODO: Use date picker when component implemented
                  />
                </FormGroup>
                <FormGroup>
                  <Field
                    component={DropdownSelectField}
                    labelText={t('eventOccurrenceForm.labelEventLanguage')}
                    name="eventLanguage"
                    // TODO: Use real data when available from api
                    options={[
                      ...Object.values(EVENT_LANGUAGES).map((language) => ({
                        label: t(`common.languages.${language}`),
                        value: language,
                      })),
                    ]}
                  />
                </FormGroup>
              </div>

              <div className={styles.occurrenceFormRow}>
                <p className={styles.participantRowTitle}>
                  {t('eventOccurrenceForm.titleParticipantRow')}:
                </p>
                <FormGroup>
                  <Field
                    labelText={t('eventOccurrenceForm.labelSpotsInTotal')}
                    name="spotsInTotal"
                    component={NumberInputField}
                    min={0}
                  />
                </FormGroup>
                <FormGroup>
                  <Field
                    labelText={t('eventOccurrenceForm.labelGroupSizeMin')}
                    name="minGroupSize"
                    component={NumberInputField}
                    min={0}
                  />
                </FormGroup>
                <FormGroup>
                  <Field
                    labelText={t('eventOccurrenceForm.labelGroupSizeMax')}
                    name="maxGroupSize"
                    component={NumberInputField}
                    min={0}
                  />
                </FormGroup>
              </div>

              <div className={styles.occurrenceFormRow}>
                <div className={styles.locationRow}>
                  <FormGroup>
                    <Field
                      labelText={t('eventOccurrenceForm.labelEventLocation')}
                      name="location"
                      component={PlaceSelectorField}
                    />
                  </FormGroup>
                  {location && (
                    <FormGroup>
                      <PlaceInfo id={location} />
                    </FormGroup>
                  )}
                </div>
              </div>

              <div className={styles.occurrenceFormRow}>
                <div className={styles.locationDescriptionRow}>
                  <FormGroup>
                    <Field
                      helperText={t('eventForm.location.helperTextPlace')}
                      labelText={t(
                        'eventOccurrenceForm.labelLocationDescription'
                      )}
                      name="locationDescription"
                      component={TextAreaInputField}
                      rows={20}
                    />
                  </FormGroup>
                </div>
              </div>

              <div className={styles.checkboxRow}>
                <FormGroup>
                  <Field
                    name="hasPackedLunchEatingPlace"
                    labelText={t(
                      'eventOccurrenceForm.labelPackedLunchEatingPlace'
                    )}
                    component={CheckboxField}
                    type="checkbox"
                  />
                </FormGroup>
                <FormGroup>
                  <Field
                    name="hasOuterwearStorage"
                    labelText={t('eventOccurrenceForm.labelOuterwearStorage')}
                    component={CheckboxField}
                    type="checkbox"
                  />
                </FormGroup>
              </div>

              {/* TODO: Add action handler to buttons */}
              <div className={styles.formActions}>
                <Button variant="secondary">{t('form.actions.cancel')}</Button>
                <Button>{t('form.actions.saveAndAddNew')}</Button>
                <Button type="submit">{t('form.actions.save')}</Button>
              </div>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default EventOccurrenceForm;
