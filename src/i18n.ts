/* eslint-disable max-len */
import i18n from 'i18next';

/*
  i18next has changed the way it handles null values in translations. This file is required
  to make the typescript compiler happy. See the following links for more information:
  https://github.com/i18next/react-i18next/issues/1587
  https://www.i18next.com/overview/typescript#argument-of-type-defaulttfuncreturn-is-not-assignable-to-parameter-of-type-xyz
*/

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
  }
}

export default i18n;
