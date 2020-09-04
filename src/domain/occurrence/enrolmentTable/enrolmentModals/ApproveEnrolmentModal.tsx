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
  onClose: () => void;
  approveEnrolment: (message: string) => void;
  enrollees?: EnrolleeProps[];
  // appElement for testing purposes
  appElement?: HTMLElement;
  loading?: boolean;
  enrolmentId: string;
}

const ApproveEnrolmentModal: React.FC<ApproveModalProps> = ({
  onClose,
  approveEnrolment,
  enrollees,
  appElement,
  enrolmentId,
  loading = false,
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
      handlePreviewClick={() => setShowPreview((p) => !p)}
      onMessageTextChange={(message) => setMessageText(message)}
      messageText={messageText}
      showPreviewButton
      preview={
        showPreview ? (
          <EmailPreview
            context={emailTemplateContextJSON}
            templateType={NotificationTemplateType.EnrolmentApproved}
            onClose={() => setShowPreview(false)}
          />
        ) : null
      }
    />
  );
};

export default ApproveEnrolmentModal;
