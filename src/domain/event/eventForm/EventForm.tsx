import { Field, Formik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';

import KeywordSelectorField from '../../../common/components/form/fields/KeywordSelectorField';
import NumberInputField from '../../../common/components/form/fields/NumberInputField';
import PlaceSelectorField from '../../../common/components/form/fields/PlaceSelectorField';
import TextAreaInputField from '../../../common/components/form/fields/TextAreaInputField';
import TextInputField from '../../../common/components/form/fields/TextInputField';
import FormGroup from '../../../common/components/form/FormGroup';
import PlaceInfo from '../../place/placeInfo/PlaceInfo';
import styles from './eventForm.module.scss';
import ImageSelectedFormPart from './ImageSelectedFormPart';
import SelectImageFormPart from './SelectImageFormPart';
import ValidationSchema from './ValidationSchema';

const EventForm = () => {
  const { t } = useTranslation();
  return (
    <Formik
      initialValues={{
        description: '',
        duration: '',
        keywords: [],
        name: '',
        necessaryVisits: '',
        place: '',
        placeDescription: '',
        providerContactInfo: { email: '', phone: '' },
        shortDescription: '',
        // TODO: add image file somewhere to be uploaded (this is only object URL at the moment)
        image: '',
        photographer: '',
        imageAltText: '',
      }}
      validateOnChange
      onSubmit={(values) => {}}
      validationSchema={ValidationSchema}
    >
      {({ values: { place, image }, setFieldValue, setFieldTouched }) => {
        const imageSelected = Boolean(image);
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

              {imageSelected ? (
                <ImageSelectedFormPart
                  image={image}
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                />
              ) : (
                <SelectImageFormPart />
              )}

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
              <FormGroup>
                <Field
                  helperText={t('eventForm.basicInfo.helperTextKeywords')}
                  labelText={t('eventForm.basicInfo.labelKeywords')}
                  name="keywords"
                  placeholder={t('eventForm.basicInfo.placeholderKeywords')}
                  component={KeywordSelectorField}
                />
              </FormGroup>

              <h2>{t('eventForm.location.title')}</h2>

              <FormGroup>
                <Field
                  helperText={t('eventForm.location.helperTextPlace')}
                  labelText={t('eventForm.location.labelPlace')}
                  name="place"
                  placeholder={t('eventForm.location.placeholderPlace')}
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
