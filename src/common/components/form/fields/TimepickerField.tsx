import classNames from 'classnames';
import { FieldProps } from 'formik';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import Timepicker from '../../timepicker/Timepicker';
import { invalidFieldClass } from '../constants';
import { getErrorText } from '../utils';

interface Props extends FieldProps {
  className?: string;
  helperText: string;
  labelText: string;
  placeholder?: string;
}

const InputField: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const {
    className,
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
      className={classNames(className, { [invalidFieldClass]: errorText })}
    />
  );
};

export default InputField;
