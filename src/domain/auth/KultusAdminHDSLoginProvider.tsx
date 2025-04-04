import { LoginProvider, SessionEndedHandler } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  keycloakPoviderProperties,
  tunnistamoPoviderProperties,
} from './constants';
import AppConfig from '../app/AppConfig';

type KultusAdminHDSLoginProviderProps = { children: React.ReactNode };

function KultusAdminHDSLoginProvider({
  children,
}: KultusAdminHDSLoginProviderProps) {
  const { t } = useTranslation();
  const providerProperties =
    AppConfig.oidcServerType === 'TUNNISTAMO'
      ? tunnistamoPoviderProperties
      : keycloakPoviderProperties;

  return (
    <LoginProvider {...providerProperties}>
      {children}
      <SessionEndedHandler
        content={{
          title: t('authentication.session.expired.label'),
          text: t('authentication.session.expired.message'),
          buttonText: t('authentication.logout.text'),
          closeButtonLabelText: t('authentication.logout.text'),
        }}
      />
    </LoginProvider>
  );
}

export default KultusAdminHDSLoginProvider;
