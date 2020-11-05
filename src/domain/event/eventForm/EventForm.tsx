import { Field, Formik } from 'formik';
import { Button } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import EventSteps from '../../../common/components/EventSteps/EventSteps';
import CheckboxField from '../../../common/components/form/fields/CheckboxField';
import DateInputField from '../../../common/components/form/fields/DateInputField';
import KeywordSelectorField from '../../../common/components/form/fields/KeywordSelectorField';
import MultiDropdownField from '../../../common/components/form/fields/MultiDropdownField';
import PlaceSelectorField from '../../../common/components/form/fields/PlaceSelectorField';
import TextAreaInputField from '../../../common/components/form/fields/TextAreaInputField';
import TextInputField from '../../../common/components/form/fields/TextInputField';
import TimepickerField from '../../../common/components/form/fields/TimepickerField';
import FocusToFirstError from '../../../common/components/form/FocusToFirstError';
import FormGroup from '../../../common/components/form/FormGroup';
import ConfirmationModal from '../../../common/components/modal/ConfirmationModal';
import { EVENT_LANGUAGES } from '../../../constants';
import {
  EventQuery,
  KeywordSetType,
  PersonFieldsFragment,
  useKeywordSetQuery,
} from '../../../generated/graphql';
import { Language } from '../../../types';
import { VALIDATION_MESSAGE_KEYS } from '../../app/i18n/constants';
import PlaceInfo from '../../place/placeInfo/PlaceInfo';
import VenueDataFields from '../../venue/venueDataFields/VenueDataFields';
import EditEventButtons from '../editEventButtons/EditEventButtons';
import { CreateEventFormFields, EventFormFields } from '../types';
import ContactPersonInfoPart from './ContactPersonInfoPart';
import styles from './eventForm.module.scss';
import ImageSelectedFormPart from './ImageSelectedFormPart';
import SelectImageFormPart from './SelectImageFormPart';
import { useKeywordOptions } from './useKeywordOptions';
import createValidationSchema, { createEventSchema } from './ValidationSchema';

export const defaultInitialValues: EventFormFields = {
  audience: [],
  categories: [],
  additionalCriteria: [],
  contactEmail: '',
  contactPersonId: '',
  contactPhoneNumber: '',
  description: '',
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
  neededOccurrences: '1',
  price: '',
  shortDescription: '',
  locationDescription: '',
  hasClothingStorage: false,
  hasSnackEatingPlace: false,
  outdoorActivity: false,
  autoAcceptance: true,
};

export const createEventInitialValues: CreateEventFormFields = {
  occurrenceDate: null,
  occurrenceStartsAt: '',
  occurrenceEndsAt: '',
  ...defaultInitialValues,
};

type FormFields = CreateEventFormFields | EventFormFields;

type Props<T extends FormFields> = {
  eventData?: EventQuery;
  initialValues: T;
  onCancel: () => void;
  onSubmit: (values: T) => void;
  persons: PersonFieldsFragment[];
  selectedLanguage: Language;
  setSelectedLanguage: (language: Language) => void;
  title: string;
  edit?: boolean;
};

