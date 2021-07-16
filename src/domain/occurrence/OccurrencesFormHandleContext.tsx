import { FormikContextType, useFormikContext } from 'formik';
import * as React from 'react';

import { OccurrenceSectionFormFields } from './types';

/*
 * This react context is used to get access to formik functions for a form
 * from higher in the react tree
 *
 * Empty ref object is passed to the provider and child can assign formik
 * props to that ref
 */
export const OccurrencesFormHandleContext = React.createContext<
  React.MutableRefObject<{} | FormikContextType<OccurrenceSectionFormFields>>
>({ current: {} });

export const useOccurrenceForm = () => {
  const context = React.useContext(OccurrencesFormHandleContext);

  if (context === undefined) {
    throw new Error(
      'useOccurrenceForm must be used within a OccurrencesFormHandleProvider'
    );
  }

  return context;
};

export const OccurrenceFormContextSetter = () => {
  const formikContext = useFormikContext<OccurrenceSectionFormFields>();
  const context = useOccurrenceForm();
  context.current = formikContext;
  return null;
};
