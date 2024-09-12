import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import KultusAdminHDSLoginCallbackHandler from '../../auth/KultusAdminHDSLoginCallbackHandler';
import LocaleRoutes from './LocaleRoutes';
import { ROUTES } from './constants';
import SilentRenewRedirect from './SilentRenewRedirect';

const AppRoutes = () => {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${currentLocale}`} replace />} />
      <Route path={ROUTES.CALLBACK} element={<KultusAdminHDSLoginCallbackHandler />} />
      <Route path={ROUTES.SILENT_CALLBACK} element={<SilentRenewRedirect />} />
      <Route path={ROUTES.SILENT_CALLBACK_HTML} />
      <Route path={`/fi/*`} element={<LocaleRoutes locale={'fi'} />} />
      <Route path={`/sv/*`} element={<LocaleRoutes locale={'sv'} />} />
      <Route path={`/en/*`} element={<LocaleRoutes locale={'en'} />} />
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
