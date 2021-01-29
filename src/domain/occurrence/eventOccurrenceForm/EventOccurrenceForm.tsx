import { Field, Formik, FormikHelpers } from 'formik';
import { Button, Checkbox } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import CheckboxField from '../../../common/components/form/fields/CheckboxField';
import DateInputField from '../../../common/components/form/fields/DateInputField';
import MultiDropdownField from '../../../common/components/form/fields/MultiDropdownField';
import PlaceSelectorField from '../../../common/components/form/fields/PlaceSelectorField';
import TextInputField from '../../../common/components/form/fields/TextInputField';
import TimepickerField from '../../../common/components/form/fields/TimepickerField';
import FocusToFirstError from '../../../common/components/form/FocusToFirstError';
import FormGroup from '../../../common/components/form/FormGroup';
import FormHelperText from '../../../common/components/FormHelperText/FormHelperText';
import TextTitle from '../../../common/components/textTitle/TextTitle';
import { EventQuery, Language } from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import formatDate from '../../../utils/formatDate';
import PlaceInfo from '../../place/placeInfo/PlaceInfo';
import VenueDataFields from '../../venue/venueDataFields/VenueDataFields';
import { OccurrenceFormFields } from '../types';
import styles from './eventOccurrenceForm.module.scss';
import ValidationSchema from './ValidationSchema';

export const defaultInitialValues: OccurrenceFormFields = {
  date: null,
  languages: [],
  startsAt: '',
  endsAt: '',
  placeId: '',
  amountOfSeats: '',
  minGroupSize: '',
  maxGroupSize: '',
  locationDescription: '',
  hasClothingStorage: false,
  hasSnackEatingPlace: false,
  outdoorActivity: false,
  oneGroupFills: false,
};

interface Props {
  eventData: EventQuery;
  formTitle: string;
  initialValues: OccurrenceFormFields;
  occurrenceId?: string;
  showFirstOccurrenceHelperText?: boolean;
  onCancel: () => void;
  onSubmit: (values: OccurrenceFormFields) => void;
  onSubmitAndAdd: (
    values: OccurrenceFormFields,
    action: FormikHelpers<OccurrenceFormFields>
  ) => void;
  refetchEvent: () => void;
}

type GoToPublishingProps =
  | {
      showGoToPublishingButton?: false;
      onGoToPublishing?: () => void;
    }
  | {
      showGoToPublishingButton?: boolean;
      onGoToPublishing: () => void;
    };

