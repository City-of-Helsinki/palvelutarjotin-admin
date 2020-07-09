import React from 'react';
import { useTranslation } from 'react-i18next';

import { EnrolmentFieldsFragment } from '../../../../generated/graphql';
import { translateValue } from '../../../../utils/translateUtils';
import styles from './additionalInfo.module.scss';

interface Props {
  enrolment: EnrolmentFieldsFragment;
}

const AdditionalInfo: React.FC<Props> = ({ enrolment }) => {
  const { t } = useTranslation();

  const language =
    enrolment.person?.language || enrolment.studyGroup.person.language;
  const studyGroupPersonInfo = [
    enrolment.studyGroup.person.phoneNumber,
    enrolment.studyGroup.person.emailAddress,
  ].filter((e) => e);
  const personInfo = [
    enrolment.person?.phoneNumber,
    enrolment.person?.emailAddress,
  ].filter((e) => e);
  const extraNeeds = enrolment.studyGroup.extraNeeds;
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
        {studyGroupPersonInfo.map((item) => (
          <span>{item}</span>
        ))}
        {personInfo.map((item) => (
          <span>{item}</span>
        ))}
      </div>
      {extraNeeds && <div>{extraNeeds}</div>}
    </div>
  );
};

export default AdditionalInfo;
