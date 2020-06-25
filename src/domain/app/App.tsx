import 'react-toastify/dist/ReactToastify.css';

import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { OidcProvider } from 'redux-oidc';
import { PersistGate } from 'redux-persist/integration/react';

import LoadingSpinner from '../../common/components/loadingSpinner/LoadingSpinner';
import userManager from '../auth/userManager';
import apolloClient from './apollo/apolloClient';
import { MobileMenuProvider } from './mobileMenu/MobileMenu';
import AppRoutes from './routes/AppRoutes';
import ScrollToTop from './ScrollToTop';
import { persistor, store } from './store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<LoadingSpinner isLoading={true} />}
        persistor={persistor}
      ></PersistGate>
      <OidcProvider store={store} userManager={userManager}>
        <ApolloProvider client={apolloClient}>
          <BrowserRouter>
            <MobileMenuProvider>
              <ScrollToTop />
              <AppRoutes />
            </MobileMenuProvider>
          </BrowserRouter>
        </ApolloProvider>
      </OidcProvider>
      <ToastContainer />
    </Provider>
  );
};

export default App;
