import { Field, Formik } from 'formik';
import { Button } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import BackButton from '../../../common/components/backButton/BackButton';
import EventSteps from '../../../common/components/EventSteps/EventSteps';
import CheckboxField from '../../../common/components/form/fields/CheckboxField';
import KeywordSelectorField from '../../../common/components/form/fields/KeywordSelectorField';
import MultiDropdownField from '../../../common/components/form/fields/MultiDropdownField';
import TextAreaInputField from '../../../common/components/form/fields/TextAreaInputField';
import TextInputField from '../../../common/components/form/fields/TextInputField';
import FocusToFirstError from '../../../common/components/form/FocusToFirstError';
import FormGroup from '../../../common/components/form/FormGroup';
import FormLanguageSelector from '../../../common/components/formLanguageSelector/FormLanguageSelector';
import TextEditorField from '../../../common/components/textEditorField/TextEditorField';
import { createEmptyLocalizedObject } from '../../../constants';
import { EventQuery, PersonFieldsFragment } from '../../../generated/graphql';
import useGoBack from '../../../hooks/useGoBack';
import { Language } from '../../../types';
import { ROUTES } from '../../app/routes/constants';
import { PUBLICATION_STATUS } from '../../events/constants';
import { CreateEventFormFields } from '../types';
import ContactPersonInfoPart from './ContactPersonInfoPart';
import styles from './eventForm.module.scss';
import ImageSelectedFormPart from './ImageSelectedFormPart';
import SelectImageFormPart from './SelectImageFormPart';
import { useKeywordOptions } from './useKeywordOptions';
import useSelectableEventLanguages from './useSelectableEventLanguages';
import createValidationSchema from './ValidationSchema';

export const eventInitialValues: CreateEventFormFields = {
  audience: [],
  categories: [],
  additionalCriteria: [],
  contactEmail: '',
  contactPersonId: '',
  contactPhoneNumber: '',
  description: createEmptyLocalizedObject(),
  mandatoryAdditionalInformation: false,
  image: '',
  imageAltText: '',
  imagePhotographerName: '',
  infoUrl: createEmptyLocalizedObject(),
  inLanguage: [],
  isFree: true,
  keywords: [],
  name: createEmptyLocalizedObject(),
  price: '',
  priceDescription: createEmptyLocalizedObject(),
  shortDescription: createEmptyLocalizedObject(),
};

export const createEventInitialValues: CreateEventFormFields = {
  ...eventInitialValues,
};

type FormFields = CreateEventFormFields;

type FormType = 'edit' | 'template' | 'new';

type Props<T extends FormFields> = {
  eventData?: EventQuery;
  initialValues: T;
  onCancel: () => void;
  onSubmit: (values: T, selectedLanguages: Language[]) => void;
  persons: PersonFieldsFragment[];
  title: string;
  formType?: FormType;
  eventMutationLoading: boolean;
};

