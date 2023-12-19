import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import OidcCallback from '../../auth/oidcCallback/OidcCallback';
import SilentRenew from '../../auth/silentRenew/SilentRenew';
import Version from '../api/version';
import { ROUTES } from './constants';
import LocaleRoutes from './LocaleRoutes';

const AppRoutes = () => {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${currentLocale}`} replace />} />
      <Route path={ROUTES.SILENT_CALLBACK} element={<SilentRenew />} />
      <Route path={ROUTES.CALLBACK} element={<OidcCallback />} />
      <Route path={ROUTES.API_VERSION} element={<Version />} />
      <Route path={`/fi/*`} element={<LocaleRoutes locale={'fi'} />} />
      <Route path={`/sv/*`} element={<LocaleRoutes locale={'sv'} />} />
      <Route path={`/en/*`} element={<LocaleRoutes locale={'en'} />} />
      <Route path={`/cimode/*`} element={<LocaleRoutes locale={'cimode'} />} />
      <Route path="*" element={<NavigateToLocalePath />} />
    </Routes>
  );
};

const NavigateToLocalePath = () => {
  const {
    i18n: { language: currentLocale },
  } = useTranslation();
  const location = useLocation();
  return (
    <Navigate
      to={`/${currentLocale}${location.pathname}${location.search}`}
      replace
    />
  );
};

export default AppRoutes;
