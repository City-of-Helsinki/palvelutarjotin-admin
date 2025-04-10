import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { ROUTES } from './constants';
import LocaleRoutes from './LocaleRoutes';
import SilentRenewRedirect from './SilentRenewRedirect';
import KultusAdminHDSLoginCallbackHandler from '../../auth/KultusAdminHDSLoginCallbackHandler';

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

const AppRoutes = () => {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;

  const fiLocaleRoutes = <LocaleRoutes locale="fi" />;
  const svLocaleRoutes = <LocaleRoutes locale="sv" />;
  const enLocaleRoutes = <LocaleRoutes locale="en" />;

  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${currentLocale}`} replace />} />
      <Route
        path={ROUTES.CALLBACK}
        element={<KultusAdminHDSLoginCallbackHandler />}
      />
      <Route path={ROUTES.SILENT_CALLBACK} element={<SilentRenewRedirect />} />
      <Route path={ROUTES.SILENT_CALLBACK_HTML} />
      <Route path="/fi">
        <Route index element={fiLocaleRoutes} />
        <Route path="*" element={fiLocaleRoutes} />
      </Route>
      <Route path="/sv">
        <Route index element={svLocaleRoutes} />
        <Route path="*" element={svLocaleRoutes} />
      </Route>
      <Route path="/en">
        <Route index element={enLocaleRoutes} />
        <Route path="*" element={enLocaleRoutes} />
      </Route>
      <Route path="*" element={<NavigateToLocalePath />} />
    </Routes>
  );
};

export default AppRoutes;
