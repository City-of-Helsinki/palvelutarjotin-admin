import { Field, useFormikContext } from 'formik';
import { RadioButton, SelectionGroup } from 'hds-react';
import capitalize from 'lodash/capitalize';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import CheckboxField from '../../../common/components/form/fields/CheckboxField';
import DateInputField from '../../../common/components/form/fields/DateInputField';
import TextInputField from '../../../common/components/form/fields/TextInputField';
import styles from '../occurrencePage.module.scss';
import { TimeAndLocationFormFields } from '../types';

export enum EnrolmentType {
  Internal = 'internal',
  External = 'external',
  Unenrollable = 'unenrollable',
}

const EnrolmentInfoFormPart: React.FC = () => {
  const { t } = useTranslation();

  const {
    values: { neededOccurrences, autoAcceptance, enrolmentType },
    setFieldValue,
  } = useFormikContext<TimeAndLocationFormFields>();

  // Enrolments cannot be manually accepted if more than one occurrence is needed
  // So we se autoAcceptance to true id neededOccurrences is more than 1
  React.useEffect(() => {
    if (neededOccurrences != null && neededOccurrences > 1 && !autoAcceptance) {
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
    [EnrolmentType.Unenrollable]: <div></div>,
  };

  return (
    <div className={styles.formSection}>
      <div className={styles.formSectionInnerContainer}>
        <div>
          <h2>{t('eventForm.enrolment.title')}</h2>
          <EnrolmentTypeSelector
            enrolmentType={enrolmentType}
            setEnrolmentType={(enrolmentTypeValue: EnrolmentType) =>
              setFieldValue('enrolmentType', enrolmentTypeValue)
            }
          />
          {enrolmentFieldSetComponentByType[enrolmentType]}
        </div>
      </div>
    </div>
  );
};

export const EnrolmentTypeSelector: React.FC<{
  enrolmentType: EnrolmentType;
  setEnrolmentType: (enrolmentTypeValue: EnrolmentType) => void;
}> = ({ enrolmentType, setEnrolmentType }) => {
  const { t } = useTranslation();

  const onChangeEnrolmentType = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEnrolmentType(event.target.value as EnrolmentType);
  };

  const isActiveEnrolmentType = (type: EnrolmentType) => {
    return enrolmentType === type;
  };

  return (
    <SelectionGroup
      direction="horizontal"
      className={styles.enrolmentTypeSelector}
    >
      {Object.values(EnrolmentType).map((type) => (
        <RadioButton
          key={`enrolmentType-${type}`}
          id={`enrolmentType-${type}`}
          name="enrolmentType"
          value={type}
          label={t(`eventForm.enrolmentType.label${capitalize(type)}`)}
          checked={isActiveEnrolmentType(type)}
          onChange={onChangeEnrolmentType}
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

  return (
    <div>
      <div className={styles.formRow}>
        <Field
          className={styles.enrolmentStartInput}
          required
          labelText={t('eventForm.basicInfo.labelEnrolmentStart')}
          name="enrolmentStart"
          component={DateInputField}
          timeSelector={true}
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
    </div>
  );
};

export const ExternalEnrolmentFields: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div>
        <Field
          label={t('eventForm.enrolment.labelExternalEnrolmentUrl')}
          name="externalEnrolmentUrl"
          component={TextInputField}
        />
      </div>
    </div>
  );
};

export default EnrolmentInfoFormPart;
