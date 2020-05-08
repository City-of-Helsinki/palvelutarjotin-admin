import React from 'react';
import { useTranslation } from 'react-i18next';

import Button from '../button/Button';
import InputWrapper, { InputWrapperProps } from '../textInput/InputWrapper';

type ImageInputProps = {
  setFieldValue: (
    field: string,
    value: string,
    shouldValidate?: boolean | undefined
  ) => void;
} & InputWrapperProps;

const ImageInput: React.FC<ImageInputProps> = ({ setFieldValue, ...props }) => {
  const { t } = useTranslation();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleChooseImageClick = () => {
    inputRef.current?.click();
  };

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files?.[0]) {
      const objectURL = window.URL.createObjectURL(e.currentTarget.files[0]);
      setFieldValue(props.id, objectURL);
    }
  };

  return (
    <InputWrapper {...props}>
      <input
        ref={inputRef}
        type="file"
        id={props.id}
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleImageFile}
      />
      <Button onClick={handleChooseImageClick} color="secondary">
        {t('eventForm.basicInfo.addImage')}
      </Button>
    </InputWrapper>
  );
};

export default ImageInput;
