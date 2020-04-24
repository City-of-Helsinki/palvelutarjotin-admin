import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';

import { SUPPORT_LANGUAGES } from '../../../constants';
import useLocale from '../../../hooks/useLocale';
import { tokenFetched } from '../../auth/actions';
import { getApiToken } from '../../auth/authenticate';
import OidcCallback from '../../auth/oidcCallback/OidcCallback';
import { apiTokenSelector, userSelector } from '../../auth/selectors';
import SilentRenew from '../../auth/silentRenew/SilentRenew';
import LocaleRoutes from './LocaleRoutes';

const localeParam = `:locale(${Object.values(SUPPORT_LANGUAGES).join('|')})`;

const AppRoutes = () => {
  const currentLocale = useLocale();
  const apiToken = useSelector(apiTokenSelector);
  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  React.useEffect(() => {
    if (apiToken) {
      // Skip token fetch if token already existed
      dispatch(tokenFetched());

      // If no token but access token is ready for exchange
      // start to fetch apiToken
    } else if (user?.access_token) {
      dispatch(getApiToken(user.access_token));
    }
  }, [apiToken, dispatch, user]);

  return (
    <Switch>
      <Redirect exact path="/" to={`/${currentLocale}`} />
      <Route exact path="/silent_renew" component={SilentRenew} />
      <Route exact path="/callback" component={OidcCallback} />
      <Route path={`/${localeParam}(/+)*`} component={LocaleRoutes} />
      <Route
        render={(props) => {
          return (
            <Redirect to={`/${currentLocale}${props.location.pathname}`} />
          );
        }}
      />
    </Switch>
  );
};

export default AppRoutes;
