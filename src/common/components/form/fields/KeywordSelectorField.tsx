import { FieldProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';

import KeywordSelector from '../../../../domain/keyword/KeywordSelector';
import { getErrorText } from '../utils';

interface Props extends FieldProps {
  helperText: string;
  labelText: string;
  placeholder?: string;
}

const KeywordSelectorField: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const {
    field: { name, onBlur, onChange, ...field },
    form: { errors, touched },
    helperText,
    labelText,
    placeholder,
  } = props;
  const invalidText = getErrorText(errors, touched, name, t);

  const handleBlur = (val: string | null) => {
    onBlur({
      target: {
        id: name,
        value: val,
      },
    });
  };

  const handleChange = (val: string | null) => {
    onChange({
      target: {
        id: name,
        value: val,
      },
    });
  };

  return (
    <KeywordSelector
      id={name}
      invalidText={invalidText}
      helperText={helperText}
      labelText={labelText}
      onBlur={handleBlur}
      onChange={handleChange}
      placeholder={placeholder}
      {...field}
    />
  );
};

export default KeywordSelectorField;
