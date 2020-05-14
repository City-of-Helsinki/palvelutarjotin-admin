import { FieldProps } from 'formik';
import { TextArea, TextAreaProps } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { getErrorText } from '../utils';

type Props = FieldProps & Omit<TextAreaProps, 'form'>;

const TextAreaField: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const {
    field: { name, ...field },
    form: { errors, touched },
    helperText,
    rows = 10,
    ...rest
  } = props;
  const errorText = getErrorText(errors, touched, name, t);

  return (
    <TextArea
      {...field}
      {...rest}
      id={name}
      rows={rows}
      helperText={errorText || helperText}
      invalid={!!errorText}
    />
  );
};

export default TextAreaField;
