import { IconUser } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import IconClock from '../../../icons/IconClock';
import { getEventPlaceholderImage } from '../utils';
import styles from './eventCard.module.scss';

interface Props {
  description?: string;
  enrolmentsCount: number;
  id: string;
  image?: string;
  name: string;
  occurrencesCount: number;
  onClick?: (id: string) => void;
}

const EventCard: React.FC<Props> = ({
  description,
  enrolmentsCount,
  id,
  image,
  name,
  occurrencesCount,
  onClick,
}) => {
  const { t } = useTranslation();

  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <div
      role="button"
      className={styles.eventCard}
      tabIndex={0}
      onClick={handleClick}
      aria-label={t('events.eventCard.ariaLabelOpenOccurrences', {
        eventName: name,
      })}
    >
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
            <IconUser />
            {t('events.eventCard.textEnrolments', {
              count: enrolmentsCount || 0,
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
