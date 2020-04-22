import React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import { SUPPORT_LANGUAGES } from '../../../constants';
import useLocale from '../../../hooks/useLocale';
import LocaleRoutes from './LocaleRoutes';

const localeParam = `:locale(${Object.values(SUPPORT_LANGUAGES).join('|')})`;

const AppRoutes = () => {
  const locale = useLocale();

  return (
    <Switch>
      <Redirect exact path="/" to={`/${locale}`} />
      <Route path={`/${localeParam}(/+)*`} component={LocaleRoutes} />
      <Route
        render={(props) => {
          return <Redirect to={`/${locale}${props.location.pathname}`} />;
        }}
      />
    </Switch>
  );
};

export default AppRoutes;
