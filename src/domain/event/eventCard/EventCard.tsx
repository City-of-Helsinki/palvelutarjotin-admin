import { IconEye, IconUser } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import IconClock from '../../../icons/IconClock';
import { PUBLICATION_STATUS } from '../../events/constants';
import { EnrolmentType } from '../../occurrence/enrolmentInfoFormPart/EnrolmentInfoFormPart';
import { getEventPlaceholderImage } from '../utils';
import styles from './eventCard.module.scss';

interface Props {
  description?: string;
  enrolmentsCount: number;
  enrolmentType: EnrolmentType;
  id: string;
  image?: string;
  name: string;
  occurrencesCount: number;
  onClick?: (id: string) => void;
  publicationStatus?: string | null;
}

const EventCard: React.FC<Props> = ({
  description,
  enrolmentsCount,
  enrolmentType,
  id,
  image,
  name,
  occurrencesCount,
  publicationStatus,
  onClick,
}) => {
  const { t } = useTranslation();

  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && onClick) {
      onClick(id);
    }
  };

  const getPublicationText = () => {
    if (publicationStatus === PUBLICATION_STATUS.PUBLIC) {
      return t('events.eventCard.statusPublished');
    }

    if (publicationStatus === PUBLICATION_STATUS.DRAFT) {
      return t('events.eventCard.statusNotPublished');
    }
  };

  const getEnrolmentText = () => {
    return {
      [EnrolmentType.Internal]: t('events.eventCard.textEnrolments', {
        count: enrolmentsCount || 0,
      }),
      [EnrolmentType.External]: t('events.eventCard.textExternalEnrolments'),
      [EnrolmentType.Unenrollable]: t('events.eventCard.textUnenrollable'),
    }[enrolmentType];
  };

  return (
    <div
      role="button"
      className={styles.eventCard}
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={onKeyDown}
      aria-label={t('events.eventCard.ariaLabelOpenOccurrences', {
        eventName: name,
      })}
    >
      <div
        className={styles.imageWrapper}
        data-testid={`event-image-${id}`}
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
            {getEnrolmentText()}
          </div>
          {/* TODO: Handle rest of the cases when there API support */}
          <div className={styles.textWithIcon}>
            <IconEye />
            {getPublicationText()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
