import React from 'react';
import { useTranslation } from 'react-i18next';

import Container from '../app/layout/Container';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <h1>{t('notFound.textNotFound')}</h1>
    </Container>
  );
};

export default NotFoundPage;
