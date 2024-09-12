import { useCallback } from 'react';
import {
  removeApiTokensFromStorage,
  removeUserReferenceFromStorage,
  useOidcClient,
} from 'hds-react';

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
