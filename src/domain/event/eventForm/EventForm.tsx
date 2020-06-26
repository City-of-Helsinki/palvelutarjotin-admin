import { Field, Formik } from 'formik';
import { Button } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import CheckboxField from '../../../common/components/form/fields/CheckboxField';
import DateInputField from '../../../common/components/form/fields/DateInputField';
import DropdownField from '../../../common/components/form/fields/DropdownField';
import KeywordSelectorField from '../../../common/components/form/fields/KeywordSelectorField';
import NumberInputField from '../../../common/components/form/fields/NumberInputField';
import PlaceSelectorField from '../../../common/components/form/fields/PlaceSelectorField';
import TextAreaInputField from '../../../common/components/form/fields/TextAreaInputField';
import TextInputField from '../../../common/components/form/fields/TextInputField';
import FormGroup from '../../../common/components/form/FormGroup';
import ConfirmationModal from '../../../common/components/modal/ConfirmationModal';
import { EVENT_LANGUAGES } from '../../../constants';
import { EventQuery, PersonFieldsFragment } from '../../../generated/graphql';
import { Language } from '../../../types';
import PlaceInfo from '../../place/placeInfo/PlaceInfo';
import EditEventButtons from '../editEventButtons/EditEventButtons';
import styles from './eventForm.module.scss';
import ImageSelectedFormPart from './ImageSelectedFormPart';
import SelectImageFormPart from './SelectImageFormPart';
import ValidationSchema from './ValidationSchema';
import VenueInfoFormPart from './VenueInfoFormPart';

export type EventFormFields = {
  audience: string[];
  contactEmail: string;
  contactPersonId: string;
  contactPhoneNumber: string;
  description: string;
  duration: string;
  enrolmentEndDays: string;
  enrolmentStart: Date | null;
  image: string;
  imageAltText: string;
  imagePhotographerName: string;
  infoUrl: string;
  inLanguage: string[];
  isFree: boolean;
  keywords: string[];
  location: string;
  name: string;
  neededOccurrences: string;
  price: string;
  shortDescription: string;
  locationDescription: string;
  hasClothingStorage: boolean;
  hasSnackEatingPlace: boolean;
};

export const defaultInitialValues: EventFormFields = {
  audience: [],
  contactEmail: '',
  contactPersonId: '',
  contactPhoneNumber: '',
  description: '',
  duration: '',
  enrolmentEndDays: '',
  enrolmentStart: null,
  image: '',
  imageAltText: '',
  imagePhotographerName: '',
  infoUrl: '',
  inLanguage: [],
  isFree: true,
  keywords: [],
  location: '',
  name: '',
  neededOccurrences: '',
  price: '',
  shortDescription: '',
  locationDescription: '',
  hasClothingStorage: false,
  hasSnackEatingPlace: false,
};

interface Props {
  eventData?: EventQuery;
  initialValues?: EventFormFields;
  onCancel: () => void;
  onSubmit: (values: EventFormFields) => void;
  persons: PersonFieldsFragment[];
  selectedLanguage: Language;
  setSelectedLanguage: (language: Language) => void;
  title: string;
}

const EventForm: React.FC<Props> = ({
  eventData,
  initialValues = defaultInitialValues,
  onCancel,
  onSubmit,
  persons,
  selectedLanguage,
  setSelectedLanguage,
  title,
}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [newLanguage, setNewLanguage] = React.useState(selectedLanguage);
  const { t } = useTranslation();

  const personOptions = React.useMemo(
    () => [
      ...persons.map((person) => ({
        label: person.name,
        value: person.id,
      })),
    ],
    [persons]
  );

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
      onSubmit={(values, e) => {
        onSubmit(values);
      }}
      validationSchema={ValidationSchema}
    >
      {({
        dirty,
        handleSubmit,
        values: { image, location },
        setFieldValue,
        setFieldTouched,
      }) => {
        const imageSelected = Boolean(image);
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

                  {imageSelected ? (
                    <ImageSelectedFormPart
                      imageId={image}
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
                          labelText={t(
                            'eventForm.basicInfo.labelEnrolmentStart'
                          )}
                          name="enrolmentStart"
                          component={DateInputField}
                          timeSelector={true}
                        />
                      </FormGroup>
                    </div>
                    <div>
                      <FormGroup>
                        <Field
                          labelText={t(
                            'eventForm.basicInfo.labelEnrolmentEndDays'
                          )}
                          name="enrolmentEndDays"
                          component={NumberInputField}
                          min={0}
                        />
                      </FormGroup>
                    </div>
                  </div>

                  <h2>{t('eventForm.categorisation.title')}</h2>
                  <div className={styles.languageRow}>
                    <div>
                      <FormGroup>
                        <Field
                          component={DropdownField}
                          label={t('eventForm.categorisation.labelInLanguage')}
                          name="inLanguage"
                          multiselect={true}
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
                          component={DropdownField}
                          label={t('eventForm.categorisation.labelAudience')}
                          name="audience"
                          multiselect={true}
                          // TODO: Add list of audiences later
                          options={[]}
                        />
                      </FormGroup>
                    </div>
                  </div>
                  <FormGroup>
                    <Field
                      helperText={t('eventForm.categorisation.helperKeywords')}
                      labelText={t('eventForm.categorisation.labelKeywords')}
                      name="keywords"
                      placeholder={t(
                        'eventForm.categorisation.placeholderKeywords'
                      )}
                      component={KeywordSelectorField}
                    />
                  </FormGroup>

                  <div className={styles.priceRow}>
                    <div>
                      <FormGroup>
                        <Field
                          disabled
                          labelText={t('eventForm.categorisation.labelPrice')}
                          name="price"
                          component={TextInputField}
                        />
                      </FormGroup>
                    </div>
                    <div className={styles.isFreeWrapper}>
                      <FormGroup>
                        <Field
                          disabled
                          labelText={t('eventForm.categorisation.labelIsFree')}
                          name="isFree"
                          component={CheckboxField}
                        />
                      </FormGroup>
                    </div>
                    <div>
                      <FormGroup>
                        <Field
                          labelText={t(
                            'eventForm.categorisation.labelNeededOccurrences'
                          )}
                          name="neededOccurrences"
                          component={NumberInputField}
                          min={1}
                        />
                      </FormGroup>
                    </div>
                  </div>

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
                  {location && (
                    <>
                      <FormGroup>
                        <PlaceInfo id={location} language={selectedLanguage} />
                      </FormGroup>
                      <VenueInfoFormPart
                        locationId={location}
                        selectedLanguage={selectedLanguage}
                        setFieldValue={setFieldValue}
                      />
                    </>
                  )}
                </div>
                <div className={styles.contactInfoWrapper}>
                  <h2>{t('eventForm.contactPerson.title')}</h2>
                  <FormGroup>
                    <Field
                      component={DropdownField}
                      label={t('eventForm.contactPerson.labelName')}
                      name="contactPersonId"
                      multiselect={false}
                      options={personOptions}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Field
                      labelText={t('eventForm.contactPerson.labelEmail')}
                      name="contactEmail"
                      component={TextInputField}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Field
                      labelText={t('eventForm.contactPerson.labelPhone')}
                      name="contactPhoneNumber"
                      component={TextInputField}
                    />
                  </FormGroup>
                </div>
              </div>
              <div className={styles.buttonsWrapper}>
                <Button type="button" onClick={onCancel} variant="secondary">
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
