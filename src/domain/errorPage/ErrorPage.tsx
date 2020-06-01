import { Button, IconAttention } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import useLocale from '../../hooks/useLocale';
import Container from '../app/layout/Container';
import styles from './ErrorPage.module.scss';

const NotFoundPage: React.FC<{ title?: string; description?: string }> = ({
  title,
  description,
}) => {
  const history = useHistory();
  const locale = useLocale();
  const { t } = useTranslation();

  const goToFrontPage = () => {
    history.push(`/${locale}`);
  };

  return (
    <Container className={styles.container}>
      <div className={styles.iconWrapper}>
        <IconAttention />
      </div>
      <h1>{title || t('errorPage.title')}</h1>
      <p className={styles.description}>
        {description || t('errorPage.description')}
      </p>
      <Button onClick={goToFrontPage} style={{ maxWidth: '300px' }}>
        {t('errorPage.returnToHome')}
      </Button>
    </Container>
  );
};

export default NotFoundPage;
