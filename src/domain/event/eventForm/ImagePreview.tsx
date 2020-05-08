import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './eventForm.module.scss';

const ImagePreview: React.FC<{ image: string }> = ({ image }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.imagePreview}>
      <p>{t('eventForm.basicInfo.labelImage')}</p>
      <img
        className={styles.eventImage}
        src={image}
        alt={t('eventForm.basicInfo.eventImageAltText')}
      />
    </div>
  );
};

export default ImagePreview;
