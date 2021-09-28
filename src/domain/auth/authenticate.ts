import * as Sentry from '@sentry/browser';
import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

import { TUNNISTAMO_API_TOKEN_ENDPOINT } from '../../constants';
import { StoreThunk } from '../../types';
import i18n from '../app/i18n/i18nInit';
import { persistor, store } from '../app/store';
import { clearActiveOrganisation } from '../organisation/actions';
import {
  fetchTokenError,
  fetchTokenSuccess,
  resetApiTokenData,
  startFetchingToken,
} from './actions';
import { ApiTokenResponse } from './types';
import userManager from './userManager';

export const loginTunnistamo = (path?: string): void => {
  userManager
    .signinRedirect({
      data: { path: path || '/' },
      ui_locales: i18n.language,
    })
    .catch((error) => {
      if (error.message === 'Network Error') {
        toast(i18n.t('authentication.networkError.message'), {
          type: toast.TYPE.ERROR,
        });
      } else {
        toast(i18n.t('authentication.errorMessage'), {
          type: toast.TYPE.ERROR,
        });
        Sentry.captureException(error);
      }
    });
};

export const logoutTunnistamo = async (): Promise<void> => {
  try {
    await clearAllState();
    await userManager.signoutRedirect();
  } catch (e) {
    Sentry.captureException(e);
  }
};

export const getApiToken =
  (accessToken: string): StoreThunk =>
  async (dispatch) => {
    try {
      dispatch(startFetchingToken());

      const res: AxiosResponse<ApiTokenResponse> = await axios.get(
        TUNNISTAMO_API_TOKEN_ENDPOINT,
        {
          headers: {
            Authorization: `bearer ${accessToken}`,
          },
        }
      );

      dispatch(fetchTokenSuccess(res.data));
    } catch (e) {
      dispatch(fetchTokenError(e));
      toast(i18n.t('authentication.errorMessage'), {
        type: toast.TYPE.ERROR,
      });
    }
  };

export const clearAllState = async (): Promise<void> => {
  await Promise.all([
    // Clear backend auth data
    store.dispatch(resetApiTokenData()),

    // Clear backend auth data
    store.dispatch(clearActiveOrganisation()),

    // Clear data in redux store and localStorage
    persistor.purge(),
  ]);
};
