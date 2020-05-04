import { FieldProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';

// TODO: Get this component from hds-react when implemented there
import NumberInput from '../../textInput/NumberInput';
import { getErrorText } from '../utils';

interface Props extends FieldProps {
  defaultValue?: number;
  labelText: string;
  max?: number;
  min?: number;
  step?: number;
}

const InputField: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const {
    defaultValue,
    field: { name, ...field },
    form: { errors, touched },
    labelText,
    max,
    min,
    step,
  } = props;
  const errorText = getErrorText(errors, touched, name, t);

  return (
    <NumberInput
      id={name}
      invalid={!!errorText}
      invalidText={errorText}
      labelText={labelText}
      defaultValue={defaultValue}
      max={max}
      min={min}
      step={step}
      {...field}
    />
  );
};

export default InputField;
