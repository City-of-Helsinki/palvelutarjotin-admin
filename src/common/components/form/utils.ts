/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormikErrors, FormikTouched } from 'formik';
import { TFunction } from 'i18next';
import get from 'lodash/get';

/** Get error text
 * @param {Object} errors
 * @param {Object} touched
 * @param {string} name
 * @param {Function} t
 * @return {string}
 */
export const getErrorText = (
  errors: FormikErrors<any>,
  touched: FormikTouched<any>,
  name: string,
  t: TFunction
) => {
  const error: any = get(errors, name);

  return !!error && get(touched, name)
    ? typeof error === 'string'
      ? (t(error) as string)
      : (t(error.key, error) as unknown as string)
    : '';
};
