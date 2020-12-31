import { Button } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useUploadSingleImageMutation } from '../../../generated/graphql';
import InputWrapper, { InputWrapperProps } from '../textInput/InputWrapper';

// 2 megabytes
const IMAGE_MAX_SIZE = 2097152;

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

  const resetImageInput = () => {
    if (inputRef.current?.value) {
      inputRef.current.value = '';
    }
  };

  const handleImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    const fileSize = file?.size;

    if (fileSize && fileSize > IMAGE_MAX_SIZE) {
      toast(t('form.error.imageTooBig'), { type: toast.TYPE.ERROR });
      resetImageInput();
      return;
    }

    if (file) {
      try {
        const data = await uploadImage({
          variables: {
            image: {
              name: '',
              image: file,
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
