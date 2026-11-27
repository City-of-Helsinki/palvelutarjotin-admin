import { FieldProps } from 'formik';
import { CheckboxProps } from 'hds-react';
import * as React from 'react';

import EventLocationCheckboxField from './EventLocationCheckboxField';

// This is its own component because how Formik recommends to handle situations
// where form value is based on other form value.
// see: https://github.com/formium/formik/issues/2204#issuecomment-574207100
const VirtualEventCheckboxField = (props: FieldProps & CheckboxProps) => (
  <EventLocationCheckboxField {...props} fieldName="isVirtual" />
);

export default VirtualEventCheckboxField;
