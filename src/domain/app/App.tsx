import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import PageLayout from './layout/PageLayout';
import { MobileMenuProvider } from './mobileMenu/MobileMenu';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  return (
    <BrowserRouter>
      <MobileMenuProvider>
        <PageLayout>
          <AppRoutes></AppRoutes>
        </PageLayout>
      </MobileMenuProvider>
    </BrowserRouter>
  );
};

export default App;
