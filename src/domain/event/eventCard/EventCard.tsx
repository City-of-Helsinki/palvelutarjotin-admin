import { IconPerson } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import IconClock from '../../../icons/IconClock';
import { getEventPlaceholderImage } from '../utils';
import styles from './eventCard.module.scss';

interface Props {
  description?: string;
  enrolledCount: number;
  id: string;
  image?: string;
  name: string;
  occurrencesCount: number;
}

const EventCard: React.FC<Props> = ({
  description,
  enrolledCount,
  id,
  image,
  name,
  occurrencesCount,
}) => {
  const { t } = useTranslation();
  return (
    <div className={styles.eventCard}>
      <div
        className={styles.imageWrapper}
        style={{
          backgroundImage: `url(${image || getEventPlaceholderImage(id)})`,
        }}
      ></div>
      <div className={styles.contentWrapper}>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>{name}</div>
          <div className={styles.description}>{description}</div>
        </div>
        <div className={styles.occurrenceInfoWrapper}>
          <div className={styles.textWithIcon}>
            <IconClock />
            {t('events.eventCard.textOccurrences', {
              count: occurrencesCount || 0,
            })}
          </div>
          <div className={styles.textWithIcon}>
            <IconPerson />
            {t('events.eventCard.textEnrolled', {
              count: enrolledCount || 0,
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
