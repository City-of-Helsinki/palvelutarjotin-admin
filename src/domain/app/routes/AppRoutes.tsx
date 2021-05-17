import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect, Route, Switch } from 'react-router';

import { ROUTER_LANGUAGES } from '../../../constants';
import OidcCallback from '../../auth/oidcCallback/OidcCallback';
import SilentRenew from '../../auth/silentRenew/SilentRenew';
import { ROUTES } from './constants';
import LocaleRoutes from './LocaleRoutes';

const localeParam = `:locale(${Object.values(ROUTER_LANGUAGES).join('|')})`;

const AppRoutes = () => {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;

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
