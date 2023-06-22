import classNames from 'classnames';
import addDays from 'date-fns/addDays';
import parseDate from 'date-fns/parse';
import { Field, Formik, FormikHelpers, useFormikContext } from 'formik';
import { Button, IconMinusCircleFill } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import CheckboxField from '../../../common/components/form/fields/CheckboxField';
import DateInputFieldHDS from '../../../common/components/form/fields/DateInputFieldHDS';
import MultiDropdownField from '../../../common/components/form/fields/MultiDropdownField';
import PlaceSelectorField from '../../../common/components/form/fields/PlaceSelectorField';
import TextInputField from '../../../common/components/form/fields/TextInputField';
import TimeInputField from '../../../common/components/form/fields/TimeInputField';
import ConfirmationModal from '../../../common/components/modal/ConfirmationModal';
import {
  EventQuery,
  OccurrenceFieldsFragment,
  useAddOccurrenceMutation,
  useDeleteOccurrenceMutation,
} from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import { DATE_FORMAT, formatIntoDateTime } from '../../../utils/time/format';
import { isValidDateString, parseDateString } from '../../../utils/time/utils';
import { getEventFields } from '../../event/utils';
import { PUBLICATION_STATUS } from '../../events/constants';
import { OccurrenceFormContextSetter } from '../../occurrence/OccurrencesFormHandleContext';
import PlaceText from '../../place/PlaceText';
import { EnrolmentType } from '../constants';
import { OccurrenceSectionFormFields } from '../types';
import {
  getEventQueryVariables,
  getOccurrenceFields,
  getOccurrencePayload,
} from '../utils';
import styles from './occurrencesFormPart.module.scss';
import {
  addOccurrencesToCache,
  deleteOccurrenceFromCache,
  getOccurrencerWithSameDateAlreadyExists,
  getOptimisticCreateOccurrenceResponse,
  getOptimisticDeleteOccurrenceResponse,
  getOrderedLanguageOptions,
} from './utils';
import getValidationSchema from './ValidationSchema';

export const occurrencesFormTestId = 'occurrences-form';
export const occurrencesTableTestId = 'occurrences-table';
export const defaultInitialValues: OccurrenceSectionFormFields = {
  startDate: '',
  startTime: '',
  endDate: '',
  endTime: '',
  languages: [],
  occurrenceLocation: '',
  amountOfSeats: '',
  minGroupSize: '',
  maxGroupSize: '',
  oneGroupFills: false,
  isMultidayOccurrence: false,
};

