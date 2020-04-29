import { Field, Formik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';

import NumberInputField from '../../../common/components/form/fields/NumberInputField';
import TextAreaInputField from '../../../common/components/form/fields/TextAreaInputField';
import TextInputField from '../../../common/components/form/fields/TextInputField';
import FormGroup from '../../../common/components/form/FormGroup';
import styles from './eventForm.module.scss';
import ValidationSchema from './ValidationSchema';

const EventForm = () => {
  const { t } = useTranslation();
  return (
    <Formik
      initialValues={{
        description: '',
        duration: '',
        name: '',
        necessaryVisits: '',
        providerContactInfo: { email: '', phone: '' },
        shortDescription: '',
      }}
      validateOnChange
      onSubmit={(values) => {}}
      validationSchema={ValidationSchema}
    >
      {() => {
        return (
          <div className={styles.eventForm}>
            <div className={styles.basicInfoWrapper}>
              <h2>{t('eventForm.basicInfo.title')}</h2>
              <FormGroup>
                <Field
                  labelKey="eventForm.basicInfo.labelName"
                  name="name"
                  component={TextInputField}
                />
              </FormGroup>

              <FormGroup>
                <Field
                  labelKey="eventForm.basicInfo.labelShortDescription"
                  name="shortDescription"
                  component={TextInputField}
                />
              </FormGroup>
              <FormGroup>
                <Field
                  labelKey="eventForm.basicInfo.labelDescription"
                  name="description"
                  component={TextAreaInputField}
                  rows={20}
                />
              </FormGroup>

              {/* TODO: Add image selector component here when implemented */}

              <FormGroup>
                <Field
                  labelKey="eventForm.basicInfo.labelInfoUrl"
                  name="infoUrl"
                  component={TextInputField}
                />
              </FormGroup>

              <div className={styles.durationRow}>
                <div>
                  <FormGroup>
                    <Field
                      labelKey="eventForm.basicInfo.labelDuration"
                      name="duration"
                      component={NumberInputField}
                      min={0}
                    />
                  </FormGroup>
                </div>

                {/* TODO: Language selector will come here when multi-select dropdown component is implemented */}
                <div></div>
                {/* TODO: Target group selector will come here when multi-select dropdown component is implemented */}
                <div></div>
              </div>

              <div className={styles.necessaryVisitsRow}>
                <div>
                  <FormGroup>
                    <Field
                      labelKey="eventForm.basicInfo.labelNecessaryVisits"
                      name="necessaryVisits"
                      component={NumberInputField}
                      min={1}
                    />
                  </FormGroup>
                </div>
                <div className={styles.instructionText}>
                  {t('eventForm.basicInfo.textNecessaryVisits')}
                </div>
              </div>
              {/* TODO: Add keyword selector component here when implemented */}

              <h2>{t('eventForm.location.title')}</h2>

              {/* TODO: Add location selector component here when implemented */}
            </div>
            <div className={styles.contactInfoWrapper}>
              <h2>{t('eventForm.contactPerson.title')}</h2>
              {/* TODO: Add contact person selector here when dopdown component is implemented */}

              <FormGroup>
                <Field
                  labelKey="eventForm.contactPerson.labelEmail"
                  name="providerContactInfo.email"
                  component={TextInputField}
                />
              </FormGroup>
              <FormGroup>
                <Field
                  labelKey="eventForm.contactPerson.labelPhone"
                  name="providerContactInfo.phone"
                  component={TextInputField}
                />
              </FormGroup>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default EventForm;
