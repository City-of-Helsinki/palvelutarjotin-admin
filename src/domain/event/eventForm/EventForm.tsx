import { Field, Formik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';

import DropdownSelectField from '../../../common/components/form/fields/DropdownSelectField';
import NumberInputField from '../../../common/components/form/fields/NumberInputField';
import PlaceSelectorField from '../../../common/components/form/fields/PlaceSelectorField';
import TextAreaInputField from '../../../common/components/form/fields/TextAreaInputField';
import TextInputField from '../../../common/components/form/fields/TextInputField';
import FormGroup from '../../../common/components/form/FormGroup';
import PlaceInfo from '../../place/placeInfo/PlaceInfo';
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
        place: '',
        placeDescription: '',
        providerContactInfo: { email: '', name: '', phone: '' },
        shortDescription: '',
      }}
      validateOnChange
      onSubmit={(values) => {}}
      validationSchema={ValidationSchema}
    >
      {({ values: { place } }) => {
        return (
          <div className={styles.eventForm}>
            <div className={styles.basicInfoWrapper}>
              <h2>{t('eventForm.basicInfo.title')}</h2>
              <FormGroup>
                <Field
                  labelText={t('eventForm.basicInfo.labelName')}
                  name="name"
                  component={TextInputField}
                />
              </FormGroup>
              <FormGroup>
                <Field
                  labelText={t('eventForm.basicInfo.labelShortDescription')}
                  name="shortDescription"
                  component={TextInputField}
                />
              </FormGroup>
              <FormGroup>
                <Field
                  labelText={t('eventForm.basicInfo.labelDescription')}
                  name="description"
                  component={TextAreaInputField}
                  rows={20}
                />
              </FormGroup>

              {/* TODO: Add image selector component here when implemented */}

              <FormGroup>
                <Field
                  labelText={t('eventForm.basicInfo.labelInfoUrl')}
                  name="infoUrl"
                  component={TextInputField}
                />
              </FormGroup>

              <div className={styles.durationRow}>
                <div>
                  <FormGroup>
                    <Field
                      labelText={t('eventForm.basicInfo.labelDuration')}
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
                      labelText={t('eventForm.basicInfo.labelNecessaryVisits')}
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

              <FormGroup>
                <Field
                  helperText={t('eventForm.location.helperTextPlace')}
                  labelText={t('eventForm.location.labelPlace')}
                  name="place"
                  component={PlaceSelectorField}
                />
              </FormGroup>
              {!!place && (
                <FormGroup>
                  <PlaceInfo id={place} />
                </FormGroup>
              )}
              <FormGroup>
                <Field
                  helperText={t(
                    'eventForm.location.helperTextPlaceDescription'
                  )}
                  labelText={t('eventForm.location.labelPlaceDescription')}
                  name="placeDescription"
                  placeholder={t(
                    'eventForm.location.placeholderPlaceDescription'
                  )}
                  component={TextAreaInputField}
                  rows={5}
                />
              </FormGroup>
            </div>
            <div className={styles.contactInfoWrapper}>
              <h2>{t('eventForm.contactPerson.title')}</h2>
              {/* TODO: Add contact person selector here when dopdown component is implemented */}

              <FormGroup>
                <Field
                  component={DropdownSelectField}
                  labelText={t('eventForm.contactPerson.labelName')}
                  name="providerContactInfo.name"
                  // TODO: Use real data when available from api
                  options={[
                    { label: 'Option1', value: 'option1' },
                    { label: 'Option2', value: 'option2' },
                    { label: 'Option3', value: 'option3' },
                  ]}
                />
              </FormGroup>
              <FormGroup>
                <Field
                  labelText={t('eventForm.contactPerson.labelEmail')}
                  name="providerContactInfo.email"
                  component={TextInputField}
                />
              </FormGroup>
              <FormGroup>
                <Field
                  labelText={t('eventForm.contactPerson.labelPhone')}
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