const OccurrencesForm: React.FC<{
  eventData: EventQuery;
  createOccurrence: ReturnType<typeof useAddOccurrenceMutation>[0];
  disabled: boolean;
  location: string;
  isVirtual: boolean;
  isBookable: boolean;
  enrolmentStart?: Date | null;
  enrolmentEndDays: number | string;
  enrolmentType: EnrolmentType;
  title: string;
}> = ({
  disabled,
  eventData,
  createOccurrence,
  enrolmentEndDays,
  // provided in string format d.M.yyyy HH:mm
  enrolmentStart,
  enrolmentType,
  isVirtual,
  isBookable,
  location,
  title,
}) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const [deleteOccurrence] = useDeleteOccurrenceMutation();
  const [latestOccurrenceDate, setLatestOccurrenceDate] =
    React.useState<Date | null>(null);
  const [confirmAddOccurrence, setConfirmAddOccurrence] = React.useState<
    (() => void) | null
  >(null);

  const { occurrences, id: eventId } = React.useMemo(
    () => getEventFields(eventData?.event, locale),
    [eventData.event, locale]
  );
  const pEventId = eventData.event?.pEvent.id as string;
  const isPublishedEvent =
    eventData.event?.publicationStatus === PUBLICATION_STATUS.PUBLIC;

  const initialValues = React.useMemo(() => {
    return {
      ...defaultInitialValues,
      occurrenceLocation: location,
    };
  }, [location]);

  const validationSchema = React.useMemo(
    () =>
      getValidationSchema({
        isVirtual,
        isBookable,
        enrolmentEndDays: (enrolmentEndDays as number) || undefined,
        enrolmentStart,
        enrolmentType,
      }),
    [enrolmentEndDays, enrolmentStart, isVirtual, isBookable, enrolmentType]
  );
  const eventVariables = React.useMemo(
    () => getEventQueryVariables(eventId ?? ''),
    [eventId]
  );

  const reinitializeForm = (
    values: OccurrenceSectionFormFields,
    action: FormikHelpers<OccurrenceSectionFormFields>
  ) => {
    action.resetForm();
    action.setValues({
      ...defaultInitialValues,
      isMultidayOccurrence: values.isMultidayOccurrence,
      startDate: values.startDate,
      startTime: values.startTime,
      endTime: values.endTime,
      endDate: values.endDate,
      occurrenceLocation: values.occurrenceLocation,
      minGroupSize: values.minGroupSize,
      maxGroupSize: values.maxGroupSize,
      amountOfSeats: values.amountOfSeats,
      languages: values.languages,
      oneGroupFills: values.oneGroupFills,
    });
  };

  const addOccurrence = async (
    values: OccurrenceSectionFormFields,
    action: FormikHelpers<OccurrenceSectionFormFields>
  ) => {
    try {
      reinitializeForm(values, action);
      setLatestOccurrenceDate(
        parseDate(values.startDate, DATE_FORMAT, new Date())
      );
      await createOccurrence({
        variables: {
          input: getOccurrencePayload({
            values,
            pEventId,
            isVirtual,
            isBookable,
          }),
        },
        optimisticResponse: getOptimisticCreateOccurrenceResponse({
          values,
          isVirtual,
          isBookable,
        }),
        update: (proxy, { data }) => {
          addOccurrencesToCache({
            proxy,
            data,
            eventVariables,
          });
        },
      });
      toast.success(t('eventForm.occurrences.saveSuccesful'));
    } catch (e) {
      // Put form values back if mutation happens to fail.
      action.setValues(values);
      // TODO: Improve error handling when API returns more informative errors
      toast(t('createOccurrence.error'), {
        type: toast.TYPE.ERROR,
      });
    }
  };

  const handleDeleteOccurrence = React.useCallback(
    async (id: string) => {
      try {
        await deleteOccurrence({
          variables: { input: { id } },
          optimisticResponse: getOptimisticDeleteOccurrenceResponse(),
          update: (proxy) => {
            deleteOccurrenceFromCache({
              proxy,
              eventVariables,
              occurrenceId: id,
            });
          },
        });
      } catch (e) {
        toast(t('occurrences.deleteError'), {
          type: toast.TYPE.ERROR,
        });
      }
    },
    [deleteOccurrence, eventVariables, t]
  );

  // TODO: what to do is this is called when going to publish page and confirmation modal is opened?
  const handleOccurrenceFormSubmit = async (
    values: OccurrenceSectionFormFields,
    action: FormikHelpers<OccurrenceSectionFormFields>
  ) => {
    const doAddOccurrence = () => addOccurrence(values, action);
    if (
      occurrences &&
      getOccurrencerWithSameDateAlreadyExists(values, occurrences)
    ) {
      // add callback to react state to be called when modal is confirmed
      // we need to save form values and formik helper to closure
      setConfirmAddOccurrence(() => doAddOccurrence);
    } else {
      await doAddOccurrence();
    }
  };

  return (
    <div
      className={styles.occurrencesFormPart}
      data-testid={occurrencesFormTestId}
    >
      <h2>{title}</h2>
      {!!occurrences?.length && (
        <OccurrencesTable
          occurrences={occurrences}
          onDeleteOccurrence={handleDeleteOccurrence}
          isPublishedEvent={isPublishedEvent}
        />
      )}
      <Formik
        initialValues={initialValues}
        onSubmit={handleOccurrenceFormSubmit}
        validationSchema={validationSchema}
        validateOnChange
      >
        <OccurrenceForm
          eventDefaultlocation={!isVirtual ? location : ''}
          isVirtualEvent={isVirtual}
          isBookableEvent={isBookable}
          enrolmentType={enrolmentType}
          disabled={disabled}
          latestOccurrenceDate={latestOccurrenceDate}
        />
      </Formik>
      {confirmAddOccurrence && (
        <ConfirmationModal
          isOpen
          title={t('eventOccurrenceForm.duplicateOccurrenceModal.title')}
          confirmButtonText={t(
            'eventOccurrenceForm.duplicateOccurrenceModal.buttonAddOccurrence'
          )}
          onConfirm={() => {
            confirmAddOccurrence?.();
            setConfirmAddOccurrence(null);
          }}
          toggleModal={() => setConfirmAddOccurrence(null)}
        >
          <p>{t('eventOccurrenceForm.duplicateOccurrenceModal.text')}</p>
        </ConfirmationModal>
      )}
    </div>
  );
};

