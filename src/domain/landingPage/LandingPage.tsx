import React from 'react';
import { useTranslation } from 'react-i18next';

import Container from '../app/layout/Container';

const LandingPage = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <h1>{t('appName')}</h1>
    </Container>
  );
};

export default LandingPage;
