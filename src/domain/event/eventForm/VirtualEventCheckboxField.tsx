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
  const { value: isVirtual } = props.field;
  const { setFieldValue } = form;

  React.useEffect(() => {
    if (isVirtual) {
      setFieldValue('location', '');
    }
  }, [isVirtual, setFieldValue]);

  return <CheckboxField {...props} form={form} />;
};

export default VirtualEventCheckboxField;
