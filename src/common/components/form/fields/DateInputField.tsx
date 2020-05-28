import { FieldProps } from 'formik';
import { TextInputProps } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import Datepicker from '../../datepicker/Datepicker';
import { getErrorText } from '../utils';

type Props = FieldProps & Omit<TextInputProps, 'form'>;

const InputField: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const {
    field: { name, onChange, onBlur, ...field },
    form: { errors, touched },
    helperText,
    ...rest
  } = props;
  const errorText = getErrorText(errors, touched, name, t);

  const handleBlur = React.useCallback(() => {
    onBlur({
      target: {
        id: name,
      },
    });
  }, [name, onBlur]);

  const handleChange = (val?: Date | null) => {
    onChange({
      target: {
        id: name,
        value: val,
      },
    });
  };

  return (
    <Datepicker
      {...field}
      {...rest}
      id={name}
      onChange={handleChange}
      onBlur={handleBlur}
      helperText={errorText || helperText}
      invalidText={errorText}
    />
  );
};

export default InputField;
