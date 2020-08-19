import React from 'react';
import { useTranslation } from 'react-i18next';

import { TEMPLATE_TYPE } from '../../../domain/enrolment/types';
import { useEmailTemplatesQuery } from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import BackButton from '../backButton/BackButton';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';
import styles from './emailPreview.module.scss';
import { getTranslatedTemplate } from './utils';

interface Props {
  onClose: () => void;
  templateType: TEMPLATE_TYPE;
}

const EmailPreview: React.FC<Props> = ({ onClose, templateType }) => {
  const { data, loading } = useEmailTemplatesQuery();
  const { t } = useTranslation();
  const locale = useLocale();

  const template = getTranslatedTemplate(data, templateType, locale);

  return (
    <div>
      <BackButton onClick={onClose}>{t('common.back')}</BackButton>
      <LoadingSpinner isLoading={loading}>
        {template?.preview && (
          <div
            className={styles.previewContainer}
            dangerouslySetInnerHTML={{ __html: template.preview }}
          />
        )}
      </LoadingSpinner>
    </div>
  );
};

export default EmailPreview;