const EventOccurrenceForm: React.FC<Props & GoToPublishingProps> = ({
  eventData,
  formTitle,
  initialValues,
  onCancel,
  onSubmit,
  onSubmitAndAdd,
  onGoToPublishing,
  showFirstOccurrenceHelperText,
  showGoToPublishingButton,
}) => {
  const addNew = React.useRef(false);
  const { t } = useTranslation();
  const locale = useLocale();

  const eventPlaceId = eventData?.event?.location?.id || '';
  const [editPlaceMode, setEditPlaceMode] = React.useState(
    Boolean(initialValues.placeId)
  );

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validateOnChange
      onSubmit={(values, action) => {
        if (addNew.current) {
          onSubmitAndAdd(values, action);
        } else {
          onSubmit(values);
        }
      }}
      validationSchema={ValidationSchema}
    >
      {({
        values: { placeId, oneGroupFills },
        handleSubmit,
        setFieldValue,
        setValues,
      }) => {
        return (
          <form
            className={styles.eventOccurrenceForm}
            onSubmit={(e) => {
              addNew.current = false;
              handleSubmit(e);
            }}
          >
            <FocusToFirstError />
            <h2 className={styles.title}>{formTitle}</h2>
            <div className={styles.occurrenceFormRow}>
              <div className={styles.locationRow}>
                <p>{t('eventOccurrenceForm.infoText1')}</p>
              </div>
            </div>

            <div className={styles.divider}></div>
            {showFirstOccurrenceHelperText && (
              <FormHelperText
                text="Täydennä ensimmäisen tapahtuma-ajan tiedot"
                style={{ margin: '2rem 0' }}
              />
            )}

            <div>
              <div className={styles.occurrenceFormRow}>
                <FormGroup>
                  <Field
                    labelText={t('eventOccurrenceForm.labelDate')}
                    name="date"
                    component={DateInputField}
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
                <div className={styles.locationRow}>
                  <FormGroup>
                    {/* TODO: Get real values from api when implemented */}
                    <p
                      dangerouslySetInnerHTML={{
                        __html: t('eventOccurrenceForm.infoText2', {
                          date: eventData.event?.pEvent?.enrolmentStart
                            ? formatDate(
                                new Date(
                                  eventData.event?.pEvent?.enrolmentStart
                                )
                              )
                            : '',
                          count: eventData.event?.pEvent?.enrolmentEndDays || 0,
                        }),
                      }}
                    />
                  </FormGroup>
                </div>
              </div>

              <div className={styles.occurrenceFormRow}>
                <FormGroup data-testid="language-dropdown">
                  <Field
                    component={MultiDropdownField}
                    label={t('eventOccurrenceForm.labelLanguages')}
                    name="languages"
                    options={[
                      ...Object.values(Language).map((language) => ({
                        label: t(`common.languages.${language.toLowerCase()}`),
                        value: language,
                      })),
                    ]}
                  />
                </FormGroup>
                <FormGroup>
                  <Field
                    labelText={t('eventOccurrenceForm.labelAmountOfSeats')}
                    name="amountOfSeats"
                    component={TextInputField}
                    disabled={oneGroupFills}
                    min={0}
                    type="number"
                  />
                </FormGroup>
                <FormGroup>
                  <Field
                    labelText={t('eventOccurrenceForm.labelGroupSizeMin')}
                    name="minGroupSize"
                    component={TextInputField}
                    min={0}
                    type="number"
                  />
                </FormGroup>
                <FormGroup>
                  <Field
                    labelText={t('eventOccurrenceForm.labelGroupSizeMax')}
                    name="maxGroupSize"
                    component={TextInputField}
                    min={0}
                    type="number"
                  />
                </FormGroup>
                <FormGroup>
                  {/* <Checkbox
                    id="oneGroupFills"
                    labelText={t('eventOccurrenceForm.labelOneGroupFills')}
                    checked={oneGroupFills}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const checked = e.target.checked;
                      setFieldValue('oneGroupFills', checked);
                      // Calling setFieldValue twice here messes values up, setTimeout seems to help
                      // without setTimeout values in ValidationSchema are not in sync with these values
                      // another way to achieve this: https://github.com/formium/formik/issues/2204#issuecomment-574207100
                      setTimeout(() => {
                        if (checked) {
                          setFieldValue('amountOfSeats', 1);
                        } else {
                          setFieldValue(
                            'amountOfSeats',
                            initialValues.amountOfSeats
                          );
                        }
                      });
                    }}
                  /> */}
                  <div style={{ marginTop: '28px' }}>
                    <Field
                      labelText={t('eventOccurrenceForm.labelOneGroupFills')}
                      name="oneGroupFills"
                      component={CheckboxField}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const checked = e.target.checked;
                        // skip validation with this
                        setFieldValue('oneGroupFills', checked, false);
                        // Calling setFieldValue twice here messes values up, setTimeout seems to help
                        // without setTimeout values in ValidationSchema are not in sync with these values
                        // another way to achieve this: https://github.com/formium/formik/issues/2204#issuecomment-574207100
                        setTimeout(() => {
                          if (checked) {
                            setFieldValue('amountOfSeats', 1);
                          } else {
                            setFieldValue(
                              'amountOfSeats',
                              initialValues.amountOfSeats
                            );
                          }
                        });
                      }}
                    />
                  </div>
                </FormGroup>
              </div>
              <div className={styles.occurrenceFormRow}>
                <div className={styles.fullRow}>
                  {editPlaceMode ? (
                    <FormGroup>
                      <Field
                        labelText={t('eventOccurrenceForm.labelEventLocation')}
                        name="placeId"
                        component={PlaceSelectorField}
                      />
                    </FormGroup>
                  ) : (
                    <TextTitle>
                      {t('eventOccurrenceForm.labelEventLocation')}
                    </TextTitle>
                  )}

                  {(placeId || eventPlaceId) && (
                    <FormGroup>
                      <PlaceInfo
                        id={placeId || eventPlaceId}
                        language={locale}
                        onEditButtonClick={setEditPlaceMode}
                        showEditButton={!editPlaceMode}
                        showVenueInfo={!placeId}
                      />
                    </FormGroup>
                  )}
                  {placeId && (
                    <VenueDataFields
                      locationId={placeId}
                      selectedLanguage={locale}
                      setFieldValue={setFieldValue}
                    />
                  )}
                </div>
              </div>
              <div className={styles.formActions}>
                <Button onClick={onCancel} variant="secondary">
                  {t('form.actions.cancel')}
                </Button>
                <Button
                  onClick={() => {
                    addNew.current = true;
                    handleSubmit();
                  }}
                >
                  {t('form.actions.saveAndAddNew')}
                </Button>
                <Button type="submit">
                  {t('createOccurrence.buttonSaveAndGoToPublishing')}
                </Button>
                {showGoToPublishingButton && (
                  <Button type="button" onClick={onGoToPublishing}>
                    {t('createOccurrence.buttonGoToPublishing')}
                  </Button>
                )}
              </div>
              <div className={styles.divider} />
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default EventOccurrenceForm;
