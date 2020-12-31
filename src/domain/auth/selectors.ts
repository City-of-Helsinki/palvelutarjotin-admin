import { StoreState } from '../../types';

export const userAccessTokenSelector = (state: StoreState) =>
  state.authentication.tunnistamo.user?.access_token;

export const userSelector = (state: StoreState) =>
  state.authentication.tunnistamo.user;

export const apiTokenSelector = (state: StoreState) =>
  state.authentication.token.apiToken;

export const isLoadingUserSelector = (state: StoreState) =>
  state.authentication.tunnistamo.isLoadingUser ||
  state.authentication.token.isFetchingToken;

export const isAuthenticatedSelector = (state: StoreState) => {
  return (
    !!state.authentication.tunnistamo.user &&
    !!state.authentication.token.apiToken
  );
};
