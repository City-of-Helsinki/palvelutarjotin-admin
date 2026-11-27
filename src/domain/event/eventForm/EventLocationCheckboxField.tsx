import { FieldProps } from 'formik';
import { CheckboxProps } from 'hds-react';
import * as React from 'react';

import CheckboxField from '../../../common/components/form/fields/CheckboxField';

type Props = FieldProps &
  CheckboxProps & {
    fieldName: 'isBookable' | 'isVirtual';
  };

const EventLocationCheckboxField = ({ fieldName, form, ...props }: Props) => {
  const otherField = fieldName === 'isBookable' ? 'isVirtual' : 'isBookable';

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    void form.setFieldValue(fieldName, event.target.checked);
    if (event.target.checked) {
      void form.setFieldValue('location', '');
      void form.setFieldValue(otherField, false);
    }
  };

  return <CheckboxField {...props} form={form} onChange={handleOnChange} />;
};

export default EventLocationCheckboxField;
