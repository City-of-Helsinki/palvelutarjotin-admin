import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  Language,
  NotificationTemplateType,
  useNotificationTemplateQuery,
} from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import BackButton from '../backButton/BackButton';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';
import styles from './emailPreview.module.scss';

interface Props {
  onClose: () => void;
  templateType: NotificationTemplateType;
  context?: string | null;
}

const EmailPreview: React.FC<Props> = ({ onClose, templateType, context }) => {
  const locale = useLocale();
  const { data, error, loading } = useNotificationTemplateQuery({
    variables: {
      templateType,
      context,
      language: locale.toUpperCase() as Language,
    },
    skip: !context,
  });
  const { t } = useTranslation();
  const previewHtml = data?.notificationTemplate?.customContextPreviewHtml;

  return (
    <div>
      <BackButton onClick={onClose}>{t('common.back')}</BackButton>
      <LoadingSpinner isLoading={loading}>
        {previewHtml && (
          <div
            className={styles.previewContainer}
            dangerouslySetInnerHTML={{ __html: previewHtml }}
          />
        )}
        {error && <span>{t('enrolment.enrolmentModal.previewError')}</span>}
      </LoadingSpinner>
    </div>
  );
};

export default EmailPreview;
