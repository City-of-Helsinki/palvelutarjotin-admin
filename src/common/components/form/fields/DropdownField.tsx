import { FieldProps } from 'formik';
import { Dropdown, DropdownProps } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { getErrorText } from '../utils';

type Option = {
  label: string;
  value: string;
};

type OptionType = {
  [key: string]: any;
};

interface Props extends DropdownProps, FieldProps {
  options: Option[];
}

const DropdownField: React.FC<Props> = ({
  field: { name, onBlur, onChange, value, ...field },
  form: { errors, touched },
  helper,
  multiselect,
  options,
  placeholder,
  ...rest
}) => {
  const { t } = useTranslation();
  const errorText = getErrorText(errors, touched, name, t);

  const handleChange = (val: OptionType | OptionType[]) => {
    onChange({
      target: {
        id: name,
        value: Array.isArray(val) ? val.map((item) => item.value) : val.value,
      },
    });

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
      onChange={handleChange}
      options={options}
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
    />
  );
};

export default DropdownField;
