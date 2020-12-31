import * as React from 'react';
import { useTranslation } from 'react-i18next';

import EnrolmentModal, { EnrolleeProps } from './EnrolmentModal';

interface DeleteModalProps {
  onClose: () => void;
  deleteEnrolment: () => void;
  enrollees?: EnrolleeProps[];
  appElement?: HTMLElement;
  loading?: boolean;
}

const DeleteEnrolmentModal: React.FC<DeleteModalProps> = ({
  onClose,
  deleteEnrolment,
  enrollees,
  appElement,
  loading = false,
}) => {
  const { t } = useTranslation();
  return (
    <EnrolmentModal
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
