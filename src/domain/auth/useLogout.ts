import {
  removeApiTokensFromStorage,
  removeUserReferenceFromStorage,
  useOidcClient,
} from 'hds-react';
import { useCallback } from 'react';

import OrganisationStoragePersistor from '../organisation/contextProviders/OrganisationStoragePersistor';

function useLogout() {
  const { logout } = useOidcClient();
  const logoutFromOidc = useCallback(() => {
    removeApiTokensFromStorage();
    removeUserReferenceFromStorage();
    OrganisationStoragePersistor.clear();
    logout();
  }, [logout]);

  return logoutFromOidc;
}

export default useLogout;
