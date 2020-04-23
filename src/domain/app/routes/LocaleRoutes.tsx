import React from 'react';
import { useTranslation } from 'react-i18next';
import { Route, RouteComponentProps, Switch } from 'react-router';

import { SUPPORT_LANGUAGES } from '../../../constants';
import LandingPage from '../../landingPage/LandingPage';
import NotFoundPage from '../../notFound/NotFoundPage';

const LocaleRoutes: React.FC<RouteComponentProps<{
  locale: SUPPORT_LANGUAGES;
}>> = ({
  match: {
    params: { locale },
  },
}) => {
  const { i18n } = useTranslation();

  React.useEffect(() => {
    i18n.changeLanguage(locale);
  }, [i18n, locale]);

  return (
    <Switch>
      <Route exact path={`/${locale}`} component={LandingPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default LocaleRoutes;
