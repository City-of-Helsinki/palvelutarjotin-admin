import { useTranslation } from 'react-i18next';

import LoadingSpinner from '../../../common/components/loadingSpinner/LoadingSpinner';
import styles from './eventsCategoryList.module.scss';

const ShowMoreButton: React.FC<{
  loading: boolean;
  onClick: () => Promise<void>;
}> = ({ loading, onClick }) => {
  const { t } = useTranslation();

  return (
    <LoadingSpinner hasPadding={false} isLoading={loading}>
      <button onClick={onClick} className={styles.showMoreButton}>
        {t('events.buttonLoadMore')}
      </button>
    </LoadingSpinner>
  );
};
export default ShowMoreButton;
