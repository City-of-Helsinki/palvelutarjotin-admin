import 'react-toastify/dist/ReactToastify.css';

import { ApolloProvider } from '@apollo/client';
import * as React from 'react';
import { ConfigProvider as RHHCConfigProvider } from 'react-helsinki-headless-cms';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';

import LoadingSpinner from '../../common/components/loadingSpinner/LoadingSpinner';
import useRHHCConfig from '../../hooks/useRHHCConfig';
import AppRoutes from './routes/AppRoutes';
import { FORCE_SCROLL_TO_TOP, IGNORE_SCROLL_TO_TOP } from './routes/constants';
import ScrollToTop from './ScrollToTop';
import { persistor, store } from './store';
import KultusAdminHDSLoginProvider from '../auth/KultusAdminHDSLoginProvider';
import IdleTimer from '../auth/IdleTimerProvider';
import { useCMSApolloClient } from '../../headless-cms/apollo/apolloClient';
import { useApolloClient } from './apollo/apolloClient';

const App = () => {
  const apolloClient = useApolloClient();
  const cmsClient = useCMSApolloClient();

  const rhhcConfig = useRHHCConfig({
    apolloClient: cmsClient,
    eventsApolloClient: apolloClient,
    venuesApolloClient: apolloClient,
  });
  return (
    <Provider store={store}>
      <PersistGate
        loading={<LoadingSpinner isLoading={true} />}
        persistor={persistor}
      ></PersistGate>
      <KultusAdminHDSLoginProvider>
        <IdleTimer>
          <ApolloProvider client={apolloClient}>
            <RHHCConfigProvider config={rhhcConfig}>
              <BrowserRouter>
                <ScrollToTop
                  ignoredPaths={IGNORE_SCROLL_TO_TOP}
                  forceScrollToTopPaths={FORCE_SCROLL_TO_TOP}
                />
                <AppRoutes />
              </BrowserRouter>
            </RHHCConfigProvider>
          </ApolloProvider>
        </IdleTimer>
      </KultusAdminHDSLoginProvider>
      <ToastContainer />
    </Provider>
  );
};

export default App;
