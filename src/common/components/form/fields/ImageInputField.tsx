import { FieldProps } from 'formik';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import ImageInput from '../../imageInput/ImageInput';
import { invalidFieldClass } from '../constants';
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
      {...field}
      id={name}
      helperText={errorText}
      labelText={labelText}
      invalid={!!errorText}
      setFieldValue={setFieldValue}
      className={errorText ? invalidFieldClass : undefined}
    />
  );
};

export default InputField;
