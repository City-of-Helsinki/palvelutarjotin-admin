import * as React from 'react';
import { useTranslation } from 'react-i18next';

import EnrolmentModal, { EnrolleeProps } from './EnrolmentModal';

interface DeleteModalProps {
  onClose: () => void;
  deleteEnrolment: () => void;
  enrollees?: EnrolleeProps[];
  loading?: boolean;
}

const DeleteEnrolmentModal: React.FC<DeleteModalProps> = ({
  onClose,
  deleteEnrolment,
  enrollees,
  loading = false,
}) => {
  const { t } = useTranslation();
  return (
    <EnrolmentModal
      onClose={onClose}
      title={t('enrolment.enrolmentModal.deleteEnrolment')}
      submitButtonText={t('enrolment.enrolmentModal.deleteEnrolment')}
      handleSubmit={deleteEnrolment}
      enrollees={enrollees}
      submitting={loading}
      variant="danger"
    />
  );
};

export default DeleteEnrolmentModal;
