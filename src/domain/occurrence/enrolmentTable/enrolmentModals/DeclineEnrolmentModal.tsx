import * as React from 'react';
import { useTranslation } from 'react-i18next';

import EmailPreview from '../../../../common/components/emailPreview/EmailPreview';
import {
  NotificationTemplateType,
  useEnrolmentTemplateContextQuery,
} from '../../../../generated/graphql';
import useLocale from '../../../../hooks/useLocale';
import EnrolmentModal, { EnrolleeProps } from './EnrolmentModal';
import { getEnrolmentTemplateContextJSON } from './utils';

interface DeclineEnrolmentModalProps {
  onClose: () => void;
  declineEnrolment: (message?: string) => void;
  enrollees?: EnrolleeProps[];
  appElement?: HTMLElement;
  loading?: boolean;
  enrolmentId: string;
}

const DeclineEnrolmentModal: React.FC<DeclineEnrolmentModalProps> = ({
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

  const emailTemplateContextJSON = getEnrolmentTemplateContextJSON(
    templateContextData,
    messageText,
    locale
  );

  return (
    <EnrolmentModal
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
