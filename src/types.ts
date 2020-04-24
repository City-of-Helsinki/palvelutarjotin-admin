import { Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';

import rootReducer from './domain/app/reducers';

export type Language = 'en' | 'fi' | 'sv';

export type StoreState = ReturnType<typeof rootReducer>;

export type StoreThunk = ThunkAction<void, StoreState, null, Action<string>>;
