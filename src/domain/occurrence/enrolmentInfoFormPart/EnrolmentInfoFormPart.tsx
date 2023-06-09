import { Field, useFormikContext } from 'formik';
import { Notification, SelectionGroup } from 'hds-react';
import capitalize from 'lodash/capitalize';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import CheckboxField from '../../../common/components/form/fields/CheckboxField';
import DateInputFieldHDS from '../../../common/components/form/fields/DateInputFieldHDS';
import RadiobuttonField from '../../../common/components/form/fields/RadiobuttonField';
import TextAreaField from '../../../common/components/form/fields/TextAreaInputField';
import TextInputField from '../../../common/components/form/fields/TextInputField';
import TimeInputField from '../../../common/components/form/fields/TimeInputField';
import { EnrolmentType } from '../constants';
import styles from '../occurrencePage.module.scss';
import { TimeAndLocationFormFields } from '../types';

export const enrolmentInfoFormTestId = 'enrolment-info-form';

const EnrolmentInfoFormPart: React.FC = () => {
  const { t } = useTranslation();

  const {
    values: { neededOccurrences, autoAcceptance, enrolmentType },
    setFieldValue,
  } = useFormikContext<TimeAndLocationFormFields>();

  // Enrolments cannot be manually accepted if more than one occurrence is needed
  // So we se autoAcceptance to true id neededOccurrences is more than 1
  React.useEffect(() => {
    if (
      neededOccurrences != null &&
      (neededOccurrences as number) > 1 &&
      !autoAcceptance
    ) {
      setFieldValue('autoAcceptance', true);
    }
  }, [autoAcceptance, neededOccurrences, setFieldValue]);

  const enrolmentFieldSetComponentByType = {
    [EnrolmentType.Internal]: (
      <InternalEnrolmentFields
        neededOccurrences={neededOccurrences as number}
      />
    ),
    [EnrolmentType.External]: <ExternalEnrolmentFields />,
    [EnrolmentType.Unenrollable]: null,
  };

  return (
    <div className={styles.formSection} data-testid={enrolmentInfoFormTestId}>
      <div className={styles.formSectionInnerContainer}>
        <div>
          <h2>{t('eventForm.enrolment.title')}</h2>
          <EnrolmentTypeSelector enrolmentType={enrolmentType} />
          {enrolmentFieldSetComponentByType[enrolmentType]}
        </div>
      </div>
    </div>
  );
};

export const EnrolmentTypeSelector: React.FC<{
  enrolmentType: EnrolmentType;
}> = ({ enrolmentType }) => {
  const { t } = useTranslation();

  const isActiveEnrolmentType = (type: EnrolmentType) => {
    return enrolmentType === type;
  };

  return (
    <SelectionGroup
      direction="horizontal"
      className={styles.enrolmentTypeSelector}
    >
      {Object.values(EnrolmentType).map((type) => (
        <Field
          key={`enrolmentType-${type}`}
          type="radio"
          name="enrolmentType"
          component={RadiobuttonField}
          value={type}
          label={t(`eventForm.enrolmentType.label${capitalize(type)}`)}
          className={`${styles.enrolmentTypeSelectorItem} ${
            isActiveEnrolmentType(type) &&
            styles.enrolmentTypeSelectorItemActive
          }`}
        />
      ))}
    </SelectionGroup>
  );
};

export const InternalEnrolmentFields: React.FC<{
  neededOccurrences: number;
}> = ({ neededOccurrences }) => {
  const { t } = useTranslation();
  const {
    values: {
      autoAcceptance: showAutoAcceptanceMessage,
      autoAcceptanceMessage,
    },
  } = useFormikContext<TimeAndLocationFormFields>();
  return (
    <div>
      <div className={styles.formRow}>
        <Field
          disableConfirmation
          className={styles.enrolmentStartDate}
          required
          label={t('eventForm.basicInfo.labelEnrolmentStartDate')}
          name="enrolmentStartDate"
          component={DateInputFieldHDS}
        />
        <Field
          className={styles.enrolmentStartTime}
          required
          label={t('eventForm.basicInfo.labelEnrolmentStartTime')}
          name="enrolmentStartTime"
          hoursLabel={t('eventOccurrenceForm.timeInputs.labelStartHours')}
          minutesLabel={t('eventOccurrenceForm.timeInputs.labelStartMinutes')}
          component={TimeInputField}
        />
        <div>
          <Field
            required
            label={t('eventForm.basicInfo.labelEnrolmentEndDays')}
            name="enrolmentEndDays"
            component={TextInputField}
            min={0}
            type="number"
          />
        </div>
        <div>
          <Field
            label={t('eventForm.categorisation.labelNeededOccurrences')}
            name="neededOccurrences"
            required
            component={TextInputField}
            min={1}
            type="number"
          />
        </div>
      </div>
      <div className={styles.formRow}>
        <Field
          label={t('eventOccurrenceForm.labelAutoAcceptance')}
          name="autoAcceptance"
          disabled={neededOccurrences > 1}
          component={CheckboxField}
        />
      </div>
      {showAutoAcceptanceMessage && (
        <div>
          <div className={styles.formRow}>
            <Field
              label={t('eventOccurrenceForm.labelAutoAcceptanceMessage')}
              name="autoAcceptanceMessage"
              component={TextAreaField}
              value={autoAcceptanceMessage ?? ''}
              helperText={t('eventOccurrenceForm.helperAutoAcceptanceMessage')}
            />
          </div>
          <div className={styles.formRow}>
            <Notification
              label={t('eventOccurrenceForm.infoTitleAutoAcceptance')}
            >
              {t('eventOccurrenceForm.infoContentAutoAcceptance')}
            </Notification>
          </div>
        </div>
      )}
    </div>
  );
};

export const ExternalEnrolmentFields: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div>
        <Field
          label={t('eventForm.enrolment.labelExternalEnrolmentUrlOrEmail')}
          name="externalEnrolmentUrl"
          component={TextInputField}
        />
      </div>
    </div>
  );
};

export default EnrolmentInfoFormPart;