const OccurrenceForm: React.FC<{
  eventDefaultlocation: string;
  isVirtualEvent: boolean;
  isBookableEvent: boolean;
  enrolmentType: EnrolmentType;
  disabled: boolean;
  latestOccurrenceDate?: Date | null;
}> = ({
  eventDefaultlocation,
  isVirtualEvent,
  disabled,
  enrolmentType,
  isBookableEvent,
  latestOccurrenceDate,
}) => {
  const { t } = useTranslation();
  const {
    handleSubmit,
    setFieldValue,
    values: { oneGroupFills, isMultidayOccurrence, startDate },
  } = useFormikContext<OccurrenceSectionFormFields>();
  const showGroupSizeInputs = enrolmentType === EnrolmentType.Internal;

  const languageOptions = React.useMemo(
    () => getOrderedLanguageOptions(t),
    [t]
  );

  // reset group size input when they are not shown/needed
  React.useEffect(() => {
    if (!showGroupSizeInputs) {
      (async () => await setFieldValue('minGroupSize', ''))();
      (async () => await setFieldValue('maxGroupSize', ''))();
      (async () => await setFieldValue('amountOfSeats', ''))();
    }
  }, [showGroupSizeInputs, setFieldValue]);

  React.useEffect(() => {
    oneGroupFills
      ? (async () => await setFieldValue('amountOfSeats', '1'))()
      : (async () => await setFieldValue('amountOfSeats', ''))();
  }, [oneGroupFills, setFieldValue]);

  React.useEffect(() => {
    if (eventDefaultlocation) {
      (async () =>
        await setFieldValue('occurrenceLocation', eventDefaultlocation))();
    } else if (isVirtualEvent || isBookableEvent) {
      (async () => await setFieldValue('occurrenceLocation', ''))();
    } else {
      (async () => await setFieldValue('occurrenceLocation', ''))();
    }
  }, [eventDefaultlocation, isVirtualEvent, isBookableEvent, setFieldValue]);

  const handleIsMultidayOccurrenceChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    (async () =>
      await setFieldValue('isMultidayOccurrence', e.target.checked))();

    // reset end date input when it is hidden
    if (!e.target.checked) {
      (async () => await setFieldValue('endDate', ''))();
    }
  };

  const minEndDate = isValidDateString(startDate)
    ? parseDateString(startDate)
    : new Date();

  return (
    <div className={styles.eventOccurrenceForm}>
      <div
        className={classNames(styles.occurrenceFormRow, {
          [styles.occurrenceFormRowMultiday]: isMultidayOccurrence,
        })}
      >
        <OccurrenceFormContextSetter />
        <Field
          labelText={t('eventOccurrenceForm.labelEventLocation')}
          name="occurrenceLocation"
          disabled={isVirtualEvent || isBookableEvent}
          component={PlaceSelectorField}
        />
        <div className={styles.occurrenceFormDatePart}>
          <Field
            disableConfirmation
            label={t('eventOccurrenceForm.labelStartDate')}
            name="startDate"
            initialMonth={latestOccurrenceDate || new Date()}
            minDate={new Date()}
            component={DateInputFieldHDS}
          />
          <Field
            label={t('eventOccurrenceForm.labelStartTime')}
            name="startTime"
            hoursLabel={t('eventOccurrenceForm.timeInputs.labelStartHours')}
            minutesLabel={t('eventOccurrenceForm.timeInputs.labelStartMinutes')}
            component={TimeInputField}
          />
          {isMultidayOccurrence && (
            <>
              <Field
                disableConfirmation
                label={t('eventOccurrenceForm.labelEndDate')}
                name="endDate"
                initialMonth={minEndDate}
                minDate={addDays(minEndDate, 1)}
                component={DateInputFieldHDS}
              />
              <Field
                label={t('eventOccurrenceForm.labelEndTime')}
                name="endTime"
                hoursLabel={t('eventOccurrenceForm.timeInputs.labelEndHours')}
                minutesLabel={t(
                  'eventOccurrenceForm.timeInputs.labelEndMinutes'
                )}
                component={TimeInputField}
              />
            </>
          )}
        </div>
        {!isMultidayOccurrence && (
          <Field
            label={t('eventOccurrenceForm.labelEndTime')}
            name="endTime"
            hoursLabel={t('eventOccurrenceForm.timeInputs.labelEndHours')}
            minutesLabel={t('eventOccurrenceForm.timeInputs.labelEndMinutes')}
            component={TimeInputField}
          />
        )}
        <Field
          label={t('eventOccurrenceForm.labelLanguages')}
          name="languages"
          component={MultiDropdownField}
          options={languageOptions}
        />
        {/* divs are here to avoid styling problem with HDS */}
        {showGroupSizeInputs && (
          <>
            <div>
              <Field
                label={t('eventOccurrenceForm.labelAmountOfSeats')}
                name="amountOfSeats"
                disabled={oneGroupFills}
                component={TextInputField}
                min={0}
                type="number"
              />
            </div>
            <div>
              <Field
                label={t('eventOccurrenceForm.labelGroupSizeMin')}
                aria-label={t('eventOccurrenceForm.ariaLabelGroupSizeMin')}
                name="minGroupSize"
                component={TextInputField}
                min={0}
                type="number"
              />
            </div>
            <div>
              <Field
                label={t('eventOccurrenceForm.labelGroupSizeMax')}
                aria-label={t('eventOccurrenceForm.ariaLabelGroupSizeMax')}
                name="maxGroupSize"
                component={TextInputField}
                min={0}
                type="number"
              />
            </div>
          </>
        )}
        {/* divs are here to avoid styling problem with HDS */}
      </div>
      <div className={styles.checkboxRow}>
        <Field
          label={t('eventOccurrenceForm.labelMultidayOccurrence')}
          name="isMultidayOccurrence"
          onChange={handleIsMultidayOccurrenceChange}
          component={CheckboxField}
        />
        <Field
          label={t('eventOccurrenceForm.labelOneGroupFills')}
          name="oneGroupFills"
          component={CheckboxField}
        />
      </div>
      <div>
        <Button disabled={disabled} onClick={() => handleSubmit()}>
          {t('eventForm.occurrences.buttonAddNewOccurence')}
        </Button>
      </div>
    </div>
  );
};

