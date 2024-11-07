import { useTranslation } from 'react-i18next';
import React from 'react';

import LoadingSpinner from '../../../common/components/loadingSpinner/LoadingSpinner';
import styles from './eventsCategoryList.module.scss';

export type ShowMoreButtonProps = {
  loading: boolean;
  onClick: () => Promise<void>;
};

function ShowMoreButton({
  loading,
  onClick,
}: Readonly<ShowMoreButtonProps>): React.ReactElement<ShowMoreButtonProps> {
  const { t } = useTranslation();

  return (
    <LoadingSpinner hasPadding={false} isLoading={loading}>
      <button onClick={onClick} className={styles.showMoreButton}>
        {t('events.buttonLoadMore')}
      </button>
    </LoadingSpinner>
  );
}
export default ShowMoreButton;
