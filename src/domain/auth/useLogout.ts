import {
  removeApiTokensFromStorage,
  removeUserReferenceFromStorage,
  useOidcClient,
} from 'hds-react';
import { useCallback } from 'react';

function useLogout() {
  const { logout } = useOidcClient();
  const logoutFromOidc = useCallback(() => {
    removeApiTokensFromStorage();
    removeUserReferenceFromStorage();
    logout();
  }, [logout]);

  return logoutFromOidc;
}

export default useLogout;
