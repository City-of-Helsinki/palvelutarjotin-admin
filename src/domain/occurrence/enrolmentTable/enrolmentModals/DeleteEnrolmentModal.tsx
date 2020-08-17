import { Button } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { PersonFieldsFragment } from '../../../../generated/graphql';
import EnrolleesList from './EnrolleesList';
import EnrolmentModal from './EnrolmentModal';
import styles from './enrolmentModals.module.scss';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  deleteEnrolment: () => void;
  enrollees?: PersonFieldsFragment[];
  appElement?: HTMLElement;
  loading?: boolean;
}

const DeleteEnrolmentModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  deleteEnrolment,
  enrollees,
  appElement,
  loading = false,
}) => {
  const { t } = useTranslation();
  return (
    <EnrolmentModal
      isOpen={isOpen}
      onClose={onClose}
      title={t('enrolment.enrolmentModal.deleteEnrolment')}
      appElement={appElement}
    >
      <EnrolleesList enrollees={enrollees} />
      <div className={styles.buttonsContainer}>
        <Button variant="secondary" onClick={onClose}>
          {t('enrolment.enrolmentModal.cancelEnrolment')}
        </Button>
        <div className={styles.buttonsRight}>
          <Button variant="danger" onClick={deleteEnrolment} disabled={loading}>
            {t('enrolment.enrolmentModal.deleteEnrolment')}
          </Button>
        </div>
      </div>
    </EnrolmentModal>
  );
};

export default DeleteEnrolmentModal;
