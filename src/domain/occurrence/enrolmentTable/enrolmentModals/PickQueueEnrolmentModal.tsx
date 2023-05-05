import * as React from 'react';
import { useTranslation } from 'react-i18next';

import EnrolmentModal, { EnrolleeProps } from './EnrolmentModal';

interface PickQueueEnrolmentModalProps {
  onClose: () => void;
  pickQueueEnrolment: () => void;
  enrollees?: EnrolleeProps[];
  appElement?: HTMLElement;
  loading?: boolean;
}

const PickQueueEnrolmentModal: React.FC<PickQueueEnrolmentModalProps> = ({
  onClose,
  pickQueueEnrolment,
  enrollees,
  appElement,
  loading = false,
}) => {
  const { t } = useTranslation();
  return (
    <EnrolmentModal
      onClose={onClose}
      title={t('enrolment.enrolmentModal.pickQueueEnrolmentTitle')}
      appElement={appElement}
      submitButtonText={t('enrolment.enrolmentModal.pickQueueEnrolmentButton')}
      handleSubmit={pickQueueEnrolment}
      enrollees={enrollees}
      submitting={loading}
    />
  );
};

export default PickQueueEnrolmentModal;
