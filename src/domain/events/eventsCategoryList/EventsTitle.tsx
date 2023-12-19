import { useTranslation } from 'react-i18next';

import styles from './eventsCategoryList.module.scss';

const EventsTitle: React.FC<{ count: number; title: string }> = ({
  count,
  title,
}) => {
  const { t } = useTranslation();
  return (
    <h2>
      {title}{' '}
      <span className={styles.eventCount}>
        {t('events.textEventCount', {
          count: count,
        })}
      </span>
    </h2>
  );
};
export default EventsTitle;
