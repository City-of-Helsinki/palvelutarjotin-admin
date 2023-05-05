import * as React from 'react';
import { useTranslation } from 'react-i18next';

import {
  EnrolmentFieldsFragment,
  EventQueueEnrolmentFieldsFragment,
} from '../../../../generated/graphql';
import { translateValue } from '../../../../utils/translateUtils';
import { getEnrolmentFields } from '../../../enrolment/utils';
import styles from './additionalInfo.module.scss';

interface Props {
  enrolment: EnrolmentFieldsFragment | EventQueueEnrolmentFieldsFragment;
}

const AdditionalInfo: React.FC<Props> = ({ enrolment }) => {
  const { t } = useTranslation();

  const { language, studyGroupPersonInfo, personInfo, extraNeeds } =
    getEnrolmentFields(enrolment);

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
        {studyGroupPersonInfo?.map((item, i) => (
          <span key={i}>{item}</span>
        ))}
        {personInfo?.map((item, i) => (
          <span key={i}>{item}</span>
        ))}
      </div>
      {extraNeeds && <div>{extraNeeds}</div>}
    </div>
  );
};

export default AdditionalInfo;
