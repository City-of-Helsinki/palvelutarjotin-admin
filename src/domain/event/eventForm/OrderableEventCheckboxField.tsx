import { FieldProps } from 'formik';
import { CheckboxProps } from 'hds-react';
import * as React from 'react';

import CheckboxField from '../../../common/components/form/fields/CheckboxField';

const OrderableEventCheckboxField = ({
  form,
  ...props
}: FieldProps & CheckboxProps) => {
  const { setFieldValue } = form;

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue('isBookable', e.target.checked);
    if (e.target.checked) {
      setFieldValue('location', '');
      setFieldValue('isVirtual', false);
    }
  };

  return <CheckboxField {...props} form={form} onChange={handleOnChange} />;
};

export default OrderableEventCheckboxField;
