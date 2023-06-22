import { configureStore, getDefaultMiddleware, Store } from '@reduxjs/toolkit';
import { loadUser } from 'redux-oidc';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userManager from '../auth/userManager';
import reducer from './reducers';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['organisation'],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store: Store = configureStore({
  devTools: true,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
  reducer: persistedReducer,
});

loadUser(store, userManager);
const persistor = persistStore(store);

export { persistor, store };

// Define a pretyped dispatcher and root state: redux.js.org/usage/usage-with-typescript#define-typed-hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
