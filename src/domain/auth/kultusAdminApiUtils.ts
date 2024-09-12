import { TokenData, getApiTokensFromStorage } from 'hds-react';

import AppConfig from '../app/AppConfig';

export function getKultusAdminApiTokenFromStorage(
  apiTokensStorage: TokenData | null = null
) {
  return (apiTokensStorage ?? getApiTokensFromStorage() ?? {})[
    AppConfig.oidcKultusAdminApiClientId
  ];
}
