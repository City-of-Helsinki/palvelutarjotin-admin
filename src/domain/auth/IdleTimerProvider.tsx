import React from 'react';
import { useOidcClient } from 'hds-react';
import { IdleTimerProvider } from 'react-idle-timer';

import AppConfig from '../app/AppConfig';

type IdleTimerProps = { children: React.ReactNode };

function IdleTimer({ children }: IdleTimerProps) {
  const { logout, isAuthenticated } = useOidcClient();
  const onIdle = (): void => {
    try {
      if (isAuthenticated()) {
        logout();
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('useOidcClient is fully loaded yet.', { error: e });
    }
  };

  return (
    <IdleTimerProvider
      timeout={AppConfig.userIdleTimeoutInMs || 3_600_000}
      onIdle={onIdle}
      name="pt-admin-idle-timer"
      startOnMount
      crossTab
    >
      {children}
    </IdleTimerProvider>
  );
}

export default IdleTimer;
