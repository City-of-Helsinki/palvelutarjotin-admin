import classNames from 'classnames';
import { FieldProps } from 'formik';
import { TimeInput, TimeInputProps } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { invalidFieldClass } from '../constants';
import { getErrorText } from '../utils';

type Props = FieldProps & Omit<TimeInputProps, 'form'>;

const TimeInputField: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const {
    className,
    field: { name, onChange, onBlur, ...field },
    form: { errors, touched },
    helperText,
    required,
    ...rest
  } = props;
  const errorText = getErrorText(errors, touched, name, t);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    onChange({
      target: {
        id: name,
        // call onChange only when input is in valid hh:mm format to avoid invalid value warnings
        value: /\d{2}:\d{2}/.test(value) ? value : '',
      },
    });
  };

  return (
    <TimeInput
      {...field}
      {...rest}
      id={name}
      onChange={handleChange}
      helperText={helperText}
      errorText={errorText}
      className={classNames(className, { [invalidFieldClass]: errorText })}
    />
  );
};

export default TimeInputField;
