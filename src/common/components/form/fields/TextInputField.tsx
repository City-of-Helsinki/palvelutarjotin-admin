import classNames from 'classnames';
import { FieldProps } from 'formik';
import { TextInput, TextInputProps } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { invalidFieldClass } from '../constants';
import { getErrorText } from '../utils';

type Props = FieldProps & Omit<TextInputProps, 'form'>;

const InputField: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const {
    className,
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
      name={name}
      helperText={errorText || helperText}
      invalid={!!errorText}
      className={classNames(className, { [invalidFieldClass]: errorText })}
    />
  );
};

export default InputField;
