import { Field, useFormikContext } from 'formik';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import CheckboxField from '../../../common/components/form/fields/CheckboxField';
import DateInputField from '../../../common/components/form/fields/DateInputField';
import TextInputField from '../../../common/components/form/fields/TextInputField';
import styles from '../occurrencePage.module.scss';
import { TimeAndLocationFormFields } from '../types';

const EnrolmentInfoFormPart: React.FC = () => {
  const { t } = useTranslation();

  const {
    values: { neededOccurrences, autoAcceptance },
    setFieldValue,
  } = useFormikContext<TimeAndLocationFormFields>();

  // Enrolments cannot be manually accepted if more than one occurrence is needed
  // So we se autoAcceptance to true id neededOccurrences is more than 1
  React.useEffect(() => {
    if (neededOccurrences > 1 && !autoAcceptance) {
      setFieldValue('autoAcceptance', true);
    }
  }, [autoAcceptance, neededOccurrences, setFieldValue]);

  return (
    <div className={styles.formSection}>
      <div className={styles.formSectionInnerContainer}>
        <div>
          <h2>{t('eventForm.enrolment.title')}</h2>
          {/* Uncommment these when API supports them :) */}
          {/* <div className={styles.formRow}>
            <Field
              label={t('eventForm.enrolment.labelEnrolmentRequired')}
              name="enrolmentNeeded"
              component={CheckboxField}
            />
            <Field
              label={t('eventForm.enrolment.labelExternalEnrolment')}
              name="externalEnrolment"
              component={CheckboxField}
            />
          </div>
          <div className={styles.formRow}>
            <div>
              <Field
                label={t('eventForm.enrolment.labelExternalEnrolmentUrl')}
                name="externalEnrolmentUrl"
                disabled={!externalEnrolment}
                component={TextInputField}
              />
            </div>
          </div> */}
          <div className={styles.formRow}>
            <Field
              required
              labelText={t('eventForm.basicInfo.labelEnrolmentStart')}
              name="enrolmentStart"
              component={DateInputField}
              timeSelector={true}
            />
            <div>
              <Field
                required
                labelText={t('eventForm.basicInfo.labelEnrolmentEndDays')}
                name="enrolmentEndDays"
                component={TextInputField}
                min={0}
                type="number"
              />
            </div>
            <div>
              <Field
                labelText={t('eventForm.categorisation.labelNeededOccurrences')}
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
      </div>
    </div>
  );
};

export default EnrolmentInfoFormPart;
