import { FieldProps } from 'formik';
import { TextInput, TextInputProps } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { getErrorText } from '../utils';

type Props = FieldProps & Omit<TextInputProps, 'form'>;

const NumberInputField: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const {
    field: { name, ...field },
    form: { errors, touched },
    helperText,
    ...rest
  } = props;
  const errorText = getErrorText(errors, touched, name, t);

  return (
    <TextInput
      {...field}
      {...rest}
      id={name}
      type="number"
      helperText={errorText || helperText}
      invalid={!!errorText}
    />
  );
};

export default NumberInputField;
