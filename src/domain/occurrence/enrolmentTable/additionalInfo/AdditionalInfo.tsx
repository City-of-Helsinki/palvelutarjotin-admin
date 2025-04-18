import * as React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './additionalInfo.module.scss';
import {
  EnrolmentFieldsFragment,
  EventQueueEnrolmentFieldsFragment,
} from '../../../../generated/graphql';
import { translateValue } from '../../../../utils/translateUtils';
import { getEnrolmentFields } from '../../../enrolment/utils';

interface Props {
  enrolment: EnrolmentFieldsFragment | EventQueueEnrolmentFieldsFragment;
}

const AdditionalInfo: React.FC<Props> = ({ enrolment }) => {
  const { t } = useTranslation();

  const {
    extraNeeds,
    language,
    personInfo,
    preferredTimes,
    studyGroupPersonInfo,
  } = getEnrolmentFields(enrolment);

  return (
    <div className={styles.additionalInfo}>
      <div className={styles.contactInfo}>
        {language && (
          <span>
            {t('occurrenceDetails.enrolmentTable.messages', {
              language: translateValue(
                'common.languages.',
                language,
                t
              ).toLowerCase(),
            })}
          </span>
        )}
        {studyGroupPersonInfo?.map((item, i) => <span key={i}>{item}</span>)}
        {personInfo?.map((item, i) => <span key={i}>{item}</span>)}
      </div>
      {extraNeeds && <div>{extraNeeds}</div>}
      {preferredTimes && (
        <div className={styles.preferredTimes}>{preferredTimes}</div>
      )}
    </div>
  );
};

export default AdditionalInfo;
