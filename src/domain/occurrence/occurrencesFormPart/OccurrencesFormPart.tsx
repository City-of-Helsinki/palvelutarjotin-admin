import { ApolloQueryResult } from 'apollo-client';
import addHours from 'date-fns/addHours';
import formatDate from 'date-fns/format';
import isBefore from 'date-fns/isBefore';
import { Field, Formik, FormikHelpers, useFormikContext } from 'formik';
import { Button, Checkbox, IconMinusCircleFill } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import CheckboxField from '../../../common/components/form/fields/CheckboxField';
import DateInputField from '../../../common/components/form/fields/DateInputField';
import MultiDropdownField from '../../../common/components/form/fields/MultiDropdownField';
import PlaceSelectorField from '../../../common/components/form/fields/PlaceSelectorField';
import TextInputField from '../../../common/components/form/fields/TextInputField';
import {
  EventQuery,
  EventQueryVariables,
  OccurrenceFieldsFragment,
  useAddOccurrenceMutation,
  useDeleteOccurrenceMutation,
} from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import { getEventFields } from '../../event/utils';
import PlaceText from '../../place/PlaceText';
import {
  OccurrenceSectionFormFields,
  TimeAndLocationFormFields,
} from '../types';
import { getOccurrenceFields, getOccurrencePayload } from '../utils';
import styles from './occurrencesFormPart.module.scss';
import {
  addOccurrencesToCache,
  deleteOccurrenceFromCache,
  getOptimisticCreateOccurrenceResponse,
  getOptimisticDeleteOccurrenceResponse,
  getOrderedLanguageOptions,
} from './utils';
import getValidationSchema from './ValidationSchema';

export const defaultInitialValues: OccurrenceSectionFormFields = {
  startTime: null,
  endTime: null,
  languages: [],
  occurrenceLocation: '',
  amountOfSeats: '',
  minGroupSize: '',
  maxGroupSize: '',
  oneGroupFills: false,
};

export const occurrencesFormTestId = 'occurrences-form';

const OccurrencesForm: React.FC<{
  eventData: EventQuery;
  createOccurrence: ReturnType<typeof useAddOccurrenceMutation>[0];
  refetchEvent: (
    variables?: EventQueryVariables | undefined
  ) => Promise<ApolloQueryResult<EventQuery>>;
  disabled: boolean;
}> = ({ disabled, eventData, refetchEvent, createOccurrence }) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const [deleteOccurrence] = useDeleteOccurrenceMutation();

  const {
    values: { location, isVirtual, enrolmentEndDays, enrolmentStart },
  } = useFormikContext<TimeAndLocationFormFields>();

  const { occurrences, id: eventId } = getEventFields(eventData?.event, locale);
  const pEventId = eventData.event?.pEvent.id as string;

  const initialValues = React.useMemo(() => {
    return {
      ...defaultInitialValues,
      occurrenceLocation: location,
    };
  }, [location]);

  const validationSchema = React.useMemo(
    () => getValidationSchema({ isVirtual, enrolmentEndDays, enrolmentStart }),
    [enrolmentEndDays, enrolmentStart, isVirtual]
  );

  const eventVariables = {
    id: eventId ?? '',
    include: ['location', 'keywords', 'audience'],
  };

  const reinitializeForm = (
    values: OccurrenceSectionFormFields,
    action: FormikHelpers<OccurrenceSectionFormFields>
  ) => {
    action.resetForm();
    action.setValues({
      ...defaultInitialValues,
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
      await createOccurrence({
        variables: {
          input: getOccurrencePayload({
            values,
            pEventId,
            isVirtual,
          }),
        },
        optimisticResponse: getOptimisticCreateOccurrenceResponse({
          values,
          isVirtual,
        }),
        update: (proxy, { data }) => {
          addOccurrencesToCache({
            proxy,
            data,
            eventVariables,
          });
        },
      });
      refetchEvent();
    } catch (e) {
      // Put form values back if mutation happens to fail.
      action.setValues(values);
      // TODO: Improve error handling when API returns more informative errors
      toast(t('createOccurrence.error'), {
        type: toast.TYPE.ERROR,
      });
    }
  };

  const handleDeleteOccurrence = async (id: string) => {
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
      refetchEvent();
    } catch (e) {
      toast(t('occurrences.deleteError'), {
        type: toast.TYPE.ERROR,
      });
    }
  };

  return (
    <div
      className={styles.occurrencesFormPart}
      data-testid={occurrencesFormTestId}
    >
      <h2>{t('eventForm.occurrences.occurrencesFormSectionTitle')}</h2>
      <div className={styles.noOccurrencesCheckBox}>
        <Checkbox
          disabled
          id="no-locked-occurrence"
          label={t('eventForm.occurrences.labelEventHasNoOccurrences')}
          checked={false}
        />
      </div>
      {!!occurrences?.length && (
        <OccurrencesTable
          occurrences={occurrences}
          onDeleteOccurrence={handleDeleteOccurrence}
        />
      )}
      <Formik
        initialValues={initialValues}
        onSubmit={addOccurrence}
        validationSchema={validationSchema}
        validateOnChange
      >
        <OccurrenceForm
          eventDefaultlocation={location}
          isVirtualEvent={isVirtual}
          disabled={disabled}
        />
      </Formik>
    </div>
  );
};

