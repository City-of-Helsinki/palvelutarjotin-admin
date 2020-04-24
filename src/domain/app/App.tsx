import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { OidcProvider } from 'redux-oidc';

import userManager from '../auth/userManager';
import PageLayout from './layout/PageLayout';
import { MobileMenuProvider } from './mobileMenu/MobileMenu';
import AppRoutes from './routes/AppRoutes';
import { store } from './store';

const App = () => {
  return (
    <Provider store={store}>
      <OidcProvider store={store} userManager={userManager}>
        <BrowserRouter>
          <MobileMenuProvider>
            <PageLayout>
              <AppRoutes></AppRoutes>
            </PageLayout>
          </MobileMenuProvider>
        </BrowserRouter>
      </OidcProvider>
      <ToastContainer />
    </Provider>
  );
};

export default App;
