import { FieldProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';

// TODO: Get this component from hds-react when implemented there
import TextAreaInput from '../../textInput/TextAreaInput';
import { getErrorText } from '../utils';

interface Props extends FieldProps {
  cols: number;
  labelKey: string;
  rows: number;
}

const InputField: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const {
    cols,
    field: { name, ...field },
    form: { errors, touched },
    labelKey,
    rows = 10,
  } = props;
  const errorText = getErrorText(errors, touched, name, t);
  const labelText = t(labelKey);

  return (
    <TextAreaInput
      id={name}
      invalidText={errorText}
      labelText={labelText}
      cols={cols}
      rows={rows}
      {...field}
    />
  );
};

export default InputField;
