import React from 'react';
import { useTranslation } from 'react-i18next';

import { PersonFieldsFragment } from '../../../../generated/graphql';
import styles from './modal.module.scss';

interface EnrolleesListProps {
  enrollees?: PersonFieldsFragment[];
}

const EnrolleesList: React.FC<EnrolleesListProps> = ({ enrollees }) => {
  const { t } = useTranslation();

  return enrollees ? (
    <div className={styles.enrollees}>
      <p className={styles.enrolleesTitle}>
        {t('enrolment.enrolmentModal.selectedEnrollees')}:
      </p>
      <ul className={styles.enrolleesList}>
        {enrollees.map((enrollee) => (
          <li key={enrollee.id}>{enrollee.name}</li>
        ))}
      </ul>
    </div>
  ) : null;
};

export default EnrolleesList;
