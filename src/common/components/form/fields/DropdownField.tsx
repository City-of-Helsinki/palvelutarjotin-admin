import classNames from 'classnames';
import { FieldProps } from 'formik';
import { Dropdown, DropdownProps } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { invalidFieldClass } from '../constants';
import { getErrorText } from '../utils';

export type Option = {
  label: string;
  value: string;
};

interface Props extends DropdownProps, FieldProps {
  options: Option[];
  setFieldValue?: (
    field: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
}

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
  return (
    <Dropdown
      {...rest}
      {...field}
      helper={errorText || helper}
      invalid={Boolean(errorText)}
      optionLabelField={'label'}
      multiselect={multiselect}
      closeMenuOnSelect={!multiselect}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onChange={handleChange as (selectedItems: any) => void}
      options={options}
      id={name}
      placeholder={placeholder || t('common.dropdown.placeholder')}
      selectedOption={
        multiselect
          ? value
              .map((item: string) =>
                options.find((option) => option.value === item)
              )
              .filter((i: Option | undefined) => i)
          : options.find((option) => option.value === value)
      }
      className={classNames(className, { [invalidFieldClass]: errorText })}
    />
  );
};

export default DropdownField;
