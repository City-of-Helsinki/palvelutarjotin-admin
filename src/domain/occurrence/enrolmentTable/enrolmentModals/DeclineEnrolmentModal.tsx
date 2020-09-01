import React from 'react';
import { useTranslation } from 'react-i18next';

import EmailPreview from '../../../../common/components/emailPreview/EmailPreview';
import {
  NotificationTemplateType,
  useEnrolmentTemplateContextQuery,
  useEventNameQuery,
} from '../../../../generated/graphql';
import useLocale from '../../../../hooks/useLocale';
import EnrolmentModal, { EnrolleeProps } from './EnrolmentModal';
import { getEnrolmentTemplateContextJSON } from './utils';

interface ApproveModalProps {
  isOpen: boolean;
  onClose: () => void;
  declineEnrolment: (message?: string) => void;
  enrollees?: EnrolleeProps[];
  appElement?: HTMLElement;
  loading?: boolean;
  enrolmentId: string;
}

const DeclineEnrolmentModal: React.FC<ApproveModalProps> = ({
  isOpen,
  onClose,
  declineEnrolment,
  enrollees,
  appElement,
  loading = false,
  enrolmentId,
}) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const [messageText, setMessageText] = React.useState('');
  const [showPreview, setShowPreview] = React.useState(false);

  const { data: templateContextData } = useEnrolmentTemplateContextQuery({
    variables: { enrolmentId },
  });
  const linkedEventId =
    templateContextData?.enrolment?.occurrence?.pEvent?.linkedEventId || '';
  const { data: eventData } = useEventNameQuery({
    variables: {
      id: linkedEventId,
    },
    skip: !linkedEventId,
  });

  const emailTemplateContextJSON = getEnrolmentTemplateContextJSON(
    templateContextData,
    eventData,
    messageText,
    locale
  );

  return (
    <EnrolmentModal
      isOpen={isOpen}
      onClose={onClose}
      title={t('enrolment.enrolmentModal.declineEnrolment')}
      appElement={appElement}
      enrollees={enrollees}
      noteType="decline"
      noteSection
      showPreviewButton
      noteText={t('enrolment.enrolmentModal.declineEnrolmentNote')}
      submitButtonText={t('enrolment.enrolmentModal.sendCancelMessage')}
      handlePreviewClick={() => setShowPreview((p) => !p)}
      handleSubmit={() => declineEnrolment(messageText)}
      submitting={loading}
      onMessageTextChange={(message) => setMessageText(message)}
      messageText={messageText}
      preview={
        showPreview ? (
          <EmailPreview
            context={emailTemplateContextJSON}
            templateType={NotificationTemplateType.EnrolmentDeclined}
            onClose={() => setShowPreview(false)}
          />
        ) : null
      }
    />
  );
};

export default DeclineEnrolmentModal;
