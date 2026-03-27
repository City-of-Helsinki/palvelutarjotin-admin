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
  key?: string;
  label: string;
  value: string;
};

type Props = React.ComponentProps<typeof Select> &
  FieldProps & {
    options: Option[];
    defaultValue: Option;
    setFieldValue?: (
      field: string,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      value: any,
      shouldValidate?: boolean | undefined
    ) => Promise<void>;
    helper?: string;
    label?: string;
    placeholder?: string;
  };

/**
 * Single select dropdown field. For multi select dropdown use MultiDropdownField.
 */
const DropdownField: React.FC<Props> = ({
  className,
  field: { name, onBlur, onChange, value, ...field },
  form: { errors, touched },
  helper,
  label,
  options,
  placeholder,
  setFieldValue,
  texts,
  ...rest
}) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const errorText = getErrorText(errors, touched, name, t);

  const handleChange = (selectedOptions: Option[]) => {
    const value = selectedOptions.map((item) => item.value)[0];
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

  const selectedValue = (options as Option[]).find(
    (option) => option.value === value
  ) as Option;
  return (
    <Select
      {...rest}
      {...field}
      texts={{
        assistive: helper,
        error: errorText,
        label: label,
        language: locale,
        placeholder: placeholder || t('common.dropdown.placeholder'),
        ...texts,
      }}
      invalid={Boolean(errorText)}
      // closeMenuOnSelect={!multiselect}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onChange={handleChange as (selectedItems: any) => void}
      options={options}
      id={name}
      multiSelect={false}
      value={[selectedValue].filter(Boolean)}
      clearable
      className={classNames(className, styles.noMaxWidth, {
        [invalidFieldClass]: errorText,
      })}
    />
  );
};

export default DropdownField;
