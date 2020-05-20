import React from 'react';
import { useTranslation } from 'react-i18next';

import TextTitle from '../../../common/components/textTitle/TextTitle';
import { useImageQuery } from '../../../generated/graphql';
import ImagePreview from '../imagePreview/ImagePreview';

interface Props {
  imageId: string;
}

const ImageInfo: React.FC<Props> = ({ imageId }) => {
  const { t } = useTranslation();
  const { data } = useImageQuery({ variables: { id: imageId } });

  const altText = data?.image?.altText;
  const photographerName = data?.image?.photographerName;

  return (
    <div>
      <ImagePreview id={imageId} />
      {altText && (
        <>
          <TextTitle>{t('image.labelAltText')}</TextTitle>
          <p>{altText}</p>
        </>
      )}
      {photographerName && (
        <>
          <TextTitle>{t('image.labelPhotographerName')}</TextTitle>
          <p>{photographerName}</p>
        </>
      )}
    </div>
  );
};

export default ImageInfo;
