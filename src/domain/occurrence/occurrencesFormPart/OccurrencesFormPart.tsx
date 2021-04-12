import formatDate from 'date-fns/format';
import { Field, Formik, FormikHelpers } from 'formik';
import { Button, Checkbox, IconMinusCircleFill } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import DateInputField from '../../../common/components/form/fields/DateInputField';
import MultiDropdownField from '../../../common/components/form/fields/MultiDropdownField';
import PlaceSelectorField from '../../../common/components/form/fields/PlaceSelectorField';
import TextInputField from '../../../common/components/form/fields/TextInputField';
import {
  OccurrenceFieldsFragment,
  useAddOccurrenceMutation,
  useDeleteOccurrenceMutation,
} from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import { getEventFields } from '../../event/utils';
import PlaceText from '../../place/PlaceText';
import { OccurrenceFormFields } from '../types';
import {
  getOccurrenceFields,
  getOccurrencePayload,
  useBaseEventQuery,
} from '../utils';
import styles from './occurrencesFormPart.module.scss';
import {
  addOccurrencesToCache,
  deleteOccurrenceFromCache,
  getOptimisticCreateOccurrenceResponse,
  getOptimisticDeleteOccurrenceResponse,
  getOrderedLanguageOptions,
} from './utils';
import ValidationSchema from './ValidationSchema';

export const defaultInitialValues: OccurrenceFormFields = {
  startTime: null,
  endTime: null,
  languages: [],
  location: '',
  amountOfSeats: '',
  minGroupSize: '',
  maxGroupSize: '',
};

const OccurrencesForm: React.FC<{ pEventId: string; eventId: string }> = ({
  pEventId,
  eventId,
}) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const [
    createOccurrence,
    { loading: addOccurrenceLoading },
  ] = useAddOccurrenceMutation();
  const [deleteOccurrence] = useDeleteOccurrenceMutation();

  const {
    data: eventData,
    refetch: refetchEvent,
    variables: eventVariables,
  } = useBaseEventQuery({
    variables: { id: eventId },
  });

  const { occurrences } = getEventFields(eventData?.event, locale);

  const addOccurrence = async (
    values: OccurrenceFormFields,
    action: FormikHelpers<OccurrenceFormFields>
  ) => {
    try {
      action.resetForm();
      await createOccurrence({
        variables: {
          input: getOccurrencePayload({
            values,
            pEventId,
          }),
        },
        optimisticResponse: getOptimisticCreateOccurrenceResponse(values),
        update: (proxy, { data }) => {
          addOccurrencesToCache({ proxy, data, eventVariables });
        },
      });
      refetchEvent();
    } catch (e) {
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

  const languageOptions = React.useMemo(() => getOrderedLanguageOptions(t), [
    t,
  ]);

  return (
    <div className={styles.occurrencesFormPart}>
      <h2>Tapahtuma-aika</h2>
      <div className={styles.noOccurrencesCheckBox}>
        <Checkbox
          disabled
          id="no-locked-occurrence"
          label="Tapahtumalla ei ole lukittua ajankohtaa"
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
        enableReinitialize={true}
        initialValues={defaultInitialValues}
        validateOnChange
        onSubmit={addOccurrence}
        validationSchema={ValidationSchema}
      >
        {({ handleSubmit }) => {
          return (
            <div className={styles.eventOccurrenceForm}>
              <div className={styles.occurrenceFormRow}>
                <Field
                  labelText={t('eventOccurrenceForm.labelEventLocation')}
                  name="location"
                  component={PlaceSelectorField}
                />
                <Field
                  labelText={t('eventOccurrenceForm.labelDate')}
                  name="startTime"
                  timeSelector
                  component={DateInputField}
                />
                <Field
                  labelText="Päättyy"
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
                <Field
                  labelText={t('eventOccurrenceForm.labelAmountOfSeats')}
                  name="amountOfSeats"
                  component={TextInputField}
                  min={0}
                  type="number"
                />
                <Field
                  labelText={t('eventOccurrenceForm.labelGroupSizeMin')}
                  name="minGroupSize"
                  component={TextInputField}
                  min={0}
                  type="number"
                />
                <Field
                  labelText={t('eventOccurrenceForm.labelGroupSizeMax')}
                  name="maxGroupSize"
                  component={TextInputField}
                  min={0}
                  type="number"
                />
              </div>
              <div>
                <Button
                  disabled={addOccurrenceLoading}
                  onClick={() => handleSubmit()}
                >
                  Lisää uusi aika
                </Button>
              </div>
            </div>
          );
        }}
      </Formik>
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
          <th>Tapahtumapaikka</th>
          <th>Alkaa</th>
          <th>Päättyy</th>
          <th>Tapahtuman kieli</th>
          <th>Paikkoja</th>
          <th>Min</th>
          <th>Max</th>
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
                <button onClick={() => onDeleteOccurrence(occurrence.id)}>
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
