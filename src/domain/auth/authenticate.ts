import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

import { TUNNISTAMO_API_TOKEN_ENDPOINT } from '../../constants';
import { StoreThunk } from '../../types';
import i18n from '../app/i18n/i18nInit';
import { store } from '../app/store';
import {
  fetchTokenError,
  fetchTokenSuccess,
  resetApiTokenData,
  startFetchingToken,
} from './actions';
import { ApiTokenResponse } from './types';
import userManager from './userManager';

export const loginTunnistamo = (path?: string) => {
  userManager
    .signinRedirect({
      data: { path: path || '/' },
      // eslint-disable-next-line @typescript-eslint/camelcase
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
        // TODO: Send error to Sentry when Sentry is added to project
        // Sentry.captureException(error);
      }
    });
};

export const logoutTunnistamo = async () => {
  try {
    await userManager.signoutRedirect();
    flushAllState();
  } catch (e) {
    // TODO: Send error to Sentry when Sentry is added to project
    // Sentry.captureException(e);
  }
};

export const getApiToken = (accessToken: string): StoreThunk => async (
  dispatch: Function
) => {
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

export const flushAllState = () => {
  // Clear backend auth data
  store.dispatch(resetApiTokenData());
};
