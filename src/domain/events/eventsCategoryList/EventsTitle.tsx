import { useTranslation } from 'react-i18next';
import React from 'react';

import styles from './eventsCategoryList.module.scss';

export type EventsTitleProps = {
  count: number;
  title: string;
};

function EventsTitle({
  count,
  title,
}: Readonly<EventsTitleProps>): React.ReactElement<EventsTitleProps> {
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
}
export default EventsTitle;
