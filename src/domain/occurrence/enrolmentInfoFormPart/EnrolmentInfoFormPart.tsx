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
    values: { externalEnrolment },
  } = useFormikContext<TimeAndLocationFormFields>();

  return (
    <div className={styles.formSection}>
      <div className={styles.formSectionInnerContainer}>
        <div>
          <h2>{t('eventForm.enrolment.title')}</h2>
          <div className={styles.formRow}>
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
          </div>
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
              component={CheckboxField}
            />
            {/* <Field
              label={t('eventOccurrenceForm.labelOneGroupFills')}
              name="oneGroupFills"
              component={CheckboxField}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrolmentInfoFormPart;
