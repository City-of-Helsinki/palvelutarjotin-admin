import classNames from 'classnames';
import { FieldProps } from 'formik';
import { DateInput, DateInputProps } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import useLocale from '../../../../hooks/useLocale';
import { invalidFieldClass } from '../constants';
import { getErrorText } from '../utils';

type Props = FieldProps & Omit<DateInputProps, 'form'>;

const DateInputField: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const {
    className,
    field: { name, onChange, onBlur, ...field },
    form: { errors, touched },
    helperText,
    required,
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

  const handleChange = (val?: string) => {
    onChange({
      target: {
        id: name,
        value: val,
      },
    });
  };

  return (
    <DateInput
      {...field}
      {...rest}
      id={name}
      language={locale}
      required={required}
      onChange={handleChange}
      onBlur={handleBlur}
      helperText={helperText}
      errorText={errorText}
      invalid={Boolean(errorText)}
      className={classNames(className, { [invalidFieldClass]: errorText })}
    />
  );
};

export default DateInputField;
