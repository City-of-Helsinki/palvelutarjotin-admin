import { FieldProps } from 'formik';
import { Checkbox, CheckboxProps } from 'hds-react';
import React from 'react';

type Props = FieldProps & CheckboxProps;

const CheckboxField: React.FC<Props> = (props) => {
  const {
    field: { name, ...field },
    ...rest
  } = props;

  return <Checkbox {...field} {...rest} id={name} />;
};

export default CheckboxField;
