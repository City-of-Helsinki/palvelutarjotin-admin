import { FieldProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';

import Timepicker from '../../timepicker/Timepicker';
import { getErrorText } from '../utils';

interface Props extends FieldProps {
  helperText: string;
  labelText: string;
  placeholder?: string;
}

const InputField: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const {
    field: { name, onBlur, onChange, ...field },
    form: { errors, touched },
    helperText,
    ...rest
  } = props;
  const errorText = getErrorText(errors, touched, name, t);

  const handleBlur = (val: string) => {
    onBlur({
      target: {
        id: name,
        value: val,
      },
    });
  };

  const handleChange = (val: string) => {
    onChange({
      target: {
        id: name,
        value: val,
      },
    });
  };

  return (
    <Timepicker
      {...field}
      {...rest}
      onChange={handleChange}
      onBlur={handleBlur}
      id={name}
      helperText={errorText || helperText}
      invalid={!!errorText}
      invalidText={errorText}
    />
  );
};

export default InputField;
