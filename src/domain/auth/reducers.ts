import { createAction, createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { reducer as oidcReducer } from 'redux-oidc';

import { API_TOKEN_ACTIONS } from './constants';
import { ApiTokenData } from './types';

export const defaultApiTokenData: ApiTokenData = {
  // The idea is making the whole app rendering wait for apiToken check to resolve first
  // On first load, spinner will load no matter what
  // When either token is fetched from redux store, token is fetched successfully, token is failed to fetch
  // Then the app route can render
  isFetchingToken: false,
  apiToken: null,
  errors: {},
};

const startFetchingToken = createAction(API_TOKEN_ACTIONS.START_FETCHING_TOKEN);
const fetchTokenSuccess = createAction(API_TOKEN_ACTIONS.FETCH_TOKEN_SUCCESS);
const fetchTokenError = createAction(API_TOKEN_ACTIONS.FETCH_TOKEN_ERROR);
const resetApiTokenData = createAction(API_TOKEN_ACTIONS.RESET_API_TOKEN_DATA);
const tokenFetched = createAction(API_TOKEN_ACTIONS.TOKEN_FETCHED);

const tokenReducer = createReducer(defaultApiTokenData, (builder) => {
  builder
    .addCase(startFetchingToken, (state) =>
      Object.assign({}, state, { isFetchingToken: true })
    )
    .addCase(fetchTokenSuccess, (state, action) =>
      Object.assign({}, state, {
        isFetchingToken: false,
        apiToken: Object.values(action.payload ?? {})[0],
      })
    )
    .addCase(fetchTokenError, (state, action) =>
      Object.assign({}, state, {
        isFetchingToken: false,
        apiToken: null,
        errors: action.payload,
      })
    )
    .addCase(resetApiTokenData, (state, action) => defaultApiTokenData)
    .addCase(tokenFetched, (state, action) =>
      Object.assign({}, state, { isFetchingToken: false })
    );
});

export default combineReducers({
  token: tokenReducer,
  tunnistamo: oidcReducer,
});
