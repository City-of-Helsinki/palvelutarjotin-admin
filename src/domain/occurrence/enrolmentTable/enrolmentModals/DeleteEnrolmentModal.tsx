import React from 'react';
import { useTranslation } from 'react-i18next';

import EnrolmentModal, { EnrolleeProps } from './EnrolmentModal';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  deleteEnrolment: () => void;
  enrollees?: EnrolleeProps[];
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
      submitButtonText={t('enrolment.enrolmentModal.deleteEnrolment')}
      handleSubmit={deleteEnrolment}
      enrollees={enrollees}
      submitting={loading}
    />
  );
};

export default DeleteEnrolmentModal;
