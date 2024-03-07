import * as React from 'react';
import { useTranslation } from 'react-i18next';

import EnrolmentModal, { EnrolleeProps } from './EnrolmentModal';

interface ApproveModalProps {
  onClose: () => void;
  approveEnrolment: (message: string) => void;
  enrollees?: EnrolleeProps[];
  // appElement for testing purposes
  appElement?: HTMLElement;
  loading?: boolean;
}

const ApproveEnrolmentModal: React.FC<ApproveModalProps> = ({
  onClose,
  approveEnrolment,
  enrollees,
  appElement,
  loading = false,
}) => {
  const { t } = useTranslation();
  const [messageText, setMessageText] = React.useState('');

  return (
    <EnrolmentModal
      onClose={onClose}
      title={t('enrolment.enrolmentModal.approveEnrolment')}
      appElement={appElement}
      enrollees={enrollees}
      noteType="success"
      submitting={loading}
      noteSection
      noteText={t('enrolment.enrolmentModal.approveEnrolmentNote')}
      submitButtonText={t('enrolment.enrolmentModal.sendConfirmationMessage')}
      handleSubmit={() => approveEnrolment(messageText)}
      onMessageTextChange={(message) => setMessageText(message)}
      messageText={messageText}
    />
  );
};

export default ApproveEnrolmentModal;
