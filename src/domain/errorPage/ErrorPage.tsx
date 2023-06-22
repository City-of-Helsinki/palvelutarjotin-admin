import { Button, IconInfoCircle } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import useNavigate from '../../hooks/useNavigate';
import Container from '../app/layout/Container';
import { ROUTES } from '../app/routes/constants';
import styles from './ErrorPage.module.scss';

const NotFoundPage: React.FC<{ title?: string; description?: string }> = ({
  title,
  description,
}) => {
  const { pushWithLocale } = useNavigate();
  const { t } = useTranslation();

  const goToFrontPage = () => {
    pushWithLocale(ROUTES.HOME);
  };

  return (
    <Container className={styles.container}>
      <div className={styles.content}>
        <div className={styles.iconWrapper}>
          <IconInfoCircle />
        </div>
        <h1>{title || t('errorPage.title')}</h1>
        <p className={styles.description}>
          {description || t('errorPage.description')}
        </p>
        <Button onClick={goToFrontPage} style={{ maxWidth: '300px' }}>
          {t('errorPage.returnToHome')}
        </Button>
      </div>
    </Container>
  );
};

export default NotFoundPage;
