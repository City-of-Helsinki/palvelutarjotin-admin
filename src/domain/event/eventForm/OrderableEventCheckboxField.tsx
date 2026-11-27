import { FieldProps } from 'formik';
import { CheckboxProps } from 'hds-react';
import * as React from 'react';

import EventLocationCheckboxField from './EventLocationCheckboxField';

const OrderableEventCheckboxField = (props: FieldProps & CheckboxProps) => (
  <EventLocationCheckboxField {...props} fieldName="isBookable" />
);

export default OrderableEventCheckboxField;
