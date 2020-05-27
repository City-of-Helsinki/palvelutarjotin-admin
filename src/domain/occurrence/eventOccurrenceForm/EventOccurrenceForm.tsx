import { Field, Formik } from 'formik';
import { Button } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import DateInputField from '../../../common/components/form/fields/DateInputField';
import DropdownSelectField from '../../../common/components/form/fields/DropdownSelectField';
import NumberInputField from '../../../common/components/form/fields/NumberInputField';
import TimepickerField from '../../../common/components/form/fields/TimepickerField';
import FormGroup from '../../../common/components/form/FormGroup';
import { EVENT_LANGUAGES } from '../../../constants';
import styles from './eventOccurrenceForm.module.scss';
import ValidationSchema from './ValidationSchema';

const EventOccurrenceForm: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{
        date: null,
        startsAt: '',
        endsAt: '',
        location: '',
        locationDescription: '',
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
                    component={DateInputField}
                    timeSelector
                  />
                </FormGroup>
                <FormGroup>
                  <Field
                    labelText={t('eventOccurrenceForm.labelStartsAt')}
                    name="startsAt"
                    component={TimepickerField}
                    minuteInterval={15}
                  />
                </FormGroup>
                <FormGroup>
                  <Field
                    labelText={t('eventOccurrenceForm.labelEndsAt')}
                    name="endsAt"
                    component={TimepickerField}
                    minuteInterval={15}
                  />
                </FormGroup>
              </div>

              <div className={styles.occurrenceFormRow}>
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
