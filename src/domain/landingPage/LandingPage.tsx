import React from 'react';
import { useTranslation } from 'react-i18next';

import Container from '../app/layout/Container';
import PageWrapper from '../app/layout/PageWrapper';

const LandingPage = () => {
  const { t } = useTranslation();
  return (
    <PageWrapper>
      <Container>
        <h1>{t('appName')}</h1>
      </Container>
    </PageWrapper>
  );
};

export default LandingPage;
