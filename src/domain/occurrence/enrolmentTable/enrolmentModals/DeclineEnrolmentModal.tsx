import * as React from 'react';
import { useTranslation } from 'react-i18next';

import EnrolmentModal, { EnrolleeProps } from './EnrolmentModal';

interface DeclineEnrolmentModalProps {
  onClose: () => void;
  declineEnrolment: (message?: string) => void;
  enrollees?: EnrolleeProps[];
  appElement?: HTMLElement;
  loading?: boolean;
}

const DeclineEnrolmentModal: React.FC<DeclineEnrolmentModalProps> = ({
  onClose,
  declineEnrolment,
  enrollees,
  appElement,
  loading = false,
}) => {
  const { t } = useTranslation();
  const [messageText, setMessageText] = React.useState('');

  return (
    <EnrolmentModal
      onClose={onClose}
      title={t('enrolment.enrolmentModal.declineEnrolment')}
      appElement={appElement}
      enrollees={enrollees}
      noteType="decline"
      noteSection
      noteText={t('enrolment.enrolmentModal.declineEnrolmentNote')}
      submitButtonText={t('enrolment.enrolmentModal.sendCancelMessage')}
      handleSubmit={() => declineEnrolment(messageText)}
      submitting={loading}
      onMessageTextChange={(message) => setMessageText(message)}
      messageText={messageText}
    />
  );
};

export default DeclineEnrolmentModal;
