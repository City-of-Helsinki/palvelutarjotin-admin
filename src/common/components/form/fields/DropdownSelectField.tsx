import { FieldProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';

import DropdownSelect, {
  DropdownSelectOption,
} from '../../dropdownSelect/DropdownSelect';
import { getErrorText } from '../utils';

interface Props extends FieldProps {
  buttonText?: string;
  defaultValue?: number;
  disabled?: boolean;
  helperText?: string;
  labelText: string;
  options: DropdownSelectOption[];
}

const DropdownSelectField: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const {
    buttonText,
    disabled,
    field: { name, onBlur, onChange, value, ...field },
    form: { errors, touched },
    helperText,
    labelText,
    options,
  } = props;
  const errorText = getErrorText(errors, touched, name, t);

  const handleBlur = () => {
    onBlur({
      target: {
        id: name,
      },
    });
  };

  const handleChange = (val?: DropdownSelectOption) => {
    onChange({
      target: {
        id: name,
        value: val?.value,
      },
    });
  };

  return (
    <DropdownSelect
      buttonText={buttonText}
      disabled={disabled}
      id={name}
      helperText={helperText}
      invalidText={errorText}
      labelText={labelText}
      onBlur={handleBlur}
      onChange={handleChange}
      options={options}
      value={options.find((option) => option.value === value)}
      {...field}
    />
  );
};

export default DropdownSelectField;
