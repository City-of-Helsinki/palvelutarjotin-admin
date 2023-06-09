import classNames from 'classnames';
import format from 'date-fns/format';
import isValid from 'date-fns/isValid';
import { FieldProps } from 'formik';
import { DateInput, TextInputProps } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { invalidFieldClass } from '../constants';
import { getErrorText } from '../utils';

// Helsinki services will always use d.M.yyyy format: https://hds.hel.fi/foundation/guidelines/data-formats
export const DATE_FORMAT = 'd.M.yyyy';

type Props = FieldProps & Omit<TextInputProps, 'form'>;

const DateInputField: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const {
    className,
    field: { name, onChange, onBlur, ...field },
    form: { errors, touched },
    helperText,
    required,
    ...rest
  } = props;
  const [inputValue, setInputValue] = React.useState(
    field.value && isValid(new Date(field.value))
      ? format(new Date(field.value), DATE_FORMAT)
      : ''
  );
  const errorText = getErrorText(errors, touched, name, t);

  const handleBlur = React.useCallback(() => {
    onBlur({
      target: {
        id: name,
      },
    });
  }, [name, onBlur]);

  const handleChange = (value: string, valueAsDate: Date) => {
    setInputValue(value);
    // TODO: the value could be validated against the min and max dates set to the date input,
    // but while it's only available by manually writing the input and we don't have to restrict
    // the range anyhow, the validator was left out.
    if (isValid(valueAsDate)) {
      onChange({
        target: {
          id: name,
          value: valueAsDate,
        },
      });
    } else if (value === '') {
      onChange({
        target: {
          id: name,
          value: null,
        },
      });
    }
  };

  return (
    <DateInput
      {...field}
      {...rest}
      id={name}
      onChange={handleChange}
      onBlur={handleBlur}
      helperText={helperText}
      errorText={errorText}
      className={classNames(className, { [invalidFieldClass]: errorText })}
      value={inputValue}
    />
  );
};

export default DateInputField;
