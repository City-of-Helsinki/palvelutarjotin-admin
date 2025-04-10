import { Button, useOidcClient } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';

import styles from './loginPage.module.scss';
import Container from '../layout/Container';
import PageWrapper from '../layout/PageWrapper';

const LoginPage = () => {
  const { t } = useTranslation();
  const { login } = useOidcClient();
  const { pathname } = useLocation();

  const handleLogin = () => {
    login({ url_state: `next=${pathname}` });
  };

  return (
    <PageWrapper title="login.pageTitle">
      <div className={styles.loginPage}>
        <Container>
          <div className={styles.contentWrapper}>
            <h1>{t('login.title')}</h1>
            <Button onClick={handleLogin} variant="secondary">
              {t('login.buttonLogin')}
            </Button>
          </div>
        </Container>
      </div>
    </PageWrapper>
  );
};

export default LoginPage;
