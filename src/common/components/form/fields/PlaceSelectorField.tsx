import { FieldProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';

import PlaceSelector from '../../../../domain/place/PlaceSelector';
import { getErrorText } from '../utils';

interface Props extends FieldProps {
  helperText: string;
  labelText: string;
  placeholder?: string;
}

const PlaceSelectorField: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const {
    field: { name, onBlur, onChange, ...field },
    form: { errors, touched },
    helperText,
    labelText,
    placeholder,
  } = props;
  const invalidText = getErrorText(errors, touched, name, t);

  const handleBlur = (val: string | string[] | null) => {
    onBlur({
      target: {
        id: name,
        value: val,
      },
    });
  };

  const handleChange = (val: string | string[] | null) => {
    onChange({
      target: {
        id: name,
        value: val,
      },
    });
  };

  return (
    <PlaceSelector
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

export default PlaceSelectorField;
