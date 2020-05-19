import React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import { SUPPORT_LANGUAGES } from '../../../constants';
import useLocale from '../../../hooks/useLocale';
import OidcCallback from '../../auth/oidcCallback/OidcCallback';
import SilentRenew from '../../auth/silentRenew/SilentRenew';
import { ROUTES } from './constants';
import LocaleRoutes from './LocaleRoutes';

const localeParam = `:locale(${Object.values(SUPPORT_LANGUAGES).join('|')})`;

const AppRoutes = () => {
  const currentLocale = useLocale();

  return (
    <Switch>
      <Redirect exact path="/" to={`/${currentLocale}`} />
      <Route exact path={ROUTES.SILENT_CALLBACK} component={SilentRenew} />
      <Route exact path={ROUTES.CALLBACK} component={OidcCallback} />
      <Route path={`/${localeParam}`} component={LocaleRoutes} />
      <Route
        render={(props) => {
          return (
            <Redirect
              to={`/${currentLocale}${props.location.pathname}${props.location.search}`}
            />
          );
        }}
      />
    </Switch>
  );
};

export default AppRoutes;
