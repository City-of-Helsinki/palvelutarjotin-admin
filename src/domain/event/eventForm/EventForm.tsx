import { Field, Formik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';

import DropdownMultiselectField from '../../../common/components/form/fields/DropdownMultiselectField';
import DropdownSelectField from '../../../common/components/form/fields/DropdownSelectField';
import KeywordSelectorField from '../../../common/components/form/fields/KeywordSelectorField';
import NumberInputField from '../../../common/components/form/fields/NumberInputField';
import PlaceSelectorField from '../../../common/components/form/fields/PlaceSelectorField';
import TextAreaInputField from '../../../common/components/form/fields/TextAreaInputField';
import TextInputField from '../../../common/components/form/fields/TextInputField';
import FormGroup from '../../../common/components/form/FormGroup';
import PlaceInfo from '../../place/placeInfo/PlaceInfo';
import { EVENT_LANGUAGES } from '../constants';
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
        language: [],
        name: '',
        necessaryVisits: '',
        place: '',
        placeDescription: '',
        providerContactInfo: { email: '', name: '', phone: '' },
        shortDescription: '',
        targetGroup: [],
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

                <div>
                  <FormGroup>
                    <Field
                      component={DropdownMultiselectField}
                      labelText={t('eventForm.basicInfo.labelLanguage')}
                      name="language"
                      options={[
                        ...Object.values(EVENT_LANGUAGES).map((language) => ({
                          label: t(`common.languages.${language}`),
                          value: language,
                        })),
                      ]}
                    />
                  </FormGroup>
                </div>
                {/* TODO: Target group selector will come here when multi-select dropdown component is implemented */}
                <div>
                  <div>
                    <FormGroup>
                      <Field
                        component={DropdownMultiselectField}
                        labelText={t('eventForm.basicInfo.labelTargetGroup')}
                        name="targetGroup"
                        // TODO: Use real data when target groups has been decided
                        options={[
                          { label: 'Option1', value: 'option1' },
                          { label: 'Option2', value: 'option2' },
                          { label: 'Option3', value: 'option3' },
                        ]}
                      />
                    </FormGroup>
                  </div>
                </div>
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
