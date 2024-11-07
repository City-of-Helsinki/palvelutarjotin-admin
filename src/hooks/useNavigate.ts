import { useTranslation } from 'react-i18next';
import { To, useNavigate } from 'react-router-dom';
import type { NavigateOptions } from 'react-router-dom';

import { ROUTES } from '../domain/app/routes/constants';
import useQueryStringWithReturnPath from '../utils/useQueryStringWithReturnPath';

const useExtendedNavigate = () => {
  const navigate = useNavigate();
  const queryStringWithReturnPath = useQueryStringWithReturnPath();
  const {
    i18n: { language },
  } = useTranslation();

  const getLocation = (pathOrLocationObject: string | To): string | To => {
    if (typeof pathOrLocationObject === 'string') {
      const isHome = pathOrLocationObject === ROUTES.HOME;
      return `/${language}${isHome ? '' : pathOrLocationObject}`;
    }
    const isHome = pathOrLocationObject.pathname === ROUTES.HOME;
    return {
      ...pathOrLocationObject,
      pathname: `/${language}${isHome ? '' : pathOrLocationObject.pathname}`,
    } as To;
  };

  const pushWithLocale = (
    pathOrLocationObject: string | To,
    state?: NavigateOptions['state']
  ) => {
    navigate(getLocation(pathOrLocationObject), { state, replace: false });
  };

  const replaceWithLocale = (
    pathOrLocationObject: string | To,
    state?: NavigateOptions['state']
  ) => {
    navigate(getLocation(pathOrLocationObject), { state, replace: true });
  };

  const pushWithReturnPath = (pathOrLocationObject: string | To) => {
    if (typeof pathOrLocationObject === 'string') {
      pushWithLocale(pathOrLocationObject + queryStringWithReturnPath);
    } else {
      pushWithLocale({
        pathname: pathOrLocationObject.pathname,
        search: queryStringWithReturnPath,
      });
    }
  };

  return { navigate, pushWithLocale, replaceWithLocale, pushWithReturnPath };
};

export default useExtendedNavigate;