const OccurrenceForm: React.FC<{
  eventDefaultlocation: string;
  isVirtualEvent: boolean;
  disabled: boolean;
}> = ({ eventDefaultlocation, isVirtualEvent, disabled }) => {
  const { t } = useTranslation();
  const {
    handleSubmit,
    setFieldValue,
    values: { startTime, endTime, oneGroupFills },
  } = useFormikContext<OccurrenceSectionFormFields>();

  const languageOptions = React.useMemo(() => getOrderedLanguageOptions(t), [
    t,
  ]);

  React.useEffect(() => {
    oneGroupFills
      ? setFieldValue('amountOfSeats', '1')
      : setFieldValue('amountOfSeats', '');
  }, [oneGroupFills, setFieldValue]);

  React.useEffect(() => {
    if (eventDefaultlocation) {
      setFieldValue('occurrenceLocation', eventDefaultlocation);
    } else if (isVirtualEvent) {
      setFieldValue('occurrenceLocation', '');
    } else {
      setFieldValue('occurrenceLocation', '');
    }
  }, [eventDefaultlocation, isVirtualEvent, setFieldValue]);

  React.useEffect(() => {
    // Initialize endTime if not yet given
    if (startTime && !endTime) {
      setFieldValue('endTime', addHours(startTime, 1));
    }

    // Set endTime 1 hour after startTime if it happens to be before startTime
    if (startTime && endTime && isBefore(endTime, startTime)) {
      setFieldValue('endTime', addHours(startTime, 1));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startTime, setFieldValue]);

  return (
    <div className={styles.eventOccurrenceForm}>
      <div className={styles.occurrenceFormRow}>
        <Field
          labelText={t('eventOccurrenceForm.labelEventLocation')}
          name="occurrenceLocation"
          disabled={isVirtualEvent}
          component={PlaceSelectorField}
        />
        <Field
          labelText={t('eventOccurrenceForm.labelStartsAt')}
          name="startTime"
          timeSelector
          component={DateInputField}
        />
        <Field
          labelText={t('eventOccurrenceForm.labelEndsAt')}
          name="endTime"
          timeSelector
          component={DateInputField}
        />
        <Field
          label={t('eventOccurrenceForm.labelLanguages')}
          name="languages"
          component={MultiDropdownField}
          options={languageOptions}
        />
        {/* divs are here to avoid styling problem with HDS */}
        <div>
          <Field
            labelText={t('eventOccurrenceForm.labelAmountOfSeats')}
            name="amountOfSeats"
            disabled={oneGroupFills}
            component={TextInputField}
            min={0}
            type="number"
          />
        </div>
        <div>
          <Field
            labelText={t('eventOccurrenceForm.labelGroupSizeMin')}
            name="minGroupSize"
            component={TextInputField}
            min={0}
            type="number"
          />
        </div>
        <div>
          <Field
            labelText={t('eventOccurrenceForm.labelGroupSizeMax')}
            name="maxGroupSize"
            component={TextInputField}
            min={0}
            type="number"
          />
        </div>
        {/* divs are here to avoid styling problem with HDS */}
      </div>
      <div className={styles.formRow}>
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

const OccurrencesTable: React.FC<{
  occurrences: OccurrenceFieldsFragment[];
  onDeleteOccurrence: (id: string) => Promise<void>;
}> = ({ occurrences, onDeleteOccurrence }) => {
  const dateFormat = 'dd.MM.yyyy HH:mm';
  const { t } = useTranslation();

  return (
    <table className={styles.occurrencesTable}>
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

          return (
            <tr key={occurrence.id}>
              <td>
                <PlaceText id={occurrence.placeId} />
              </td>
              <td>{formatDate(new Date(occurrence.startTime), dateFormat)}</td>
              <td>{formatDate(new Date(occurrence.endTime), dateFormat)}</td>
              <td>{formattedLanguages}</td>
              <td>{occurrence.amountOfSeats}</td>
              <td>{occurrence.minGroupSize ?? '–'}</td>
              <td>{occurrence.maxGroupSize ?? '–'}</td>
              <td>
                <button
                  type="button"
                  onClick={() => onDeleteOccurrence(occurrence.id)}
                  aria-label={t('occurrences.table.buttonDeleteOccurrence')}
                >
                  <IconMinusCircleFill />
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default OccurrencesForm;
