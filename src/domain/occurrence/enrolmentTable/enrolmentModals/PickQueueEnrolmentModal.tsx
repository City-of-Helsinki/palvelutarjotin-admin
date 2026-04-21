import * as React from 'react';
import { useTranslation } from 'react-i18next';

import EnrolmentModal, { EnrolleeProps } from './EnrolmentModal';

interface PickQueueEnrolmentModalProps {
  onClose: () => void;
  pickQueueEnrolment: () => void;
  enrollees?: EnrolleeProps[];
  loading?: boolean;
}

const PickQueueEnrolmentModal: React.FC<PickQueueEnrolmentModalProps> = ({
  onClose,
  pickQueueEnrolment,
  enrollees,
  loading = false,
}) => {
  const { t } = useTranslation();
  return (
    <EnrolmentModal
      onClose={onClose}
      title={t('enrolment.enrolmentModal.pickQueueEnrolmentTitle')}
      submitButtonText={t('enrolment.enrolmentModal.pickQueueEnrolmentButton')}
      handleSubmit={pickQueueEnrolment}
      enrollees={enrollees}
      submitting={loading}
    />
  );
};

export default PickQueueEnrolmentModal;
