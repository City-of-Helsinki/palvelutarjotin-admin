import React from 'react';
import { Route, Switch } from 'react-router';

import useLocale from '../../../hooks/useLocale';
import LandingPage from '../../landingPage/LandingPage';
import NotFoundPage from '../../notFound/NotFoundPage';

const AppRoutes = () => {
  const locale = useLocale();

  return (
    <Switch>
      <Route exact path={`/${locale}`} component={LandingPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default AppRoutes;
