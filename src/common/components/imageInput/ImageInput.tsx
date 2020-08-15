import { Button } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { useUploadSingleImageMutation } from '../../../generated/graphql';
import InputWrapper, { InputWrapperProps } from '../textInput/InputWrapper';

type ImageInputProps = {
  setFieldValue: (
    field: string,
    value: string,
    shouldValidate?: boolean | undefined
  ) => void;
  name?: string;
} & InputWrapperProps;

const ImageInput: React.FC<ImageInputProps> = ({
  setFieldValue,
  name,
  ...props
}) => {
  const { t } = useTranslation();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [uploadImage] = useUploadSingleImageMutation();

  const handleChooseImageClick = () => {
    inputRef.current?.click();
  };

  const handleImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files?.[0]) {
      try {
        const data = await uploadImage({
          variables: {
            image: {
              name: '',
              image: e.currentTarget.files[0],
            },
          },
        });

        setFieldValue(
          props.id,
          data.data?.uploadImageMutation?.response?.body?.id || ''
        );
      } catch (e) {
        // Check apolloClient to see error handling
      }
    }
  };

  return (
    <InputWrapper {...props}>
      <input
        ref={inputRef}
        name={name}
        type="file"
        id={props.id}
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleImageFile}
      />
      <Button onClick={handleChooseImageClick} variant="secondary">
        {t('eventForm.basicInfo.addImage')}
      </Button>
    </InputWrapper>
  );
};

export default ImageInput;