let OccurrencesTable: React.FC<{
  occurrences: OccurrenceFieldsFragment[];
  onDeleteOccurrence: (id: string) => Promise<void>;
  isPublishedEvent?: boolean;
}> = ({ occurrences, onDeleteOccurrence, isPublishedEvent }) => {
  const { t } = useTranslation();

  return (
    <table
      className={styles.occurrencesTable}
      data-testid={occurrencesTableTestId}
    >
      <thead>
        <tr>
          <th>{t('occurrences.table.columnLocation')}</th>
          <th>{t('occurrences.table.columnStarts')}</th>
          <th>{t('occurrences.table.columnEnds')}</th>
          <th>{t('occurrences.table.columnLanguages')}</th>
          <th>{t('occurrences.table.columnAmountOfSeats')}</th>
          <th>{t('occurrences.table.columnMinGroupSize')}</th>
          <th>{t('occurrences.table.columnMaxGroupSize')}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {occurrences.map((occurrence) => {
          const { languages } = getOccurrenceFields(occurrence);
          const formattedLanguages = languages
            ?.map((language) => {
              return t(`common.languages.${language}`);
            })
            .join(', ');

          const showDeleteButton = !isPublishedEvent || occurrence.cancelled;

          return (
            <tr key={occurrence.id}>
              <td>
                <PlaceText id={occurrence.placeId} />
              </td>
              <td>{formatIntoDateTime(new Date(occurrence.startTime))}</td>
              <td>{formatIntoDateTime(new Date(occurrence.endTime))}</td>
              <td>{formattedLanguages}</td>
              {/* Using '||' because we want to show '-' if amount of seats not defined or is 0 */}
              <td>{occurrence.amountOfSeats || '–'}</td>
              <td>{occurrence.minGroupSize ?? '–'}</td>
              <td>{occurrence.maxGroupSize ?? '–'}</td>
              <td>
                {showDeleteButton ? (
                  <button
                    type="button"
                    onClick={() => onDeleteOccurrence(occurrence.id)}
                    aria-label={t('occurrences.table.buttonDeleteOccurrence')}
                  >
                    <IconMinusCircleFill />
                  </button>
                ) : null}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
OccurrencesTable = React.memo(OccurrencesTable);

export default OccurrencesForm;
