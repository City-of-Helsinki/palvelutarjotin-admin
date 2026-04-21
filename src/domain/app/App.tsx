import { ApolloProvider } from '@apollo/client';
import { ConfigProvider as RHHCConfigProvider } from '@city-of-helsinki/react-helsinki-headless-cms';
import * as React from 'react';
import { BrowserRouter } from 'react-router';

import { useApolloClient } from './apollo/apolloClient';
import AppRoutes from './routes/AppRoutes';
import { FORCE_SCROLL_TO_TOP, IGNORE_SCROLL_TO_TOP } from './routes/constants';
import ScrollToTop from './ScrollToTop';
import { useNotificationsContext } from '../../common/components/notificationsContext/hooks/useNotificationsContext';
import { NotificationsProvider } from '../../common/components/notificationsContext/NotificationsContext';
import { useCMSApolloClient } from '../../headless-cms/apollo/apolloClient';
import useRHHCConfig from '../../hooks/useRHHCConfig';
import IdleTimer from '../auth/IdleTimerProvider';
import KultusAdminHDSLoginProvider from '../auth/KultusAdminHDSLoginProvider';
import { OrganisationProvider } from '../organisation/contextProviders/OrganisationProvider';

const AppContent = () => {
  const { addNotification } = useNotificationsContext();
  const apolloClient = useApolloClient({
    addNotification,
    initialApolloState: null,
  });
  const cmsClient = useCMSApolloClient();

  const rhhcConfig = useRHHCConfig({
    apolloClient: cmsClient,
    eventsApolloClient: apolloClient,
    venuesApolloClient: apolloClient,
  });
  return (
    <>
      <KultusAdminHDSLoginProvider>
        <IdleTimer>
          <ApolloProvider client={apolloClient}>
            <BrowserRouter>
              <OrganisationProvider>
                <RHHCConfigProvider config={rhhcConfig}>
                  <ScrollToTop
                    ignoredPaths={IGNORE_SCROLL_TO_TOP}
                    forceScrollToTopPaths={FORCE_SCROLL_TO_TOP}
                  />
                  <AppRoutes />
                </RHHCConfigProvider>
              </OrganisationProvider>
            </BrowserRouter>
          </ApolloProvider>
        </IdleTimer>
      </KultusAdminHDSLoginProvider>
    </>
  );
};

const App = () => {
  return (
    <NotificationsProvider>
      <AppContent />
    </NotificationsProvider>
  );
};

export default App;
