import classNames from 'classnames';
import { FieldProps } from 'formik';
import { Select, SelectProps } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { invalidFieldClass } from '../constants';
import { getErrorText } from '../utils';

export type Option = {
  label: string;
  value: string;
};

type Props = SelectProps<Option> &
  FieldProps & {
    options: Option[];
    defaultValue: Option;
    setFieldValue?: (
      field: string,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      value: any,
      shouldValidate?: boolean | undefined
    ) => void;
  };

const DropdownField: React.FC<Props> = ({
  className,
  field: { name, onBlur, onChange, value, ...field },
  form: { errors, touched },
  helper,
  multiselect,
  options,
  placeholder,
  setFieldValue,
  ...rest
}) => {
  const { t } = useTranslation();
  const errorText = getErrorText(errors, touched, name, t);

  const handleChange = (val: Option | Option[]) => {
    const value = Array.isArray(val)
      ? val.map((item) => item.value)
      : val.value;
    if (setFieldValue) {
      setFieldValue(name, value);
    } else {
      onChange({
        target: {
          id: name,
          value,
        },
      });
    }

    setTimeout(() => {
      // Automatically call onBlur event to make formik set touched value to true
      onBlur({
        target: {
          id: name,
        },
      });
    });
  };

  const selectedValue = options.find((option) => option.value === value) || {
    label: '',
    value: '',
  };
  return (
    <Select
      {...rest}
      {...field}
      helper={helper}
      invalid={Boolean(errorText)}
      error={errorText}
      optionLabelField={'label'}
      // closeMenuOnSelect={!multiselect}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onChange={handleChange as (selectedItems: any) => void}
      options={options}
      id={name}
      placeholder={placeholder || t('common.dropdown.placeholder')}
      value={selectedValue}
      className={classNames(className, { [invalidFieldClass]: errorText })}
    />
  );
};

export default DropdownField;