const EventForm = <T extends FormFields>({
  edit,
  eventData,
  initialValues,
  onCancel,
  onSubmit,
  persons,
  selectedLanguage,
  setSelectedLanguage,
  title,
}: Props<T>): React.ReactElement => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [newLanguage, setNewLanguage] = React.useState(selectedLanguage);
  const { t } = useTranslation();
  const {
    additionalCriteriaKeywords,
    categoryKeywords,
    targetGroups,
  } = useKeywordOptions();

  const validationSchema = React.useMemo(() => {
    if (edit) {
      // different validation when event is edited
      return createValidationSchema({
        enrolmentStart: Yup.date()
          .typeError(VALIDATION_MESSAGE_KEYS.DATE)
          .required(VALIDATION_MESSAGE_KEYS.DATE_REQUIRED),
      });
    }
    return createValidationSchema(createEventSchema);
  }, [edit]);

  const personOptions = React.useMemo(
    () =>
      persons.map((person) => ({
        label: person.name,
        value: person.id,
      })),

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
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({
        dirty,
        handleSubmit,
        values,
        setFieldValue,
        setFieldTouched,
        touched,
      }) => {
        const { contactPersonId, image, location } = values;

        const imageSelected = Boolean(image);
        return (
          <>
            <FocusToFirstError />
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
            <EventSteps step={1} />
            <form onSubmit={handleSubmit} data-testid="event-form">
              <div className={styles.eventForm}>
                <div>
                  <div className={styles.formSection}>
                    <h2>{t('eventForm.basicInfo.title')}</h2>
                    <FormGroup>
                      <Field
                        labelText={t('eventForm.basicInfo.labelName')}
                        name="name"
                        required
                        component={TextInputField}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Field
                        labelText={t(
                          'eventForm.basicInfo.labelShortDescription'
                        )}
                        name="shortDescription"
                        required
                        component={TextInputField}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Field
                        labelText={t('eventForm.basicInfo.labelDescription')}
                        name="description"
                        required
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
                  </div>

                  <div className={styles.formSection}>
                    <div className={styles.headerWithInfo}>
                      <h2>
                        {t('eventForm.occurrenceTime.titleOccurrenceTime')}
                      </h2>
                      <p className={styles.helperText}>
                        {t('eventForm.occurrenceTime.occurrenceTimeHelperText')}
                      </p>
                    </div>
                    {!edit && (
                      <FormGroup>
                        <div className={styles.occurrenceFormRow}>
                          <Field
                            labelText={t('eventOccurrenceForm.labelDate')}
                            name="occurrenceDate"
                            component={DateInputField}
                          />
                          <Field
                            labelText={t('eventOccurrenceForm.labelStartsAt')}
                            name="occurrenceStartsAt"
                            component={TimepickerField}
                            minuteInterval={15}
                          />
                          <Field
                            labelText={t('eventOccurrenceForm.labelEndsAt')}
                            name="occurrenceEndsAt"
                            component={TimepickerField}
                            minuteInterval={15}
                          />
                        </div>
                      </FormGroup>
                    )}

                    <div className={styles.durationRow}>
                      <div>
                        <FormGroup>
                          <Field
                            labelText={t(
                              'eventForm.basicInfo.labelEnrolmentStart'
                            )}
                            name="enrolmentStart"
                            required
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
                            required
                            name="enrolmentEndDays"
                            component={TextInputField}
                            min={0}
                            type="number"
                          />
                        </FormGroup>
                      </div>
                    </div>
                    <FormGroup>
                      <Field
                        labelText={t('eventOccurrenceForm.labelAutoAcceptance')}
                        name="autoAcceptance"
                        component={CheckboxField}
                      />
                    </FormGroup>
                  </div>

                  <div
                    className={styles.formSection}
                    data-testid="in-language-dropdown"
                  >
                    <h2>{t('eventForm.categorisation.title')}</h2>
                    <div className={styles.languageRow}>
                      <div>
                        <FormGroup>
                          <Field
                            component={MultiDropdownField}
                            label={t(
                              'eventForm.categorisation.labelInLanguage'
                            )}
                            name="inLanguage"
                            options={Object.values(EVENT_LANGUAGES).map(
                              (language) => ({
                                label: t(`common.languages.${language}`),
                                value: language,
                              })
                            )}
                          />
                        </FormGroup>
                      </div>
                      <div>
                        <FormGroup>
                          <Field
                            component={MultiDropdownField}
                            label={t('eventForm.categorisation.labelAudience')}
                            name="audience"
                            // TODO: Add list of audiences later
                            options={targetGroups}
                          />
                        </FormGroup>
                      </div>
                    </div>
                    <div className={styles.languageRow}>
                      <div>
                        <FormGroup>
                          <Field
                            component={MultiDropdownField}
                            label={t(
                              'eventForm.categorisation.labelCategories'
                            )}
                            placeholder={t(
                              'eventForm.categorisation.placeholderCategories'
                            )}
                            name="categories"
                            options={categoryKeywords}
                          />
                        </FormGroup>
                      </div>
                      <div>
                        <FormGroup>
                          <Field
                            component={MultiDropdownField}
                            label={t(
                              'eventForm.categorisation.labelOtherClassification'
                            )}
                            placeholder={t(
                              'eventForm.categorisation.placeholderCategories'
                            )}
                            name="additionalCriteria"
                            options={additionalCriteriaKeywords}
                          />
                        </FormGroup>
                      </div>
                    </div>
                    <FormGroup>
                      <Field
                        helperText={t(
                          'eventForm.categorisation.helperKeywords'
                        )}
                        labelText={t('eventForm.categorisation.labelKeywords')}
                        name="keywords"
                        required
                        placeholder={t(
                          'eventForm.categorisation.placeholderKeywords'
                        )}
                        component={KeywordSelectorField}
                      />
                    </FormGroup>
                    <div className={styles.priceRow}>
                      <div>
                        <Field
                          disabled
                          labelText={t('eventForm.categorisation.labelPrice')}
                          name="price"
                          component={TextInputField}
                        />
                      </div>
                      <div className={styles.isFreeWrapper}>
                        <Field
                          disabled
                          labelText={t('eventForm.categorisation.labelIsFree')}
                          name="isFree"
                          component={CheckboxField}
                        />
                      </div>

                      <Field
                        labelText={t(
                          'eventForm.categorisation.labelNeededOccurrences'
                        )}
                        name="neededOccurrences"
                        required
                        component={TextInputField}
                        min={1}
                        type="number"
                      />
                    </div>
                  </div>

                  <div className={styles.formSection}>
                    <h2>{t('eventForm.location.title')}</h2>

                    <Field
                      helperText={t('eventForm.location.helperLocation')}
                      labelText={t('eventForm.location.labelLocation')}
                      name="location"
                      required
                      placeholder={t('eventForm.location.placeholderLocation')}
                      component={PlaceSelectorField}
                    />

                    {location && (
                      <>
                        <div className={styles.placeInfoContainer}>
                          <PlaceInfo
                            id={location}
                            language={selectedLanguage}
                          />
                        </div>
                        <VenueDataFields
                          locationId={location}
                          selectedLanguage={selectedLanguage}
                          setFieldValue={setFieldValue}
                        />
                      </>
                    )}
                  </div>

                  <div className={styles.formSection}>
                    <FormGroup>
                      <div
                        className={styles.contactInfoWrapper}
                        data-testid="contact-info"
                      >
                        <ContactPersonInfoPart
                          contactPersonId={contactPersonId}
                          personOptions={personOptions}
                          setFieldValue={setFieldValue}
                          touched={touched}
                        />
                      </div>
                    </FormGroup>
                  </div>
                </div>
              </div>
              <div className={styles.buttonsWrapper}>
                <Button type="button" onClick={onCancel} variant="secondary">
                  {t('eventForm.buttonCancel')}
                </Button>
                <Button type="submit">
                  {edit
                    ? t('eventForm.buttonSave')
                    : t('eventForm.buttonSaveAndGoToOccurrences')}
                </Button>
              </div>
            </form>
          </>
        );
      }}
    </Formik>
  );
};

export default EventForm;
