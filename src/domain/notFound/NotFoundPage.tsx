import * as React from 'react';
import { useTranslation } from 'react-i18next';

import ErrorPage from '../errorPage/ErrorPage';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return <ErrorPage title={t('notFound.textNotFound')} />;
};

export default NotFoundPage;
