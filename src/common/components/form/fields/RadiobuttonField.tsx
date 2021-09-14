import classNames from 'classnames';
import { FieldProps } from 'formik';
import { RadioButton, RadioButtonProps } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { invalidFieldClass } from '../constants';
import { getErrorText } from '../utils';

type Props = FieldProps & RadioButtonProps;

const RadiobuttonField: React.FC<Props> = (props) => {
  const {
    className,
    field: { name, value, ...field },
    form: { errors, touched },
    ...rest
  } = props;
  const { t } = useTranslation();
  const errorText = getErrorText(errors, touched, name, t);

  return (
    <RadioButton
      className={classNames(className, { [invalidFieldClass]: errorText })}
      {...field}
      {...rest}
      id={value}
      name={name}
    />
  );
};

export default RadiobuttonField;
