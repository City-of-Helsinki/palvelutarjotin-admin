import { FieldProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';

import ImageInput from '../../imageInput/ImageInput';
import { getErrorText } from '../utils';

interface Props extends FieldProps {
  defaultValue?: number;
  labelText: string;
}

const InputField: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const {
    field: { name, ...field },
    form: { setFieldValue, errors, touched },
    labelText,
  } = props;
  const errorText = getErrorText(errors, touched, name, t);

  return (
    <ImageInput
      id={name}
      labelText={labelText}
      invalid={!!errorText}
      invalidText={errorText}
      setFieldValue={setFieldValue}
      {...field}
    />
  );
};

export default InputField;
