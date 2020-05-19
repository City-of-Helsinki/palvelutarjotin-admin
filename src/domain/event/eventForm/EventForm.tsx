import { Field, Formik } from 'formik';
import { Button } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import DropdownMultiselectField from '../../../common/components/form/fields/DropdownMultiselectField';
// import DropdownSelectField from '../../../common/components/form/fields/DropdownSelectField';
import KeywordSelectorField from '../../../common/components/form/fields/KeywordSelectorField';
import NumberInputField from '../../../common/components/form/fields/NumberInputField';
import PlaceSelectorField from '../../../common/components/form/fields/PlaceSelectorField';
import TextAreaInputField from '../../../common/components/form/fields/TextAreaInputField';
import TextInputField from '../../../common/components/form/fields/TextInputField';
import FormGroup from '../../../common/components/form/FormGroup';
import ConfirmationModal from '../../../common/components/modal/ConfirmationModal';
import { EVENT_LANGUAGES } from '../../../constants';
import { EventQuery } from '../../../generated/graphql';
// import ImageSelectedFormPart from './ImageSelectedFormPart';
// import SelectImageFormPart from './SelectImageFormPart';
import { Language } from '../../../types';
import PlaceInfo from '../../place/placeInfo/PlaceInfo';
import EditEventButtons from '../editEventButtons/EditEventButtons';
import styles from './eventForm.module.scss';
import ValidationSchema from './ValidationSchema';

export type EventFormFields = {
  audience: string[];
  description: string;
  duration: string;
  infoUrl: string;
  inLanguage: string[];
  keywords: string[];
  location: string;
  name: string;
  neededOccurrences: string;
  shortDescription: string;
};

export const defaultInitialValues = {
  audience: [],
  description: '',
  duration: '',
  infoUrl: '',
  inLanguage: [],
  keywords: [],
  location: '',
  name: '',
  neededOccurrences: '',
  shortDescription: '',
};

/**
 * Following fields are missing:
 *  - Image
 *  - Location desciption
 *  - Contact person name
 *  - Contact person email
 *  - Contact person phone
 */

interface Props {
  eventData?: EventQuery;
  initialValues?: EventFormFields;
  onSubmit: (values: EventFormFields) => void;
  selectedLanguage: Language;
  setSelectedLanguage: (language: Language) => void;
  title: string;
}

const EventForm: React.FC<Props> = ({
  eventData,
  initialValues = defaultInitialValues,
  onSubmit,
  selectedLanguage,
  setSelectedLanguage,
  title,
}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [newLanguage, setNewLanguage] = React.useState(selectedLanguage);
  const { t } = useTranslation();

  const openConfirmationModal = (language: Language) => {
    setNewLanguage(language);
    toggleModal();
  };

  const confirmLanguageChange = () => {
    setSelectedLanguage(newLanguage);
    toggleModal();
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validateOnChange
      onSubmit={(values) => {
        onSubmit(values);
      }}
      validationSchema={ValidationSchema}
    >
      {({
        dirty,
        errors,
        handleReset,
        handleSubmit,
        submitCount,
        values: { location },
        // setFieldValue,
        // setFieldTouched,
        touched,
      }) => {
        // const imageSelected = Boolean(image);
        return (
          <>
            <ConfirmationModal
              confirmButtonText={t(
                'eventForm.changeLanguageModal.buttonChangeLanguage'
              )}
              onConfirm={confirmLanguageChange}
              isOpen={isModalOpen}
              title={t('eventForm.changeLanguageModal.title')}
              toggleModal={toggleModal}
            >
              <p>{t('eventForm.changeLanguageModal.text1')}</p>
              <p>{t('eventForm.changeLanguageModal.text2')}</p>
            </ConfirmationModal>
            <EditEventButtons
              dirty={dirty}
              eventData={eventData}
              onClickLanguage={
                dirty ? openConfirmationModal : setSelectedLanguage
              }
              selectedLanguage={selectedLanguage}
            />
            <h1>{title}</h1>
            <form onSubmit={handleSubmit}>
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

                  {/* {imageSelected ? (
                  <ImageSelectedFormPart
                    image={image}
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                  />
                ) : (
                  <SelectImageFormPart />
                )} */}

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
                          labelText={t('eventForm.basicInfo.labelInLanguage')}
                          name="inLanguage"
                          options={[
                            ...Object.values(EVENT_LANGUAGES).map(
                              (language) => ({
                                label: t(`common.languages.${language}`),
                                value: language,
                              })
                            ),
                          ]}
                        />
                      </FormGroup>
                    </div>
                    <div>
                      <FormGroup>
                        <Field
                          component={DropdownMultiselectField}
                          labelText={t('eventForm.basicInfo.labelAudience')}
                          name="audience"
                          // TODO: Add list of audiences later
                          options={[]}
                        />
                      </FormGroup>
                    </div>
                  </div>

                  <div className={styles.neededOccurrencesRow}>
                    <div>
                      <FormGroup>
                        <Field
                          labelText={t(
                            'eventForm.basicInfo.labelNeededOccurrences'
                          )}
                          name="neededOccurrences"
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
                      helperText={t('eventForm.basicInfo.helperKeywords')}
                      labelText={t('eventForm.basicInfo.labelKeywords')}
                      name="keywords"
                      placeholder={t('eventForm.basicInfo.placeholderKeywords')}
                      component={KeywordSelectorField}
                    />
                  </FormGroup>

                  <h2>{t('eventForm.location.title')}</h2>

                  <FormGroup>
                    <Field
                      helperText={t('eventForm.location.helperLocation')}
                      labelText={t('eventForm.location.labelLocation')}
                      name="location"
                      placeholder={t('eventForm.location.placeholderLocation')}
                      component={PlaceSelectorField}
                    />
                  </FormGroup>
                  {!!location && (
                    <FormGroup>
                      <PlaceInfo id={location} />
                    </FormGroup>
                  )}
                  {/* <FormGroup>
                  <Field
                    helperText={t(
                      'eventForm.location.helperLocationDescription'
                    )}
                    labelText={t('eventForm.location.labelLocationDescription')}
                    name="locationDescription"
                    placeholder={t(
                      'eventForm.location.placeholderLocationDescription'
                    )}
                    component={TextAreaInputField}
                    rows={5}
                  />
                </FormGroup> */}
                </div>
                <div className={styles.contactInfoWrapper}>
                  <h2>{t('eventForm.contactPerson.title')}</h2>

                  {/* <FormGroup>
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
                </FormGroup> */}
                </div>
              </div>
              <div className={styles.buttonsWrapper}>
                <Button type="reset" onClick={handleReset} variant="secondary">
                  {t('eventForm.buttonCancel')}
                </Button>
                <Button type="submit">{t('eventForm.buttonSave')}</Button>
              </div>
            </form>
          </>
        );
      }}
    </Formik>
  );
};

export default EventForm;
