import { Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';

import { DEV_LANGUAGES } from './constants';
import rootReducer from './domain/app/reducers';

export type Language = 'en' | 'fi' | 'sv';
export type LanguageSelectorLanguage = Language | DEV_LANGUAGES.CIMODE;

export type StoreState = ReturnType<typeof rootReducer>;

export type StoreThunk = ThunkAction<void, StoreState, null, Action<string>>;

export const omitTypename = <T extends { __typename?: string }>(
  obj?: T | null
): Omit<T, '__typename'> | null => {
  if (!obj) {
    return null;
  }
  const { __typename, ...rest } = obj;
  return rest;
};
