import { History, LocationDescriptorObject, LocationState } from 'history';
import { useTranslation } from 'react-i18next';
import { useHistory as useOriginalHistory } from 'react-router';

import { ROUTES } from '../domain/app/routes/constants';

// This helper hook returns history with modified push method that adds locale/language to path
const useHistory = () => {
  const history = useOriginalHistory();
  const {
    i18n: { language },
  } = useTranslation();

  const pushWithLocale = (
    pathOrLocationObject: string | LocationDescriptorObject<LocationState>,
    state?: History.PoorMansUnknown
  ) => {
    if (typeof pathOrLocationObject === 'string') {
      const isHome = pathOrLocationObject === ROUTES.HOME;
      if (state) {
        return history.push(
          `/${language}${isHome ? '' : pathOrLocationObject}`,
          state
        );
      }
      return history.push(`/${language}${isHome ? '' : pathOrLocationObject}`);
    }

    const isHome = pathOrLocationObject.pathname === ROUTES.HOME;
    return history.push({
      ...pathOrLocationObject,
      pathname: `/${language}${isHome ? '' : pathOrLocationObject.pathname}`,
    });
  };

  return { ...history, pushWithLocale };
};

export default useHistory;
