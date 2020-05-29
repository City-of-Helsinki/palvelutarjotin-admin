import { isPast } from 'date-fns';
import { Field, Formik } from 'formik';
import { Button } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import CheckboxField from '../../../common/components/form/fields/CheckboxField';
import DateInputField from '../../../common/components/form/fields/DateInputField';
import DropdownMultiselectField from '../../../common/components/form/fields/DropdownMultiselectField';
import NumberInputField from '../../../common/components/form/fields/NumberInputField';
import PlaceSelectorField from '../../../common/components/form/fields/PlaceSelectorField';
import TimepickerField from '../../../common/components/form/fields/TimepickerField';
import FormGroup from '../../../common/components/form/FormGroup';
import {
  Language,
  OccurrenceFieldsFragment,
  useDeleteOccurrenceMutation,
  useEventQuery,
} from '../../../generated/graphql';
import OccurrencesTable from '../../occurrences/occurrencesTable/OccurrencesTable';
import PlaceInfo from '../../place/placeInfo/PlaceInfo';
import styles from './eventOccurrenceForm.module.scss';
import ValidationSchema from './ValidationSchema';

export type OccurrenceFormFields = {
  autoAcceptance: boolean;
  date: Date | null;
  startsAt: string;
  endsAt: string;
  languages: string[];
  location: string;
  amountOfSeats: string;
  maxGroupSize: string;
  minGroupSize: string;
};

export const defaultInitialValues = {
  autoAcceptance: true,
  date: null,
  languages: [],
  startsAt: '',
  endsAt: '',
  location: '',
  amountOfSeats: '',
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
    ) as OccurrenceFieldsFragment[]) || [];
  const comingOccurrences = occurrences.filter(
    (item) => !isPast(new Date(item.startTime))
  );

  const handleDeleteOccurrence = async (
    occurrence: OccurrenceFieldsFragment
  ) => {
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
                    component={DropdownMultiselectField}
                    labelText={t('eventOccurrenceForm.labelLanguages')}
                    name="languages"
                    // TODO: Use real data when available from api
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

              <FormGroup>
                <Field
                  labelText={t('eventOccurrenceForm.labelAutoAcceptance')}
                  name="autoAcceptance"
                  component={CheckboxField}
                />
              </FormGroup>

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
