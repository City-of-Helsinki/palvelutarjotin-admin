import { isPast } from 'date-fns';
import { Field, Formik } from 'formik';
import { Button } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import CheckboxField from '../../../common/components/form/fields/CheckboxField';
import DateInputField from '../../../common/components/form/fields/DateInputField';
import DropdownField from '../../../common/components/form/fields/DropdownField';
import PlaceSelectorField from '../../../common/components/form/fields/PlaceSelectorField';
import TextInputField from '../../../common/components/form/fields/TextInputField';
import TimepickerField from '../../../common/components/form/fields/TimepickerField';
import FocusToFirstError from '../../../common/components/form/FocusToFirstError';
import FormGroup from '../../../common/components/form/FormGroup';
import TextTitle from '../../../common/components/textTitle/TextTitle';
import {
  EventQuery,
  Language,
  OccurrenceFieldsFragment,
  useDeleteOccurrenceMutation,
} from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import formatDate from '../../../utils/formatDate';
import OccurrencesTable from '../../occurrences/occurrencesTable/OccurrencesTable';
import PlaceInfo from '../../place/placeInfo/PlaceInfo';
import VenueDataFields from '../../venue/venueDataFields/VenueDataFields';
import { OccurrenceFormFields } from '../types';
import styles from './eventOccurrenceForm.module.scss';
import ValidationSchema from './ValidationSchema';

export const defaultInitialValues: OccurrenceFormFields = {
  autoAcceptance: true,
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
};

interface Props {
  eventData: EventQuery;
  formTitle: string;
  initialValues: OccurrenceFormFields;
  occurrenceId?: string;
  onCancel: () => void;
  onSubmit: (values: OccurrenceFormFields) => void;
  onSubmitAndAdd: (values: OccurrenceFormFields, resetForm: () => void) => void;
  refetchEvent: () => void;
}

const EventOccurrenceForm: React.FC<Props> = ({
  eventData,
  formTitle,
  initialValues,
  occurrenceId,
  onCancel,
  onSubmit,
  onSubmitAndAdd,
  refetchEvent,
}) => {
  const addNew = React.useRef(false);
  const { t } = useTranslation();
  const locale = useLocale();

  const eventPlaceId = eventData?.event?.location?.id || '';
  const [editPlaceMode, setEditPlaceMode] = React.useState(
    Boolean(initialValues.placeId)
  );

  const [deleteOccurrence] = useDeleteOccurrenceMutation();

  const occurrences =
    (eventData?.event?.pEvent?.occurrences.edges.map(
      (edge) => edge?.node
    ) as OccurrenceFieldsFragment[]) || [];

  const comingOccurrences = occurrences.filter(
    (item) => !isPast(new Date(item.startTime))
  );
  const filteredComingOccurrences = occurrenceId
    ? comingOccurrences.filter((item) => item.id !== occurrenceId)
    : comingOccurrences;

  const handleDeleteOccurrence = async (
    occurrence: OccurrenceFieldsFragment
  ) => {
    try {
      await deleteOccurrence({ variables: { input: { id: occurrence.id } } });
      refetchEvent();
    } catch (e) {
      toast(t('occurrences.deleteError'), {
        type: toast.TYPE.ERROR,
      });
    }
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validateOnChange
      onSubmit={(values, action) => {
        if (addNew.current) {
          onSubmitAndAdd(values, action.resetForm);
        } else {
          onSubmit(values);
        }
      }}
      validationSchema={ValidationSchema}
    >
      {({ values: { placeId }, handleSubmit, setFieldValue }) => {
        return (
          <form
            className={styles.eventOccurrenceForm}
            onSubmit={(e) => {
              addNew.current = false;
              handleSubmit(e);
            }}
          >
            <FocusToFirstError />
            <p className={styles.title}>{formTitle}</p>
            <div className={styles.occurrenceFormRow}>
              <div className={styles.locationRow}>
                <p>{t('eventOccurrenceForm.infoText1')}</p>
              </div>
            </div>

            <div className={styles.divider}></div>
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
                <FormGroup>
                  <Field
                    component={DropdownField}
                    label={t('eventOccurrenceForm.labelLanguages')}
                    name="languages"
                    multiselect={true}
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
              </div>

              <FormGroup>
                <Field
                  labelText={t('eventOccurrenceForm.labelAutoAcceptance')}
                  name="autoAcceptance"
                  component={CheckboxField}
                />
              </FormGroup>

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

                  {(!!placeId || !!eventPlaceId) && (
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

              {/* TODO: Add action handler to buttons */}
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
                <Button type="submit">{t('form.actions.save')}</Button>
              </div>

              <div className={styles.divider} />
              <h2>
                {t('occurrences.titleComingOccurrences')}{' '}
                <span className={styles.count}>
                  {t('occurrences.count', {
                    count: filteredComingOccurrences.length,
                  })}
                </span>
              </h2>
              {filteredComingOccurrences.length ? (
                <OccurrencesTable
                  eventData={eventData}
                  id="coming-occurrences"
                  occurrences={filteredComingOccurrences}
                  onDelete={handleDeleteOccurrence}
                />
              ) : (
                <div>{t('occurrences.textNoComingOccurrences')}</div>
              )}
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default EventOccurrenceForm;
