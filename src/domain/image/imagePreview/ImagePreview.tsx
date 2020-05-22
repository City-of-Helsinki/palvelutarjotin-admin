import React from 'react';
import { useTranslation } from 'react-i18next';

import TextTitle from '../../../common/components/textTitle/TextTitle';
import { useImageQuery } from '../../../generated/graphql';
import styles from './imagePreview.module.scss';

interface Props {
  id: string;
}

const ImagePreview: React.FC<Props> = ({ id }) => {
  const { t } = useTranslation();
  const { data } = useImageQuery({ variables: { id } });
  return data ? (
    <div className={styles.imagePreview}>
      <TextTitle>{t('image.labelImage')}</TextTitle>
      <img
        className={styles.image}
        src={data.image?.url}
        alt={data.image?.altText || ''}
      />
    </div>
  ) : null;
};

export default ImagePreview;
