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

if (process.env.NODE_ENV === 'development') {
  enableOidcLogging();
}

const settings: UserManagerSettings = {
  authority: process.env.REACT_APP_OIDC_AUTHORITY,
  automaticSilentRenew: true,
  client_id: process.env.REACT_APP_OIDC_CLIENT_ID,
  redirect_uri: `${location}${ROUTES.CALLBACK}`,
  loadUserInfo: true,
  response_type: 'id_token token',
  silent_redirect_uri: `${location}${ROUTES.SILENT_CALLBACK}`,
  scope: process.env.REACT_APP_OIDC_SCOPE,
  post_logout_redirect_uri: `${location}${ROUTES.HOME}`,
};

const userManager = createUserManager(settings);

export default userManager;
