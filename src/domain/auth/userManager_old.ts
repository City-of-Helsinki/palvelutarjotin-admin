import Oidc, { UserManagerSettings } from 'oidc-client';
import { createUserManager } from 'redux-oidc';

import { ROUTES } from '../app/routes/constants';

const location = `${window.location.protocol}//${window.location.hostname}${
  window.location.port ? `:${window.location.port}` : ''
}`;

const enableOidcLogging = () => {
  Oidc.Log.logger = console;
  // Oidc.Log.level = Oidc.Log.DEBUG;
};

if (import.meta.env.DEV && import.meta.env.MODE !== 'test') {
  enableOidcLogging();
}

const settings: UserManagerSettings = {
  authority: import.meta.env.VITE_APP_OIDC_AUTHORITY,
  automaticSilentRenew: true,
  client_id: import.meta.env.VITE_APP_OIDC_CLIENT_ID,
  redirect_uri: `${location}${ROUTES.CALLBACK}`,
  loadUserInfo: true,
  response_type: 'id_token token',
  silent_redirect_uri: `${location}${ROUTES.SILENT_CALLBACK}`,
  scope: import.meta.env.VITE_APP_OIDC_SCOPE,
  post_logout_redirect_uri: `${location}${ROUTES.HOME}`,
  includeIdTokenInSilentRenew: true,
  monitorSession: true,
};

const userManager = createUserManager(settings);

export default userManager;
