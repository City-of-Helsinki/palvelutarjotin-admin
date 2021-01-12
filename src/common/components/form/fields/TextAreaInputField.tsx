import classNames from 'classnames';
import { FieldProps } from 'formik';
import { TextArea, TextAreaProps } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { invalidFieldClass } from '../constants';
import { getErrorText } from '../utils';

type Props = FieldProps & Omit<TextAreaProps, 'form'>;

const TextAreaField: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const {
    className,
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
      className={classNames(className, { [invalidFieldClass]: errorText })}
    />
  );
};

export default TextAreaField;
