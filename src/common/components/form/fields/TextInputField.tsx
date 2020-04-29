import { FieldProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';

// TODO: Get this component from hds-react when implemented there
import TextInput from '../../textInput/TextInput';
import { getErrorText } from '../utils';

interface Props extends FieldProps {
  labelKey: string;
}

const InputField: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const {
    field: { name, ...field },
    form: { errors, touched },
    labelKey,
  } = props;
  const errorText = getErrorText(errors, touched, name, t);
  const labelText = t(labelKey);

  return (
    <TextInput
      id={name}
      invalidText={errorText}
      labelText={labelText}
      {...field}
    />
  );
};

export default InputField;
