import { FieldProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';

// TODO: Get this component from hds-react when implemented there
import TextAreaInput from '../../textInput/TextAreaInput';
import { getErrorText } from '../utils';

interface Props extends FieldProps {
  cols: number;
  helperText: string;
  labelText: string;
  placeholder?: string;
  rows: number;
}

const InputField: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const {
    cols,
    field: { name, ...field },
    form: { errors, touched },
    helperText,
    labelText,
    placeholder,
    rows = 10,
  } = props;
  const errorText = getErrorText(errors, touched, name, t);

  return (
    <TextAreaInput
      helperText={helperText}
      id={name}
      invalid={!!errorText}
      invalidText={errorText}
      labelText={labelText}
      placeholder={placeholder}
      cols={cols}
      rows={rows}
      {...field}
    />
  );
};

export default InputField;
