import classNames from 'classnames';
import { FieldProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';

import KeywordSelector from '../../../../domain/keyword/KeywordSelector';
import { invalidFieldClass } from '../constants';
import { getErrorText } from '../utils';

interface Props extends FieldProps {
  className?: string;
  helperText: string;
  labelText: string;
  placeholder?: string;
}

const KeywordSelectorField: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const {
    className,
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
    <KeywordSelector
      {...field}
      id={name}
      invalidText={invalidText}
      helperText={helperText}
      labelText={labelText}
      onBlur={handleBlur}
      onChange={handleChange}
      placeholder={placeholder}
      className={classNames(className, { [invalidFieldClass]: invalidText })}
    />
  );
};

export default KeywordSelectorField;
