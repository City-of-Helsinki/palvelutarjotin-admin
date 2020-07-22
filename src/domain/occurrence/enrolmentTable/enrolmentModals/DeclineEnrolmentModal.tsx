import { Button } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { PersonFieldsFragment } from '../../../../generated/graphql';
import EnrolleesList from './EnrolleesList';
import EnrolmentModal from './EnrolmentModal';
import styles from './enrolmentModals.module.scss';

interface ApproveModalProps {
  isOpen: boolean;
  onClose: () => void;
  declineEnrolment: () => void;
  enrollees?: PersonFieldsFragment[];
  appElement?: HTMLElement;
}

const DeclineEnrolmentModal: React.FC<ApproveModalProps> = ({
  isOpen,
  onClose,
  declineEnrolment,
  enrollees,
  appElement,
}) => {
  const { t } = useTranslation();

  const handlePreview = () => {
    alert('TODO: handle preview');
  };

  return (
    <EnrolmentModal
      isOpen={isOpen}
      onClose={onClose}
      title={t('enrolment.enrolmentModal.declineEnrolment')}
      appElement={appElement}
    >
      <div className={styles.infoNoteDecline}>
        {t('enrolment.enrolmentModal.declineEnrolmentNote')}
      </div>
      <EnrolleesList enrollees={enrollees} />
      <div className={styles.buttonsContainer}>
        <Button variant="secondary" onClick={onClose}>
          {t('enrolment.enrolmentModal.cancelEnrolment')}
        </Button>
        <div className={styles.buttonsRight}>
          {/* TODO: preview functionality */}
          <Button variant="supplementary" onClick={handlePreview}>
            {t('enrolment.enrolmentModal.preview')}
          </Button>
          <Button variant="primary" onClick={declineEnrolment}>
            {t('enrolment.enrolmentModal.sendCancelMessage')}
          </Button>
        </div>
      </div>
    </EnrolmentModal>
  );
};

export default DeclineEnrolmentModal;
