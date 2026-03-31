import classNames from 'classnames';
import { FieldProps } from 'formik';
import { Select } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import useLocale from '../../../../hooks/useLocale';
import { invalidFieldClass } from '../constants';
import styles from '../dropdownField.module.scss';
import { getErrorText } from '../utils';

export type Option = {
  label: string;
  value: string;
};

type Props = React.ComponentProps<typeof Select> &
  FieldProps & {
    defaultValue: Option[];
    setFieldValue?: (
      field: string,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      value: any,
      shouldValidate?: boolean | undefined
    ) => Promise<void>;
    clearButtonAriaLabel: string;
    selectedItemRemoveButtonAriaLabel: string;
    helper?: string;
    label?: string;
    placeholder?: string;
  };

const MultiDropdownField: React.FC<Props> = ({
  className,
  field: { name, onBlur, onChange, value, ...field },
  form: { errors, touched },
  clearButtonAriaLabel,
  helper,
  label,
  options,
  placeholder,
  selectedItemRemoveButtonAriaLabel,
  setFieldValue,
  texts,
  ...rest
}) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const errorText = getErrorText(errors, touched, name, t);

  const handleChange = (val: Option | Option[]) => {
    const value = Array.isArray(val)
      ? val.map((item) => item.value)
      : val.value;
    if (setFieldValue) {
      (async () => await setFieldValue(name, value))();
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
    <Select
      {...rest}
      {...field}
      texts={{
        assistive: helper,
        clearButtonAriaLabel_multiple: clearButtonAriaLabel,
        clearButtonAriaLabel_one: clearButtonAriaLabel,
        tagRemoveSelectionAriaLabel: selectedItemRemoveButtonAriaLabel,
        error: errorText,
        label,
        language: locale,
        placeholder: placeholder || t('common.dropdown.placeholder'),
        ...texts,
      }}
      invalid={Boolean(errorText)}
      multiSelect={true}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onChange={handleChange as (selectedItems: any) => void}
      options={options}
      id={name}
      value={value
        .map((item: string) =>
          (options as Option[])?.find((option) => option.value === item)
        )
        .filter(Boolean)}
      className={classNames(className, styles.noMaxWidth, {
        [invalidFieldClass]: errorText,
      })}
    />
  );
};

export default MultiDropdownField;
