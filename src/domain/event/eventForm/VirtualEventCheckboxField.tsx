import { FieldProps } from 'formik';
import { CheckboxProps } from 'hds-react';
import * as React from 'react';

import CheckboxField from '../../../common/components/form/fields/CheckboxField';

// This is its own component because how Formik recommends to handle situations
// where form value is based on other form value.
// see: https://github.com/formium/formik/issues/2204#issuecomment-574207100
const VirtualEventCheckboxField = ({
  form,
  ...props
}: FieldProps & CheckboxProps) => {
  const { setFieldValue } = form;

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    (async () => await setFieldValue('isVirtual', e.target.checked))();
    if (e.target.checked) {
      (async () => await setFieldValue('location', ''))();
      (async () => await setFieldValue('isBookable', false))();
    }
  };

  return <CheckboxField {...props} form={form} onChange={handleOnChange} />;
};

export default VirtualEventCheckboxField;
