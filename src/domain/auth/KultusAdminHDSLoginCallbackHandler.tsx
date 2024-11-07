import { useEffect } from 'react';
import {
  OidcClientError,
  User,
  LoginCallbackHandler,
  useApiTokensClientTracking,
} from 'hds-react';
import * as Sentry from '@sentry/browser';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function KultusAdminHDSLoginCallbackHandler() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [lastSignal] = useApiTokensClientTracking();

  useEffect(() => {
    const payload = lastSignal?.payload;
    if (payload && 'type' in payload && payload.type === 'API_TOKENS_UPDATED') {
      navigate('/');
    }
  }, [lastSignal, navigate]);

  const onError = (error?: OidcClientError) => {
    if (!error) return;
    if (
      error.type === 'SIGNIN_ERROR' &&
      error.message ===
        'Current state (HANDLING_LOGIN_CALLBACK) cannot be handled by a callback'
    ) {
      // TODO: When The HDS team has improved the error handling,
      // this should be doable with;
      // ```
      // if (isHandlingLoginCallbackError(error)) {
      ///...
      // }
      // ```

      // The HANDLING_LOGIN_CALLBACK error is raised only
      // when we are using the <React.Strict>.
      // We don't want to handle this error,
      // because it is raised during every login process,
      // and it does not affect any how to the signin process.
      // When the <BrowserApp> is removed from the React.Strict -container,
      // The error won't be raised anymore. The HDS team has been noted about this issue.
      return;
    }
    Sentry.captureException(error);
    const shortMessage = t('authentication.errorMessage');
    toast.error(shortMessage);
  };

  return (
    <LoginCallbackHandler
      onSuccess={(user: User) => {
        // eslint-disable-next-line no-console
        console.log(`Logged in as ${user.profile.name}`);
      }}
      onError={onError}
    >
      {t('authentication.loggingIn.text', { default: 'Logging in...' })}
    </LoginCallbackHandler>
  );
}

export default KultusAdminHDSLoginCallbackHandler;
