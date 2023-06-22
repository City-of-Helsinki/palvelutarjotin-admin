import * as Sentry from '@sentry/browser';
import { User } from 'oidc-client';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CallbackComponent } from 'redux-oidc';

import { ROUTES } from '../../app/routes/constants';
import userManager from '../userManager';

type UserStateType = {
  state?: {
    path?: string;
  };
};

function OidcCallback(): JSX.Element {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const onSuccess = (user: User & UserStateType) => {
    if (user.state?.path) navigate(user.state.path);
    else navigate('/');
  };
  const onError = (error: Error) => {
    // In case used denies the access
    if (
      new URLSearchParams(location.hash.replace('#', '?')).get('error') ||
      location.pathname === ROUTES.CALLBACK
    ) {
      // TODO: Store url where user clicked log in to session storage and navigate to that url
      navigate('/');
    } else {
      toast(t('authentication.errorMessage'), {
        type: toast.TYPE.ERROR,
      });
      // Make sure that we only send errors to Sentry that are actual
      // programming/system errors, not end users's network errors.
      Sentry.captureException(error);
    }
  };

  return (
    <>
      {/* @ts-ignore to allow children for the <CallbackComponent/> */}
      <CallbackComponent
        successCallback={onSuccess}
        errorCallback={onError}
        userManager={userManager}
      >
        <div>...</div>
      </CallbackComponent>
    </>
  );
}

export default OidcCallback;
