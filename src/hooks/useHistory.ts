import { History, LocationDescriptorObject, LocationState } from 'history';
import { useTranslation } from 'react-i18next';
import { useHistory as useOriginalHistory } from 'react-router';

import { ROUTES } from '../domain/app/routes/constants';
import useQueryStringWithReturnPath from '../utils/useQueryStringWithReturnPath';

// This helper hook returns history with modified push method that adds locale/language to path
const useHistory = () => {
  const history = useOriginalHistory();
  const queryStringWithReturnPath = useQueryStringWithReturnPath();
  const {
    i18n: { language },
  } = useTranslation();

  const pushOrReplace = (
    type: 'push' | 'replace',
    pathOrLocationObject: string | LocationDescriptorObject<LocationState>,
    state?: History
  ) => {
    if (typeof pathOrLocationObject === 'string') {
      const isHome = pathOrLocationObject === ROUTES.HOME;
      if (state) {
        return history[type](
          `/${language}${isHome ? '' : pathOrLocationObject}`,
          state
        );
      }
      return history.push(`/${language}${isHome ? '' : pathOrLocationObject}`);
    }

    const isHome = pathOrLocationObject.pathname === ROUTES.HOME;
    return history[type]({
      ...pathOrLocationObject,
      pathname: `/${language}${isHome ? '' : pathOrLocationObject.pathname}`,
    });
  };

  const pushWithLocale = (
    pathOrLocationObject: string | LocationDescriptorObject<LocationState>,
    state?: History
  ) => {
    pushOrReplace('push', pathOrLocationObject, state);
  };

  const replaceWithLocale = (
    pathOrLocationObject: string | LocationDescriptorObject<LocationState>,
    state?: History
  ) => {
    pushOrReplace('replace', pathOrLocationObject, state);
  };

  const pushWithReturnPath = (
    pathOrLocationObject: string | LocationDescriptorObject<LocationState>
  ) => {
    if (typeof pathOrLocationObject === 'string') {
      pushWithLocale(pathOrLocationObject + queryStringWithReturnPath);
    } else {
      pushWithLocale({
        pathname: pathOrLocationObject.pathname,
        search: queryStringWithReturnPath,
      });
    }
  };

  return { ...history, pushWithLocale, replaceWithLocale, pushWithReturnPath };
};

export default useHistory;
