import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import PageLayout from './layout/PageLayout';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  return (
    <BrowserRouter>
      <PageLayout>
        <AppRoutes></AppRoutes>
      </PageLayout>
    </BrowserRouter>
  );
};

export default App;
