import * as React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './eventImage.module.scss';

interface EventImageProps {
  imageUrl?: string;
  imageAltText?: string | null;
  photographerName?: string | null;
}

const EventImage: React.FC<EventImageProps> = ({
  imageUrl,
  imageAltText,
  photographerName,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.imageContainer}>
      <img
        className={styles.eventImage}
        src={imageUrl}
        alt={imageAltText ?? undefined}
      />
      {photographerName && (
        <div className={styles.photographerText}>
          {t('eventDetails.basicInfo.photographerText', {
            photographer: photographerName,
          })}
        </div>
      )}
    </div>
  );
};

export default EventImage;
