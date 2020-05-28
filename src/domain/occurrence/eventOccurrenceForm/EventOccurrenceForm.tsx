import { isPast } from 'date-fns';
import { Field, Formik } from 'formik';
import { Button } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import DateInputField from '../../../common/components/form/fields/DateInputField';
import DropdownSelectField from '../../../common/components/form/fields/DropdownSelectField';
import NumberInputField from '../../../common/components/form/fields/NumberInputField';
import PlaceSelectorField from '../../../common/components/form/fields/PlaceSelectorField';
import TimepickerField from '../../../common/components/form/fields/TimepickerField';
import FormGroup from '../../../common/components/form/FormGroup';
import { EVENT_LANGUAGES } from '../../../constants';
import {
  useDeleteOccurrenceMutation,
  useEventQuery,
} from '../../../generated/graphql';
import OccurrencesTable from '../../occurrences/occurrencesTable/OccurrencesTable';
import { OccurrenceInTable } from '../../occurrences/types';
import PlaceInfo from '../../place/placeInfo/PlaceInfo';
import styles from './eventOccurrenceForm.module.scss';
import ValidationSchema from './ValidationSchema';

export type OccurrenceFormFields = {
  date: Date | null;
  startsAt: string;
  endsAt: string;
  location: string;
  maxGroupSize: string;
  minGroupSize: string;
};

export const defaultInitialValues = {
  date: null,
  startsAt: '',
  endsAt: '',
  location: '',
  minGroupSize: '',
  maxGroupSize: '',
};

interface Props {
  eventId: string;
  formTitle: string;
  initialValues: OccurrenceFormFields;
  occurrenceId?: string;
  onSubmit: (values: OccurrenceFormFields) => void;
  onSubmitAndAdd: (values: OccurrenceFormFields, resetForm: () => void) => void;
}

const EventOccurrenceForm: React.FC<Props> = ({
  eventId,
  formTitle,
  initialValues,
  occurrenceId,
  onSubmit,
  onSubmitAndAdd,
}) => {
  const addNew = React.useRef(false);
  const { t } = useTranslation();

  const { data: eventData, refetch: refetchEventData } = useEventQuery({
    variables: { id: eventId },
  });
  const [deleteOccurrence] = useDeleteOccurrenceMutation();

  const occurrences =
    (eventData?.event?.pEvent?.occurrences.edges.map(
      (edge) => edge?.node
    ) as OccurrenceInTable[]) || [];
  const comingOccurrences = occurrences.filter(
    (item) => !isPast(new Date(item.startTime))
  );

  const handleDeleteOccurrence = async (occurrence: OccurrenceInTable) => {
    try {
      await deleteOccurrence({ variables: { input: { id: occurrence.id } } });
      refetchEventData();
    } catch (e) {}
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
      {({ values: { location }, handleReset, handleSubmit }) => {
        return (
          <form
            className={styles.eventOccurrenceForm}
            onSubmit={(e) => {
              addNew.current = false;
              handleSubmit(e);
            }}
          >
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
                    timeSelector
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
                          date: '12.5.2020',
                          count: 1,
                        }),
                      }}
                    />
                  </FormGroup>
                </div>
              </div>

              <div className={styles.occurrenceFormRow}>
                <FormGroup>
                  <Field
                    component={DropdownSelectField}
                    labelText={t('eventOccurrenceForm.labelEventLanguage')}
                    name="eventLanguage"
                    // TODO: Use real data when available from api
                    options={[
                      ...Object.values(EVENT_LANGUAGES).map((language) => ({
                        label: t(`common.languages.${language}`),
                        value: language,
                      })),
                    ]}
                  />
                </FormGroup>
                <FormGroup>
                  <Field
                    labelText={t('eventOccurrenceForm.labelSpotsInTotal')}
                    name="spotsInTotal"
                    component={NumberInputField}
                    min={0}
                  />
                </FormGroup>
                <FormGroup>
                  <Field
                    labelText={t('eventOccurrenceForm.labelGroupSizeMin')}
                    name="minGroupSize"
                    component={NumberInputField}
                    min={0}
                  />
                </FormGroup>
                <FormGroup>
                  <Field
                    labelText={t('eventOccurrenceForm.labelGroupSizeMax')}
                    name="maxGroupSize"
                    component={NumberInputField}
                    min={0}
                  />
                </FormGroup>
              </div>

              <div className={styles.occurrenceFormRow}>
                <div className={styles.fullRow}>
                  <FormGroup>
                    <Field
                      labelText={t('eventOccurrenceForm.labelEventLocation')}
                      name="location"
                      component={PlaceSelectorField}
                    />
                  </FormGroup>
                  {location && (
                    <FormGroup>
                      <PlaceInfo id={location} />
                    </FormGroup>
                  )}
                </div>
              </div>

              {/* TODO: Add action handler to buttons */}
              <div className={styles.formActions}>
                <Button onClick={handleReset} variant="secondary">
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
                    count: comingOccurrences.length,
                  })}
                </span>
              </h2>
              {comingOccurrences.length ? (
                <OccurrencesTable
                  eventId={eventId}
                  id="coming-occurrences"
                  occurrences={
                    occurrenceId
                      ? comingOccurrences.filter(
                          (item) => item.id !== occurrenceId
                        )
                      : comingOccurrences
                  }
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