const EventForm = <T extends FormFields>({
  initialValues,
  onCancel,
  onSubmit,
  persons,
  title,
  formType = 'new',
  eventData,
  eventMutationLoading,
}: Props<T>): React.ReactElement => {
  const isPrefilledForm = formType === 'edit' || formType === 'template';
  const { t } = useTranslation();
  const { additionalCriteriaKeywords, categoryKeywords, targetGroups } =
    useKeywordOptions();
  const isPublished =
    eventData?.event?.publicationStatus === PUBLICATION_STATUS.PUBLIC;
  const goBack = useGoBack({ defaultReturnPath: ROUTES.HOME });

  const {
    selectedLanguages,
    sortedSelectedLanguages,
    setSelectedLanguageVersions,
    handleSelectedLanguagesChange,
  } = useSelectableEventLanguages(initialValues);

  React.useEffect(() => {
    if (initialValues.name && isPrefilledForm) {
      setSelectedLanguageVersions();
    }
  }, [initialValues, isPrefilledForm, setSelectedLanguageVersions]);

  const validationSchema = React.useMemo(() => {
    return createValidationSchema(selectedLanguages as Language[]);
  }, [selectedLanguages]);

  const personOptions = React.useMemo(
    () =>
      persons.map((person) => ({
        key: person.id,
        label: person.name,
        value: person.id,
      })),
    [persons]
  );

  const getLabelWithLanguage = (stringId: string, lang: string) => {
    return `${t(stringId)} (${lang.toUpperCase()})`;
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validateOnChange
      onSubmit={(values) => onSubmit(values, selectedLanguages)}
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
        const { contactPersonId, image, isFree } = values;
        const imageSelected = Boolean(image);
        return (
          <>
            <BackButton onClick={goBack}>{t('common.back')}</BackButton>
            <FocusToFirstError />
            <div className={styles.eventForm}>
              <div>
                <div className={styles.languageSelectorContainer}>
                  <FormLanguageSelector
                    selectedLanguages={selectedLanguages ?? []}
                    onLanguageClick={handleSelectedLanguagesChange}
                  />
                </div>
              </div>
              <div>
                <div className={styles.backButtonWrapper}>
                  {dirty && (
                    <span className={styles.dirtyText}>
                      {t('editEvent.buttons.textDirty')}
                    </span>
                  )}
                </div>
                <h1>{title}</h1>
                <EventSteps step={1} />
                <form
                  onSubmit={handleSubmit}
                  data-testid="event-form"
                  noValidate
                >
                  <div className={styles.formPart}>
                    <div className={styles.formSection}>
                      <h2>{t('eventForm.basicInfo.title')}</h2>
                      {sortedSelectedLanguages?.map((lang) => (
                        <FormGroup key={lang}>
                          <Field
                            label={getLabelWithLanguage(
                              'eventForm.basicInfo.labelName',
                              lang
                            )}
                            name={`name.${lang}`}
                            required
                            component={TextInputField}
                          />
                        </FormGroup>
                      ))}
                      {sortedSelectedLanguages?.map((lang) => (
                        <FormGroup key={lang}>
                          <Field
                            label={getLabelWithLanguage(
                              'eventForm.basicInfo.labelShortDescription',
                              lang
                            )}
                            name={`shortDescription.${lang}`}
                            required
                            component={TextInputField}
                          />
                        </FormGroup>
                      ))}
                      {sortedSelectedLanguages?.map((lang) => (
                        <FormGroup key={lang}>
                          <Field
                            label={getLabelWithLanguage(
                              'eventForm.basicInfo.labelDescription',
                              lang
                            )}
                            name={`description.${lang}`}
                            required
                            component={TextEditorField}
                            rows={20}
                          />
                        </FormGroup>
                      ))}
                      <p>
                        {t(
                          'eventForm.basicInfo.guidanceTextMandatoryAdditionalInformation'
                        )}
                      </p>
                      <FormGroup>
                        <Field
                          disabled={isPublished}
                          label={t(
                            'eventForm.basicInfo.labelMandatoryAdditionalInformation'
                          )}
                          name="mandatoryAdditionalInformation"
                          component={CheckboxField}
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
                      {sortedSelectedLanguages.map((lang) => (
                        <FormGroup key={lang}>
                          <Field
                            label={getLabelWithLanguage(
                              'eventForm.basicInfo.labelInfoUrl',
                              lang
                            )}
                            name={`infoUrl.${lang}`}
                            component={TextInputField}
                          />
                        </FormGroup>
                      ))}
                    </div>

                    <div
                      className={styles.formSection}
                      data-testid="in-language-dropdown"
                    >
                      <h2>{t('eventForm.categorisation.title')}</h2>
                      <div>
                        <div data-testid="audience-dropdown">
                          <FormGroup>
                            <Field
                              required
                              component={MultiDropdownField}
                              label={t(
                                'eventForm.categorisation.labelAudience'
                              )}
                              name="audience"
                              // TODO: Add list of audiences later
                              options={targetGroups}
                              clearButtonAriaLabel={t(
                                'eventForm.accessibility.audienceDropdown.clearButtonAriaLabel'
                              )}
                              selectedItemRemoveButtonAriaLabel={t(
                                'eventForm.accessibility.audienceDropdown.selectedItemRemoveButtonAriaLabel'
                              )}
                            />
                          </FormGroup>
                        </div>
                      </div>
                      <div>
                        <div data-testid="categories-dropdown">
                          <FormGroup>
                            <Field
                              required
                              component={MultiDropdownField}
                              label={t(
                                'eventForm.categorisation.labelCategories'
                              )}
                              placeholder={t(
                                'eventForm.categorisation.placeholderCategories'
                              )}
                              name="categories"
                              options={categoryKeywords}
                              clearButtonAriaLabel={t(
                                'eventForm.accessibility.categoryDropdown.clearButtonAriaLabel'
                              )}
                              selectedItemRemoveButtonAriaLabel={t(
                                'eventForm.accessibility.categoryDropdown.selectedItemRemoveButtonAriaLabel'
                              )}
                            />
                          </FormGroup>
                        </div>
                      </div>
                      <div>
                        <div data-testid="additional-criteria-dropdown">
                          <FormGroup>
                            <Field
                              required
                              component={MultiDropdownField}
                              label={t(
                                'eventForm.categorisation.labelActivities'
                              )}
                              placeholder={t(
                                'eventForm.categorisation.placeholderCategories'
                              )}
                              name="additionalCriteria"
                              options={additionalCriteriaKeywords}
                              clearButtonAriaLabel={t(
                                'eventForm.accessibility.activityDropdown.clearButtonAriaLabel'
                              )}
                              selectedItemRemoveButtonAriaLabel={t(
                                'eventForm.accessibility.activityDropdown.selectedItemRemoveButtonAriaLabel'
                              )}
                            />
                          </FormGroup>
                        </div>
                      </div>
                      <div>
                        <div data-testid="keywords-dropdown">
                          <FormGroup>
                            <Field
                              helperText={t(
                                'eventForm.categorisation.helperKeywords'
                              )}
                              labelText={t(
                                'eventForm.categorisation.labelKeywords'
                              )}
                              name="keywords"
                              placeholder={t(
                                'eventForm.categorisation.placeholderKeywords'
                              )}
                              component={KeywordSelectorField}
                            />
                          </FormGroup>
                        </div>
                      </div>
                    </div>
                    <div className={styles.formSection}>
                      <h2>{t('eventForm.offers.title')}</h2>
                      <div className={styles.priceRow}>
                        <div>
                          <Field
                            disabled={isFree}
                            label={t('eventForm.offers.labelPrice')}
                            name="price"
                            component={TextInputField}
                          />
                        </div>
                        <div className={styles.isFreeWrapper}>
                          <Field
                            label={t('eventForm.offers.labelIsFree')}
                            name="isFree"
                            component={CheckboxField}
                          />
                        </div>
                      </div>
                      {sortedSelectedLanguages.map((lang) => (
                        <FormGroup key={lang}>
                          <Field
                            disabled={isFree}
                            label={getLabelWithLanguage(
                              'eventForm.offers.labelPriceDescription',
                              lang
                            )}
                            name={`priceDescription.${lang}`}
                            component={TextAreaInputField}
                            placeholder={t(
                              'eventForm.offers.placeholderPriceDescription'
                            )}
                            rows={20}
                          />
                        </FormGroup>
                      ))}
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
                  <div className={styles.buttonsWrapper}>
                    <Button
                      type="button"
                      onClick={onCancel}
                      variant="secondary"
                    >
                      {t('eventForm.buttonCancel')}
                    </Button>
                    <Button type="submit" disabled={eventMutationLoading}>
                      {formType === 'edit'
                        ? t('eventForm.buttonUpdate')
                        : t('eventForm.buttonSaveAndGoToOccurrences')}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </>
        );
      }}
    </Formik>
  );
};

export default EventForm;
