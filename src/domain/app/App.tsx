import { ApolloProvider } from '@apollo/client';
import * as React from 'react';
import { ConfigProvider as RHHCConfigProvider } from 'react-helsinki-headless-cms';
import { BrowserRouter } from 'react-router';
import { ToastContainer } from 'react-toastify';

import { useApolloClient } from './apollo/apolloClient';
import AppRoutes from './routes/AppRoutes';
import { FORCE_SCROLL_TO_TOP, IGNORE_SCROLL_TO_TOP } from './routes/constants';
import ScrollToTop from './ScrollToTop';
import { useCMSApolloClient } from '../../headless-cms/apollo/apolloClient';
import useRHHCConfig from '../../hooks/useRHHCConfig';
import IdleTimer from '../auth/IdleTimerProvider';
import KultusAdminHDSLoginProvider from '../auth/KultusAdminHDSLoginProvider';
import { OrganisationProvider } from '../organisation/contextProviders/OrganisationProvider';

const App = () => {
  const apolloClient = useApolloClient();
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
      <ToastContainer />
    </>
  );
};

export default App;
