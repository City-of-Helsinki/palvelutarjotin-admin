import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { EnrolleeProps } from './EnrolmentModal';
import styles from './enrolmentModals.module.scss';

interface EnrolleesListProps {
  enrollees?: EnrolleeProps[];
}

const EnrolleesList: React.FC<EnrolleesListProps> = ({ enrollees }) => {
  const { t } = useTranslation();

  return enrollees ? (
    <div className={styles.enrollees}>
      <p className={styles.enrolleesTitle}>
        {t('enrolment.enrolmentModal.selectedEnrollees')}:
      </p>
      <ul className={styles.enrolleesList}>
        {enrollees.map((enrollee, i) => (
          <li key={i}>{enrollee.personName}</li>
        ))}
      </ul>
    </div>
  ) : null;
};

export default EnrolleesList;
